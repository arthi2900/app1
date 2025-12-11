import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Award, BookOpen, Calendar } from 'lucide-react';
import { examApi, examScheduleApi } from '@/db/api';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Exam, ExamSchedule } from '@/types/types';

export default function StudentExams() {
  const { t } = useLanguage();
  const [exams, setExams] = useState<Exam[]>([]);
  const [schedules, setSchedules] = useState<ExamSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const examsData = await examApi.getAllExams();
      setExams(examsData);
      
      const schedulesData = await Promise.all(
        examsData.map(exam => examScheduleApi.getExamSchedule(exam.id))
      );
      setSchedules(schedulesData.filter((s): s is ExamSchedule => s !== null));
    } catch (error) {
      console.error('Error loading exams:', error);
    } finally {
      setLoading(false);
    }
  };

  const getExamStatus = (examId: string) => {
    const schedule = schedules.find((s) => s.exam_id === examId);
    if (!schedule) return 'upcoming';

    const now = new Date();
    const start = new Date(schedule.start_time);
    const end = new Date(schedule.end_time);

    if (now < start) return 'upcoming';
    if (now > end) return 'completed';
    return 'ongoing';
  };

  const isExamAvailable = (examId: string) => {
    return getExamStatus(examId) === 'ongoing';
  };

  const handleStartExam = (examId: string) => {
    navigate(`/student/exam/${examId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="secondary">{t('exams.status.upcoming')}</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-500">{t('exams.status.ongoing')}</Badge>;
      case 'completed':
        return <Badge variant="outline">{t('exams.status.completed')}</Badge>;
      default:
        return null;
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
      <div>
        <h1 className="text-3xl font-bold">{t('exams.title')}</h1>
        <p className="text-muted-foreground mt-2">{t('exams.subtitle')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {exams.map((exam) => {
          const status = getExamStatus(exam.id);
          const available = isExamAvailable(exam.id);
          const schedule = schedules.find((s) => s.exam_id === exam.id);

          return (
            <Card key={exam.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{exam.title}</CardTitle>
                  {getStatusBadge(status)}
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{t('exams.duration')}: {exam.duration_minutes} {t('exams.minutes')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="w-4 h-4" />
                    <span>{t('exams.totalMarks')}: {exam.total_marks}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>{t('exams.passMarks')}: {exam.pass_marks}</span>
                  </div>
                  {schedule && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(schedule.start_time).toLocaleDateString('en-US', {
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
                  {available ? t('exams.startExam') : t('exams.notAvailable')}
                </Button>
              </CardContent>
            </Card>
          );
        })}

        {exams.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">{t('exams.noExams')}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {t('exams.noExamsText')}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
