import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { examApi, profileApi, academicApi } from '@/db/api';
import { Calendar, Clock, FileText, PlayCircle, CheckCircle2 } from 'lucide-react';
import type { ExamWithDetails } from '@/types/types';

export default function StudentExams() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exams, setExams] = useState<ExamWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const profile = await profileApi.getCurrentProfile();
      if (!profile || !profile.school_id) {
        throw new Error('Profile information not found');
      }

      const studentMapping = await academicApi.getStudentClassSection(profile.id, '2024-2025');
      if (!studentMapping) {
        setExams([]);
        setLoading(false);
        return;
      }

      const classId = studentMapping.class_id;
      const data = await examApi.getExamsByClass(classId);
      
      const publishedExams = data.filter(exam => exam.status === 'published');
      setExams(publishedExams);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load exams',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isExamAvailable = (exam: ExamWithDetails) => {
    const now = new Date();
    const start = new Date(exam.start_time);
    const end = new Date(exam.end_time);
    return now >= start && now <= end;
  };

  const isExamUpcoming = (exam: ExamWithDetails) => {
    const now = new Date();
    const start = new Date(exam.start_time);
    return now < start;
  };

  const isExamCompleted = (exam: ExamWithDetails) => {
    const now = new Date();
    const end = new Date(exam.end_time);
    return now > end;
  };

  const getExamStatus = (exam: ExamWithDetails) => {
    if (isExamCompleted(exam)) {
      return { label: 'Completed', variant: 'secondary' as const };
    }
    if (isExamAvailable(exam)) {
      return { label: 'Available', variant: 'default' as const };
    }
    if (isExamUpcoming(exam)) {
      return { label: 'Upcoming', variant: 'outline' as const };
    }
    return { label: 'Unknown', variant: 'secondary' as const };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading exams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Exams</h1>
        <p className="text-muted-foreground mt-1">
          View and take your assigned exams
        </p>
      </div>

      {exams.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No exams available</h3>
            <p className="text-muted-foreground text-center">
              You don't have any exams assigned yet. Check back later.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {exams.map((exam) => {
            const status = getExamStatus(exam);
            const available = isExamAvailable(exam);
            const completed = isExamCompleted(exam);

            return (
              <Card key={exam.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle>{exam.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{exam.class?.class_name}</span>
                        <span>•</span>
                        <span>{exam.subject?.subject_name}</span>
                      </div>
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <p className="text-muted-foreground">Start</p>
                        <p className="font-medium">{formatDateTime(exam.start_time)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <p className="text-muted-foreground">End</p>
                        <p className="font-medium">{formatDateTime(exam.end_time)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{exam.duration_minutes} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <p className="text-muted-foreground">Total Marks</p>
                        <p className="font-medium">{exam.total_marks}</p>
                      </div>
                    </div>
                  </div>

                  {exam.instructions && (
                    <div className="mb-4 p-3 bg-muted rounded-md">
                      <p className="text-sm font-medium mb-1">Instructions:</p>
                      <p className="text-sm text-muted-foreground">{exam.instructions}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {available && (
                      <Button onClick={() => navigate(`/student/exams/${exam.id}/take`)}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Start Exam
                      </Button>
                    )}
                    {completed && (
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/student/exams/${exam.id}/result`)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        View Result
                      </Button>
                    )}
                    {!available && !completed && (
                      <Button disabled>
                        Exam not yet available
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
