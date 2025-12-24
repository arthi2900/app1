import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { examApi, profileApi, examAttemptApi } from '@/db/api';
import { ArrowLeft, Plus, Calendar, Clock, Users, FileText, Trash2 } from 'lucide-react';
import type { ExamWithDetails } from '@/types/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function ManageExams() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exams, setExams] = useState<ExamWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState<ExamWithDetails | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [checkingAttempts, setCheckingAttempts] = useState(false);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const profile = await profileApi.getCurrentProfile();
      if (!profile) throw new Error('Profile not found');

      const data = await examApi.getExamsByTeacher(profile.id);
      setExams(data);
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

  const handleDeleteClick = async (exam: ExamWithDetails) => {
    setCheckingAttempts(true);
    setExamToDelete(exam);
    
    try {
      // Check if any students have attempted this exam
      const attempts = await examAttemptApi.getAttemptsByExam(exam.id);
      const validAttempts = Array.isArray(attempts) ? attempts : [];
      setAttemptCount(validAttempts.length);
      
      if (validAttempts.length > 0) {
        // Show error toast if students have attempted
        toast({
          title: 'தேர்வை நீக்க முடியாது',
          description: `${validAttempts.length} மாணவர்கள் ஏற்கனவே இந்த தேர்வை எழுதியுள்ளனர்.`,
          variant: 'destructive',
        });
        setExamToDelete(null);
      } else {
        // Open confirmation dialog if no attempts
        setDeleteDialogOpen(true);
      }
    } catch (error: any) {
      toast({
        title: 'பிழை',
        description: error.message || 'தேர்வு முயற்சிகளை சரிபார்க்க முடியவில்லை',
        variant: 'destructive',
      });
      setExamToDelete(null);
    } finally {
      setCheckingAttempts(false);
    }
  };

  const handleDelete = async () => {
    if (!examToDelete) return;

    try {
      await examApi.deleteExam(examToDelete.id);
      toast({
        title: 'வெற்றி',
        description: 'தேர்வு வெற்றிகரமாக நீக்கப்பட்டது',
      });
      loadExams();
    } catch (error: any) {
      toast({
        title: 'பிழை',
        description: error.message || 'தேர்வை நீக்க முடியவில்லை',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setExamToDelete(null);
      setAttemptCount(0);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string }> = {
      draft: { variant: 'secondary', label: 'வரைவு' },
      pending_approval: { variant: 'outline', label: 'ஒப்புதல் நிலுவையில்' },
      approved: { variant: 'default', label: 'ஒப்புதல் அளிக்கப்பட்டது' },
      published: { variant: 'default', label: 'வெளியிடப்பட்டது' },
      completed: { variant: 'secondary', label: 'முடிந்தது' },
    };
    const config = variants[status] || { variant: 'secondary', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">தேர்வுகளை ஏற்றுகிறது...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/teacher')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">தேர்வுகளை நிர்வகி</h1>
            <p className="text-muted-foreground mt-1">
              உங்கள் அனைத்து தேர்வுகளையும் பார்க்கவும் நிர்வகிக்கவும்
            </p>
          </div>
        </div>
        <Button onClick={() => navigate('/teacher/exams/create')}>
          <Plus className="h-4 w-4 mr-2" />
          தேர்வை உருவாக்கு
        </Button>
      </div>

      {exams.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">தேர்வுகள் இல்லை</h3>
            <p className="text-muted-foreground text-center mb-4">
              நீங்கள் இன்னும் எந்த தேர்வையும் உருவாக்கவில்லை. தொடங்க உங்கள் முதல் தேர்வை உருவாக்கவும்.
            </p>
            <Button onClick={() => navigate('/teacher/exams/create')}>
              <Plus className="h-4 w-4 mr-2" />
              தேர்வை உருவாக்கு
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {exams.map((exam) => (
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
                  {getStatusBadge(exam.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">தொடக்கம்</p>
                      <p className="font-medium">{formatDateTime(exam.start_time)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">முடிவு</p>
                      <p className="font-medium">{formatDateTime(exam.end_time)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">காலம்</p>
                      <p className="font-medium">{exam.duration_minutes} நிமிடங்கள்</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">மொத்த மதிப்பெண்கள்</p>
                      <p className="font-medium">{exam.total_marks}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/teacher/exams/${exam.id}/results`)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    முடிவுகளைப் பார்க்கவும்
                  </Button>
                  {exam.status !== 'completed' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(exam)}
                      disabled={checkingAttempts}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {checkingAttempts ? 'சரிபார்க்கிறது...' : 'நீக்கு'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>⚠️ தேர்வை நீக்கு?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <p>
                  நீங்கள் நிச்சயமாக '{examToDelete?.title}' தேர்வை நீக்க விரும்புகிறீர்களா? இந்த செயலை மாற்ற முடியாது.
                </p>
                {examToDelete && (
                  <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                    <p className="font-semibold">தேர்வு விவரங்கள்:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• வகுப்பு: {examToDelete.class?.class_name}</li>
                      <li>• பாடம்: {examToDelete.subject?.subject_name}</li>
                      <li>• உருவாக்கப்பட்டது: {formatDateTime(examToDelete.created_at)}</li>
                      <li>• நிலை: {examToDelete.status}</li>
                      <li>• மாணவர் முயற்சிகள்: {attemptCount}</li>
                    </ul>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ரத்து செய்</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              தேர்வை நீக்கு
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
