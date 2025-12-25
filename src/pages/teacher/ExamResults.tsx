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

      const studentsData = await examAttemptApi.getAllStudentsForExam(examId);
      setStudents(studentsData);
    } catch (error: any) {
      toast({
        title: 'பிழை',
        description: error.message || 'தேர்வு முடிவுகளை ஏற்ற முடியவில்லை',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
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
          <p className="text-muted-foreground">முடிவுகள் ஏற்றப்படுகின்றன...</p>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">தேர்வு கிடைக்கவில்லை</p>
          <Button onClick={() => navigate('/teacher/exams')} className="mt-4">
            தேர்வுகளுக்குத் திரும்பு
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
            <CardTitle className="text-sm font-medium">மொத்த மாணவர்கள்</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {stats.submitted} சமர்ப்பித்தனர் • {stats.attendanceRate}% வருகை
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">சராசரி மதிப்பெண்</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.evaluated} மதிப்பீடு செய்யப்பட்டது
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">தேர்ச்சி</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats.passed}</div>
            <p className="text-xs text-muted-foreground">
              {stats.evaluated > 0 ? ((stats.passed / stats.evaluated) * 100).toFixed(1) : 0}% தேர்ச்சி விகிதம்
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">தோல்வி</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.failed}</div>
            <p className="text-xs text-muted-foreground">
              {stats.evaluated > 0 ? ((stats.failed / stats.evaluated) * 100).toFixed(1) : 0}% தோல்வி விகிதம்
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>மாணவர் முடிவுகள்</CardTitle>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              இந்த தேர்வுக்கு மாணவர்கள் ஒதுக்கப்படவில்லை
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">மாணவர்</th>
                    <th className="text-left py-3 px-4">பிரிவு</th>
                    <th className="text-left py-3 px-4">நிலை</th>
                    <th className="text-left py-3 px-4">தொடங்கிய நேரம்</th>
                    <th className="text-left py-3 px-4">சமர்ப்பித்த நேரம்</th>
                    <th className="text-right py-3 px-4">பெற்ற மதிப்பெண்கள்</th>
                    <th className="text-right py-3 px-4">சதவீதம்</th>
                    <th className="text-center py-3 px-4">முடிவு</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.student_id} className="border-b">
                      <td className="py-3 px-4">
                        {student.student_name}
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
                          {student.status === 'not_started' && 'முயற்சிக்கவில்லை'}
                          {student.status === 'in_progress' && 'நடைபெறுகிறது'}
                          {student.status === 'submitted' && 'சமர்ப்பிக்கப்பட்டது'}
                          {student.status === 'evaluated' && 'மதிப்பீடு செய்யப்பட்டது'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {student.started_at 
                          ? new Date(student.started_at).toLocaleString('ta-IN', {
                              dateStyle: 'short',
                              timeStyle: 'short'
                            })
                          : '-'}
                      </td>
                      <td className="py-3 px-4">
                        {student.submitted_at 
                          ? new Date(student.submitted_at).toLocaleString('ta-IN', {
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
                          <Badge variant="default" className="bg-secondary">தேர்ச்சி</Badge>
                        )}
                        {student.result === 'fail' && (
                          <Badge variant="destructive">தோல்வி</Badge>
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
