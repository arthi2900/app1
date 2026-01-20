import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { examApi, examAttemptApi, examAnswerApi, profileApi } from '@/db/api';
import { ArrowLeft, Award, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import type { ExamWithDetails, ExamAttempt, ExamAnswerWithDetails } from '@/types/types';
import { MathRenderer } from '@/components/ui/math-renderer';

export default function StudentResult() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exam, setExam] = useState<ExamWithDetails | null>(null);
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [answers, setAnswers] = useState<ExamAnswerWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (examId) {
      loadResult();
    }
  }, [examId]);

  const loadResult = async () => {
    try {
      if (!examId) return;

      const profile = await profileApi.getCurrentProfile();
      if (!profile) throw new Error('Profile not found');

      const examData = await examApi.getExamById(examId);
      setExam(examData);

      const attemptData = await examAttemptApi.getAttemptByStudent(examId, profile.id);
      if (!attemptData) {
        throw new Error('No attempt found for this exam');
      }
      setAttempt(attemptData);

      const answersData = await examAnswerApi.getAnswersByAttempt(attemptData.id);
      setAnswers(answersData);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load result',
        variant: 'destructive',
      });
      navigate('/student/exams');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading result...</p>
        </div>
      </div>
    );
  }

  if (!exam || !attempt) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Result not found</p>
          <Button onClick={() => navigate('/student/exams')} className="mt-4">
            Back to Exams
          </Button>
        </div>
      </div>
    );
  }

  const isPassed = attempt.result === 'pass';
  const isEvaluated = attempt.status === 'evaluated';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/student/exams')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Exam Result</h1>
          <p className="text-muted-foreground mt-1">
            {exam.title}
          </p>
        </div>
      </div>

      {!isEvaluated && (
        <Card className="border-primary">
          <CardContent className="flex items-center gap-4 py-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium">Evaluation in Progress</p>
              <p className="text-sm text-muted-foreground">
                Your exam has been submitted and is being evaluated. Results will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {isEvaluated && (
        <Card className={isPassed ? 'border-success' : 'border-destructive'}>
          <CardContent className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              {isPassed ? (
                <CheckCircle2 className="h-12 w-12 text-success" />
              ) : (
                <XCircle className="h-12 w-12 text-destructive" />
              )}
              <div>
                <h2 className="text-2xl font-bold">
                  {isPassed ? 'Congratulations! You Passed' : 'You Did Not Pass'}
                </h2>
                <p className="text-muted-foreground">
                  {isPassed
                    ? 'You have successfully passed this exam'
                    : 'Keep practicing and try again next time'}
                </p>
              </div>
            </div>
            <Badge
              variant={isPassed ? 'default' : 'destructive'}
              className={isPassed ? 'bg-secondary text-lg px-4 py-2' : 'text-lg px-4 py-2'}
            >
              {isPassed ? 'PASS' : 'FAIL'}
            </Badge>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Marks</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exam.total_marks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marks Obtained</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attempt.total_marks_obtained}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Percentage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attempt.percentage.toFixed(2)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passing Marks</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exam.passing_marks}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Score Progress</span>
                <span className="text-sm text-muted-foreground">
                  {attempt.total_marks_obtained} / {exam.total_marks}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${isPassed ? 'bg-secondary' : 'bg-destructive'}`}
                  style={{ width: `${attempt.percentage}%` }}
                ></div>
              </div>
            </div>

            {isEvaluated && (
              <div className="grid gap-4 md:grid-cols-3 pt-4">
                <div className="text-center p-4 bg-muted rounded-md">
                  <p className="text-2xl font-bold text-success">
                    {answers.filter(a => a.is_correct === true).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Correct Answers</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-md">
                  <p className="text-2xl font-bold text-destructive">
                    {answers.filter(a => a.is_correct === false).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Incorrect Answers</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-md">
                  <p className="text-2xl font-bold">
                    {answers.filter(a => a.is_correct === null).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Evaluation</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exam Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Class</p>
              <p className="font-medium">{exam.class?.class_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Subject</p>
              <p className="font-medium">{exam.subject?.subject_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Started At</p>
              <p className="font-medium">
                {attempt.started_at
                  ? new Date(attempt.started_at).toLocaleString()
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Submitted At</p>
              <p className="font-medium">
                {attempt.submitted_at
                  ? new Date(attempt.submitted_at).toLocaleString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isEvaluated && answers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Question-wise Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {answers.map((answer, index) => {
                const question = answer.question;
                if (!question) return null;

                const studentAnswer = answer.student_answer;
                const correctAnswer = question.correct_answer;

                return (
                  <div key={answer.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-lg">Q{index + 1}.</span>
                          <Badge variant="outline" className="text-xs">
                            {question.question_type.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {question.marks} marks
                          </Badge>
                          {question.negative_marks > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              -{question.negative_marks} negative
                            </Badge>
                          )}
                        </div>
                        <div className="mb-3">
                          {question.image_url && (
                            <img 
                              src={question.image_url} 
                              alt="Question" 
                              className="max-w-md mb-2 rounded-md"
                            />
                          )}
                          <MathRenderer 
                            content={question.question_text}
                            className="question-content text-base"
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        {answer.is_correct ? (
                          <CheckCircle2 className="h-6 w-6 text-success" />
                        ) : (
                          <XCircle className="h-6 w-6 text-destructive" />
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t pt-3">
                      {/* MCQ and True/False */}
                      {(question.question_type === 'mcq' || question.question_type === 'true_false') && (
                        <div className="space-y-2">
                          {question.options && (
                            <div className="space-y-2">
                              {(question.options as string[]).map((option, idx) => {
                                const isCorrect = option === correctAnswer;
                                const isStudentAnswer = option === studentAnswer;
                                
                                return (
                                  <div 
                                    key={idx} 
                                    className="p-3 rounded-md border"
                                  >
                                    <div className="flex items-center gap-2">
                                      {isCorrect && (
                                        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                                      )}
                                      {isStudentAnswer && !isCorrect && (
                                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                                      )}
                                      <span className={
                                        isCorrect 
                                          ? 'text-success font-medium'
                                          : isStudentAnswer && !isCorrect
                                          ? 'text-destructive font-medium'
                                          : ''
                                      }>
                                        {option}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Short Answer */}
                      {question.question_type === 'short_answer' && (
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium">Your Answer:</span>
                            <div className="mt-1 p-3 bg-muted rounded-md">
                              {studentAnswer || 'Not Answered'}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Expected Answer:</span>
                            <div className="mt-1 p-3 bg-muted rounded-md">
                              {correctAnswer}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Multiple Response */}
                      {question.question_type === 'multiple_response' && (
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="font-medium">Your Answer:</span>
                            <div className="flex flex-wrap gap-1">
                              {Array.isArray(studentAnswer) && studentAnswer.length > 0 ? (
                                studentAnswer.map((ans: string, idx: number) => (
                                  <Badge key={idx} variant={answer.is_correct ? 'default' : 'destructive'} className={answer.is_correct ? 'bg-secondary' : ''}>
                                    {ans}
                                  </Badge>
                                ))
                              ) : (
                                <Badge variant="destructive">Not Answered</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-medium">Correct Answer:</span>
                            <Badge variant="outline">{correctAnswer}</Badge>
                          </div>
                        </div>
                      )}

                      {/* Match Following */}
                      {question.question_type === 'match_following' && (() => {
                        // Parse student answer if it's a string, otherwise use as-is
                        let studentMatches = {};
                        try {
                          studentMatches = typeof studentAnswer === 'string' 
                            ? JSON.parse(studentAnswer) 
                            : (studentAnswer || {});
                        } catch (e) {
                          console.error('Error parsing student answer:', e);
                          studentMatches = studentAnswer || {};
                        }

                        // Parse correct answer if it's a string, otherwise use as-is
                        let correctMatches = {};
                        try {
                          correctMatches = typeof correctAnswer === 'string'
                            ? JSON.parse(correctAnswer)
                            : (correctAnswer || {});
                        } catch (e) {
                          console.error('Error parsing correct answer:', e);
                          correctMatches = correctAnswer || {};
                        }

                        return (
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium">Your Matches:</span>
                              <div className="mt-1 p-3 bg-muted rounded-md space-y-1">
                                {Object.entries(studentMatches).map(([left, right]: [string, any]) => {
                                  const isCorrect = correctMatches[left as keyof typeof correctMatches] === right;
                                  return (
                                    <div key={left} className="flex items-center gap-2">
                                      {isCorrect ? (
                                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                                      ) : (
                                        <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                                      )}
                                      <span className={isCorrect ? 'text-success' : 'text-destructive'}>
                                        {left}
                                      </span>
                                      <span>→</span>
                                      <span className={isCorrect ? 'text-success' : 'text-destructive'}>
                                        {right}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium">Correct Matches:</span>
                              <div className="mt-1 p-3 bg-success/10 rounded-md space-y-1">
                                {Object.entries(correctMatches).map(([left, right]: [string, any]) => (
                                  <div key={left} className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                                    <span className="text-success">{left}</span>
                                    <span>→</span>
                                    <span className="text-success">{right}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Marks Obtained */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm font-medium">Marks Obtained:</span>
                      <Badge variant={answer.is_correct ? 'default' : 'destructive'} className={answer.is_correct ? 'bg-secondary' : ''}>
                        {answer.marks_obtained} / {question.marks}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
