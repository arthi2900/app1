import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Shuffle, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { academicApi, profileApi } from '@/db/api';
import type { QuestionPaperWithDetails, Question } from '@/types/types';

interface ShuffleAndSaveDialogProps {
  paper: QuestionPaperWithDetails;
  onSuccess?: () => void;
}

export function ShuffleAndSaveDialog({ paper, onSuccess }: ShuffleAndSaveDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [shuffleMcqOptions, setShuffleMcqOptions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewGenerated, setPreviewGenerated] = useState(false);

  useEffect(() => {
    if (open) {
      loadQuestions();
      setShuffleQuestions(false);
      setShuffleMcqOptions(false);
      setShowPreview(false);
      setPreviewGenerated(false);
    }
  }, [open]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const paperQuestions = await academicApi.getQuestionPaperQuestions(paper.id);
      const questionData = paperQuestions.map(q => q.question).filter((q): q is Question => q !== null);
      setQuestions(questionData);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleGeneratePreview = () => {
    if (!shuffleQuestions && !shuffleMcqOptions) {
      toast.error('Please select at least one shuffle option');
      return;
    }
    setShowPreview(true);
    setPreviewGenerated(true);
  };

  const handleSaveShuffled = async () => {
    if (!shuffleQuestions && !shuffleMcqOptions) {
      toast.error('Please select at least one shuffle option');
      return;
    }

    if (!previewGenerated) {
      toast.error('Please generate a preview first');
      return;
    }

    if (questions.length === 0) {
      toast.error('No questions found in the original paper');
      return;
    }

    try {
      setSaving(true);

      // Get current user profile
      const profile = await profileApi.getCurrentProfile();
      if (!profile) {
        toast.error('User profile not found');
        return;
      }

      // Generate title based on shuffle options
      let titleSuffix = '(Shuffled)';
      if (shuffleQuestions && shuffleMcqOptions) {
        titleSuffix = '(Shuffled - Q&A)';
      } else if (shuffleQuestions) {
        titleSuffix = '(Shuffled - Questions)';
      } else if (shuffleMcqOptions) {
        titleSuffix = '(Shuffled - Options)';
      }
      const newTitle = `${paper.title} ${titleSuffix}`;

      // Prepare questions array (shuffle if needed)
      let processedQuestions = [...questions];
      if (shuffleQuestions) {
        processedQuestions = shuffleArray(processedQuestions);
      }

      // Shuffle MCQ options if needed
      if (shuffleMcqOptions) {
        processedQuestions = processedQuestions.map(q => {
          if ((q.question_type === 'mcq' || q.question_type === 'multiple_response') && Array.isArray(q.options)) {
            const options = q.options as string[];
            const correctAnswer = q.correct_answer;
            
            // Create array of [option, isCorrect] pairs
            const optionsWithCorrectness = options.map((opt, idx) => ({
              option: opt,
              isCorrect: correctAnswer.includes(String.fromCharCode(65 + idx))
            }));
            
            // Shuffle the options
            const shuffledOptions = shuffleArray(optionsWithCorrectness);
            
            // Find new correct answer positions
            const newCorrectAnswers = shuffledOptions
              .map((item, idx) => item.isCorrect ? String.fromCharCode(65 + idx) : null)
              .filter(Boolean)
              .join(',');
            
            return {
              ...q,
              options: shuffledOptions.map(item => item.option),
              correct_answer: newCorrectAnswers || correctAnswer
            };
          }
          return q;
        });
      }

      // Create new question paper
      const newPaper = await academicApi.createQuestionPaper({
        school_id: paper.school_id,
        class_id: paper.class_id,
        subject_id: paper.subject_id,
        title: newTitle.trim(),
        status: 'draft',
        shuffle_questions: shuffleQuestions,
        shuffle_mcq_options: shuffleMcqOptions,
        created_by: profile.id,
        template_id: paper.template_id,
        difficulty_distribution: paper.difficulty_distribution,
        lesson_coverage: paper.lesson_coverage,
        has_versions: false
      });

      if (!newPaper || !newPaper.id) {
        throw new Error('Failed to create question paper');
      }

      // Add questions to the new paper
      for (let i = 0; i < processedQuestions.length; i++) {
        const question = processedQuestions[i];
        await academicApi.addQuestionToPaper({
          question_paper_id: newPaper.id,
          question_id: question.id,
          display_order: i + 1,
          shuffled_options: shuffleMcqOptions && 
            (question.question_type === 'mcq' || question.question_type === 'multiple_response') && 
            Array.isArray(question.options)
            ? question.options
            : null
        });
      }

      toast.success('Shuffled question paper saved successfully');
      setOpen(false);
      setShuffleQuestions(false);
      setShuffleMcqOptions(false);
      setShowPreview(false);
      setPreviewGenerated(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving shuffled paper:', error);
      toast.error('Failed to save shuffled question paper');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Shuffle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Shuffle Question Paper</DialogTitle>
          <DialogDescription>
            Create a shuffled version of "{paper.title}"
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading questions...</span>
          </div>
        ) : (
          <>
            <div className="space-y-6 py-4">
              {/* Shuffle Options Card */}
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold">Shuffle Options</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id="shuffle-questions"
                      checked={shuffleQuestions}
                      onCheckedChange={(checked) => {
                        setShuffleQuestions(checked as boolean);
                        setPreviewGenerated(false);
                      }}
                      disabled={saving}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="shuffle-questions" className="cursor-pointer font-medium">
                        Shuffle Questions - Randomize question order
                      </Label>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id="shuffle-mcq"
                      checked={shuffleMcqOptions}
                      onCheckedChange={(checked) => {
                        setShuffleMcqOptions(checked as boolean);
                        setPreviewGenerated(false);
                      }}
                      disabled={saving}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="shuffle-mcq" className="cursor-pointer font-medium">
                        Shuffle MCQ Options - Randomize answer options (correct answer will be tracked)
                      </Label>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleGeneratePreview}
                  disabled={saving || (!shuffleQuestions && !shuffleMcqOptions)}
                  className="w-full"
                  variant="default"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Generate Shuffled Preview
                </Button>
              </div>

              {/* Preview Section */}
              {showPreview && (
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <p className="font-semibold">Preview:</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {questions.length} questions will be copied
                    {shuffleQuestions && shuffleMcqOptions && ' with shuffled question order and MCQ options'}
                    {shuffleQuestions && !shuffleMcqOptions && ' with shuffled question order'}
                    {!shuffleQuestions && shuffleMcqOptions && ' with shuffled MCQ options'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    New paper will be saved as: <span className="font-medium">
                      {paper.title} {shuffleQuestions && shuffleMcqOptions ? '(Shuffled - Q&A)' : 
                       shuffleQuestions ? '(Shuffled - Questions)' : '(Shuffled - Options)'}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveShuffled}
                disabled={saving || !previewGenerated}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Shuffle className="mr-2 h-4 w-4" />
                    Save Shuffled Paper
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
