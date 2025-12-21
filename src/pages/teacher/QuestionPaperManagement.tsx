import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, FileText, Shuffle, Eye, Download, Trash2, Plus } from 'lucide-react';
import { academicApi } from '@/db/api';
import type { QuestionPaperWithDetails, Question } from '@/types/types';

export default function QuestionPaperManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questionPapers, setQuestionPapers] = useState<QuestionPaperWithDetails[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<QuestionPaperWithDetails | null>(null);
  const [paperQuestions, setPaperQuestions] = useState<Question[]>([]);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [shuffleMcqOptions, setShuffleMcqOptions] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadQuestionPapers();
  }, []);

  const loadQuestionPapers = async () => {
    try {
      setLoading(true);
      const papers = await academicApi.getQuestionPapers();
      setQuestionPapers(Array.isArray(papers) ? papers : []);
    } catch (error) {
      console.error('Error loading question papers:', error);
      toast.error('Failed to load question papers');
    } finally {
      setLoading(false);
    }
  };

  const loadPaperQuestions = async (paperId: string) => {
    try {
      const questions = await academicApi.getQuestionPaperQuestions(paperId);
      const questionData = questions.map(q => q.question).filter((q): q is Question => q !== null);
      setPaperQuestions(questionData);
      return questionData;
    } catch (error) {
      console.error('Error loading paper questions:', error);
      toast.error('Failed to load questions');
      return [];
    }
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleShufflePaper = async (paper: QuestionPaperWithDetails) => {
    setSelectedPaper(paper);
    const questions = await loadPaperQuestions(paper.id);
    setPaperQuestions(questions);
    setShuffleQuestions(false);
    setShuffleMcqOptions(false);
    setShuffledQuestions([]);
    setShowPreview(false);
  };

  const generateShuffledVersion = () => {
    let questions: Question[] = [...paperQuestions];

    // Shuffle question order if enabled
    if (shuffleQuestions) {
      questions = shuffleArray(questions);
    }

    // Shuffle MCQ options if enabled
    if (shuffleMcqOptions) {
      questions = questions.map(q => {
        if ((q.question_type === 'mcq' || q.question_type === 'multiple_response') && Array.isArray(q.options)) {
          const options = q.options as string[];
          const correctAnswer = q.correct_answer;
          
          // Create array of option objects with their original index
          const optionsWithIndex = options.map((opt, idx) => ({
            text: opt,
            originalIndex: idx,
            isCorrect: Array.isArray(correctAnswer) 
              ? correctAnswer.includes(opt) 
              : correctAnswer === opt
          }));
          
          // Shuffle the options
          const shuffledOptions = shuffleArray(optionsWithIndex);
          
          // Extract just the text for display
          const newOptions = shuffledOptions.map(opt => opt.text);
          
          // Update correct answer to reflect new positions
          let newCorrectAnswer: string | string[];
          if (Array.isArray(correctAnswer)) {
            // Multiple correct answers
            newCorrectAnswer = shuffledOptions
              .filter(opt => opt.isCorrect)
              .map(opt => opt.text);
          } else {
            // Single correct answer
            const correctOption = shuffledOptions.find(opt => opt.isCorrect);
            newCorrectAnswer = correctOption ? correctOption.text : correctAnswer;
          }
          
          return { 
            ...q, 
            options: newOptions,
            correct_answer: newCorrectAnswer
          } as Question;
        }
        return q;
      });
    }

    setShuffledQuestions(questions);
    setShowPreview(true);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handlePreviewPaper = async (paper: QuestionPaperWithDetails) => {
    setSelectedPaper(paper);
    const questions = await loadPaperQuestions(paper.id);
    setPaperQuestions(questions);
  };

  const handleDeletePaper = async (paperId: string) => {
    if (!confirm('Are you sure you want to delete this question paper?')) {
      return;
    }

    try {
      await academicApi.deleteQuestionPaper(paperId);
      toast.success('Question paper deleted successfully');
      loadQuestionPapers();
    } catch (error) {
      console.error('Error deleting paper:', error);
      toast.error('Failed to delete question paper');
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'draft') {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Draft</Badge>;
    }
    return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Final</Badge>;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Question Paper Management</h1>
          <p className="text-muted-foreground">Manage and shuffle your question papers</p>
        </div>
        <Button onClick={() => navigate('/teacher/question-paper')}>
          <Plus className="mr-2 h-4 w-4" /> Create New Paper
        </Button>
      </div>

      {questionPapers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Question Papers Yet</h3>
            <p className="text-muted-foreground mb-4">Create your first question paper to get started</p>
            <Button onClick={() => navigate('/teacher/question-paper')}>
              <Plus className="mr-2 h-4 w-4" /> Create Question Paper
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Question Papers</CardTitle>
            <CardDescription>View, shuffle, and manage your question papers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Marks</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questionPapers.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell className="font-medium">{paper.title}</TableCell>
                    <TableCell>{paper.class?.class_name || 'N/A'}</TableCell>
                    <TableCell>{paper.subject?.subject_name || 'N/A'}</TableCell>
                    <TableCell>{getStatusBadge(paper.status)}</TableCell>
                    <TableCell>{paper.total_marks}</TableCell>
                    <TableCell>{new Date(paper.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {/* Preview Button */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePreviewPaper(paper)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Question Paper Preview</DialogTitle>
                              <DialogDescription>
                                Preview of "{paper.title}"
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">{paper.title}</CardTitle>
                                  <CardDescription>
                                    Class: {paper.class?.class_name || 'N/A'} | Subject: {paper.subject?.subject_name || 'N/A'} | Total Marks: {paper.total_marks}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                  {paperQuestions.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">No questions found</p>
                                  ) : (
                                    paperQuestions.map((question, index) => (
                                      <div key={question.id} className="border-b pb-4 last:border-b-0">
                                        <div className="flex items-start justify-between mb-2">
                                          <h3 className="font-medium">
                                            Q{index + 1}. {question.question_text}
                                          </h3>
                                          <Badge className={getDifficultyColor(question.difficulty)}>
                                            {question.marks} marks
                                          </Badge>
                                        </div>

                                        {(question.question_type === 'mcq' || question.question_type === 'multiple_response') &&
                                          Array.isArray(question.options) && (
                                            <div className="ml-4 space-y-1 mt-2">
                                              {(question.options as string[]).map((option, idx) => (
                                                <div key={idx} className="text-sm">
                                                  {String.fromCharCode(65 + idx)}. {option}
                                                </div>
                                              ))}
                                            </div>
                                          )}

                                        {question.question_type === 'true_false' && (
                                          <div className="ml-4 space-y-1 mt-2">
                                            <div className="text-sm">A. True</div>
                                            <div className="text-sm">B. False</div>
                                          </div>
                                        )}
                                      </div>
                                    ))
                                  )}

                                  <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline" onClick={handleExportPDF}>
                                      <Download className="mr-2 h-4 w-4" /> Export PDF
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Shuffle Button */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShufflePaper(paper)}
                            >
                              <Shuffle className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Shuffle Question Paper</DialogTitle>
                              <DialogDescription>
                                Create a shuffled version of "{paper.title}"
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Shuffle Options</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="shuffle-questions"
                                      checked={shuffleQuestions}
                                      onCheckedChange={(checked) => setShuffleQuestions(checked as boolean)}
                                    />
                                    <Label htmlFor="shuffle-questions" className="cursor-pointer">
                                      Shuffle Questions - Randomize question order
                                    </Label>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="shuffle-mcq"
                                      checked={shuffleMcqOptions}
                                      onCheckedChange={(checked) => setShuffleMcqOptions(checked as boolean)}
                                    />
                                    <Label htmlFor="shuffle-mcq" className="cursor-pointer">
                                      Shuffle MCQ Options - Randomize answer options (correct answer will be tracked)
                                    </Label>
                                  </div>

                                  <Button onClick={generateShuffledVersion} className="mt-4">
                                    <Eye className="mr-2 h-4 w-4" /> Generate Shuffled Preview
                                  </Button>
                                </CardContent>
                              </Card>

                              {showPreview && shuffledQuestions.length > 0 && (
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Shuffled Preview</CardTitle>
                                    <CardDescription>
                                      {paper.title} (Shuffled Version)
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-6">
                                    {shuffledQuestions.map((question, index) => (
                                      <div key={question.id} className="border-b pb-4 last:border-b-0">
                                        <div className="flex items-start justify-between mb-2">
                                          <h3 className="font-medium">
                                            Q{index + 1}. {question.question_text}
                                          </h3>
                                          <Badge className={getDifficultyColor(question.difficulty)}>
                                            {question.marks} marks
                                          </Badge>
                                        </div>

                                        {(question.question_type === 'mcq' || question.question_type === 'multiple_response') &&
                                          Array.isArray(question.options) && (
                                            <div className="ml-4 space-y-1 mt-2">
                                              {(question.options as string[]).map((option, idx) => (
                                                <div key={idx} className="text-sm">
                                                  {String.fromCharCode(65 + idx)}. {option}
                                                </div>
                                              ))}
                                            </div>
                                          )}

                                        {question.question_type === 'true_false' && (
                                          <div className="ml-4 space-y-1 mt-2">
                                            <div className="text-sm">A. True</div>
                                            <div className="text-sm">B. False</div>
                                          </div>
                                        )}
                                      </div>
                                    ))}

                                    <div className="flex justify-end gap-2 pt-4">
                                      <Button variant="outline" onClick={handleExportPDF}>
                                        <Download className="mr-2 h-4 w-4" /> Export PDF
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Delete Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePaper(paper.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
