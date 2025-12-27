import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { examApi, examAttemptApi } from '@/db/api';
import { ArrowLeft, Users, TrendingUp, Award, CheckCircle2, XCircle } from 'lucide-react';
import type { ExamWithDetails, StudentExamAllocation } from '@/types/types';

export default function ExamResults() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exam, setExam] = useState<ExamWithDetails | null>(null);
  const [students, setStudents] = useState<StudentExamAllocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (examId) {
      loadExamResults();
    }
  }, [examId]);

  const handleBulkEvaluation = async () => {
    if (!students) return;
    
    const submittedAttempts = students
      .filter(s => s.attempt_id && s.status === 'submitted')
      .map(s => s.attempt_id!);
    
    if (submittedAttempts.length === 0) {
      toast({
        title: 'தகவல்',
        description: 'மதிப்பீடு செய்ய சமர்ப்பிக்கப்பட்ட தேர்வுகள் இல்லை',
      });
      return;
    }
    
    setProcessing(true);
    let successCount = 0;
    let failCount = 0;
    
    try {
      for (const attemptId of submittedAttempts) {
        try {
          await examAttemptApi.processSubmission(attemptId);
          successCount++;
        } catch (error) {
          console.error(`Failed to process attempt ${attemptId}:`, error);
          failCount++;
        }
      }
      
      toast({
        title: 'வெற்றி',
        description: `${successCount} தேர்வுகள் மதிப்பீடு செய்யப்பட்டன${failCount > 0 ? `, ${failCount} தோல்வி` : ''}`,
      });
      
      // Reload results
      await loadExamResults();
    } catch (error: any) {
      toast({
        title: 'பிழை',
        description: error.message || 'மதிப்பீடு செயலாக்கத்தில் பிழை',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const loadExamResults = async () => {
    try {
      if (!examId) return;

      const examData = await examApi.getExamById(examId);
      setExam(examData);

      const studentsData = await examAttemptApi.getAllStudentsForExam(examId);
      setStudents(studentsData);
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
    if (!students || students.length === 0) {
      return {
        totalStudents: 0,
        submitted: 0,
        evaluated: 0,
        passed: 0,
        failed: 0,
        avgPercentage: '0.00',
        attendanceRate: '0',
      };
    }

    const submitted = students.filter(s => s.status === 'submitted' || s.status === 'evaluated');
    const evaluated = students.filter(s => s.status === 'evaluated');
    const passed = evaluated.filter(s => s.result === 'pass');
    const avgPercentage = evaluated.length > 0
      ? evaluated.reduce((sum, s) => sum + s.percentage, 0) / evaluated.length
      : 0;

    return {
      totalStudents: students.length,
      submitted: submitted.length,
      evaluated: evaluated.length,
      passed: passed.length,
      failed: evaluated.length - passed.length,
      avgPercentage: avgPercentage.toFixed(2),
      attendanceRate: students.length > 0 
        ? ((submitted.length / students.length) * 100).toFixed(1)
        : '0',
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
      <div className="flex items-center justify-between gap-4">
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
        {stats.submitted > stats.evaluated && (
          <Button 
            onClick={handleBulkEvaluation}
            disabled={processing}
          >
            {processing ? 'செயலாக்கப்படுகிறது...' : 'அனைத்தையும் மதிப்பீடு செய்'}
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="rounded-3xl"
          style={{ background: 'linear-gradient(135deg, #608ce6 0%, #06B6D4 100%)' }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Students</CardTitle>
            <Users className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalStudents}</div>
            <p className="text-xs text-white/80">
              {stats.submitted} submitted • {stats.attendanceRate}% attendance
            </p>
          </CardContent>
        </Card>

        <Card 
          className="rounded-3xl"
          style={{ background: 'linear-gradient(135deg, #608ce6 0%, #06B6D4 100%)' }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.avgPercentage}%</div>
            <p className="text-xs text-white/80">
              {stats.evaluated} evaluated
            </p>
          </CardContent>
        </Card>

        <Card 
          className="rounded-3xl"
          style={{ background: 'linear-gradient(135deg, #608ce6 0%, #06B6D4 100%)' }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Passed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.passed}</div>
            <p className="text-xs text-white/80">
              {stats.evaluated > 0 ? ((stats.passed / stats.evaluated) * 100).toFixed(1) : 0}% pass rate
            </p>
          </CardContent>
        </Card>

        <Card 
          className="rounded-3xl"
          style={{ background: 'linear-gradient(135deg, #608ce6 0%, #06B6D4 100%)' }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.failed}</div>
            <p className="text-xs text-white/80">
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
          {students.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No students allocated to this exam
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Student</th>
                    <th className="text-left py-3 px-4">Section</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Started At</th>
                    <th className="text-left py-3 px-4">Submitted At</th>
                    <th className="text-right py-3 px-4">Marks Obtained</th>
                    <th className="text-right py-3 px-4">Percentage</th>
                    <th className="text-center py-3 px-4">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.student_id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">
                        <button
                          onClick={() => navigate(`/teacher/exams/${examId}/students/${student.student_id}`)}
                          className="text-primary hover:underline font-medium text-left"
                        >
                          {student.student_name}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        {student.section_name}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={
                          student.status === 'evaluated' ? 'default' :
                          student.status === 'submitted' ? 'secondary' :
                          student.status === 'in_progress' ? 'outline' :
                          'secondary'
                        } className={
                          student.status === 'not_started' ? 'bg-muted text-muted-foreground' : ''
                        }>
                          {student.status === 'not_started' && 'Not Attempted'}
                          {student.status === 'in_progress' && 'In Progress'}
                          {student.status === 'submitted' && 'Submitted'}
                          {student.status === 'evaluated' && 'Evaluated'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {student.started_at 
                          ? new Date(student.started_at).toLocaleString('en-US', {
                              dateStyle: 'short',
                              timeStyle: 'short'
                            })
                          : '-'}
                      </td>
                      <td className="py-3 px-4">
                        {student.submitted_at 
                          ? new Date(student.submitted_at).toLocaleString('en-US', {
                              dateStyle: 'short',
                              timeStyle: 'short'
                            })
                          : '-'}
                      </td>
                      <td className="text-right py-3 px-4">
                        {student.status === 'evaluated' || student.status === 'submitted'
                          ? `${student.total_marks_obtained} / ${exam.total_marks}`
                          : '-'}
                      </td>
                      <td className="text-right py-3 px-4">
                        {student.status === 'evaluated' || student.status === 'submitted'
                          ? `${student.percentage.toFixed(2)}%`
                          : '-'}
                      </td>
                      <td className="text-center py-3 px-4">
                        {student.result === 'pass' && (
                          <Badge variant="default" className="bg-secondary">Pass</Badge>
                        )}
                        {student.result === 'fail' && (
                          <Badge variant="destructive">Fail</Badge>
                        )}
                        {!student.result && '-'}
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
