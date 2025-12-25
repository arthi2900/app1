import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { examApi, examAttemptApi, examAnswerApi, academicApi, profileApi } from '@/db/api';
import { Clock, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import type { ExamWithDetails, QuestionPaperQuestionWithDetails, ExamAttempt, MatchPair } from '@/types/types';
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
import { hasExamStarted, hasExamEnded, getExamRemainingTime, formatSecondsToTime } from '@/utils/timezone';

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
  const [examInitialized, setExamInitialized] = useState(false);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);

  useEffect(() => {
    if (examId) {
      initializeExam();
    }
  }, [examId]);

  useEffect(() => {
    // Debug: Log when this effect runs
    console.log('Timer useEffect triggered:', {
      timeRemaining,
      hasAttempt: !!attempt,
      examInitialized,
      shouldAutoSubmit: timeRemaining <= 0 && attempt && examInitialized
    });

    // Only trigger auto-submit if exam is initialized and timer has expired
    // This prevents auto-submit during initial load when timeRemaining is 0
    if (timeRemaining <= 0 && attempt && examInitialized) {
      handleAutoSubmit();
      return;
    }

    // Don't start timer until exam is initialized
    if (!examInitialized) {
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, attempt, examInitialized]);

  const initializeExam = async () => {
    try {
      if (!examId) return;

      const profile = await profileApi.getCurrentProfile();
      if (!profile) throw new Error('Profile not found');

      const examData = await examApi.getExamById(examId);
      setExam(examData);

      // Check time in IST
      if (!hasExamStarted(examData.start_time)) {
        throw new Error('Exam has not started yet');
      }
      if (hasExamEnded(examData.end_time)) {
        throw new Error('Exam has ended');
      }

      let attemptData = await examAttemptApi.getAttemptByStudent(examId, profile.id);

      if (!attemptData) {
        try {
          // Create attempt with current UTC time (database will store as UTC)
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
        } catch (createError: any) {
          // If 409 conflict (attempt already exists), try fetching again
          if (createError.message?.includes('409') || createError.code === '23505') {
            console.log('Attempt already exists, fetching existing attempt...');
            attemptData = await examAttemptApi.getAttemptByStudent(examId, profile.id);
            if (!attemptData) {
              throw new Error('Failed to create or retrieve exam attempt');
            }
          } else {
            throw createError;
          }
        }
      }
      
      if (attemptData.status === 'submitted' || attemptData.status === 'evaluated') {
        navigate(`/student/exams/${examId}/result`);
        return;
      }

      setAttempt(attemptData);

      const paperQuestions = await academicApi.getQuestionPaperQuestions(examData.question_paper_id);
      setQuestions(paperQuestions || []);
      setQuestionsLoaded(true); // Mark questions as loaded, even if empty

      const existingAnswers = await examAnswerApi.getAnswersByAttempt(attemptData.id);
      const answersMap: Record<string, any> = {};
      existingAnswers.forEach(ans => {
        answersMap[ans.question_id] = ans.student_answer;
      });
      setAnswers(answersMap);

      // Calculate remaining time in UTC
      const startedAtTime = attemptData.started_at || attemptData.created_at;
      const remainingSeconds = getExamRemainingTime(
        startedAtTime,
        examData.duration_minutes
      );
      
      // Debug logging
      console.log('=== EXAM TIMER DEBUG ===');
      console.log('Current UTC time:', new Date().toISOString());
      console.log('Attempt started_at (from DB):', startedAtTime);
      console.log('Attempt started_at (converted to UTC):', new Date(startedAtTime).toISOString());
      console.log('Exam duration (minutes):', examData.duration_minutes);
      console.log('Calculated remaining seconds:', remainingSeconds);
      console.log('Remaining time (formatted):', formatSecondsToTime(remainingSeconds));
      console.log('Exam start_time (from DB):', examData.start_time);
      console.log('Exam end_time (from DB):', examData.end_time);
      console.log('Note: Database returns timestamps with timezone offset (+05:30 for IST)');
      console.log('JavaScript automatically converts these to UTC for calculations');
      console.log('========================');
      
      setTimeRemaining(remainingSeconds);
      
      // Mark exam as initialized to enable timer and auto-submit logic
      setExamInitialized(true);
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

    console.log('=== AUTO-SUBMIT TRIGGERED ===');
    console.log('Reason: Timer expired (timeRemaining reached 0)');
    console.log('Attempt ID:', attempt.id);
    console.log('Current time:', new Date().toISOString());
    console.log('============================');

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

  const isQuestionAnswered = (questionId: string) => {
    const answer = answers[questionId];
    if (answer === undefined || answer === null) return false;
    if (typeof answer === 'string') return answer.trim().length > 0;
    if (Array.isArray(answer)) return answer.length > 0;
    return true;
  };

  // Loading state - exam data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">தேர்வு ஏற்றப்படுகிறது...</p>
        </div>
      </div>
    );
  }

  // Exam truly not found (hard failure)
  if (!exam && !loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">தேர்வு கிடைக்கவில்லை</p>
          <Button onClick={() => navigate('/student/exams')} className="mt-4">
            தேர்வுகளுக்கு திரும்பு
          </Button>
        </div>
      </div>
    );
  }

  // Questions are still loading (DO NOT treat as exam not found)
  if (exam && !questionsLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Questions loaded but empty (no questions in question paper)
  if (exam && questionsLoaded && questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">No questions found in this exam</p>
          <p className="text-sm text-muted-foreground mb-4">Please contact your teacher</p>
          <Button onClick={() => navigate('/student/exams')}>
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
                <span className="font-mono text-lg font-bold">{formatSecondsToTime(timeRemaining)}</span>
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
                    <div className="space-y-4">
                      {/* Display main options (A, B, C, D) */}
                      {currentQuestion.question?.options && Array.isArray(currentQuestion.question.options) && (
                        <div className="space-y-2 mb-4 p-4 bg-muted/50 rounded-md">
                          <p className="text-sm font-medium mb-2">Options:</p>
                          {(currentQuestion.question.options as string[]).map((option: string, index: number) => (
                            <div key={index} className="text-sm pl-2">
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Display answer options (i, ii, iii, iv) as radio buttons */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium mb-2">Select the correct answer:</p>
                        <RadioGroup
                          value={currentAnswer || ''}
                          onValueChange={(value) => handleAnswerChange(currentQuestion.question_id, value)}
                        >
                          {(currentQuestion.shuffled_answer_options || currentQuestion.question?.answer_options || []).map((option: string, index: number) => (
                            <div key={index} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted">
                              <RadioGroupItem value={option} id={`answer-option-${index}`} />
                              <Label htmlFor={`answer-option-${index}`} className="flex-1 cursor-pointer">
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
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

                  {currentQuestion.question?.question_type === 'match_following' && (
                    <div className="space-y-4">
                      {(() => {
                        const matchPairs = (currentQuestion.shuffled_options || currentQuestion.question?.options || []) as MatchPair[];
                        const leftItems = matchPairs.map(pair => pair.left);
                        const rightItems = matchPairs.map(pair => pair.right);
                        
                        // Parse current answer (JSON string) to object
                        let currentMatches: Record<string, string> = {};
                        try {
                          if (currentAnswer) {
                            currentMatches = JSON.parse(currentAnswer);
                          }
                        } catch (e) {
                          currentMatches = {};
                        }

                        return (
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground mb-4">
                              Match the items from the left column with the appropriate items from the right column
                            </p>
                            {leftItems.map((leftItem, index) => (
                              <div key={index} className="flex items-center gap-4 p-3 border rounded-md">
                                <div className="flex-1 font-medium">{leftItem}</div>
                                <div className="text-muted-foreground">→</div>
                                <div className="flex-1">
                                  <Select
                                    value={currentMatches[leftItem] || ''}
                                    onValueChange={(value) => {
                                      const newMatches = { ...currentMatches, [leftItem]: value };
                                      handleAnswerChange(
                                        currentQuestion.question_id,
                                        JSON.stringify(newMatches)
                                      );
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a match" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {rightItems.map((rightItem, rightIndex) => (
                                        <SelectItem key={rightIndex} value={rightItem}>
                                          {rightItem}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
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
