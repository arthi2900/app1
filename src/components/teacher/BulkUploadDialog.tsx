import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Upload, Download, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import type { Question, Subject, Class, Lesson } from '@/types/types';
import { questionApi } from '@/db/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface BulkUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjects: Subject[];
  classes: Class[];
  lessons: Lesson[];
  onUploadComplete: () => void;
}

interface ParsedQuestion {
  row: number;
  question_text: string;
  class_name: string;
  subject_name: string;
  lesson_name?: string;
  question_type: string;
  difficulty: string;
  marks: number;
  negative_marks: number;
  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;
  correct_answer: string;
  match_left_1?: string;
  match_right_1?: string;
  match_left_2?: string;
  match_right_2?: string;
  match_left_3?: string;
  match_right_3?: string;
  match_left_4?: string;
  match_right_4?: string;
  answer_option_1?: string;
  answer_option_2?: string;
  answer_option_3?: string;
  answer_option_4?: string;
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export default function BulkUploadDialog({
  open,
  onOpenChange,
  subjects,
  classes,
  lessons,
  onUploadComplete,
}: BulkUploadDialogProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [successCount, setSuccessCount] = useState(0);
  const { toast } = useToast();

  const downloadTemplate = () => {
    const templateData = [
      {
        'Question Text': 'What is the capital of France?',
        'Class Name': 'Class 10',
        'Subject Name': 'Geography',
        'Lesson Name': 'World Capitals',
        'Question Type': 'mcq',
        'Difficulty': 'easy',
        'Marks': 1,
        'Negative Marks': 0,
        'Option A': 'London',
        'Option B': 'Paris',
        'Option C': 'Berlin',
        'Option D': 'Madrid',
        'Correct Answer': 'Paris',
        'Match Left 1': '',
        'Match Right 1': '',
        'Match Left 2': '',
        'Match Right 2': '',
        'Match Left 3': '',
        'Match Right 3': '',
        'Match Left 4': '',
        'Match Right 4': '',
        'Answer Option 1': '',
        'Answer Option 2': '',
        'Answer Option 3': '',
        'Answer Option 4': '',
      },
      {
        'Question Text': 'The Earth revolves around the Sun.',
        'Class Name': 'Class 10',
        'Subject Name': 'Science',
        'Lesson Name': 'Solar System',
        'Question Type': 'true_false',
        'Difficulty': 'easy',
        'Marks': 1,
        'Negative Marks': 0,
        'Option A': '',
        'Option B': '',
        'Option C': '',
        'Option D': '',
        'Correct Answer': 'True',
        'Match Left 1': '',
        'Match Right 1': '',
        'Match Left 2': '',
        'Match Right 2': '',
        'Match Left 3': '',
        'Match Right 3': '',
        'Match Left 4': '',
        'Match Right 4': '',
        'Answer Option 1': '',
        'Answer Option 2': '',
        'Answer Option 3': '',
        'Answer Option 4': '',
      },
      {
        'Question Text': 'Explain the process of photosynthesis.',
        'Class Name': 'Class 10',
        'Subject Name': 'Biology',
        'Lesson Name': 'Plant Biology',
        'Question Type': 'short_answer',
        'Difficulty': 'medium',
        'Marks': 5,
        'Negative Marks': 0,
        'Option A': '',
        'Option B': '',
        'Option C': '',
        'Option D': '',
        'Correct Answer': 'Photosynthesis is the process by which plants convert light energy into chemical energy.',
        'Match Left 1': '',
        'Match Right 1': '',
        'Match Left 2': '',
        'Match Right 2': '',
        'Match Left 3': '',
        'Match Right 3': '',
        'Match Left 4': '',
        'Match Right 4': '',
        'Answer Option 1': '',
        'Answer Option 2': '',
        'Answer Option 3': '',
        'Answer Option 4': '',
      },
      {
        'Question Text': 'Match the following countries with their capitals:',
        'Class Name': 'Class 10',
        'Subject Name': 'Geography',
        'Lesson Name': 'World Capitals',
        'Question Type': 'match_following',
        'Difficulty': 'medium',
        'Marks': 4,
        'Negative Marks': 0,
        'Option A': '',
        'Option B': '',
        'Option C': '',
        'Option D': '',
        'Correct Answer': '',
        'Match Left 1': 'India',
        'Match Right 1': 'New Delhi',
        'Match Left 2': 'USA',
        'Match Right 2': 'Washington DC',
        'Match Left 3': 'Japan',
        'Match Right 3': 'Tokyo',
        'Match Left 4': 'Australia',
        'Match Right 4': 'Canberra',
        'Answer Option 1': '',
        'Answer Option 2': '',
        'Answer Option 3': '',
        'Answer Option 4': '',
      },
      {
        'Question Text': 'Which of the following are prime numbers?',
        'Class Name': 'Class 10',
        'Subject Name': 'Mathematics',
        'Lesson Name': 'Number Theory',
        'Question Type': 'multiple_response',
        'Difficulty': 'medium',
        'Marks': 2,
        'Negative Marks': 0,
        'Option A': '2',
        'Option B': '4',
        'Option C': '7',
        'Option D': '9',
        'Correct Answer': 'A,C',
        'Match Left 1': '',
        'Match Right 1': '',
        'Match Left 2': '',
        'Match Right 2': '',
        'Match Left 3': '',
        'Match Right 3': '',
        'Match Left 4': '',
        'Match Right 4': '',
        'Answer Option 1': 'A and C only',
        'Answer Option 2': 'A only',
        'Answer Option 3': 'C only',
        'Answer Option 4': 'All of the above',
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Questions');

    // Set column widths
    ws['!cols'] = [
      { wch: 50 }, // Question Text
      { wch: 15 }, // Class Name
      { wch: 15 }, // Subject Name
      { wch: 20 }, // Lesson Name
      { wch: 18 }, // Question Type
      { wch: 12 }, // Difficulty
      { wch: 8 },  // Marks
      { wch: 15 }, // Negative Marks
      { wch: 30 }, // Option A
      { wch: 30 }, // Option B
      { wch: 30 }, // Option C
      { wch: 30 }, // Option D
      { wch: 30 }, // Correct Answer
      { wch: 20 }, // Match Left 1
      { wch: 20 }, // Match Right 1
      { wch: 20 }, // Match Left 2
      { wch: 20 }, // Match Right 2
      { wch: 20 }, // Match Left 3
      { wch: 20 }, // Match Right 3
      { wch: 20 }, // Match Left 4
      { wch: 20 }, // Match Right 4
      { wch: 30 }, // Answer Option 1
      { wch: 30 }, // Answer Option 2
      { wch: 30 }, // Answer Option 3
      { wch: 30 }, // Answer Option 4
    ];

    XLSX.writeFile(wb, 'question_bank_template.xlsx');

    toast({
      title: 'Template Downloaded',
      description: 'Please fill in the template and upload it back.',
    });
  };

  const validateQuestion = (q: ParsedQuestion, index: number): ValidationError[] => {
    const errors: ValidationError[] = [];
    const row = index + 2; // +2 because Excel rows start at 1 and we have a header row

    // Required fields
    if (!q.question_text?.trim()) {
      errors.push({ row, field: 'Question Text', message: 'Question text is required' });
    }

    if (!q.class_name?.trim()) {
      errors.push({ row, field: 'Class Name', message: 'Class name is required' });
    }

    if (!q.subject_name?.trim()) {
      errors.push({ row, field: 'Subject Name', message: 'Subject name is required' });
    }

    // Validate question type
    const validTypes = ['mcq', 'true_false', 'short_answer', 'match_following', 'multiple_response'];
    if (!validTypes.includes(q.question_type?.toLowerCase())) {
      errors.push({
        row,
        field: 'Question Type',
        message: `Invalid question type. Must be one of: ${validTypes.join(', ')}`,
      });
    }

    // Validate difficulty
    const validDifficulties = ['easy', 'medium', 'hard'];
    if (!validDifficulties.includes(q.difficulty?.toLowerCase())) {
      errors.push({
        row,
        field: 'Difficulty',
        message: `Invalid difficulty. Must be one of: ${validDifficulties.join(', ')}`,
      });
    }

    // Validate marks
    if (!q.marks || q.marks <= 0) {
      errors.push({ row, field: 'Marks', message: 'Marks must be greater than 0' });
    }

    // Type-specific validation
    const questionType = q.question_type?.toLowerCase();

    if (questionType === 'mcq' || questionType === 'multiple_response') {
      if (!q.option_a?.trim() || !q.option_b?.trim()) {
        errors.push({ row, field: 'Options', message: 'At least 2 options (A and B) are required for MCQ' });
      }
      if (!q.correct_answer?.trim()) {
        errors.push({ row, field: 'Correct Answer', message: 'Correct answer is required' });
      }
    }

    if (questionType === 'true_false') {
      const answer = q.correct_answer?.toLowerCase();
      if (answer !== 'true' && answer !== 'false') {
        errors.push({ row, field: 'Correct Answer', message: 'Correct answer must be "True" or "False"' });
      }
    }

    if (questionType === 'match_following') {
      if (!q.match_left_1?.trim() || !q.match_right_1?.trim()) {
        errors.push({ row, field: 'Match Pairs', message: 'At least one match pair is required' });
      }
    }

    // Check if class exists
    const classExists = classes.some(c => c.class_name.toLowerCase() === q.class_name?.toLowerCase());
    if (!classExists) {
      errors.push({ row, field: 'Class Name', message: `Class "${q.class_name}" not found in system` });
    }

    // Check if subject exists
    const subjectExists = subjects.some(s => s.subject_name.toLowerCase() === q.subject_name?.toLowerCase());
    if (!subjectExists) {
      errors.push({ row, field: 'Subject Name', message: `Subject "${q.subject_name}" not found in system` });
    }

    return errors;
  };

  const parseExcelFile = (file: File): Promise<ParsedQuestion[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

          const parsedQuestions: ParsedQuestion[] = jsonData.map((row, index) => ({
            row: index + 2,
            question_text: row['Question Text'] || '',
            class_name: row['Class Name'] || '',
            subject_name: row['Subject Name'] || '',
            lesson_name: row['Lesson Name'] || '',
            question_type: (row['Question Type'] || '').toLowerCase(),
            difficulty: (row['Difficulty'] || '').toLowerCase(),
            marks: Number(row['Marks']) || 1,
            negative_marks: Number(row['Negative Marks']) || 0,
            option_a: row['Option A'] || '',
            option_b: row['Option B'] || '',
            option_c: row['Option C'] || '',
            option_d: row['Option D'] || '',
            correct_answer: row['Correct Answer'] || '',
            match_left_1: row['Match Left 1'] || '',
            match_right_1: row['Match Right 1'] || '',
            match_left_2: row['Match Left 2'] || '',
            match_right_2: row['Match Right 2'] || '',
            match_left_3: row['Match Left 3'] || '',
            match_right_3: row['Match Right 3'] || '',
            match_left_4: row['Match Left 4'] || '',
            match_right_4: row['Match Right 4'] || '',
            answer_option_1: row['Answer Option 1'] || '',
            answer_option_2: row['Answer Option 2'] || '',
            answer_option_3: row['Answer Option 3'] || '',
            answer_option_4: row['Answer Option 4'] || '',
          }));

          resolve(parsedQuestions);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload an Excel file (.xlsx or .xls)',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    setProgress(0);
    setValidationErrors([]);
    setSuccessCount(0);

    try {
      // Parse the file
      setProgress(10);
      const parsedQuestions = await parseExcelFile(file);

      if (parsedQuestions.length === 0) {
        toast({
          title: 'Empty File',
          description: 'The uploaded file contains no questions',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      // Validate all questions
      setProgress(20);
      const allErrors: ValidationError[] = [];
      parsedQuestions.forEach((q, index) => {
        const errors = validateQuestion(q, index);
        allErrors.push(...errors);
      });

      if (allErrors.length > 0) {
        setValidationErrors(allErrors);
        toast({
          title: 'Validation Errors',
          description: `Found ${allErrors.length} validation errors. Please fix them and try again.`,
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      // Upload questions
      let successfulUploads = 0;
      const totalQuestions = parsedQuestions.length;

      for (let i = 0; i < parsedQuestions.length; i++) {
        const q = parsedQuestions[i];
        const progressPercent = 20 + ((i + 1) / totalQuestions) * 80;
        setProgress(progressPercent);

        try {
          // Find class and subject IDs
          const classObj = classes.find(c => c.class_name.toLowerCase() === q.class_name.toLowerCase());
          const subjectObj = subjects.find(s => s.subject_name.toLowerCase() === q.subject_name.toLowerCase());

          if (!classObj || !subjectObj) {
            continue; // Skip this question
          }

          // Find lesson ID if lesson name is provided
          let lessonId: string | null = null;
          if (q.lesson_name?.trim()) {
            const lessonObj = lessons.find(
              l => l.lesson_name.toLowerCase() === q.lesson_name?.toLowerCase() && l.subject_id === subjectObj.id
            );
            lessonId = lessonObj?.id || null;
          }

          // Prepare question data based on type
          let options: string[] | { left: string; right: string }[] | null = null;
          let answerOptions: string[] | null = null;
          let correctAnswer = q.correct_answer;

          if (q.question_type === 'mcq' || q.question_type === 'multiple_response') {
            options = [q.option_a, q.option_b, q.option_c, q.option_d].filter(opt => opt?.trim());
          }

          if (q.question_type === 'match_following') {
            const matchPairs = [];
            if (q.match_left_1?.trim() && q.match_right_1?.trim()) {
              matchPairs.push({ left: q.match_left_1, right: q.match_right_1 });
            }
            if (q.match_left_2?.trim() && q.match_right_2?.trim()) {
              matchPairs.push({ left: q.match_left_2, right: q.match_right_2 });
            }
            if (q.match_left_3?.trim() && q.match_right_3?.trim()) {
              matchPairs.push({ left: q.match_left_3, right: q.match_right_3 });
            }
            if (q.match_left_4?.trim() && q.match_right_4?.trim()) {
              matchPairs.push({ left: q.match_left_4, right: q.match_right_4 });
            }
            options = matchPairs;
            correctAnswer = ''; // Match following doesn't use correct_answer field
          }

          if (q.question_type === 'multiple_response') {
            answerOptions = [q.answer_option_1, q.answer_option_2, q.answer_option_3, q.answer_option_4].filter(
              opt => opt?.trim()
            );
          }

          // Create question
          await questionApi.createQuestion({
            question_text: q.question_text,
            subject_id: subjectObj.id,
            lesson_id: lessonId,
            question_type: q.question_type as any,
            difficulty: q.difficulty as any,
            marks: q.marks,
            negative_marks: q.negative_marks,
            options,
            answer_options: answerOptions,
            correct_answer: correctAnswer,
            bank_name: null,
            image_url: null,
          });

          successfulUploads++;
        } catch (error) {
          console.error(`Error uploading question at row ${q.row}:`, error);
        }
      }

      setSuccessCount(successfulUploads);
      setProgress(100);

      toast({
        title: 'Upload Complete',
        description: `Successfully uploaded ${successfulUploads} out of ${totalQuestions} questions`,
      });

      // Reset file input
      event.target.value = '';

      // Refresh the question list
      setTimeout(() => {
        onUploadComplete();
        if (successfulUploads === totalQuestions) {
          onOpenChange(false);
        }
      }, 2000);
    } catch (error: any) {
      console.error('Error processing file:', error);
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to process the uploaded file',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Bulk Upload Questions
          </DialogTitle>
          <DialogDescription>
            Upload multiple questions at once using an Excel file. All question types (MCQ, True/False, Short Answer,
            Match Following, Multiple Response) can be uploaded in the same file.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Download Template Section */}
          <div className="border rounded-lg p-4 bg-muted/50">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Step 1: Download Template
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Download the Excel template with sample questions for all question types.
            </p>
            <Button onClick={downloadTemplate} variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>

          {/* Upload Section */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Step 2: Upload Filled Template
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Fill in the template with your questions and upload it here.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                disabled={uploading}
                className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
              />
            </div>
          </div>

          {/* Progress Section */}
          {uploading && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="font-semibold mb-2">Uploading Questions...</h3>
              <Progress value={progress} className="mb-2" />
              <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
            </div>
          )}

          {/* Success Message */}
          {successCount > 0 && !uploading && (
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Successfully uploaded {successCount} questions!
              </AlertDescription>
            </Alert>
          )}

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="border rounded-lg p-4 bg-destructive/10 max-h-60 overflow-y-auto">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-destructive">
                <AlertCircle className="w-4 h-4" />
                Validation Errors ({validationErrors.length})
              </h3>
              <div className="space-y-2">
                {validationErrors.slice(0, 10).map((error, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">Row {error.row}:</span>{' '}
                    <span className="text-muted-foreground">{error.field}</span> - {error.message}
                  </div>
                ))}
                {validationErrors.length > 10 && (
                  <p className="text-sm text-muted-foreground">
                    ... and {validationErrors.length - 10} more errors
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="border rounded-lg p-4 bg-muted/50">
            <h3 className="font-semibold mb-2">Important Notes:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>All question types can be uploaded in the same file</li>
              <li>Class Name and Subject Name must match existing entries in the system</li>
              <li>Lesson Name is optional but must match existing lessons if provided</li>
              <li>Question Type must be: mcq, true_false, short_answer, match_following, or multiple_response</li>
              <li>Difficulty must be: easy, medium, or hard</li>
              <li>For MCQ: Fill Option A, B, C, D and Correct Answer</li>
              <li>For True/False: Correct Answer must be "True" or "False"</li>
              <li>For Match Following: Fill Match Left and Match Right columns</li>
              <li>For Multiple Response: Fill Options, Correct Answer (e.g., "A,C"), and Answer Options</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={uploading}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
