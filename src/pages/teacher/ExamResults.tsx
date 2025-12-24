import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { examApi, examAttemptApi } from '@/db/api';
import { ArrowLeft, Users, TrendingUp, Award, CheckCircle2, XCircle } from 'lucide-react';
import type { ExamWithDetails, ExamAttemptWithDetails } from '@/types/types';

export default function ExamResults() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exam, setExam] = useState<ExamWithDetails | null>(null);
  const [attempts, setAttempts] = useState<ExamAttemptWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (examId) {
      loadExamResults();
    }
  }, [examId]);

  const loadExamResults = async () => {
    try {
      if (!examId) return;

      const examData = await examApi.getExamById(examId);
      setExam(examData);

      const attemptsData = await examAttemptApi.getAttemptsByExam(examId);
      setAttempts(attemptsData);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load exam results',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const submitted = attempts.filter(a => a.status === 'submitted' || a.status === 'evaluated');
    const evaluated = attempts.filter(a => a.status === 'evaluated');
    const passed = evaluated.filter(a => a.result === 'pass');
    const avgPercentage = evaluated.length > 0
      ? evaluated.reduce((sum, a) => sum + a.percentage, 0) / evaluated.length
      : 0;

    return {
      totalStudents: attempts.length,
      submitted: submitted.length,
      evaluated: evaluated.length,
      passed: passed.length,
      failed: evaluated.length - passed.length,
      avgPercentage: avgPercentage.toFixed(2),
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Exam not found</p>
          <Button onClick={() => navigate('/teacher/exams')} className="mt-4">
            Back to Exams
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/teacher/exams')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{exam.title}</h1>
          <p className="text-muted-foreground mt-1">
            {exam.class?.class_name} • {exam.subject?.subject_name}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {stats.submitted} submitted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.evaluated} evaluated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats.passed}</div>
            <p className="text-xs text-muted-foreground">
              {stats.evaluated > 0 ? ((stats.passed / stats.evaluated) * 100).toFixed(1) : 0}% pass rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.failed}</div>
            <p className="text-xs text-muted-foreground">
              {stats.evaluated > 0 ? ((stats.failed / stats.evaluated) * 100).toFixed(1) : 0}% fail rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Results</CardTitle>
        </CardHeader>
        <CardContent>
          {attempts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No students have attempted this exam yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Student</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Marks Obtained</th>
                    <th className="text-right py-3 px-4">Percentage</th>
                    <th className="text-center py-3 px-4">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((attempt) => (
                    <tr key={attempt.id} className="border-b">
                      <td className="py-3 px-4">
                        {attempt.student?.full_name || attempt.student?.username || 'Unknown'}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={
                          attempt.status === 'evaluated' ? 'default' :
                          attempt.status === 'submitted' ? 'secondary' :
                          attempt.status === 'in_progress' ? 'outline' :
                          'secondary'
                        }>
                          {attempt.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="text-right py-3 px-4">
                        {attempt.status === 'evaluated' || attempt.status === 'submitted'
                          ? `${attempt.total_marks_obtained} / ${exam.total_marks}`
                          : '-'}
                      </td>
                      <td className="text-right py-3 px-4">
                        {attempt.status === 'evaluated' || attempt.status === 'submitted'
                          ? `${attempt.percentage.toFixed(2)}%`
                          : '-'}
                      </td>
                      <td className="text-center py-3 px-4">
                        {attempt.result === 'pass' && (
                          <Badge variant="default" className="bg-secondary">Pass</Badge>
                        )}
                        {attempt.result === 'fail' && (
                          <Badge variant="destructive">Fail</Badge>
                        )}
                        {!attempt.result && '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
