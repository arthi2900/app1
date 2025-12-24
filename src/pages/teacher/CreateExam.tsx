import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { examApi, academicApi, profileApi } from '@/db/api';
import { ArrowLeft, Calendar, Clock, FileText } from 'lucide-react';
import type { QuestionPaper, Class, Subject, ExamStatus } from '@/types/types';

export default function CreateExam() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teacherId, setTeacherId] = useState<string>('');

  const [formData, setFormData] = useState({
    title: '',
    examType: 'practice' as 'practice' | 'school',
    questionPaperId: '',
    classId: '',
    subjectId: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    durationMinutes: 60,
    passingMarks: 40,
    instructions: '',
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const profile = await profileApi.getCurrentProfile();
      if (!profile) throw new Error('Profile not found');
      setTeacherId(profile.id);

      const papers = await academicApi.getQuestionPapers();
      const finalPapers = papers.filter(p => p.status === 'final');
      setQuestionPapers(finalPapers);

      const assignments = await academicApi.getTeacherAssignments(profile.id, '2024-2025');
      const uniqueClasses = Array.from(
        new Map(assignments.map(a => [a.class_id, a.class])).values()
      ).filter(Boolean) as Class[];
      setClasses(uniqueClasses);

      const uniqueSubjects = Array.from(
        new Map(assignments.map(a => [a.subject_id, a.subject])).values()
      ).filter(Boolean) as Subject[];
      setSubjects(uniqueSubjects);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load data',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.questionPaperId) {
        throw new Error('Please select a question paper');
      }

      const selectedPaper = questionPapers.find(p => p.id === formData.questionPaperId);
      if (!selectedPaper) throw new Error('Question paper not found');

      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      if (endDateTime <= startDateTime) {
        throw new Error('End time must be after start time');
      }

      const examData = {
        question_paper_id: formData.questionPaperId,
        title: formData.title,
        class_id: formData.classId,
        subject_id: formData.subjectId,
        teacher_id: teacherId,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        duration_minutes: formData.durationMinutes,
        total_marks: selectedPaper.total_marks,
        passing_marks: formData.passingMarks,
        instructions: formData.instructions || null,
        status: (formData.examType === 'practice' ? 'published' : 'pending_approval') as ExamStatus,
        approved_by: null,
        approved_at: null,
      };

      await examApi.createExam(examData);

      toast({
        title: 'Success',
        description: formData.examType === 'practice' 
          ? 'Practice exam created and published successfully'
          : 'School exam created and sent for approval',
      });

      navigate('/teacher/exams');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create exam',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/teacher')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Exam</h1>
          <p className="text-muted-foreground mt-1">
            Create a new practice or school-level exam
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Exam Type</Label>
              <RadioGroup
                value={formData.examType}
                onValueChange={(value: 'practice' | 'school') =>
                  setFormData({ ...formData, examType: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="practice" id="practice" />
                  <Label htmlFor="practice" className="font-normal cursor-pointer">
                    Practice Exam (No approval required)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="school" id="school" />
                  <Label htmlFor="school" className="font-normal cursor-pointer">
                    School-Level Exam (Requires Principal approval)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Exam Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Mathematics Mid-Term Exam"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="class">Class *</Label>
                <Select
                  value={formData.classId}
                  onValueChange={(value) => setFormData({ ...formData, classId: value })}
                  required
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
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  value={formData.subjectId}
                  onValueChange={(value) => setFormData({ ...formData, subjectId: value })}
                  required
                >
                  <SelectTrigger>
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

            <div className="space-y-2">
              <Label htmlFor="questionPaper">Question Paper *</Label>
              <Select
                value={formData.questionPaperId}
                onValueChange={(value) => {
                  const paper = questionPapers.find(p => p.id === value);
                  setFormData({ 
                    ...formData, 
                    questionPaperId: value,
                    classId: paper?.class_id || formData.classId,
                    subjectId: paper?.subject_id || formData.subjectId,
                  });
                }}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select question paper" />
                </SelectTrigger>
                <SelectContent>
                  {questionPapers.map((paper) => (
                    <SelectItem key={paper.id} value={paper.id}>
                      {paper.title} ({paper.total_marks} marks)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes) *</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={formData.durationMinutes}
                  onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passingMarks">Passing Marks *</Label>
                <Input
                  id="passingMarks"
                  type="number"
                  min="0"
                  value={formData.passingMarks}
                  onChange={(e) => setFormData({ ...formData, passingMarks: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Enter exam instructions for students..."
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Exam'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/teacher')}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
