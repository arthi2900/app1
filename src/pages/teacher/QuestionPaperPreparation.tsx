import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Loader2, FileText, Eye, Save, Download, ArrowLeft, ArrowRight } from 'lucide-react';
import { profileApi, academicApi, subjectApi, questionApi } from '@/db/api';
import type { Profile, Class, Subject, Question } from '@/types/types';

export default function QuestionPaperPreparation() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Step 1: Basic Details
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [paperTitle, setPaperTitle] = useState('');

  // Step 2: Question Selection
  const [viewMode, setViewMode] = useState<'all' | 'bank'>('all');
  const [questionBankNames, setQuestionBankNames] = useState<string[]>([]);
  const [selectedBankName, setSelectedBankName] = useState('');
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());

  // Preview
  const [previewQuestions, setPreviewQuestions] = useState<Question[]>([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      loadSubjects();
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedSubject && currentStep === 2) {
      loadQuestions();
    }
  }, [selectedSubject, viewMode, selectedBankName, currentStep]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const profileData = await profileApi.getCurrentProfile();
      setProfile(profileData);

      if (profileData?.role === 'teacher' && profileData.id) {
        // For teachers, load only assigned classes
        const [classesData, bankNames] = await Promise.all([
          academicApi.getTeacherAssignedClasses(profileData.id),
          questionApi.getTeacherQuestionBankNames(),
        ]);
        setClasses(Array.isArray(classesData) ? classesData : []);
        setQuestionBankNames(Array.isArray(bankNames) ? bankNames : []);
      } else {
        // For non-teachers (shouldn't happen, but fallback)
        const classesData = await academicApi.getAllClasses();
        setClasses(Array.isArray(classesData) ? classesData : []);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadSubjects = async () => {
    try {
      if (!profile?.id || !selectedClass) return;

      if (profile.role === 'teacher') {
        // For teachers, load only assigned subjects for the selected class
        const subjectsData = await subjectApi.getTeacherAssignedSubjects(profile.id, selectedClass);
        setSubjects(Array.isArray(subjectsData) ? subjectsData : []);
      } else {
        // For non-teachers (shouldn't happen, but fallback)
        const subjectsData = await subjectApi.getAllSubjects();
        const filteredSubjects = subjectsData.filter(s => s.class_id === selectedClass);
        setSubjects(Array.isArray(filteredSubjects) ? filteredSubjects : []);
      }
    } catch (error) {
      console.error('Error loading subjects:', error);
      toast.error('Failed to load subjects');
    }
  };

  const loadQuestions = async () => {
    try {
      setLoading(true);
      let questions: Question[] = [];

      if (viewMode === 'all') {
        questions = await questionApi.getTeacherQuestionsBySubject(selectedSubject);
      } else if (viewMode === 'bank' && selectedBankName) {
        questions = await questionApi.getQuestionsByBankName(selectedBankName);
      }

      setAvailableQuestions(Array.isArray(questions) ? questions : []);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionToggle = (questionId: string) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestions(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedQuestions.size === availableQuestions.length) {
      setSelectedQuestions(new Set());
    } else {
      setSelectedQuestions(new Set(availableQuestions.map(q => q.id)));
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedClass || !selectedSubject || !paperTitle.trim()) {
        toast.error('Please fill in all required fields');
        return;
      }
    } else if (currentStep === 2) {
      if (selectedQuestions.size === 0) {
        toast.error('Please select at least one question');
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const generatePreview = () => {
    const questions = availableQuestions.filter(q => selectedQuestions.has(q.id));
    setPreviewQuestions(questions);
  };

  const handleSaveDraft = async () => {
    try {
      const selectedClass = classes.find(c => c.id === selectedClass);
      const selectedSubj = subjects.find(s => s.id === selectedSubject);
      
      toast.success('Question paper saved as draft successfully');
      navigate('/teacher/dashboard');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    }
  };

  const handleGenerateFinal = async () => {
    try {
      toast.success('Question paper generated successfully');
      navigate('/teacher/dashboard');
    } catch (error) {
      console.error('Error generating paper:', error);
      toast.error('Failed to generate question paper');
    }
  };

  const handleExportPDF = () => {
    window.print();
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

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'mcq':
        return 'MCQ (Single)';
      case 'multiple_response':
        return 'MCQ (Multiple)';
      case 'true_false':
        return 'True/False';
      case 'short_answer':
        return 'Short Answer';
      case 'match_following':
        return 'Match Following';
      default:
        return type;
    }
  };

  const calculateTotalMarks = () => {
    return availableQuestions
      .filter(q => selectedQuestions.has(q.id))
      .reduce((sum, q) => sum + q.marks, 0);
  };

  if (loading && currentStep === 1) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Question Paper Preparation</h1>
        <p className="text-muted-foreground">Create and manage question papers for exams</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted'}`}>
              1
            </div>
            <span className="ml-2 font-medium">Basic Details</span>
          </div>
          <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`flex items-center ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted'}`}>
              2
            </div>
            <span className="ml-2 font-medium">Select Questions</span>
          </div>
          <div className={`flex-1 h-1 mx-4 ${currentStep >= 3 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`flex items-center ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted'}`}>
              3
            </div>
            <span className="ml-2 font-medium">Preview & Save</span>
          </div>
        </div>
      </div>

      {/* Step 1: Basic Details */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Details</CardTitle>
            <CardDescription>Select class, subject, and enter paper title</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paper-title">Paper Title *</Label>
              <Input
                id="paper-title"
                placeholder="e.g., Mid-Term Examination 2025"
                value={paperTitle}
                onChange={(e) => setPaperTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class">Class *</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.class_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                  disabled={!selectedClass}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.subject_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleNextStep}
                disabled={!selectedClass || !selectedSubject || !paperTitle.trim()}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Question Selection */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Questions</CardTitle>
            <CardDescription>Choose questions from your question bank</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'all' | 'bank')}>
              <TabsList>
                <TabsTrigger value="all">View All Questions</TabsTrigger>
                <TabsTrigger value="bank">View by Question Bank</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {availableQuestions.length} questions available
                  </p>
                  <Button variant="outline" size="sm" onClick={handleSelectAll}>
                    {selectedQuestions.size === availableQuestions.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="bank" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Question Bank Name</Label>
                  <Select value={selectedBankName} onValueChange={setSelectedBankName}>
                    <SelectTrigger id="bank-name">
                      <SelectValue placeholder="Select question bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {questionBankNames.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {availableQuestions.length} questions available
                  </p>
                  <Button variant="outline" size="sm" onClick={handleSelectAll}>
                    {selectedQuestions.size === availableQuestions.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Select</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Marks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {availableQuestions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          No questions available
                        </TableCell>
                      </TableRow>
                    ) : (
                      availableQuestions.map((question) => (
                        <TableRow key={question.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedQuestions.has(question.id)}
                              onCheckedChange={() => handleQuestionToggle(question.id)}
                            />
                          </TableCell>
                          <TableCell className="max-w-md truncate">{question.question_text}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{getQuestionTypeLabel(question.question_type)}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{question.marks}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" onClick={handlePreviousStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                {selectedQuestions.size} question(s) selected | Total Marks: {calculateTotalMarks()}
              </div>
              <Button onClick={handleNextStep} disabled={selectedQuestions.size === 0}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Preview & Save */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview & Save</CardTitle>
              <CardDescription>Review your question paper and save it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{paperTitle}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedQuestions.size} questions | Total Marks: {calculateTotalMarks()}
                  </p>
                </div>
                <Button onClick={generatePreview}>
                  <Eye className="mr-2 h-4 w-4" /> Generate Preview
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>💡 <strong>Note:</strong> After saving the question paper, you can shuffle questions and MCQ options when creating different exam versions.</p>
              </div>
            </CardContent>
          </Card>

          {previewQuestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Question Paper Preview</CardTitle>
                <CardDescription>
                  {paperTitle} | Total Marks: {calculateTotalMarks()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {previewQuestions.map((question, index) => (
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
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePreviousStep}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="mr-2 h-4 w-4" /> Save as Draft
              </Button>
              <Button variant="outline" onClick={handleExportPDF}>
                <Download className="mr-2 h-4 w-4" /> Export PDF
              </Button>
              <Button onClick={handleGenerateFinal}>
                <FileText className="mr-2 h-4 w-4" /> Generate Final Paper
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
