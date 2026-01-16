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
import { Plus, Trash2, FileQuestion, BookOpen, LayoutGrid, LayoutList, Pencil, Upload, FileSpreadsheet } from 'lucide-react';
import { questionApi, subjectApi, academicApi, profileApi, lessonApi } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import type { Question, Subject, Class, Lesson, TeacherAssignmentWithDetails, Profile, MatchPair } from '@/types/types';
import { supabase } from '@/db/supabase';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import BulkUploadDialog from '@/components/teacher/BulkUploadDialog';

// Utility function to remove segment prefix from answer options
const normalizeAnswerOption = (answer: string): string => {
  // Remove patterns like "(i) ", "(ii) ", "(iii) ", etc. from the beginning
  return answer.replace(/^\([ivxIVX]+\)\s*/, '').trim();
};

export default function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [teacherAssignments, setTeacherAssignments] = useState<TeacherAssignmentWithDetails[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [bulkUploadDialogOpen, setBulkUploadDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'row' | 'card'>('row');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    question_text: '',
    class_id: '',
    subject_id: '',
    lesson_id: '',
    question_type: 'mcq' as 'mcq' | 'true_false' | 'short_answer' | 'match_following' | 'multiple_response',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    marks: 1,
    negative_marks: 0,
    options: ['', '', '', ''],
    answer_options: ['', '', '', ''], // For multiple_response questions
    correct_answer: '',
    image_url: '',
    matchPairs: [
      { left: '', right: '' },
      { left: '', right: '' },
      { left: '', right: '' },
      { left: '', right: '' },
    ],
    correctMatches: {} as Record<string, string>,
    multipleCorrectAnswers: [] as string[],
  });

  const [lessonFormData, setLessonFormData] = useState({
    lesson_name: '',
    lesson_code: '',
    subject_id: '',
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

      // Load all questions
      const questionsData = await questionApi.getAllQuestions();
      
      if (profile.role === 'principal') {
        // Principals can see all questions from their school
        // Filter questions by school_id through subjects
        const filteredQuestions = questionsData.filter(q => 
          q.subjects?.school_id === profile.school_id
        );
        setQuestions(filteredQuestions);

        // Load all subjects from the principal's school
        const subjectsData = await academicApi.getSubjectsBySchoolId(profile.school_id || '');
        setSubjects(subjectsData);

        // Load all classes from the principal's school
        const classesData = await academicApi.getClassesBySchoolId(profile.school_id || '');
        setClasses(classesData);

        // Load all lessons from subjects in the principal's school
        const lessonsData = await lessonApi.getAllLessons();
        const subjectIds = subjectsData.map(s => s.id);
        const filteredLessons = lessonsData.filter(l => 
          subjectIds.includes(l.subject_id)
        );
        setLessons(filteredLessons);
      } else {
        // Teachers can only see questions from their assigned subjects
        // Get teacher assignments for current academic year
        const assignments = await academicApi.getTeacherAssignments(profile.id, '2024-2025');
        setTeacherAssignments(assignments);

        // Extract unique classes from assignments
        const uniqueClasses = Array.from(
          new Map(assignments.map(a => [a.class_id, a.class])).values()
        );
        setClasses(uniqueClasses);

        // Filter questions based on teacher's assigned subjects
        const assignedSubjectIds = assignments.map(a => a.subject_id);
        const filteredQuestions = questionsData.filter(q => 
          assignedSubjectIds.includes(q.subject_id)
        );
        setQuestions(filteredQuestions);

        // Load only subjects assigned to the teacher
        const subjectsData = await subjectApi.getTeacherAssignedSubjects(profile.id);
        setSubjects(subjectsData);

        // Load all lessons and filter by assigned subjects
        const lessonsData = await lessonApi.getAllLessons();
        const filteredLessons = lessonsData.filter(l => 
          assignedSubjectIds.includes(l.subject_id)
        );
        setLessons(filteredLessons);
      }
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload an image file (JPEG, PNG, GIF, or WebP)',
        variant: 'destructive',
      });
      event.target.value = ''; // Reset input
      return;
    }

    // Validate file size (max 1MB)
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes
    if (file.size > maxSize) {
      toast({
        title: 'File Too Large',
        description: 'Image must be smaller than 1MB. Please choose a smaller file.',
        variant: 'destructive',
      });
      event.target.value = ''; // Reset input
      return;
    }

    // Validate filename (no Chinese characters)
    const chineseRegex = /[\u4e00-\u9fa5]/;
    if (chineseRegex.test(file.name)) {
      toast({
        title: 'Invalid Filename',
        description: 'Filename must not contain Chinese characters. Please rename the file.',
        variant: 'destructive',
      });
      event.target.value = ''; // Reset input
      return;
    }

    setUploadingImage(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('app-85wc5xzx8yyp_question_images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('app-85wc5xzx8yyp_question_images')
        .getPublicUrl(data.path);

      // Update form data with the public URL
      setFormData({ ...formData, image_url: urlData.publicUrl });

      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });

      // Reset file input
      event.target.value = '';
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
      event.target.value = ''; // Reset input
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question_text || !formData.class_id || !formData.subject_id) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Prepare options and correct_answer based on question type
    let options: any = null;
    let answerOptions: any = null;
    let correctAnswer = '';

    if (formData.question_type === 'mcq') {
      options = formData.options.filter(o => o.trim());
      correctAnswer = formData.correct_answer;
      if (!correctAnswer || options.length < 2) {
        toast({
          title: 'Error',
          description: 'MCQ requires at least 2 options and a correct answer',
          variant: 'destructive',
        });
        return;
      }
    } else if (formData.question_type === 'multiple_response') {
      options = formData.options.filter(o => o.trim());
      answerOptions = formData.answer_options.filter(o => o.trim());
      
      // Validate options
      if (options.length < 2) {
        toast({
          title: 'Error',
          description: 'Multiple Response requires at least 2 options (A, B, C, D)',
          variant: 'destructive',
        });
        return;
      }
      
      // Validate answer options
      if (answerOptions.length < 2) {
        toast({
          title: 'Error',
          description: 'Multiple Response requires at least 2 answer options (i, ii, iii, iv)',
          variant: 'destructive',
        });
        return;
      }
      
      // Validate correct answer selection
      correctAnswer = formData.correct_answer;
      if (!correctAnswer || !answerOptions.includes(correctAnswer)) {
        toast({
          title: 'Error',
          description: 'Please select a correct answer from the answer options',
          variant: 'destructive',
        });
        return;
      }
    } else if (formData.question_type === 'match_following') {
      const validPairs = formData.matchPairs.filter(p => p.left.trim() && p.right.trim());
      options = validPairs;
      correctAnswer = JSON.stringify(formData.correctMatches);
      if (validPairs.length < 2 || Object.keys(formData.correctMatches).length === 0) {
        toast({
          title: 'Error',
          description: 'Match the Following requires at least 2 pairs and correct matches',
          variant: 'destructive',
        });
        return;
      }
    } else if (formData.question_type === 'true_false') {
      correctAnswer = formData.correct_answer;
      if (!correctAnswer) {
        toast({
          title: 'Error',
          description: 'Please select the correct answer',
          variant: 'destructive',
        });
        return;
      }
    } else if (formData.question_type === 'short_answer') {
      correctAnswer = formData.correct_answer;
      if (!correctAnswer) {
        toast({
          title: 'Error',
          description: 'Please provide the correct answer',
          variant: 'destructive',
        });
        return;
      }
    }

    try {
      await questionApi.createQuestion({
        question_text: formData.question_text,
        subject_id: formData.subject_id,
        lesson_id: formData.lesson_id && formData.lesson_id !== 'none' ? formData.lesson_id : null,
        question_type: formData.question_type,
        difficulty: formData.difficulty,
        marks: formData.marks,
        negative_marks: formData.negative_marks,
        options: options,
        answer_options: answerOptions, // For multiple_response questions
        correct_answer: correctAnswer,
        image_url: formData.image_url.trim() || null,
        bank_name: null, // Will be auto-generated by trigger
      });

      toast({
        title: 'Success',
        description: 'Question added successfully. You can add another question.',
      });

      partialResetForm(); // Keep Class and Subject, clear other fields
      loadData(); // Refresh the question list
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

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    
    // Find the subject to get class_id
    const subject = subjects.find(s => s.id === question.subject_id);
    
    // Prepare data based on question type
    let options = ['', '', '', ''];
    let answerOptions = ['', '', '', ''];
    let matchPairs = [
      { left: '', right: '' },
      { left: '', right: '' },
      { left: '', right: '' },
      { left: '', right: '' },
    ];
    let correctMatches = {};
    let multipleCorrectAnswers: string[] = [];
    let correctAnswer = question.correct_answer;

    if (question.question_type === 'mcq' || question.question_type === 'multiple_response') {
      options = Array.isArray(question.options) ? [...question.options as string[]] : ['', '', '', ''];
      // Ensure we have at least 4 slots
      while (options.length < 4) options.push('');
      
      if (question.question_type === 'multiple_response') {
        // Load answer_options for multiple response questions
        answerOptions = Array.isArray(question.answer_options) ? [...question.answer_options] : ['', '', '', ''];
        while (answerOptions.length < 4) answerOptions.push('');
        // Normalize the correct answer to remove any legacy segment prefixes
        correctAnswer = normalizeAnswerOption(correctAnswer);
      }
    } else if (question.question_type === 'match_following') {
      if (Array.isArray(question.options)) {
        matchPairs = question.options as MatchPair[];
        // Ensure we have at least 4 pairs
        while (matchPairs.length < 4) matchPairs.push({ left: '', right: '' });
      }
      try {
        correctMatches = JSON.parse(question.correct_answer);
      } catch {
        correctMatches = {};
      }
    }
    
    setFormData({
      question_text: question.question_text,
      class_id: subject?.class_id || '',
      subject_id: question.subject_id,
      lesson_id: question.lesson_id || '',
      question_type: question.question_type,
      difficulty: question.difficulty,
      marks: question.marks,
      negative_marks: question.negative_marks,
      options: options,
      answer_options: answerOptions,
      correct_answer: correctAnswer,
      image_url: question.image_url || '',
      matchPairs: matchPairs,
      correctMatches: correctMatches,
      multipleCorrectAnswers: multipleCorrectAnswers,
    });
    
    setEditDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingQuestion) return;

    if (!formData.question_text || !formData.subject_id) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Prepare options and correct_answer based on question type
    let options: any = null;
    let answerOptions: any = null;
    let correctAnswer = '';

    if (formData.question_type === 'mcq') {
      options = formData.options.filter(o => o.trim());
      correctAnswer = formData.correct_answer;
      if (!correctAnswer || options.length < 2) {
        toast({
          title: 'Error',
          description: 'MCQ requires at least 2 options and a correct answer',
          variant: 'destructive',
        });
        return;
      }
    } else if (formData.question_type === 'multiple_response') {
      options = formData.options.filter(o => o.trim());
      answerOptions = formData.answer_options.filter(o => o.trim());
      
      // Validate options
      if (options.length < 2) {
        toast({
          title: 'Error',
          description: 'Multiple Response requires at least 2 options (A, B, C, D)',
          variant: 'destructive',
        });
        return;
      }
      
      // Validate answer options
      if (answerOptions.length < 2) {
        toast({
          title: 'Error',
          description: 'Multiple Response requires at least 2 answer options (i, ii, iii, iv)',
          variant: 'destructive',
        });
        return;
      }
      
      // Validate correct answer selection
      correctAnswer = formData.correct_answer;
      if (!correctAnswer || !answerOptions.includes(correctAnswer)) {
        toast({
          title: 'Error',
          description: 'Please select a correct answer from the answer options',
          variant: 'destructive',
        });
        return;
      }
    } else if (formData.question_type === 'match_following') {
      const validPairs = formData.matchPairs.filter(p => p.left.trim() && p.right.trim());
      options = validPairs;
      correctAnswer = JSON.stringify(formData.correctMatches);
      if (validPairs.length < 2 || Object.keys(formData.correctMatches).length === 0) {
        toast({
          title: 'Error',
          description: 'Match the Following requires at least 2 pairs and correct matches',
          variant: 'destructive',
        });
        return;
      }
    } else if (formData.question_type === 'true_false') {
      correctAnswer = formData.correct_answer;
      if (!correctAnswer) {
        toast({
          title: 'Error',
          description: 'Please select the correct answer',
          variant: 'destructive',
        });
        return;
      }
    } else if (formData.question_type === 'short_answer') {
      correctAnswer = formData.correct_answer;
      if (!correctAnswer) {
        toast({
          title: 'Error',
          description: 'Please provide the correct answer',
          variant: 'destructive',
        });
        return;
      }
    }

    try {
      await questionApi.updateQuestion(editingQuestion.id, {
        question_text: formData.question_text,
        subject_id: formData.subject_id,
        lesson_id: formData.lesson_id && formData.lesson_id !== 'none' ? formData.lesson_id : null,
        question_type: formData.question_type,
        difficulty: formData.difficulty,
        marks: formData.marks,
        negative_marks: formData.negative_marks,
        options: options,
        answer_options: answerOptions, // For multiple_response questions
        correct_answer: correctAnswer,
        image_url: formData.image_url.trim() || null,
      });

      toast({
        title: 'Success',
        description: 'Question updated successfully',
      });

      setEditDialogOpen(false);
      setEditingQuestion(null);
      resetForm();
      loadData();
    } catch (error: any) {
      toast({
        title: 'Failed to update question',
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
      lesson_id: '',
      question_type: 'mcq',
      difficulty: 'medium',
      marks: 1,
      negative_marks: 0,
      options: ['', '', '', ''],
      answer_options: ['', '', '', ''],
      correct_answer: '',
      image_url: '',
      matchPairs: [
        { left: '', right: '' },
        { left: '', right: '' },
        { left: '', right: '' },
        { left: '', right: '' },
      ],
      correctMatches: {},
      multipleCorrectAnswers: [],
    });
  };

  // Partial reset - keeps Class, Subject, and Lesson for batch entry
  const partialResetForm = () => {
    setFormData(prev => ({
      ...prev,
      question_text: '',
      question_type: 'mcq',
      difficulty: 'medium',
      marks: 1,
      negative_marks: 0,
      options: ['', '', '', ''],
      answer_options: ['', '', '', ''],
      correct_answer: '',
      image_url: '',
      matchPairs: [
        { left: '', right: '' },
        { left: '', right: '' },
        { left: '', right: '' },
        { left: '', right: '' },
      ],
      correctMatches: {},
      multipleCorrectAnswers: [],
    }));
  };

  // Get subjects for selected class
  const getAvailableSubjects = () => {
    if (!formData.class_id) return [];
    
    // Principals can see all subjects for the selected class
    if (currentProfile?.role === 'principal') {
      return subjects.filter(s => s.class_id === formData.class_id);
    }
    
    // Teachers can only see subjects they are assigned to
    const assignedSubjectIds = teacherAssignments
      .filter(a => a.class_id === formData.class_id)
      .map(a => a.subject_id);
    
    return subjects.filter(s => 
      s.class_id === formData.class_id && 
      assignedSubjectIds.includes(s.id)
    );
  };

  // Get lessons for selected subject
  const getAvailableLessons = () => {
    if (!formData.subject_id) return [];
    return lessons.filter(l => l.subject_id === formData.subject_id);
  };

  // Handle lesson creation
  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lessonFormData.lesson_name || !lessonFormData.subject_id) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      await lessonApi.createLesson({
        lesson_name: lessonFormData.lesson_name,
        lesson_code: lessonFormData.lesson_code || null,
        subject_id: lessonFormData.subject_id,
      });

      toast({
        title: 'Success',
        description: 'Lesson created successfully',
      });

      setLessonDialogOpen(false);
      setLessonFormData({ lesson_name: '', lesson_code: '', subject_id: '' });
      
      // Reload lessons
      const lessonsData = await lessonApi.getAllLessons();
      setLessons(lessonsData);
    } catch (error: any) {
      toast({
        title: 'Failed to create lesson',
        description: error.message,
        variant: 'destructive',
      });
    }
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
    if (formData.options.length <= 4) {
      toast({
        title: 'Error',
        description: 'At least 4 options are required',
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

  // Show message if teacher has no assignments or principal has no classes
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
              <h3 className="text-xl font-semibold mb-2">
                {currentProfile?.role === 'principal' ? 'No Classes Available' : 'No Class Assignments'}
              </h3>
              <p className="text-muted-foreground max-w-md">
                {currentProfile?.role === 'principal' 
                  ? 'There are no classes set up in your school yet. Please set up classes and subjects in the Academic Management section before creating questions.'
                  : 'You don\'t have any class or subject assignments yet. Please contact your principal or administrator to assign you to classes and subjects before creating questions.'
                }
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
          <p className="text-muted-foreground mt-2">
            {currentProfile?.role === 'principal' 
              ? 'Manage questions for all classes and subjects in your school'
              : 'Manage questions for your assigned classes and subjects'
            }
          </p>
          {currentProfile?.role === 'teacher' && teacherAssignments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {teacherAssignments.map((assignment, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {assignment.class?.class_name} - {assignment.subject?.subject_name}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setBulkUploadDialogOpen(true)}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Bulk Upload
          </Button>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              resetForm();
            }
          }}>
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
                        setFormData({ ...formData, subject_id: value, lesson_id: '' })
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

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="lesson">Lesson (Optional)</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (!formData.subject_id) {
                          toast({
                            title: 'Error',
                            description: 'Please select a subject first',
                            variant: 'destructive',
                          });
                          return;
                        }
                        setLessonFormData({ ...lessonFormData, subject_id: formData.subject_id });
                        setLessonDialogOpen(true);
                      }}
                      disabled={!formData.subject_id}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      New Lesson
                    </Button>
                  </div>
                  <Select
                    value={formData.lesson_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, lesson_id: value })
                    }
                    disabled={!formData.subject_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lesson (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Lesson</SelectItem>
                      {getAvailableLessons().map((lesson) => (
                        <SelectItem key={lesson.id} value={lesson.id}>
                          {lesson.lesson_name}
                          {lesson.lesson_code && ` (${lesson.lesson_code})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                        <SelectItem value="mcq">Multiple Choice (Single Answer)</SelectItem>
                        <SelectItem value="multiple_response">Multiple Response (Multiple Answers)</SelectItem>
                        <SelectItem value="true_false">True/False</SelectItem>
                        <SelectItem value="short_answer">Short Answer</SelectItem>
                        <SelectItem value="match_following">Match the Following</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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

                <div className="grid grid-cols-2 gap-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="negative-marks">Negative Marks</Label>
                    <Input
                      id="negative-marks"
                      type="number"
                      min="0"
                      step="0.25"
                      value={formData.negative_marks}
                      onChange={(e) =>
                        setFormData({ ...formData, negative_marks: parseFloat(e.target.value) || 0 })
                      }
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      Marks deducted for wrong answer (0 = no deduction)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="question">Question Text</Label>
                  <RichTextEditor
                    id="question"
                    value={formData.question_text}
                    onChange={(value) =>
                      setFormData({ ...formData, question_text: value })
                    }
                    placeholder="Enter question text with formatting..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image-url">Image/Clip Art (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image-url"
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                      placeholder="Enter image URL or upload a file"
                      className="flex-1"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        id="file-upload"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        disabled={uploadingImage}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploadingImage ? 'Uploading...' : 'Upload'}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Max file size: 1MB. Supported formats: JPEG, PNG, GIF, WebP
                  </p>
                  {formData.image_url && (
                    <div className="mt-2 border rounded-lg p-2 bg-muted">
                      <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
                      <img
                        src={formData.image_url}
                        alt="Question preview"
                        className="max-w-full h-auto max-h-48 rounded object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            const errorMsg = parent.querySelector('.error-msg');
                            if (!errorMsg) {
                              const msg = document.createElement('p');
                              msg.className = 'error-msg text-sm text-destructive';
                              msg.textContent = 'Failed to load image. Please check the URL.';
                              parent.appendChild(msg);
                            }
                          }
                        }}
                        onLoad={(e) => {
                          (e.target as HTMLImageElement).style.display = 'block';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            const errorMsg = parent.querySelector('.error-msg');
                            if (errorMsg) {
                              errorMsg.remove();
                            }
                          }
                        }}
                      />
                    </div>
                  )}
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
                        {formData.options.length > 4 && (
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

                {formData.question_type === 'multiple_response' && (
                  <>
                    <div className="space-y-2 p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold text-primary">Segment 2: Options (A, B, C, D)</Label>
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
                      <p className="text-sm text-muted-foreground">
                        These are the answer choices that will be labeled A, B, C, D
                      </p>
                      {formData.options.map((option, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={option}
                            onChange={(e) => updateOption(index, e.target.value)}
                            placeholder={`Option ${String.fromCharCode(65 + index)}`}
                            className="bg-background"
                          />
                          {formData.options.length > 4 && (
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

                    <div className="space-y-2 p-4 border-2 border-secondary/20 rounded-lg bg-secondary/5">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold text-secondary">Segment 3: Answer Options (i, ii, iii, iv)</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              answer_options: [...formData.answer_options, ''],
                            });
                          }}
                          className="gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Answer Option
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">
                        These are the answer choices students will select from (e.g., "A and C only", "All of the above")
                      </p>
                      {formData.answer_options.map((answerOption, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={answerOption}
                            onChange={(e) => {
                              const newAnswerOptions = [...formData.answer_options];
                              newAnswerOptions[index] = e.target.value;
                              setFormData({ ...formData, answer_options: newAnswerOptions });
                            }}
                            placeholder={`Answer Option (${['i', 'ii', 'iii', 'iv', 'v', 'vi'][index] || index + 1})`}
                            className="bg-background"
                          />
                          {formData.answer_options.length > 4 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newAnswerOptions = formData.answer_options.filter((_, i) => i !== index);
                                setFormData({ ...formData, answer_options: newAnswerOptions });
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {formData.question_type === 'match_following' && (
                  <div className="space-y-2">
                    <Label>Match Pairs</Label>
                    <p className="text-sm text-muted-foreground">
                      Create pairs of items that students need to match
                    </p>
                    {formData.matchPairs.map((pair, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          value={pair.left}
                          onChange={(e) => {
                            const newPairs = [...formData.matchPairs];
                            newPairs[index].left = e.target.value;
                            setFormData({ ...formData, matchPairs: newPairs });
                          }}
                          placeholder={`Left Item ${index + 1}`}
                        />
                        <Input
                          value={pair.right}
                          onChange={(e) => {
                            const newPairs = [...formData.matchPairs];
                            newPairs[index].right = e.target.value;
                            setFormData({ ...formData, matchPairs: newPairs });
                          }}
                          placeholder={`Right Match ${index + 1}`}
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          matchPairs: [...formData.matchPairs, { left: '', right: '' }],
                        });
                      }}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Pair
                    </Button>
                  </div>
                )}

                {/* Correct Answer Section */}
                <div className="space-y-2">
                  <Label htmlFor="answer">Correct Answer</Label>
                  {formData.question_type === 'mcq' ? (
                    <Select
                      value={formData.correct_answer}
                      onValueChange={(value) =>
                        setFormData({ ...formData, correct_answer: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.options
                          .filter((opt) => opt.trim())
                          .map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  ) : formData.question_type === 'multiple_response' ? (
                    <Select
                      value={formData.correct_answer}
                      onValueChange={(value) =>
                        setFormData({ ...formData, correct_answer: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer option" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.answer_options
                          .filter((opt) => opt.trim())
                          .map((answerOption, index) => (
                            <SelectItem key={index} value={answerOption}>
                              {answerOption}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  ) : formData.question_type === 'match_following' ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Define correct matches for each left item
                      </p>
                      {formData.matchPairs
                        .filter((pair) => pair.left.trim() && pair.right.trim())
                        .map((pair, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm font-medium min-w-[150px]">{pair.left}</span>
                            <span className="text-muted-foreground">→</span>
                            <Select
                              value={formData.correctMatches[pair.left] || ''}
                              onValueChange={(value) => {
                                setFormData({
                                  ...formData,
                                  correctMatches: {
                                    ...formData.correctMatches,
                                    [pair.left]: value,
                                  },
                                });
                              }}
                            >
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Select match" />
                              </SelectTrigger>
                              <SelectContent>
                                {formData.matchPairs
                                  .filter((p) => p.right.trim())
                                  .map((p, idx) => (
                                    <SelectItem key={idx} value={p.right}>
                                      {p.right}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                    </div>
                  ) : formData.question_type === 'true_false' ? (
                    <Select
                      value={formData.correct_answer}
                      onValueChange={(value) =>
                        setFormData({ ...formData, correct_answer: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="True">True</SelectItem>
                        <SelectItem value="False">False</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="answer"
                      value={formData.correct_answer}
                      onChange={(e) =>
                        setFormData({ ...formData, correct_answer: e.target.value })
                      }
                      placeholder="Enter correct answer"
                      required
                    />
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Done
                </Button>
                <Button type="submit">Add Question</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>

      {/* Edit Question Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) {
            setEditingQuestion(null);
            resetForm();
          }
        }}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleUpdate}>
              <DialogHeader>
                <DialogTitle>Edit Question</DialogTitle>
                <DialogDescription>Update the question details below</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-class">Class</Label>
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
                    <Label htmlFor="edit-subject">Subject</Label>
                    <Select
                      value={formData.subject_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, subject_id: value, lesson_id: '' })
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

                <div className="space-y-2">
                  <Label htmlFor="edit-lesson">Lesson (Optional)</Label>
                  <Select
                    value={formData.lesson_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, lesson_id: value })
                    }
                    disabled={!formData.subject_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lesson (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Lesson</SelectItem>
                      {getAvailableLessons().map((lesson) => (
                        <SelectItem key={lesson.id} value={lesson.id}>
                          {lesson.lesson_name}
                          {lesson.lesson_code && ` (${lesson.lesson_code})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Question Type</Label>
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
                        <SelectItem value="mcq">Multiple Choice (Single Answer)</SelectItem>
                        <SelectItem value="multiple_response">Multiple Response (Multiple Answers)</SelectItem>
                        <SelectItem value="true_false">True/False</SelectItem>
                        <SelectItem value="short_answer">Short Answer</SelectItem>
                        <SelectItem value="match_following">Match the Following</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-difficulty">Difficulty</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value: 'easy' | 'medium' | 'hard') =>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-marks">Marks</Label>
                    <Input
                      id="edit-marks"
                      type="number"
                      min="1"
                      value={formData.marks}
                      onChange={(e) =>
                        setFormData({ ...formData, marks: parseInt(e.target.value) })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-negative-marks">Negative Marks</Label>
                    <Input
                      id="edit-negative-marks"
                      type="number"
                      min="0"
                      step="0.25"
                      value={formData.negative_marks}
                      onChange={(e) =>
                        setFormData({ ...formData, negative_marks: parseFloat(e.target.value) || 0 })
                      }
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      Marks deducted for wrong answer (0 = no deduction)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-question">Question Text</Label>
                  <RichTextEditor
                    id="edit-question"
                    value={formData.question_text}
                    onChange={(value) =>
                      setFormData({ ...formData, question_text: value })
                    }
                    placeholder="Enter question text with formatting..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-image-url">Image/Clip Art (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="edit-image-url"
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                      placeholder="Enter image URL or upload a file"
                      className="flex-1"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        id="edit-file-upload"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('edit-file-upload')?.click()}
                        disabled={uploadingImage}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploadingImage ? 'Uploading...' : 'Upload'}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Max file size: 1MB. Supported formats: JPEG, PNG, GIF, WebP
                  </p>
                  {formData.image_url && (
                    <div className="mt-2 border rounded-lg p-2 bg-muted">
                      <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
                      <img
                        src={formData.image_url}
                        alt="Question preview"
                        className="max-w-full h-auto max-h-48 rounded object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            const errorMsg = parent.querySelector('.error-msg');
                            if (!errorMsg) {
                              const msg = document.createElement('p');
                              msg.className = 'error-msg text-sm text-destructive';
                              msg.textContent = 'Failed to load image. Please check the URL.';
                              parent.appendChild(msg);
                            }
                          }
                        }}
                        onLoad={(e) => {
                          (e.target as HTMLImageElement).style.display = 'block';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            const errorMsg = parent.querySelector('.error-msg');
                            if (errorMsg) {
                              errorMsg.remove();
                            }
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                {formData.question_type === 'mcq' && (
                  <div className="space-y-2">
                    <Label>Options</Label>
                    {formData.options.map((option, index) => (
                      <Input
                        key={index}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...formData.options];
                          newOptions[index] = e.target.value;
                          setFormData({ ...formData, options: newOptions });
                        }}
                        placeholder={`Option ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {formData.question_type === 'multiple_response' && (
                  <>
                    <div className="space-y-2 p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
                      <Label className="text-base font-semibold text-primary">Segment 2: Options (A, B, C, D)</Label>
                      <p className="text-sm text-muted-foreground font-medium">
                        These are the answer choices that will be labeled A, B, C, D
                      </p>
                      {formData.options.map((option, index) => (
                        <Input
                          key={index}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...formData.options];
                            newOptions[index] = e.target.value;
                            setFormData({ ...formData, options: newOptions });
                          }}
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                          className="bg-background"
                        />
                      ))}
                    </div>

                    <div className="space-y-2 p-4 border-2 border-secondary/20 rounded-lg bg-secondary/5">
                      <Label className="text-base font-semibold text-secondary">Segment 3: Answer Options (i, ii, iii, iv)</Label>
                      <p className="text-sm text-muted-foreground font-medium">
                        These are the answer choices students will select from (e.g., "A and C only", "All of the above")
                      </p>
                      {formData.answer_options.map((answerOption, index) => (
                        <Input
                          key={index}
                          value={answerOption}
                          onChange={(e) => {
                            const newAnswerOptions = [...formData.answer_options];
                            newAnswerOptions[index] = e.target.value;
                            setFormData({ ...formData, answer_options: newAnswerOptions });
                          }}
                          placeholder={`Answer Option (${['i', 'ii', 'iii', 'iv', 'v', 'vi'][index] || index + 1})`}
                          className="bg-background"
                        />
                      ))}
                    </div>
                  </>
                )}

                {formData.question_type === 'match_following' && (
                  <div className="space-y-2">
                    <Label>Match Pairs</Label>
                    <p className="text-sm text-muted-foreground">
                      Create pairs of items that students need to match
                    </p>
                    {formData.matchPairs.map((pair, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          value={pair.left}
                          onChange={(e) => {
                            const newPairs = [...formData.matchPairs];
                            newPairs[index].left = e.target.value;
                            setFormData({ ...formData, matchPairs: newPairs });
                          }}
                          placeholder={`Left Item ${index + 1}`}
                        />
                        <Input
                          value={pair.right}
                          onChange={(e) => {
                            const newPairs = [...formData.matchPairs];
                            newPairs[index].right = e.target.value;
                            setFormData({ ...formData, matchPairs: newPairs });
                          }}
                          placeholder={`Right Match ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="edit-answer">Correct Answer</Label>
                  {formData.question_type === 'mcq' ? (
                    <Select
                      value={formData.correct_answer}
                      onValueChange={(value) =>
                        setFormData({ ...formData, correct_answer: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.options
                          .filter((opt) => opt.trim())
                          .map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  ) : formData.question_type === 'multiple_response' ? (
                    <Select
                      value={formData.correct_answer}
                      onValueChange={(value) =>
                        setFormData({ ...formData, correct_answer: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer option" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.answer_options
                          .filter((opt) => opt.trim())
                          .map((answerOption, index) => (
                            <SelectItem key={index} value={answerOption}>
                              {answerOption}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  ) : formData.question_type === 'match_following' ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Define correct matches for each left item
                      </p>
                      {formData.matchPairs
                        .filter((pair) => pair.left.trim() && pair.right.trim())
                        .map((pair, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm font-medium min-w-[150px]">{pair.left}</span>
                            <span className="text-muted-foreground">→</span>
                            <Select
                              value={formData.correctMatches[pair.left] || ''}
                              onValueChange={(value) => {
                                setFormData({
                                  ...formData,
                                  correctMatches: {
                                    ...formData.correctMatches,
                                    [pair.left]: value,
                                  },
                                });
                              }}
                            >
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Select match" />
                              </SelectTrigger>
                              <SelectContent>
                                {formData.matchPairs
                                  .filter((p) => p.right.trim())
                                  .map((p, idx) => (
                                    <SelectItem key={idx} value={p.right}>
                                      {p.right}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                    </div>
                  ) : formData.question_type === 'true_false' ? (
                    <Select
                      value={formData.correct_answer}
                      onValueChange={(value) =>
                        setFormData({ ...formData, correct_answer: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="True">True</SelectItem>
                        <SelectItem value="False">False</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="edit-answer"
                      value={formData.correct_answer}
                      onChange={(e) =>
                        setFormData({ ...formData, correct_answer: e.target.value })
                      }
                      placeholder="Enter correct answer"
                      required
                    />
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditDialogOpen(false);
                    setEditingQuestion(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Question</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Lesson Creation Dialog */}
        <Dialog open={lessonDialogOpen} onOpenChange={setLessonDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Lesson</DialogTitle>
              <DialogDescription>
                Add a new lesson to organize your questions better
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateLesson}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="lesson_name">Lesson Name *</Label>
                  <Input
                    id="lesson_name"
                    value={lessonFormData.lesson_name}
                    onChange={(e) =>
                      setLessonFormData({ ...lessonFormData, lesson_name: e.target.value })
                    }
                    placeholder="e.g., Introduction to Algebra"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lesson_code">Lesson Code (Optional)</Label>
                  <Input
                    id="lesson_code"
                    value={lessonFormData.lesson_code}
                    onChange={(e) =>
                      setLessonFormData({ ...lessonFormData, lesson_code: e.target.value })
                    }
                    placeholder="e.g., L01, UNIT-1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setLessonDialogOpen(false);
                    setLessonFormData({ lesson_name: '', lesson_code: '', subject_id: '' });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Lesson</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Question Bank ({questions.length})</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Showing questions from your assigned classes and subjects only
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'row' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('row')}
              >
                <LayoutList className="w-4 h-4 mr-2" />
                Row View
              </Button>
              <Button
                variant={viewMode === 'card' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('card')}
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Card View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileQuestion className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No questions yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start creating questions for your assigned classes and subjects
              </p>
            </div>
          ) : viewMode === 'row' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Bank Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Lesson</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Negative Marks</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="max-w-md">
                      <div className="space-y-2">
                        <div 
                          className="question-content line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: question.question_text }}
                        />
                        {question.image_url && (
                          <img
                            src={question.image_url}
                            alt="Question"
                            className="max-w-32 h-auto max-h-20 rounded border object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {question.bank_name || '-'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {subjects.find((s) => s.id === question.subject_id)?.subject_name || '-'}
                    </TableCell>
                    <TableCell>
                      {question.lesson_id 
                        ? lessons.find((l) => l.id === question.lesson_id)?.lesson_name || '-'
                        : '-'
                      }
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {question.question_type === 'mcq' && 'MCQ (Single)'}
                        {question.question_type === 'multiple_response' && 'MCQ (Multiple)'}
                        {question.question_type === 'true_false' && 'True/False'}
                        {question.question_type === 'short_answer' && 'Short Answer'}
                        {question.question_type === 'match_following' && 'Match Following'}
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
                    <TableCell>{question.negative_marks}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(question)}
                        >
                          <Pencil className="w-4 h-4 text-primary" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(question.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="space-y-3">
              {questions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Left Section: Question Number & Image */}
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">Q</span>
                        </div>
                        {question.image_url && (
                          <img
                            src={question.image_url}
                            alt="Question"
                            className="w-20 h-20 rounded border object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                      </div>

                      {/* Middle Section: Question Content */}
                      <div className="flex-1 min-w-0 space-y-3">
                        {/* Question Text */}
                        <div>
                          <div 
                            className="question-content text-base line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: question.question_text }}
                          />
                        </div>

                        {/* Options Display - Compact Inline */}
                        <div className="flex flex-wrap items-center gap-2">
                          {/* MCQ Options */}
                          {question.question_type === 'mcq' && question.options && Array.isArray(question.options) && question.options.length > 0 && (
                            <>
                              {(question.options as string[]).map((option, idx) => (
                                <div 
                                  key={idx}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${
                                    option === question.correct_answer 
                                      ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-950 dark:border-green-700 dark:text-green-400' 
                                      : 'bg-muted/50 border-border'
                                  }`}
                                >
                                  <span className="font-medium">{String.fromCharCode(65 + idx)}</span>
                                  <span 
                                    className="question-content max-w-[150px] truncate"
                                    dangerouslySetInnerHTML={{ __html: option }}
                                  />
                                  {option === question.correct_answer && <span>✓</span>}
                                </div>
                              ))}
                            </>
                          )}

                          {/* True/False Options */}
                          {question.question_type === 'true_false' && (
                            <>
                              {['True', 'False'].map((option) => (
                                <div 
                                  key={option}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${
                                    option === question.correct_answer 
                                      ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-950 dark:border-green-700 dark:text-green-400' 
                                      : 'bg-muted/50 border-border'
                                  }`}
                                >
                                  <span>{option}</span>
                                  {option === question.correct_answer && <span>✓</span>}
                                </div>
                              ))}
                            </>
                          )}

                          {/* Multiple Response - Show Answer Option */}
                          {question.question_type === 'multiple_response' && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border bg-green-50 border-green-300 text-green-700 dark:bg-green-950 dark:border-green-700 dark:text-green-400">
                              <span className="font-medium">Answer:</span>
                              <span>{normalizeAnswerOption(question.correct_answer)}</span>
                              <span>✓</span>
                            </div>
                          )}

                          {/* Short Answer */}
                          {question.question_type === 'short_answer' && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border bg-green-50 border-green-300 text-green-700 dark:bg-green-950 dark:border-green-700 dark:text-green-400">
                              <span className="font-medium">Answer:</span>
                              <span className="max-w-[200px] truncate">{question.correct_answer}</span>
                              <span>✓</span>
                            </div>
                          )}

                          {/* Match Following */}
                          {question.question_type === 'match_following' && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950 dark:border-blue-700 dark:text-blue-400">
                              <span className="font-medium">{question.options && Array.isArray(question.options) ? question.options.length : 0} pairs</span>
                            </div>
                          )}
                        </div>

                        {/* Metadata Tags */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <Badge variant="secondary" className="text-xs">
                            {question.bank_name || 'Question Bank'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {subjects.find((s) => s.id === question.subject_id)?.subject_name || '-'}
                          </Badge>
                          {question.lesson_id && (
                            <Badge variant="outline" className="text-xs">
                              {lessons.find((l) => l.id === question.lesson_id)?.lesson_name || '-'}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Right Section: Metadata & Actions */}
                      <div className="flex flex-col items-end gap-3 shrink-0">
                        {/* Type & Difficulty Badges */}
                        <div className="flex flex-col items-end gap-1.5">
                          <Badge variant="outline" className="text-xs">
                            {question.question_type === 'mcq' && 'MCQ'}
                            {question.question_type === 'multiple_response' && 'MCQ-M'}
                            {question.question_type === 'true_false' && 'T/F'}
                            {question.question_type === 'short_answer' && 'Short'}
                            {question.question_type === 'match_following' && 'Match'}
                          </Badge>
                          <Badge className={`${getDifficultyColor(question.difficulty)} text-xs`}>
                            {question.difficulty === 'easy' && 'Easy'}
                            {question.difficulty === 'medium' && 'Medium'}
                            {question.difficulty === 'hard' && 'Hard'}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {question.marks}m
                          </Badge>
                          {question.negative_marks > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              -{question.negative_marks}m
                            </Badge>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(question)}
                            className="h-8 w-8 p-0"
                          >
                            <Pencil className="w-3.5 h-3.5 text-primary" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(question.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Upload Dialog */}
      <BulkUploadDialog
        open={bulkUploadDialogOpen}
        onOpenChange={setBulkUploadDialogOpen}
        subjects={subjects}
        classes={classes}
        lessons={lessons}
        onUploadComplete={loadData}
      />
    </div>
  );
}
