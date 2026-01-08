import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { examApi, profileApi, academicApi, examAttemptApi } from '@/db/api';
import { Calendar, Clock, FileText, PlayCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import type { ExamWithDetails, ExamAttempt } from '@/types/types';
import { hasExamStarted, hasExamEnded, formatISTDateTime } from '@/utils/timezone';

export default function StudentExams() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exams, setExams] = useState<ExamWithDetails[]>([]);
  const [attempts, setAttempts] = useState<Record<string, ExamAttempt>>({});
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
      // Use the new getExamsForStudent API to get both class-level and student-specific exams
      const data = await examApi.getExamsForStudent(profile.id, classId);
      
      const publishedExams = data.filter(exam => exam.status === 'published');
      setExams(publishedExams);

      // Fetch exam attempts for all published exams
      const attemptsMap: Record<string, ExamAttempt> = {};
      for (const exam of publishedExams) {
        try {
          const attempt = await examAttemptApi.getAttemptByStudent(exam.id, profile.id);
          if (attempt) {
            attemptsMap[exam.id] = attempt;
          }
        } catch (error) {
          // No attempt found for this exam, which is fine
          console.log(`No attempt found for exam ${exam.id}`);
        }
      }
      setAttempts(attemptsMap);
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

  const isExamAvailable = (exam: ExamWithDetails) => {
    return hasExamStarted(exam.start_time) && !hasExamEnded(exam.end_time);
  };

  const isExamUpcoming = (exam: ExamWithDetails) => {
    return !hasExamStarted(exam.start_time);
  };

  const isExamCompleted = (exam: ExamWithDetails) => {
    return hasExamEnded(exam.end_time);
  };

  const getExamStatus = (exam: ExamWithDetails) => {
    const attempt = attempts[exam.id];
    
    // If student has submitted or is being evaluated, show that status
    if (attempt) {
      if (attempt.status === 'submitted' || attempt.status === 'evaluated') {
        return { label: 'Submitted', variant: 'secondary' as const };
      }
      if (attempt.status === 'in_progress') {
        return { label: 'In Progress', variant: 'default' as const };
      }
    }
    
    // Check if exam time has ended
    if (isExamCompleted(exam)) {
      // If no attempt exists, student missed the exam
      if (!attempt) {
        return { label: 'Missed', variant: 'destructive' as const };
      }
      // If attempt exists but not submitted, time expired
      return { label: 'Time Expired', variant: 'secondary' as const };
    }
    
    // Check if exam is currently available
    if (isExamAvailable(exam)) {
      return { label: 'Available', variant: 'default' as const };
    }
    
    // Check if exam is upcoming
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
            const attempt = attempts[exam.id];
            const hasSubmitted = attempt && (attempt.status === 'submitted' || attempt.status === 'evaluated');
            const inProgress = attempt && attempt.status === 'in_progress';

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
                        <p className="font-medium">{formatISTDateTime(exam.start_time)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <p className="text-muted-foreground">End</p>
                        <p className="font-medium">{formatISTDateTime(exam.end_time)}</p>
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
                    {/* Show "View Result" if submitted */}
                    {hasSubmitted && (
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/student/exams/${exam.id}/result`)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        View Result
                      </Button>
                    )}
                    
                    {/* Show "Continue Exam" if in progress */}
                    {inProgress && available && (
                      <Button onClick={() => navigate(`/student/exams/${exam.id}/take`)}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue Exam
                      </Button>
                    )}
                    
                    {/* Show "Start Exam" if not started and available */}
                    {!attempt && available && (
                      <Button onClick={() => navigate(`/student/exams/${exam.id}/take`)}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Start Exam
                      </Button>
                    )}
                    
                    {/* Show "View Result" if exam completed and student has attempt */}
                    {completed && attempt && !hasSubmitted && (
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/student/exams/${exam.id}/result`)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        View Result
                      </Button>
                    )}
                    
                    {/* Show "Missed" message if exam completed and no attempt */}
                    {completed && !attempt && (
                      <Button disabled variant="destructive">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Exam Missed
                      </Button>
                    )}
                    
                    {/* Show disabled button if not available yet */}
                    {!available && !completed && !hasSubmitted && (
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
