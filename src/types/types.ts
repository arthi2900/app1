export type UserRole = 'admin' | 'principal' | 'teacher' | 'student';
export type QuestionType = 'mcq' | 'true_false' | 'short_answer' | 'match_following' | 'multiple_response';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type SessionStatus = 'active' | 'idle' | 'logged_out';

export interface MatchPair {
  left: string;
  right: string;
}

export interface LoginHistory {
  id: string;
  user_id: string;
  username: string;
  full_name: string | null;
  role: UserRole;
  school_id: string | null;
  login_time: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface LoginHistoryWithSchool extends LoginHistory {
  school_name?: string | null;
}

export interface ActiveSession {
  id: string;
  user_id: string;
  username: string;
  full_name: string | null;
  role: UserRole;
  school_id: string | null;
  login_time: string;
  last_activity: string;
  ip_address: string | null;
  user_agent: string | null;
  status: SessionStatus;
  created_at: string;
  updated_at: string;
}

export interface ActiveSessionWithSchool extends ActiveSession {
  school_name?: string | null;
}

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  school_name: string | null;
  school_id: string | null;
  role: UserRole;
  approved: boolean;
  suspended: boolean;
  created_at: string;
}

export interface School {
  id: string;
  school_name: string;
  school_address: string;
  contact_number: string;
  email: string;
  school_code: string;
  affiliation_board: string;
  class_range_from: number;
  class_range_to: number;
  subjects_offered: string[];
  principal_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  school_id: string | null;
  class_id: string | null;
  subject_name: string;
  subject_code: string;
  description: string | null;
  created_at: string;
}

export interface Question {
  id: string;
  subject_id: string;
  lesson_id: string | null;
  question_text: string;
  question_type: QuestionType;
  options: string[] | MatchPair[] | null;
  answer_options: string[] | null; // For multiple_response: answer choices like "(i) A and C only"
  correct_answer: string;
  marks: number;
  negative_marks: number;
  difficulty: DifficultyLevel;
  bank_name: string | null;
  image_url: string | null;
  created_by: string | null;
  created_at: string;
  is_global?: boolean;
  source_question_id?: string | null;
  match_pairs?: MatchPair[] | null;
}

export interface QuestionWithSubject extends Question {
  subjects?: Subject;
}

export interface Lesson {
  id: string;
  subject_id: string;
  lesson_name: string;
  lesson_code: string | null;
  created_at: string;
}

// Academic Management Types
export interface Class {
  id: string;
  school_id: string;
  class_name: string;
  class_code: string;
  description: string | null;
  created_at: string;
}

export interface Section {
  id: string;
  class_id: string;
  section_name: string;
  section_code: string;
  created_at: string;
}

export interface AcademicSubject {
  id: string;
  school_id: string;
  class_id: string;
  subject_name: string;
  subject_code: string;
  description: string | null;
  created_at: string;
}

export interface StudentClassSection {
  id: string;
  student_id: string;
  class_id: string;
  section_id: string;
  academic_year: string;
  created_at: string;
}

export interface TeacherAssignment {
  id: string;
  teacher_id: string;
  subject_id: string;
  class_id: string;
  section_id: string;
  academic_year: string;
  created_at: string;
}

// Extended types with relations
export interface ClassWithSections extends Class {
  sections?: Section[];
  subjects?: AcademicSubject[];
}

export interface SectionWithDetails extends Section {
  class?: Class;
  students_count?: number;
  teachers_count?: number;
}

export interface AcademicSubjectWithDetails extends AcademicSubject {
  class?: Class;
}

export interface StudentClassSectionWithDetails extends StudentClassSection {
  student?: Profile;
  class?: Class;
  section?: Section;
}

export interface TeacherAssignmentWithDetails extends TeacherAssignment {
  teacher?: Profile;
  subject?: AcademicSubject;
  class?: Class;
  section?: Section;
}

