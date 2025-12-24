import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { examApi, examAttemptApi, examAnswerApi, academicApi, profileApi } from '@/db/api';
import { Clock, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import type { ExamWithDetails, QuestionPaperQuestionWithDetails, ExamAttempt } from '@/types/types';
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

export default function TakeExam() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exam, setExam] = useState<ExamWithDetails | null>(null);
  const [questions, setQuestions] = useState<QuestionPaperQuestionWithDetails[]>([]);
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

  useEffect(() => {
    if (examId) {
      initializeExam();
    }
  }, [examId]);

  useEffect(() => {
    if (timeRemaining <= 0 && attempt) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, attempt]);

  const initializeExam = async () => {
    try {
      if (!examId) return;

      const profile = await profileApi.getCurrentProfile();
      if (!profile) throw new Error('Profile not found');

      const examData = await examApi.getExamById(examId);
      setExam(examData);

      const now = new Date();
      const start = new Date(examData.start_time);
      const end = new Date(examData.end_time);

      if (now < start) {
        throw new Error('Exam has not started yet');
      }
      if (now > end) {
        throw new Error('Exam has ended');
      }

      let attemptData = await examAttemptApi.getAttemptByStudent(examId, profile.id);

      if (!attemptData) {
        attemptData = await examAttemptApi.createAttempt({
          exam_id: examId,
          student_id: profile.id,
          started_at: new Date().toISOString(),
          submitted_at: null,
          status: 'in_progress',
          total_marks_obtained: 0,
          percentage: 0,
          result: null,
        });
      } else if (attemptData.status === 'submitted' || attemptData.status === 'evaluated') {
        navigate(`/student/exams/${examId}/result`);
        return;
      }

      setAttempt(attemptData);

      const paperQuestions = await academicApi.getQuestionPaperQuestions(examData.question_paper_id);
      setQuestions(paperQuestions);

      const existingAnswers = await examAnswerApi.getAnswersByAttempt(attemptData.id);
      const answersMap: Record<string, any> = {};
      existingAnswers.forEach(ans => {
        answersMap[ans.question_id] = ans.student_answer;
      });
      setAnswers(answersMap);

      const startTime = new Date(attemptData.started_at || attemptData.created_at);
      const elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      const remainingSeconds = Math.max(0, examData.duration_minutes * 60 - elapsedSeconds);
      setTimeRemaining(remainingSeconds);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load exam',
        variant: 'destructive',
      });
      navigate('/student/exams');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = async (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });

    if (attempt) {
      try {
        await examAnswerApi.saveAnswer({
          attempt_id: attempt.id,
          question_id: questionId,
          student_answer: answer,
          marks_allocated: questions.find(q => q.question_id === questionId)?.question?.marks || 0,
        });
      } catch (error: any) {
        console.error('Failed to save answer:', error);
      }
    }
  };

  const handleAutoSubmit = async () => {
    if (!attempt) return;

    try {
      await examAttemptApi.submitAttempt(attempt.id);
      toast({
        title: 'Time Up!',
        description: 'Your exam has been automatically submitted',
      });
      navigate(`/student/exams/${examId}/result`);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit exam',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async () => {
    if (!attempt) return;

    try {
      await examAttemptApi.submitAttempt(attempt.id);
      toast({
        title: 'Success',
        description: 'Exam submitted successfully',
      });
      navigate(`/student/exams/${examId}/result`);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit exam',
        variant: 'destructive',
      });
    } finally {
      setSubmitDialogOpen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isQuestionAnswered = (questionId: string) => {
    const answer = answers[questionId];
    if (answer === undefined || answer === null) return false;
    if (typeof answer === 'string') return answer.trim().length > 0;
    if (Array.isArray(answer)) return answer.length > 0;
    return true;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading exam...</p>
        </div>
      </div>
    );
  }

  if (!exam || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Exam not found</p>
          <Button onClick={() => navigate('/student/exams')} className="mt-4">
            Back to Exams
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.question_id];

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{exam.title}</h1>
              <p className="text-sm text-muted-foreground">
                {exam.class?.class_name} • {exam.subject?.subject_name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                timeRemaining < 300 ? 'bg-destructive text-destructive-foreground' : 'bg-muted'
              }`}>
                <Clock className="h-5 w-5" />
                <span className="font-mono text-lg font-bold">{formatTime(timeRemaining)}</span>
              </div>
              <Button onClick={() => setSubmitDialogOpen(true)}>
                Submit Exam
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </CardTitle>
                  <Badge variant="outline">
                    {currentQuestion.question?.marks} {currentQuestion.question?.marks === 1 ? 'mark' : 'marks'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-lg">{currentQuestion.question?.question_text}</p>
                  {currentQuestion.question?.image_url && (
                    <img
                      src={currentQuestion.question.image_url}
                      alt="Question"
                      className="max-w-full h-auto rounded-md mt-4"
                    />
                  )}
                </div>

                <div className="space-y-4">
                  {currentQuestion.question?.question_type === 'mcq' && (
                    <RadioGroup
                      value={currentAnswer || ''}
                      onValueChange={(value) => handleAnswerChange(currentQuestion.question_id, value)}
                    >
                      {((currentQuestion.shuffled_options || currentQuestion.question?.options || []) as string[]).map((option: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted">
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {currentQuestion.question?.question_type === 'true_false' && (
                    <RadioGroup
                      value={currentAnswer || ''}
                      onValueChange={(value) => handleAnswerChange(currentQuestion.question_id, value)}
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted">
                        <RadioGroupItem value="True" id="true" />
                        <Label htmlFor="true" className="flex-1 cursor-pointer">True</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted">
                        <RadioGroupItem value="False" id="false" />
                        <Label htmlFor="false" className="flex-1 cursor-pointer">False</Label>
                      </div>
                    </RadioGroup>
                  )}

                  {currentQuestion.question?.question_type === 'multiple_response' && (
                    <div className="space-y-2">
                      {(currentQuestion.shuffled_answer_options || currentQuestion.question?.answer_options || []).map((option: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted">
                          <Checkbox
                            id={`option-${index}`}
                            checked={currentAnswer === option}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleAnswerChange(currentQuestion.question_id, option);
                              } else {
                                handleAnswerChange(currentQuestion.question_id, '');
                              }
                            }}
                          />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentQuestion.question?.question_type === 'short_answer' && (
                    <Textarea
                      value={currentAnswer || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.question_id, e.target.value)}
                      placeholder="Type your answer here..."
                      rows={6}
                    />
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-base">Question Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, index) => {
                    const answered = isQuestionAnswered(q.question_id);
                    const isCurrent = index === currentQuestionIndex;

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`
                          aspect-square rounded-md flex items-center justify-center text-sm font-medium
                          transition-colors
                          ${isCurrent
                            ? 'bg-primary text-primary-foreground'
                            : answered
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }
                        `}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-secondary"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-muted"></div>
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary"></div>
                    <span>Current</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Total Questions:</span>
                      <span className="font-medium">{questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Answered:</span>
                      <span className="font-medium text-secondary">
                        {questions.filter(q => isQuestionAnswered(q.question_id)).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Not Answered:</span>
                      <span className="font-medium text-muted-foreground">
                        {questions.filter(q => !isQuestionAnswered(q.question_id)).length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AlertDialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Exam</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your exam? You have answered{' '}
              {questions.filter(q => isQuestionAnswered(q.question_id)).length} out of {questions.length} questions.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
