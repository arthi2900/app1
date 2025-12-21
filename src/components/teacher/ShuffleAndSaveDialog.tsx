import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Shuffle } from 'lucide-react';
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
  const [newTitle, setNewTitle] = useState(`${paper.title} (Shuffled)`);
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [shuffleMcqOptions, setShuffleMcqOptions] = useState(true);

  useEffect(() => {
    if (open) {
      loadQuestions();
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

  const handleSaveShuffled = async () => {
    if (!newTitle.trim()) {
      toast.error('Please enter a title for the shuffled paper');
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
      setNewTitle(`${paper.title} (Shuffled)`);
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Shuffle and Save Question Paper</DialogTitle>
          <DialogDescription>
            Create a shuffled copy of "{paper.title}" with a new name
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading questions...</span>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="new-title">New Paper Title</Label>
                <Input
                  id="new-title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter new title"
                  disabled={saving}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="shuffle-questions"
                    checked={shuffleQuestions}
                    onCheckedChange={(checked) => setShuffleQuestions(checked as boolean)}
                    disabled={saving}
                  />
                  <Label htmlFor="shuffle-questions" className="cursor-pointer">
                    Shuffle question order
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="shuffle-mcq"
                    checked={shuffleMcqOptions}
                    onCheckedChange={(checked) => setShuffleMcqOptions(checked as boolean)}
                    disabled={saving}
                  />
                  <Label htmlFor="shuffle-mcq" className="cursor-pointer">
                    Shuffle MCQ options
                  </Label>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg text-sm">
                <p className="font-medium mb-1">Preview:</p>
                <p className="text-muted-foreground">
                  {questions.length} questions will be copied
                  {shuffleQuestions && ' in shuffled order'}
                  {shuffleMcqOptions && ', with shuffled MCQ options'}
                </p>
              </div>
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
                disabled={saving || !newTitle.trim()}
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
