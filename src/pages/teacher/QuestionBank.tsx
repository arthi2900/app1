import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { questionApi, subjectApi } from '@/db/api';
import type { QuestionWithSubject, Subject, QuestionType, DifficultyLevel } from '@/types/types';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function QuestionBank() {
  const [questions, setQuestions] = useState<QuestionWithSubject[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject_id: '',
    question_text: '',
    question_type: 'mcq' as QuestionType,
    options: ['', '', '', ''],
    correct_answer: '',
    marks: 1,
    difficulty: 'medium' as DifficultyLevel,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [questionsData, subjectsData] = await Promise.all([
        questionApi.getAllQuestions(),
        subjectApi.getAllSubjects(),
      ]);
      setQuestions(questionsData);
      setSubjects(subjectsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: 'பிழை',
        description: 'தரவை ஏற்ற முடியவில்லை',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject_id || !formData.question_text || !formData.correct_answer) {
      toast({
        title: 'பிழை',
        description: 'அனைத்து தேவையான புலங்களையும் நிரப்பவும்',
        variant: 'destructive',
      });
      return;
    }

    try {
      const questionData: any = {
        subject_id: formData.subject_id,
        question_text: formData.question_text,
        question_type: formData.question_type,
        correct_answer: formData.correct_answer,
        marks: formData.marks,
        difficulty: formData.difficulty,
        options: formData.question_type === 'mcq' ? formData.options.filter(o => o.trim()) : null,
      };

      await questionApi.createQuestion(questionData);
      toast({
        title: 'வெற்றி',
        description: 'வினா வெற்றிகரமாக சேர்க்கப்பட்டது',
      });
      setDialogOpen(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error creating question:', error);
      toast({
        title: 'பிழை',
        description: 'வினாவை சேர்க்க முடியவில்லை',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('இந்த வினாவை நீக்க விரும்புகிறீர்களா?')) return;

    try {
      await questionApi.deleteQuestion(id);
      toast({
        title: 'வெற்றி',
        description: 'வினா வெற்றிகரமாக நீக்கப்பட்டது',
      });
      loadData();
    } catch (error) {
      console.error('Error deleting question:', error);
      toast({
        title: 'பிழை',
        description: 'வினாவை நீக்க முடியவில்லை',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      subject_id: '',
      question_text: '',
      question_type: 'mcq',
      options: ['', '', '', ''],
      correct_answer: '',
      marks: 1,
      difficulty: 'medium',
    });
  };

  const getDifficultyBadge = (difficulty: DifficultyLevel) => {
    const variants: Record<DifficultyLevel, string> = {
      easy: 'bg-secondary text-secondary-foreground',
      medium: 'bg-primary text-primary-foreground',
      hard: 'bg-destructive text-destructive-foreground',
    };
    const labels: Record<DifficultyLevel, string> = {
      easy: 'எளிது',
      medium: 'நடுத்தரம்',
      hard: 'கடினம்',
    };
    return <Badge className={variants[difficulty]}>{labels[difficulty]}</Badge>;
  };

  const getQuestionTypeLabel = (type: QuestionType) => {
    const labels: Record<QuestionType, string> = {
      mcq: 'பல தேர்வு',
      true_false: 'உண்மை/பொய்',
      short_answer: 'குறுகிய பதில்',
    };
    return labels[type];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">ஏற்றுகிறது...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Question Bank / வினாவங்கி</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage questions / வினாக்களை உருவாக்கவும் மற்றும் நிர்வகிக்கவும்
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Question / புதிய வினா
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Question / புதிய வினா சேர்க்கவும்</DialogTitle>
              <DialogDescription>
                Fill in the question details / வினாவின் விவரங்களை நிரப்பவும்
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject / பாடம் *</Label>
                <Select
                  value={formData.subject_id}
                  onValueChange={(value) => setFormData({ ...formData, subject_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject / பாடத்தை தேர்ந்தெடுக்கவும்" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="question_text">Question / வினா *</Label>
                <Textarea
                  id="question_text"
                  value={formData.question_text}
                  onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                  placeholder="Enter question / வினாவை உள்ளிடவும்"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="question_type">Question Type / வினா வகை *</Label>
                  <Select
                    value={formData.question_type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, question_type: value as QuestionType })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">MCQ / பல தேர்வு</SelectItem>
                      <SelectItem value="true_false">True/False / உண்மை/பொய்</SelectItem>
                      <SelectItem value="short_answer">Short Answer / குறுகிய பதில்</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty / சிரம நிலை *</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) =>
                      setFormData({ ...formData, difficulty: value as DifficultyLevel })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy / எளிது</SelectItem>
                      <SelectItem value="medium">Medium / நடுத்தரம்</SelectItem>
                      <SelectItem value="hard">Hard / கடினம்</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.question_type === 'mcq' && (
                <div className="space-y-2">
                  <Label>Options / விருப்பங்கள்</Label>
                  {formData.options.map((option, index) => (
                    <Input
                      key={index}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...formData.options];
                        newOptions[index] = e.target.value;
                        setFormData({ ...formData, options: newOptions });
                      }}
                      placeholder={`Option / விருப்பம் ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="correct_answer">Correct Answer / சரியான பதில் *</Label>
                <Input
                  id="correct_answer"
                  value={formData.correct_answer}
                  onChange={(e) => setFormData({ ...formData, correct_answer: e.target.value })}
                  placeholder="Enter correct answer / சரியான பதிலை உள்ளிடவும்"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="marks">Marks / மதிப்பெண்கள் *</Label>
                <Input
                  id="marks"
                  type="number"
                  min="1"
                  value={formData.marks}
                  onChange={(e) => setFormData({ ...formData, marks: parseInt(e.target.value) })}
                  required
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel / ரத்து செய்
                </Button>
                <Button type="submit">Add / சேர்க்கவும்</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Questions / அனைத்து வினாக்கள் ({questions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question / வினா</TableHead>
                  <TableHead>Subject / பாடம்</TableHead>
                  <TableHead>Type / வகை</TableHead>
                  <TableHead>Difficulty / சிரமம்</TableHead>
                  <TableHead>Marks / மதிப்பெண்கள்</TableHead>
                  <TableHead>Actions / செயல்கள்</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="max-w-md">
                      <div className="line-clamp-2">{question.question_text}</div>
                    </TableCell>
                    <TableCell>{question.subject?.name || '-'}</TableCell>
                    <TableCell>{getQuestionTypeLabel(question.question_type)}</TableCell>
                    <TableCell>{getDifficultyBadge(question.difficulty)}</TableCell>
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
                {questions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No questions / வினாக்கள் இல்லை
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
