import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Globe, Users, Copy, Search, BookOpen, User, Filter } from 'lucide-react';
import { questionApi } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import type { Question } from '@/types/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface QuestionWithCreator extends Question {
  creator?: {
    id: string;
    full_name: string;
    username: string;
    role?: string;
  };
  subjects?: {
    id: string;
    subject_name: string;
    subject_code: string;
  };
}

interface UserQuestionBank {
  userId: string;
  userName: string;
  userRole: string;
  bankNames: string[];
}

export default function AdminQuestionBank() {
  const [globalQuestions, setGlobalQuestions] = useState<QuestionWithCreator[]>([]);
  const [userQuestions, setUserQuestions] = useState<QuestionWithCreator[]>([]);
  const [userBanks, setUserBanks] = useState<UserQuestionBank[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [selectedBank, setSelectedBank] = useState<string>('all');
  const [viewQuestionDialog, setViewQuestionDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionWithCreator | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [global, users, banks] = await Promise.all([
        questionApi.getGlobalQuestions(),
        questionApi.getAllQuestionsWithUsers(),
        questionApi.getUserQuestionBanks(),
      ]);
      setGlobalQuestions(global as QuestionWithCreator[]);
      setUserQuestions(users as QuestionWithCreator[]);
      setUserBanks(banks);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load questions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToGlobal = async (questionId: string) => {
    try {
      await questionApi.copyQuestionToGlobal(questionId);
      toast({
        title: 'Success',
        description: 'Question copied to global bank',
      });
      loadData();
    } catch (error) {
      console.error('Error copying question:', error);
      toast({
        title: 'Error',
        description: 'Failed to copy question to global bank',
        variant: 'destructive',
      });
    }
  };

  const handleViewQuestion = (question: QuestionWithCreator) => {
    setSelectedQuestion(question);
    setViewQuestionDialog(true);
  };

  const getQuestionTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      mcq: 'Multiple Choice',
      true_false: 'True/False',
      short_answer: 'Short Answer',
      match_following: 'Match Following',
      multiple_response: 'Multiple Response',
    };
    return types[type] || type;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      easy: 'bg-success text-success-foreground',
      medium: 'bg-warning text-warning-foreground',
      hard: 'bg-destructive text-destructive-foreground',
    };
    return colors[difficulty] || 'bg-secondary text-secondary-foreground';
  };

  const filteredGlobalQuestions = globalQuestions.filter((q) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      q.question_text.toLowerCase().includes(searchLower) ||
      q.subjects?.subject_name.toLowerCase().includes(searchLower) ||
      q.creator?.full_name.toLowerCase().includes(searchLower)
    );
  });

  const filteredUserQuestions = userQuestions.filter((q) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      q.question_text.toLowerCase().includes(searchLower) ||
      q.subjects?.subject_name.toLowerCase().includes(searchLower) ||
      q.creator?.full_name.toLowerCase().includes(searchLower) ||
      q.bank_name?.toLowerCase().includes(searchLower);

    const matchesUser = selectedUser === 'all' || q.created_by === selectedUser;
    const matchesBank = selectedBank === 'all' || q.bank_name === selectedBank;

    return matchesSearch && matchesUser && matchesBank;
  });

  const uniqueUsers = Array.from(
    new Map(
      userQuestions
        .filter((q) => q.creator)
        .map((q) => [q.creator!.id, { id: q.creator!.id, name: q.creator!.full_name }])
    ).values()
  );

  const uniqueBanks = Array.from(
    new Set(userQuestions.filter((q) => q.bank_name).map((q) => q.bank_name!))
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Question Bank Management</h1>
          <p className="text-muted-foreground">Manage global and user question banks</p>
        </div>
      </div>

      <Tabs defaultValue="global" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="global" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Global Questions
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Questions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Global Question Bank
              </CardTitle>
              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : filteredGlobalQuestions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No global questions found. Copy questions from user banks to add them here.
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Marks</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGlobalQuestions.map((question) => (
                        <TableRow key={question.id}>
                          <TableCell className="max-w-md">
                            <div
                              className="truncate cursor-pointer hover:text-primary"
                              onClick={() => handleViewQuestion(question)}
                              dangerouslySetInnerHTML={{ __html: question.question_text }}
                            />
                          </TableCell>
                          <TableCell>{question.subjects?.subject_name || 'N/A'}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {getQuestionTypeLabel(question.question_type)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>{question.marks}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {question.creator?.full_name || 'Unknown'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewQuestion(question)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Question Banks
              </CardTitle>
              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    {uniqueUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Banks</SelectItem>
                    {uniqueBanks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : filteredUserQuestions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No user questions found.
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Bank Name</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Marks</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUserQuestions.map((question) => (
                        <TableRow key={question.id}>
                          <TableCell className="max-w-md">
                            <div
                              className="truncate cursor-pointer hover:text-primary"
                              onClick={() => handleViewQuestion(question)}
                              dangerouslySetInnerHTML={{ __html: question.question_text }}
                            />
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {question.bank_name || 'No Bank'}
                            </Badge>
                          </TableCell>
                          <TableCell>{question.subjects?.subject_name || 'N/A'}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {getQuestionTypeLabel(question.question_type)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>{question.marks}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {question.creator?.full_name || 'Unknown'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewQuestion(question)}
                              >
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCopyToGlobal(question.id)}
                              >
                                <Copy className="h-4 w-4 mr-1" />
                                Copy to Global
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Banks Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Question Banks by User</CardTitle>
            </CardHeader>
            <CardContent>
              {userBanks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No user question banks found.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {userBanks.map((userBank) => (
                    <Card key={userBank.userId}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {userBank.userName}
                        </CardTitle>
                        <Badge variant="outline" className="w-fit">
                          {userBank.userRole}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Question Banks:</p>
                          <div className="flex flex-wrap gap-2">
                            {userBank.bankNames.map((bankName) => (
                              <Badge key={bankName} variant="secondary">
                                <BookOpen className="h-3 w-3 mr-1" />
                                {bankName}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Question Dialog */}
      <Dialog open={viewQuestionDialog} onOpenChange={setViewQuestionDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Question Details</DialogTitle>
            <DialogDescription>View complete question information</DialogDescription>
          </DialogHeader>
          {selectedQuestion && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Question:</h3>
                <div
                  className="p-4 bg-muted rounded-md"
                  dangerouslySetInnerHTML={{ __html: selectedQuestion.question_text }}
                />
              </div>

              {selectedQuestion.image_url && (
                <div>
                  <h3 className="font-semibold mb-2">Image:</h3>
                  <img
                    src={selectedQuestion.image_url}
                    alt="Question"
                    className="max-w-full rounded-md border"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Type:</h3>
                  <Badge variant="outline">
                    {getQuestionTypeLabel(selectedQuestion.question_type)}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Difficulty:</h3>
                  <Badge className={getDifficultyColor(selectedQuestion.difficulty)}>
                    {selectedQuestion.difficulty}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Marks:</h3>
                  <p>{selectedQuestion.marks}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Negative Marks:</h3>
                  <p>{selectedQuestion.negative_marks || 0}</p>
                </div>
              </div>

              {selectedQuestion.question_type === 'mcq' && selectedQuestion.options && (
                <div>
                  <h3 className="font-semibold mb-2">Options:</h3>
                  <div className="space-y-2">
                    {selectedQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-md border ${
                          option === selectedQuestion.correct_answer
                            ? 'bg-success/10 border-success'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                          <span dangerouslySetInnerHTML={{ __html: option }} />
                          {option === selectedQuestion.correct_answer && (
                            <Badge className="ml-auto">Correct</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedQuestion.question_type === 'true_false' && (
                <div>
                  <h3 className="font-semibold mb-2">Correct Answer:</h3>
                  <Badge>{selectedQuestion.correct_answer}</Badge>
                </div>
              )}

              {selectedQuestion.question_type === 'match_following' &&
                selectedQuestion.match_pairs && (
                  <div>
                    <h3 className="font-semibold mb-2">Match Pairs:</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Left Column:</h4>
                        <div className="space-y-2">
                          {selectedQuestion.match_pairs.map((pair, index) => (
                            <div key={index} className="p-2 bg-muted rounded">
                              {pair.left}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Right Column:</h4>
                        <div className="space-y-2">
                          {selectedQuestion.match_pairs.map((pair, index) => (
                            <div key={index} className="p-2 bg-muted rounded">
                              {pair.right}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              <div>
                <h3 className="font-semibold mb-2">Created By:</h3>
                <p>{selectedQuestion.creator?.full_name || 'Unknown'}</p>
              </div>

              {selectedQuestion.bank_name && (
                <div>
                  <h3 className="font-semibold mb-2">Bank Name:</h3>
                  <Badge variant="secondary">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {selectedQuestion.bank_name}
                  </Badge>
                </div>
              )}

              {selectedQuestion.is_global && (
                <div>
                  <Badge variant="default">
                    <Globe className="h-3 w-3 mr-1" />
                    Global Question
                  </Badge>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