// Question Paper Types
export type QuestionPaperStatus = 'draft' | 'final';

export interface DifficultyDistribution {
  easy: number;
  medium: number;
  hard: number;
}

export interface QuestionPaper {
  id: string;
  school_id: string;
  class_id: string;
  subject_id: string;
  title: string;
  status: QuestionPaperStatus;
  shuffle_questions: boolean;
  shuffle_mcq_options: boolean;
  total_marks: number;
  created_by: string;
  template_id: string | null;
  difficulty_distribution: DifficultyDistribution;
  lesson_coverage: string[];
  has_versions: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuestionPaperQuestion {
  id: string;
  question_paper_id: string;
  question_id: string;
  display_order: number;
  shuffled_options: string[] | MatchPair[] | null;
  shuffled_answer_options: string[] | null; // For multiple_response: shuffled answer choices
  created_at: string;
}

export interface QuestionPaperWithDetails extends QuestionPaper {
  class?: Class;
  subject?: Subject;
  questions?: QuestionPaperQuestionWithDetails[];
}

export interface QuestionPaperQuestionWithDetails extends QuestionPaperQuestion {
  question?: Question;
}

// Exam Types
export type ExamStatus = 'draft' | 'pending_approval' | 'approved' | 'published' | 'completed';
export type AttemptStatus = 'not_started' | 'in_progress' | 'submitted' | 'evaluated';

export interface Exam {
  id: string;
  question_paper_id: string;
  title: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  total_marks: number;
  passing_marks: number;
  instructions: string | null;
  status: ExamStatus;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExamWithDetails extends Exam {
  question_paper?: QuestionPaper | null;
  class?: Class | null;
  subject?: Subject | null;
  teacher?: Profile | null;
  approver?: Profile | null;
}

export interface ExamAttempt {
  id: string;
  exam_id: string;
  student_id: string;
  started_at: string | null;
  submitted_at: string | null;
  status: AttemptStatus;
  total_marks_obtained: number;
  percentage: number;
  result: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExamAttemptWithDetails extends ExamAttempt {
  exam?: ExamWithDetails | null;
  student?: Profile | null;
}

export interface StudentExamAllocation {
  student_id: string;
  student_name: string;
  username: string;
  section_name: string;
  status: AttemptStatus;
  total_marks_obtained: number;
  percentage: number;
  result: string | null;
  started_at: string | null;
  submitted_at: string | null;
  attempt_id: string | null;
}

export interface ExamAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  student_answer: any;
  is_correct: boolean | null;
  marks_obtained: number;
  marks_allocated: number;
  evaluated_by: string | null;
  evaluated_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExamStudentAllocation {
  id: string;
  exam_id: string;
  student_id: string;
  created_at: string;
  updated_at: string;
}

export interface ExamStudentAllocationWithDetails extends ExamStudentAllocation {
  student?: Profile | null;
  exam?: ExamWithDetails | null;
}

export interface ExamAnswerWithDetails extends ExamAnswer {
  question?: Question | null;
  evaluator?: Profile | null;
}

// Question Paper Template Types
export interface QuestionPaperTemplate {
  id: string;
  school_id: string;
  name: string;
  description: string | null;
  class_id: string;
  subject_id: string;
  difficulty_distribution: DifficultyDistribution;
  total_marks: number;
  shuffle_questions: boolean;
  shuffle_mcq_options: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface QuestionPaperTemplateWithDetails extends QuestionPaperTemplate {
  class?: Class;
  subject?: Subject;
}

// Question Paper Version Types
export type VersionLabel = 'A' | 'B' | 'C' | 'D';

export interface QuestionPaperVersion {
  id: string;
  question_paper_id: string;
  version_label: VersionLabel;
  shuffled_question_order: string[];
  answer_key: Record<string, string | string[]>;
  created_at: string;
}

export interface QuestionPaperVersionWithDetails extends QuestionPaperVersion {
  question_paper?: QuestionPaper;
}
