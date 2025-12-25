import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { examApi, examAttemptApi, examAnswerApi } from '@/db/api';
import { ArrowLeft, CheckCircle2, XCircle, User, Calendar, Clock, Award } from 'lucide-react';
import type { ExamWithDetails, ExamAttemptWithDetails, ExamAnswerWithDetails } from '@/types/types';

export default function StudentExamDetail() {
  const { examId, studentId } = useParams<{ examId: string; studentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exam, setExam] = useState<ExamWithDetails | null>(null);
  const [attempt, setAttempt] = useState<ExamAttemptWithDetails | null>(null);
  const [answers, setAnswers] = useState<ExamAnswerWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (examId && studentId) {
      loadStudentExamDetail();
    }
  }, [examId, studentId]);

  const handleProcessEvaluation = async () => {
    if (!attempt) return;
    
    setProcessing(true);
    try {
      const result = await examAttemptApi.processSubmission(attempt.id);
      console.log('Processing result:', result);
      
      toast({
        title: 'வெற்றி',
        description: result.message || 'தேர்வு மதிப்பீடு முடிந்தது',
      });
      
      // Reload the data
      await loadStudentExamDetail();
    } catch (error: any) {
      console.error('Error processing evaluation:', error);
      toast({
        title: 'பிழை',
        description: error.message || 'மதிப்பீடு செயலாக்கத்தில் பிழை',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const loadStudentExamDetail = async () => {
    try {
      if (!examId || !studentId) return;

      console.log('Loading exam details for:', { examId, studentId });

      const examData = await examApi.getExamById(examId);
      console.log('Exam data loaded:', examData);
      setExam(examData);

      const attempts = await examAttemptApi.getAttemptsByExam(examId);
      console.log('All attempts for exam:', attempts);
      
      const studentAttempt = attempts.find(a => a.student_id === studentId);
      console.log('Student attempt found:', studentAttempt);
      
      if (studentAttempt) {
        setAttempt(studentAttempt);
        
        console.log('Fetching answers for attempt ID:', studentAttempt.id);
        const answersData = await examAnswerApi.getAnswersByAttempt(studentAttempt.id);
        console.log('Answers data received:', answersData);
        console.log('Number of answers:', answersData?.length || 0);
        
        if (answersData && answersData.length > 0) {
          console.log('First answer sample:', answersData[0]);
        }
        
        setAnswers(answersData);
      } else {
        console.log('No attempt found for student:', studentId);
        console.log('Available student IDs in attempts:', attempts.map(a => a.student_id));
      }
    } catch (error: any) {
      console.error('Error loading student exam details:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      toast({
        title: 'Error',
        description: error.message || 'Failed to load student exam details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderAnswer = (answer: ExamAnswerWithDetails) => {
    const question = answer.question;
    if (!question) return null;

    const studentAnswer = answer.student_answer;
    const correctAnswer = question.correct_answer;

    switch (question.question_type) {
      case 'mcq':
      case 'true_false':
        return (
          <div className="space-y-2">
            {/* Show options with icons and colored text */}
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
                          <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                        )}
                        {isStudentAnswer && !isCorrect && (
                          <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                        )}
                        <span className={
                          isCorrect 
                            ? 'text-secondary font-medium'  // Green text for correct answer
                            : isStudentAnswer && !isCorrect
                            ? 'text-destructive font-medium'  // Red text for wrong answer
                            : ''  // Normal text for other options
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
        );
      
      case 'multiple_response':
        const studentAnswers = Array.isArray(studentAnswer) ? studentAnswer : [];
        return (
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-medium">Student Answer:</span>
              <div className="flex flex-wrap gap-1">
                {studentAnswers.length > 0 ? (
                  studentAnswers.map((ans: string, idx: number) => (
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
        );

      case 'short_answer':
        return (
          <div className="space-y-2">
            <div>
              <span className="font-medium">Student Answer:</span>
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
        );

      case 'match_following':
        const studentMatches = studentAnswer || {};
        const correctMatches = JSON.parse(correctAnswer);
        return (
          <div className="space-y-2">
            <div>
              <span className="font-medium">Student Matches:</span>
              <div className="mt-1 p-3 bg-muted rounded-md space-y-1">
                {Object.entries(studentMatches).map(([left, right]: [string, any]) => (
                  <div key={left} className="flex items-center gap-2">
                    <span>{left}</span>
                    <span>→</span>
                    <span>{right}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium">Correct Matches:</span>
              <div className="mt-1 p-3 bg-muted rounded-md space-y-1">
                {Object.entries(correctMatches).map(([left, right]: [string, any]) => (
                  <div key={left} className="flex items-center gap-2">
                    <span>{left}</span>
                    <span>→</span>
                    <span>{right}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown question type</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading student details...</p>
        </div>
      </div>
    );
  }

  if (!exam || !attempt) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Student exam details not found</p>
          <Button onClick={() => navigate(`/teacher/exams/${examId}/results`)} className="mt-4">
            Back to Results
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/teacher/exams/${examId}/results`)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{exam.title}</h1>
            <p className="text-muted-foreground mt-1">
              Student: {attempt.student?.full_name || attempt.student?.username}
            </p>
          </div>
        </div>
        {attempt.status === 'submitted' && answers.length > 0 && (
          <Button 
            onClick={handleProcessEvaluation}
            disabled={processing}
          >
            {processing ? 'செயலாக்கப்படுகிறது...' : 'மதிப்பீடு செய்'}
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={
              attempt.status === 'evaluated' ? 'default' :
              attempt.status === 'submitted' ? 'secondary' :
              'outline'
            }>
              {attempt.status === 'not_started' && 'Not Attempted'}
              {attempt.status === 'in_progress' && 'In Progress'}
              {attempt.status === 'submitted' && 'Submitted'}
              {attempt.status === 'evaluated' && 'Evaluated'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attempt.total_marks_obtained} / {exam.total_marks}
            </div>
            <p className="text-xs text-muted-foreground">
              {attempt.percentage.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Result</CardTitle>
            {attempt.result === 'pass' ? (
              <CheckCircle2 className="h-4 w-4 text-secondary" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
          </CardHeader>
          <CardContent>
            {attempt.result === 'pass' && (
              <Badge variant="default" className="bg-secondary">Pass</Badge>
            )}
            {attempt.result === 'fail' && (
              <Badge variant="destructive">Fail</Badge>
            )}
            {!attempt.result && <span className="text-muted-foreground">-</span>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Taken</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {attempt.started_at && attempt.submitted_at ? (
              <div className="text-2xl font-bold">
                {Math.round((new Date(attempt.submitted_at).getTime() - new Date(attempt.started_at).getTime()) / 60000)} min
              </div>
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </CardContent>
        </Card>
      </div>

      {attempt.started_at && (
        <Card>
          <CardHeader>
            <CardTitle>Exam Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Started:</span>
                <span>{new Date(attempt.started_at).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}</span>
              </div>
              {attempt.submitted_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Submitted:</span>
                  <span>{new Date(attempt.submitted_at).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Question-wise Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {answers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-2">No answers found for this exam attempt.</p>
              {attempt?.status === 'not_started' && (
                <p className="text-sm">The student has not started the exam yet.</p>
              )}
              {attempt?.status === 'in_progress' && (
                <p className="text-sm">The student is currently taking the exam.</p>
              )}
              {(attempt?.status === 'submitted' || attempt?.status === 'evaluated') && (
                <p className="text-sm">The student submitted the exam but no answers were recorded. Please check the exam data.</p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {answers.map((answer, index) => {
                const question = answer.question;
                if (!question) return null;

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
                          <p className="text-base">{question.question_text}</p>
                        </div>
                      </div>
                      <div className="ml-4">
                        {answer.is_correct ? (
                          <CheckCircle2 className="h-6 w-6 text-secondary" />
                        ) : (
                          <XCircle className="h-6 w-6 text-destructive" />
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t pt-3">
                      {renderAnswer(answer)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
