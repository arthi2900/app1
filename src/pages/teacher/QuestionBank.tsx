import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, FileQuestion } from 'lucide-react';
import { questionApi, subjectApi, academicApi, profileApi } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import type { Question, Subject, Class, TeacherAssignmentWithDetails, Profile } from '@/types/types';

export default function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [teacherAssignments, setTeacherAssignments] = useState<TeacherAssignmentWithDetails[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    question_text: '',
    class_id: '',
    subject_id: '',
    question_type: 'mcq' as 'mcq' | 'true_false' | 'short_answer',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    marks: 1,
    options: ['', ''],
    correct_answer: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const profile = await profileApi.getCurrentProfile();
      setCurrentProfile(profile);

      if (!profile) {
        toast({
          title: 'Error',
          description: 'Failed to load profile',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Get teacher assignments for current academic year
      const assignments = await academicApi.getTeacherAssignments(profile.id, '2024-2025');
      setTeacherAssignments(assignments);

      // Extract unique classes from assignments
      const uniqueClasses = Array.from(
        new Map(assignments.map(a => [a.class_id, a.class])).values()
      );
      setClasses(uniqueClasses);

      // Load all questions
      const questionsData = await questionApi.getAllQuestions();
      setQuestions(questionsData);

      // Load all subjects (will be filtered by class selection)
      const subjectsData = await subjectApi.getAllSubjects();
      setSubjects(subjectsData);
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question_text || !formData.class_id || !formData.subject_id || !formData.correct_answer) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      await questionApi.createQuestion({
        question_text: formData.question_text,
        subject_id: formData.subject_id,
        question_type: formData.question_type,
        difficulty: formData.difficulty,
        marks: formData.marks,
        options: formData.question_type === 'mcq' ? formData.options.filter(o => o.trim()) : null,
        correct_answer: formData.correct_answer,
      });

      toast({
        title: 'Success',
        description: 'Question added successfully',
      });

      setDialogOpen(false);
      resetForm();
      loadData();
    } catch (error: any) {
      toast({
        title: 'Failed to add question',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      await questionApi.deleteQuestion(id);
      toast({
        title: 'Success',
        description: 'Question deleted successfully',
      });
      loadData();
    } catch (error: any) {
      toast({
        title: 'Failed to delete question',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      question_text: '',
      class_id: '',
      subject_id: '',
      question_type: 'mcq',
      difficulty: 'medium',
      marks: 1,
      options: ['', ''],
      correct_answer: '',
    });
  };

  // Get subjects for selected class that are assigned to the teacher
  const getAvailableSubjects = () => {
    if (!formData.class_id) return [];
    
    const assignedSubjectIds = teacherAssignments
      .filter(a => a.class_id === formData.class_id)
      .map(a => a.subject_id);
    
    return subjects.filter(s => 
      s.class_id === formData.class_id && 
      assignedSubjectIds.includes(s.id)
    );
  };

  // Add option field
  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, '']
    });
  };

  // Remove option field
  const removeOption = (index: number) => {
    if (formData.options.length <= 2) {
      toast({
        title: 'Error',
        description: 'At least 2 options are required',
        variant: 'destructive',
      });
      return;
    }
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  // Update option value
  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show message if teacher has no assignments
  if (!loading && classes.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Question Bank</h1>
          <p className="text-muted-foreground mt-2">Manage your exam questions</p>
        </div>
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center text-center">
              <FileQuestion className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Class Assignments</h3>
              <p className="text-muted-foreground max-w-md">
                You don't have any class or subject assignments yet. Please contact your principal or administrator to assign you to classes and subjects before creating questions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Question Bank</h1>
          <p className="text-muted-foreground mt-2">Manage your exam questions</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add Question</DialogTitle>
                <DialogDescription>Fill in the question details below</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    value={formData.question_text}
                    onChange={(e) =>
                      setFormData({ ...formData, question_text: e.target.value })
                    }
                    placeholder="Enter question text"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={formData.class_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, class_id: value, subject_id: '' })
                      }
                    >
                      <SelectTrigger>
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
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={formData.subject_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, subject_id: value })
                      }
                      disabled={!formData.class_id}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableSubjects().map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.subject_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Question Type</Label>
                    <Select
                      value={formData.question_type}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, question_type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq">Multiple Choice</SelectItem>
                        <SelectItem value="true_false">True/False</SelectItem>
                        <SelectItem value="short_answer">Short Answer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marks">Marks</Label>
                    <Input
                      id="marks"
                      type="number"
                      min="1"
                      value={formData.marks}
                      onChange={(e) =>
                        setFormData({ ...formData, marks: parseInt(e.target.value) })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, difficulty: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.question_type === 'mcq' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Options</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addOption}
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Option
                      </Button>
                    </div>
                    {formData.options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                        />
                        {formData.options.length > 2 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(index)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="answer">Correct Answer</Label>
                  <Input
                    id="answer"
                    value={formData.correct_answer}
                    onChange={(e) =>
                      setFormData({ ...formData, correct_answer: e.target.value })
                    }
                    placeholder="Enter correct answer"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Questions</CardTitle>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileQuestion className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No questions yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="max-w-md truncate">
                      {question.question_text}
                    </TableCell>
                    <TableCell>
                      {subjects.find((s) => s.id === question.subject_id)?.subject_name || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {question.question_type === 'mcq' && 'Multiple Choice'}
                        {question.question_type === 'true_false' && 'True/False'}
                        {question.question_type === 'short_answer' && 'Short Answer'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty === 'easy' && 'Easy'}
                        {question.difficulty === 'medium' && 'Medium'}
                        {question.difficulty === 'hard' && 'Hard'}
                      </Badge>
                    </TableCell>
                    <TableCell>{question.marks}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(question.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
