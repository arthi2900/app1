import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, FileText, Eye, Download, Trash2, Plus, Search, Filter, Copy, Calendar, BarChart3 } from 'lucide-react';
import { academicApi, subjectApi } from '@/db/api';
import { VersionHistoryDialog } from '@/components/teacher/VersionHistoryDialog';
import { ShuffleAndSaveDialog } from '@/components/teacher/ShuffleAndSaveDialog';
import type { QuestionPaperWithDetails, Question, QuestionPaperQuestionWithDetails, Class, Subject } from '@/types/types';

export default function QuestionPaperManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questionPapers, setQuestionPapers] = useState<QuestionPaperWithDetails[]>([]);
  const [filteredPapers, setFilteredPapers] = useState<QuestionPaperWithDetails[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<QuestionPaperWithDetails | null>(null);
  const [paperQuestions, setPaperQuestions] = useState<QuestionPaperQuestionWithDetails[]>([]);
  const [paperQuestionsMap, setPaperQuestionsMap] = useState<Record<string, QuestionPaperQuestionWithDetails[]>>({});
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'marks'>('date');

  useEffect(() => {
    loadQuestionPapers();
    loadClassesAndSubjects();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [questionPapers, searchQuery, filterClass, filterSubject, filterStatus, sortBy]);

  const loadClassesAndSubjects = async () => {
    try {
      const [classesData, subjectsData] = await Promise.all([
        academicApi.getAllClasses(),
        subjectApi.getAllSubjects()
      ]);
      setClasses(Array.isArray(classesData) ? classesData : []);
      setSubjects(Array.isArray(subjectsData) ? subjectsData : []);
    } catch (error) {
      console.error('Error loading classes and subjects:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...questionPapers];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(paper =>
        paper.title.toLowerCase().includes(query) ||
        paper.class?.class_name.toLowerCase().includes(query) ||
        paper.subject?.subject_name.toLowerCase().includes(query)
      );
    }

    // Class filter
    if (filterClass !== 'all') {
      filtered = filtered.filter(paper => paper.class_id === filterClass);
    }

    // Subject filter
    if (filterSubject !== 'all') {
      filtered = filtered.filter(paper => paper.subject_id === filterSubject);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(paper => paper.status === filterStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'marks':
          return b.total_marks - a.total_marks;
        case 'date':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setFilteredPapers(filtered);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilterClass('all');
    setFilterSubject('all');
    setFilterStatus('all');
    setSortBy('date');
  };

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

  const handleDuplicatePaper = async (paper: QuestionPaperWithDetails) => {
    try {
      // Load the questions for this paper
      const questions = await getQuestionsForPaper(paper.id);
      
      // Create a new draft paper with the same details
      const newPaperTitle = `${paper.title} (Copy)`;
      
      // Navigate to question paper preparation with the duplicate data
      navigate('/teacher/question-paper', {
        state: {
          duplicateFrom: {
            ...paper,
            title: newPaperTitle,
            status: 'draft',
            questions: questions.map(pq => pq.question).filter((q): q is Question => q !== null)
          }
        }
      });
      
      toast.success('Paper duplicated. You can now edit and save it.');
    } catch (error) {
      console.error('Error duplicating paper:', error);
      toast.error('Failed to duplicate question paper');
    }
  };

  const calculateStats = () => {
    const totalPapers = questionPapers.length;
    const draftPapers = questionPapers.filter(p => p.status === 'draft').length;
    const finalPapers = questionPapers.filter(p => p.status === 'final').length;
    const totalMarks = questionPapers.reduce((sum, p) => sum + p.total_marks, 0);
    const avgMarks = totalPapers > 0 ? Math.round(totalMarks / totalPapers) : 0;

    // Group by class
    const byClass = questionPapers.reduce((acc, paper) => {
      const className = paper.class?.class_name || 'Unknown';
      acc[className] = (acc[className] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Group by subject
    const bySubject = questionPapers.reduce((acc, paper) => {
      const subjectName = paper.subject?.subject_name || 'Unknown';
      acc[subjectName] = (acc[subjectName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalPapers,
      draftPapers,
      finalPapers,
      avgMarks,
      byClass,
      bySubject
    };
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

  const stats = calculateStats();

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Question Paper History</h1>
          <p className="text-muted-foreground">View, manage, and track all your question papers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowStats(!showStats)}>
            <BarChart3 className="mr-2 h-4 w-4" />
            {showStats ? 'Hide' : 'Show'} Statistics
          </Button>
          <Button onClick={() => navigate('/teacher/question-paper')}>
            <Plus className="mr-2 h-4 w-4" /> Create New Paper
          </Button>
        </div>
      </div>

      {/* Statistics Card */}
      {showStats && (
        <Card>
          <CardHeader>
            <CardTitle>Statistics Overview</CardTitle>
            <CardDescription>Summary of your question paper history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.totalPapers}</div>
                <div className="text-sm text-muted-foreground">Total Papers</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{stats.draftPapers}</div>
                <div className="text-sm text-muted-foreground">Draft Papers</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.finalPapers}</div>
                <div className="text-sm text-muted-foreground">Final Papers</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.avgMarks}</div>
                <div className="text-sm text-muted-foreground">Avg. Marks</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Papers by Class</h4>
                <div className="space-y-2">
                  {Object.entries(stats.byClass).map(([className, count]) => (
                    <div key={className} className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">{className}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Papers by Subject</h4>
                <div className="space-y-2">
                  {Object.entries(stats.bySubject).map(([subjectName, count]) => (
                    <div key={subjectName} className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">{subjectName}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Search & Filter</CardTitle>
              <CardDescription>Find specific question papers quickly</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, class, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label>Class</Label>
                <Select value={filterClass} onValueChange={setFilterClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.class_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.subject_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date (Newest First)</SelectItem>
                    <SelectItem value="title">Title (A-Z)</SelectItem>
                    <SelectItem value="marks">Total Marks (High-Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredPapers.length} of {questionPapers.length} papers
          </div>
        </CardContent>
      </Card>

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
      ) : filteredPapers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Papers Found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Question Papers</CardTitle>
            <CardDescription>
              View, shuffle, duplicate, and manage your question papers. Click on any draft to continue editing.
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPapers.map((paper) => (
                  <TableRow 
                    key={paper.id}
                    className={paper.status === 'draft' ? 'cursor-pointer hover:bg-muted/50' : ''}
                    onClick={() => paper.status === 'draft' && handleEditDraft(paper)}
                  >
                    <TableCell className="font-medium">{paper.title}</TableCell>
                    <TableCell>{paper.class?.class_name || 'N/A'}</TableCell>
                    <TableCell>{paper.subject?.subject_name || 'N/A'}</TableCell>
                    <TableCell>{getStatusBadge(paper.status)}</TableCell>
                    <TableCell>
                      {paper.total_marks === 0 ? (
                        <span className="text-muted-foreground text-sm">No questions</span>
                      ) : (
                        <span className="font-medium">{paper.total_marks}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {new Date(paper.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-2 justify-end">
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

                        {/* Duplicate Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDuplicatePaper(paper)}
                          title="Duplicate this paper"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>

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
                          title="Delete this paper"
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
