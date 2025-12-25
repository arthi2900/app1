import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { examApi, profileApi, examAttemptApi } from '@/db/api';
import { ArrowLeft, Plus, Calendar, Clock, Users, FileText, Trash2, ShieldAlert } from 'lucide-react';
import type { ExamWithDetails, Profile } from '@/types/types';
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
import { ForceDeleteDialog } from '@/components/ui/force-delete-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ManageExams() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exams, setExams] = useState<ExamWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [forceDeleteDialogOpen, setForceDeleteDialogOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState<ExamWithDetails | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [checkingAttempts, setCheckingAttempts] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const profile = await profileApi.getCurrentProfile();
      if (!profile) throw new Error('Profile not found');

      setCurrentProfile(profile);
      
      // Principal and Admin see all exams in their school
      // Teachers see only their own exams
      let data: ExamWithDetails[];
      if (profile.role === 'principal' || profile.role === 'admin') {
        if (!profile.school_id) throw new Error('School ID not found');
        data = await examApi.getExamsBySchool(profile.school_id);
      } else {
        data = await examApi.getExamsByTeacher(profile.id);
      }
      
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

  const canForceDelete = currentProfile?.role === 'principal' || currentProfile?.role === 'admin';
  
  // Helper function to check if user can delete an exam
  const canDeleteExam = (exam: ExamWithDetails): boolean => {
    if (!currentProfile) return false;
    
    // Principal and Admin can delete any exam in their school
    if (currentProfile.role === 'principal' || currentProfile.role === 'admin') {
      return true;
    }
    
    // Teachers can only delete their own exams
    return exam.teacher_id === currentProfile.id;
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
          title: 'Cannot Delete Exam',
          description: `${validAttempts.length} student(s) have already attempted this exam.`,
          variant: 'destructive',
        });
        setExamToDelete(null);
      } else {
        // Open confirmation dialog if no attempts
        setDeleteDialogOpen(true);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to check exam attempts',
        variant: 'destructive',
      });
      setExamToDelete(null);
    } finally {
      setCheckingAttempts(false);
    }
  };

  const handleDelete = async () => {
    if (!examToDelete) return;

    setIsDeleting(true);
    try {
      await examApi.deleteExam(examToDelete.id);
      toast({
        title: 'Success',
        description: 'Exam deleted successfully',
      });
      loadExams();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete exam',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setExamToDelete(null);
      setAttemptCount(0);
      setIsDeleting(false);
    }
  };

  const handleForceDeleteClick = async (exam: ExamWithDetails) => {
    setCheckingAttempts(true);
    setExamToDelete(exam);
    
    try {
      const attempts = await examAttemptApi.getAttemptsByExam(exam.id);
      const validAttempts = Array.isArray(attempts) ? attempts : [];
      setAttemptCount(validAttempts.length);
      setForceDeleteDialogOpen(true);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to check exam attempts',
        variant: 'destructive',
      });
      setExamToDelete(null);
    } finally {
      setCheckingAttempts(false);
    }
  };

  const handleForceDelete = async () => {
    if (!examToDelete) return;

    setIsDeleting(true);
    try {
      const result = await examApi.forceDeleteExam(examToDelete.id);
      toast({
        title: 'Success',
        description: result.message || 'Exam and all associated data deleted successfully',
      });
      loadExams();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to force delete exam',
        variant: 'destructive',
      });
    } finally {
      setForceDeleteDialogOpen(false);
      setExamToDelete(null);
      setAttemptCount(0);
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string }> = {
      draft: { variant: 'secondary', label: 'Draft' },
      pending_approval: { variant: 'outline', label: 'Pending Approval' },
      approved: { variant: 'default', label: 'Approved' },
      published: { variant: 'default', label: 'Published' },
      completed: { variant: 'secondary', label: 'Completed' },
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
          <p className="text-muted-foreground">Loading exams...</p>
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
            <h1 className="text-3xl font-bold">Manage Exams</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all your exams
            </p>
          </div>
        </div>
        <Button onClick={() => navigate('/teacher/exams/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Exam
        </Button>
      </div>

      {exams.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No exams found</h3>
            <p className="text-muted-foreground text-center mb-4">
              You haven't created any exams yet. Create your first exam to get started.
            </p>
            <Button onClick={() => navigate('/teacher/exams/create')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Exam
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

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/teacher/exams/${exam.id}/results`)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    View Results
                  </Button>
                  {exam.status !== 'completed' && canDeleteExam(exam) && (
                    <>
                      {canForceDelete ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={checkingAttempts}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              {checkingAttempts ? 'Checking...' : 'Delete'}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDeleteClick(exam)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Exam
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleForceDeleteClick(exam)}
                              className="text-destructive focus:text-destructive"
                            >
                              <ShieldAlert className="h-4 w-4 mr-2" />
                              Force Delete Exam
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteClick(exam)}
                          disabled={checkingAttempts}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {checkingAttempts ? 'Checking...' : 'Delete'}
                        </Button>
                      )}
                    </>
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
            <AlertDialogTitle>Delete Exam?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <p>
                  Are you sure you want to delete '{examToDelete?.title}'? This action cannot be undone.
                </p>
                {examToDelete && (
                  <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                    <p className="font-semibold">Exam Details:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Class: {examToDelete.class?.class_name}</li>
                      <li>• Subject: {examToDelete.subject?.subject_name}</li>
                      <li>• Created: {formatDateTime(examToDelete.created_at)}</li>
                      <li>• Status: {examToDelete.status}</li>
                      <li>• Student Attempts: {attemptCount}</li>
                    </ul>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Exam'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ForceDeleteDialog
        open={forceDeleteDialogOpen}
        onOpenChange={setForceDeleteDialogOpen}
        onConfirm={handleForceDelete}
        title="Force Delete Exam"
        itemName={examToDelete?.title || ''}
        isDeleting={isDeleting}
        details={
          examToDelete && (
            <>
              <p className="font-semibold">Exam Details:</p>
              <ul className="space-y-1 ml-4">
                <li>• Class: {examToDelete.class?.class_name}</li>
                <li>• Subject: {examToDelete.subject?.subject_name}</li>
                <li>• Created: {formatDateTime(examToDelete.created_at)}</li>
                <li>• Status: {examToDelete.status}</li>
                <li>• Student Attempts: <span className="font-bold text-destructive">{attemptCount}</span></li>
              </ul>
              {attemptCount > 0 && (
                <p className="text-sm text-destructive font-medium mt-2">
                  ⚠️ This will delete {attemptCount} student attempt{attemptCount > 1 ? 's' : ''} and all associated answers and results.
                </p>
              )}
            </>
          )
        }
      />
    </div>
  );
}
