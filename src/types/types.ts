export type UserRole = 'admin' | 'principal' | 'teacher' | 'student';
export type QuestionType = 'mcq' | 'true_false' | 'short_answer';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type ExamStatus = 'draft' | 'pending_approval' | 'approved' | 'published' | 'completed';
export type AttemptStatus = 'in_progress' | 'submitted' | 'evaluated';

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
  question_text: string;
  question_type: QuestionType;
  options: string[] | null;
  correct_answer: string;
  marks: number;
  difficulty: DifficultyLevel;
  created_by: string | null;
  created_at: string;
}

export interface Exam {
  id: string;
  title: string;
  subject_id: string;
  duration_minutes: number;
  total_marks: number;
  pass_marks: number;
  instructions: string | null;
  status: ExamStatus;
  created_by: string | null;
  approved_by: string | null;
  created_at: string;
  approved_at: string | null;
}

export interface ExamQuestion {
  id: string;
  exam_id: string;
  question_id: string;
  question_order: number;
  created_at: string;
}

export interface ExamSchedule {
  id: string;
  exam_id: string;
  start_time: string;
  end_time: string;
  created_by: string | null;
  created_at: string;
}

export interface ExamAttempt {
  id: string;
  exam_id: string;
  student_id: string;
  started_at: string;
  submitted_at: string | null;
  score: number | null;
  total_marks: number | null;
  status: AttemptStatus;
  time_taken_minutes: number | null;
}

export interface ExamAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  answer: string | null;
  is_correct: boolean | null;
  marks_obtained: number;
  created_at: string;
}

export interface ExamWithDetails extends Exam {
  subject?: Subject;
  schedule?: ExamSchedule;
  questions_count?: number;
}

export interface QuestionWithSubject extends Question {
  subjects?: Subject;
}

export interface AttemptWithDetails extends ExamAttempt {
  exam?: Exam;
  student?: Profile;
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
