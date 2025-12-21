export type UserRole = 'admin' | 'principal' | 'teacher' | 'student';
export type QuestionType = 'mcq' | 'true_false' | 'short_answer' | 'match_following' | 'multiple_response';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface MatchPair {
  left: string;
  right: string;
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
  correct_answer: string;
  marks: number;
  negative_marks: number;
  difficulty: DifficultyLevel;
  bank_name: string | null;
  image_url: string | null;
  created_by: string | null;
  created_at: string;
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
