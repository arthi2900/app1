import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { examApi, examScheduleApi, examAttemptApi } from '@/db/api';
import type { ExamWithDetails, ExamSchedule } from '@/types/types';
import { useToast } from '@/hooks/use-toast';
import { Clock, BookOpen, Award, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StudentExams() {
  const [exams, setExams] = useState<ExamWithDetails[]>([]);
  const [schedules, setSchedules] = useState<Record<string, ExamSchedule>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const examsData = await examApi.getPublishedExams();
      setExams(examsData);

      const schedulesData: Record<string, ExamSchedule> = {};
      for (const exam of examsData) {
        const schedule = await examScheduleApi.getExamSchedule(exam.id);
        if (schedule) {
          schedulesData[exam.id] = schedule;
        }
      }
      setSchedules(schedulesData);
    } catch (error) {
      console.error('Error loading exams:', error);
      toast({
        title: 'பிழை',
        description: 'தேர்வுகளை ஏற்ற முடியவில்லை',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = async (examId: string) => {
    try {
      const attempt = await examAttemptApi.startAttempt(examId);
      if (attempt) {
        toast({
          title: 'வெற்றி',
          description: 'தேர்வு தொடங்கப்பட்டது',
        });
        // Navigate to exam taking page (to be implemented)
        // navigate(`/student/take-exam/${attempt.id}`);
      }
    } catch (error: any) {
      console.error('Error starting exam:', error);
      toast({
        title: 'பிழை',
        description: error.message || 'தேர்வை தொடங்க முடியவில்லை',
        variant: 'destructive',
      });
    }
  };

  const isExamAvailable = (examId: string) => {
    const schedule = schedules[examId];
    if (!schedule) return false;

    const now = new Date();
    const startTime = new Date(schedule.start_time);
    const endTime = new Date(schedule.end_time);

    return now >= startTime && now <= endTime;
  };

  const getExamStatus = (examId: string) => {
    const schedule = schedules[examId];
    if (!schedule) return 'திட்டமிடப்படவில்லை';

    const now = new Date();
    const startTime = new Date(schedule.start_time);
    const endTime = new Date(schedule.end_time);

    if (now < startTime) return 'விரைவில்';
    if (now > endTime) return 'முடிந்தது';
    return 'நடப்பில்';
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
      <div>
        <h1 className="text-3xl font-bold">கிடைக்கும் தேர்வுகள்</h1>
        <p className="text-muted-foreground mt-2">
          தேர்வுகளை எழுதவும் மற்றும் முடிவுகளை பார்க்கவும்
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {exams.map((exam) => {
          const schedule = schedules[exam.id];
          const status = getExamStatus(exam.id);
          const available = isExamAvailable(exam.id);

          return (
            <Card key={exam.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{exam.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {exam.subject?.name || 'பாடம் இல்லை'}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      status === 'நடப்பில்'
                        ? 'default'
                        : status === 'விரைவில்'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>காலம்: {exam.duration_minutes} நிமிடங்கள்</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="w-4 h-4" />
                    <span>மொத்த மதிப்பெண்கள்: {exam.total_marks}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>தேர்ச்சி மதிப்பெண்கள்: {exam.pass_marks}</span>
                  </div>
                  {schedule && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(schedule.start_time).toLocaleDateString('ta-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {exam.instructions && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {exam.instructions}
                    </p>
                  </div>
                )}

                <Button
                  className="w-full"
                  disabled={!available}
                  onClick={() => handleStartExam(exam.id)}
                >
                  {available ? 'தேர்வை தொடங்கு' : 'கிடைக்கவில்லை'}
                </Button>
              </CardContent>
            </Card>
          );
        })}

        {exams.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">தேர்வுகள் இல்லை</p>
              <p className="text-sm text-muted-foreground mt-1">
                தற்போது கிடைக்கும் தேர்வுகள் இல்லை
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
