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
import { questionApi, subjectApi } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Question, Subject } from '@/types/types';

export default function QuestionBank() {
  const { t } = useLanguage();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    question_text: '',
    subject_id: '',
    question_type: 'mcq' as 'mcq' | 'true_false' | 'short_answer',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    marks: 1,
    options: ['', '', '', ''],
    correct_answer: '',
  });

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
      toast({
        title: t('common.error'),
        description: t('message.dataLoadFailed'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question_text || !formData.subject_id || !formData.correct_answer) {
      toast({
        title: t('common.error'),
        description: t('message.allFieldsRequired'),
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
        title: t('common.success'),
        description: t('message.questionAddSuccess'),
      });

      setDialogOpen(false);
      resetForm();
      loadData();
    } catch (error: any) {
      toast({
        title: t('message.questionAddFailed'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('message.confirmDelete'))) return;

    try {
      await questionApi.deleteQuestion(id);
      toast({
        title: t('common.success'),
        description: t('message.questionDeleteSuccess'),
      });
      loadData();
    } catch (error: any) {
      toast({
        title: t('message.questionDeleteFailed'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      question_text: '',
      subject_id: '',
      question_type: 'mcq',
      difficulty: 'medium',
      marks: 1,
      options: ['', '', '', ''],
      correct_answer: '',
    });
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
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('questions.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('questions.subtitle')}</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {t('questions.newQuestion')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{t('questions.addQuestion')}</DialogTitle>
                <DialogDescription>{t('questions.fillDetails')}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="question">{t('questions.question')}</Label>
                  <Input
                    id="question"
                    value={formData.question_text}
                    onChange={(e) =>
                      setFormData({ ...formData, question_text: e.target.value })
                    }
                    placeholder={t('questions.enterQuestion')}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('questions.subject')}</Label>
                    <Select
                      value={formData.subject_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, subject_id: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('questions.selectSubject')} />
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
                    <Label htmlFor="type">{t('questions.type')}</Label>
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
                        <SelectItem value="mcq">{t('questionType.mcq')}</SelectItem>
                        <SelectItem value="true_false">{t('questionType.trueFalse')}</SelectItem>
                        <SelectItem value="short_answer">{t('questionType.shortAnswer')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">{t('questions.difficulty')}</Label>
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
                        <SelectItem value="easy">{t('difficulty.easy')}</SelectItem>
                        <SelectItem value="medium">{t('difficulty.medium')}</SelectItem>
                        <SelectItem value="hard">{t('difficulty.hard')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marks">{t('questions.marks')}</Label>
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

                {formData.question_type === 'mcq' && (
                  <div className="space-y-2">
                    <Label>{t('questions.options')}</Label>
                    {formData.options.map((option, index) => (
                      <Input
                        key={index}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...formData.options];
                          newOptions[index] = e.target.value;
                          setFormData({ ...formData, options: newOptions });
                        }}
                        placeholder={`${t('questions.option')} ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="answer">{t('questions.correctAnswer')}</Label>
                  <Input
                    id="answer"
                    value={formData.correct_answer}
                    onChange={(e) =>
                      setFormData({ ...formData, correct_answer: e.target.value })
                    }
                    placeholder={t('questions.enterAnswer')}
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
                  {t('common.cancel')}
                </Button>
                <Button type="submit">{t('common.add')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('questions.allQuestions')}</CardTitle>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileQuestion className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">{t('questions.noQuestions')}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('questions.question')}</TableHead>
                  <TableHead>{t('questions.subject')}</TableHead>
                  <TableHead>{t('questions.type')}</TableHead>
                  <TableHead>{t('questions.difficulty')}</TableHead>
                  <TableHead>{t('questions.marks')}</TableHead>
                  <TableHead>{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="max-w-md truncate">
                      {question.question_text}
                    </TableCell>
                    <TableCell>
                      {subjects.find((s) => s.id === question.subject_id)?.name || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {question.question_type === 'mcq' && t('questionType.mcq')}
                        {question.question_type === 'true_false' && t('questionType.trueFalse')}
                        {question.question_type === 'short_answer' && t('questionType.shortAnswer')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty === 'easy' && t('difficulty.easy')}
                        {question.difficulty === 'medium' && t('difficulty.medium')}
                        {question.difficulty === 'hard' && t('difficulty.hard')}
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
