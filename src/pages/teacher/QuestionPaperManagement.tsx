import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2, FileText, Eye, Download, Trash2, Plus } from 'lucide-react';
import { academicApi } from '@/db/api';
import { VersionHistoryDialog } from '@/components/teacher/VersionHistoryDialog';
import { ShuffleAndSaveDialog } from '@/components/teacher/ShuffleAndSaveDialog';
import type { QuestionPaperWithDetails, Question, QuestionPaperQuestionWithDetails } from '@/types/types';

export default function QuestionPaperManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questionPapers, setQuestionPapers] = useState<QuestionPaperWithDetails[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<QuestionPaperWithDetails | null>(null);
  const [paperQuestions, setPaperQuestions] = useState<QuestionPaperQuestionWithDetails[]>([]);
  const [paperQuestionsMap, setPaperQuestionsMap] = useState<Record<string, QuestionPaperQuestionWithDetails[]>>({});

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
      setPaperQuestions(questions);
      setPaperQuestionsMap(prev => ({ ...prev, [paperId]: questions }));
      return questions;
    } catch (error) {
      console.error('Error loading paper questions:', error);
      toast.error('Failed to load questions');
      return [];
    }
  };

  const getQuestionsForPaper = async (paperId: string): Promise<QuestionPaperQuestionWithDetails[]> => {
    if (paperQuestionsMap[paperId]) {
      return paperQuestionsMap[paperId];
    }
    return await loadPaperQuestions(paperId);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handlePreviewPaper = async (paper: QuestionPaperWithDetails) => {
    setSelectedPaper(paper);
    const questions = await loadPaperQuestions(paper.id);
    setPaperQuestions(questions);
  };

  const handleEditDraft = (paper: QuestionPaperWithDetails) => {
    // Navigate to question paper preparation page with the draft paper data
    navigate('/teacher/question-paper', { state: { draftPaper: paper } });
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
            <CardDescription>
              View, shuffle, and manage your question papers. Click on any draft to continue editing or generate the final paper.
            </CardDescription>
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
                  <TableRow 
                    key={paper.id}
                    className={paper.status === 'draft' ? 'cursor-pointer hover:bg-muted/50' : ''}
                    onClick={() => paper.status === 'draft' && handleEditDraft(paper)}
                  >
                    <TableCell className="font-medium">{paper.title}</TableCell>
                    <TableCell>{paper.class?.class_name || 'N/A'}</TableCell>
                    <TableCell>{paper.subject?.subject_name || 'N/A'}</TableCell>
                    <TableCell>{getStatusBadge(paper.status)}</TableCell>
                    <TableCell>{paper.total_marks}</TableCell>
                    <TableCell>{new Date(paper.created_at).toLocaleDateString()}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
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
                                    paperQuestions.map((pq, index) => {
                                      const question = pq.question;
                                      if (!question) return null;
                                      
                                      // Use shuffled_options if available, otherwise use original options
                                      const displayOptions = pq.shuffled_options || question.options;
                                      const displayAnswerOptions = pq.shuffled_answer_options || question.answer_options;
                                      
                                      return (
                                        <div key={pq.id} className="border-b pb-4 last:border-b-0">
                                          <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-medium">
                                              Q{index + 1}. {question.question_text}
                                            </h3>
                                            <Badge className={getDifficultyColor(question.difficulty)}>
                                              {question.marks} marks
                                            </Badge>
                                          </div>

                                          {/* Question Image */}
                                          {question.image_url && (
                                            <div className="ml-4 mt-2 mb-3">
                                              <img 
                                                src={question.image_url} 
                                                alt="Question illustration" 
                                                className="max-w-md rounded border"
                                                onError={(e) => {
                                                  e.currentTarget.style.display = 'none';
                                                }}
                                              />
                                            </div>
                                          )}

                                          {question.question_type === 'mcq' && Array.isArray(displayOptions) && (
                                            <div className="ml-4 space-y-1 mt-2">
                                              {(displayOptions as string[]).map((option, idx) => (
                                                <div key={idx} className="text-sm">
                                                  {String.fromCharCode(65 + idx)}. {option}
                                                </div>
                                              ))}
                                            </div>
                                          )}

                                          {question.question_type === 'multiple_response' && Array.isArray(displayOptions) && (
                                            <div className="ml-4 mt-2 space-y-3">
                                              {/* Segment 2: Options (A, B, C, D) */}
                                              <div className="space-y-1">
                                                {(displayOptions as string[]).map((option, idx) => (
                                                  <div key={idx} className="text-sm">
                                                    {String.fromCharCode(65 + idx)}. {option}
                                                  </div>
                                                ))}
                                              </div>

                                              {/* Segment 3: Answer Options (i, ii, iii, iv) */}
                                              {displayAnswerOptions && Array.isArray(displayAnswerOptions) && displayAnswerOptions.length > 0 && (
                                                <div className="space-y-1 pt-2 border-t">
                                                  {displayAnswerOptions.map((answerOption, idx) => (
                                                    <div key={idx} className="text-sm">
                                                      ({['i', 'ii', 'iii', 'iv', 'v', 'vi'][idx] || idx + 1}) {answerOption}
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          )}

                                          {question.question_type === 'true_false' && (
                                            <div className="ml-4 space-y-1 mt-2">
                                              <div className="text-sm">A. True</div>
                                              <div className="text-sm">B. False</div>
                                            </div>
                                          )}

                                          {question.question_type === 'match_following' &&
                                            Array.isArray(displayOptions) && (
                                              <div className="ml-4 mt-3">
                                                <div className="grid grid-cols-2 gap-4">
                                                  <div>
                                                    <p className="text-sm font-semibold mb-2">Column A</p>
                                                    <div className="space-y-2">
                                                      {(displayOptions as any[]).map((pair: any, idx: number) => (
                                                        <div key={idx} className="text-sm p-2 rounded border bg-muted">
                                                          {idx + 1}. {pair.left}
                                                        </div>
                                                      ))}
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <p className="text-sm font-semibold mb-2">Column B</p>
                                                    <div className="space-y-2">
                                                      {(displayOptions as any[]).map((pair: any, idx: number) => (
                                                        <div key={idx} className="text-sm p-2 rounded border bg-muted">
                                                          {String.fromCharCode(65 + idx)}. {pair.right}
                                                        </div>
                                                      ))}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            )}

                                          {question.question_type === 'short_answer' && (
                                            <div className="ml-4 mt-2">
                                              <div className="text-sm text-muted-foreground italic">
                                                [Answer space for student]
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })
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

                        {/* Shuffle and Save Button */}
                        <ShuffleAndSaveDialog
                          paper={paper}
                          onSuccess={loadQuestionPapers}
                        />

                        {/* Version History Button */}
                        {paper.has_versions && (
                          <VersionHistoryDialog
                            paperId={paper.id}
                            paperTitle={paper.title}
                            questions={paper.id === selectedPaper?.id ? paperQuestions.map(pq => pq.question).filter((q): q is Question => q !== null) : []}
                          />
                        )}

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
