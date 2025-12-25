import { supabase } from './supabase';
import type {
  Profile,
  School,
  Subject,
  Question,
  QuestionWithSubject,
  Lesson,
  Class,
  Section,
  AcademicSubject,
  StudentClassSection,
  TeacherAssignment,
  StudentClassSectionWithDetails,
  TeacherAssignmentWithDetails,
  QuestionPaper,
  QuestionPaperQuestion,
  QuestionPaperWithDetails,
  QuestionPaperQuestionWithDetails,
  QuestionPaperTemplate,
  QuestionPaperTemplateWithDetails,
  QuestionPaperVersion,
  QuestionPaperVersionWithDetails,
  Exam,
  ExamStatus,
  ExamWithDetails,
  ExamAttempt,
  ExamAttemptWithDetails,
  ExamAnswer,
  ExamAnswerWithDetails,
} from '@/types/types';

// Profile APIs
export const profileApi = {
  async getCurrentProfile(): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        schools!profiles_school_id_fkey (
          school_name,
          school_code
        )
      `)
      .eq('id', (await supabase.auth.getUser()).data.user?.id || '')
      .maybeSingle();
    if (error) throw error;
    
    if (!data) return null;
    
    return {
      ...data,
      school_name: data.schools?.school_name || null,
      school_code: data.schools?.school_code || null,
      schools: undefined
    };
  },

  async getAllProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        schools!profiles_school_id_fkey (
          school_name
        )
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    
    const profiles = Array.isArray(data) ? data : [];
    return profiles.map((profile: any) => ({
      ...profile,
      school_name: profile.schools?.school_name || null,
      schools: undefined
    }));
  },

  async updateProfile(id: string, updates: Partial<Profile>): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getProfilesByRole(role: string): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', role)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async toggleSuspend(id: string, suspended: boolean): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update({ suspended })
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async approveUser(id: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update({ approved: true })
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async rejectUser(id: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async getTeachersBySchoolId(schoolId: string): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        schools!profiles_school_id_fkey (
          school_name
        )
      `)
      .eq('role', 'teacher')
      .eq('school_id', schoolId)
      .eq('approved', true)
      .order('full_name', { ascending: true });
    if (error) throw error;
    
    const profiles = Array.isArray(data) ? data : [];
    return profiles.map((profile: any) => ({
      ...profile,
      school_name: profile.schools?.school_name || null,
      schools: undefined
    }));
  },

  async getStudentsBySchoolId(schoolId: string): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        schools!profiles_school_id_fkey (
          school_name
        )
      `)
      .eq('role', 'student')
      .eq('school_id', schoolId)
      .eq('approved', true)
      .order('full_name', { ascending: true });
    if (error) throw error;
    
    const profiles = Array.isArray(data) ? data : [];
    return profiles.map((profile: any) => ({
      ...profile,
      school_name: profile.schools?.school_name || null,
      schools: undefined
    }));
  },

  async getStudentsWithClassSection(schoolId: string, academicYear: string = '2024-2025'): Promise<any[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        schools!profiles_school_id_fkey (
          school_name
        ),
        student_class_sections!student_class_sections_student_id_fkey (
          id,
          academic_year,
          class:classes!student_class_sections_class_id_fkey (
            id,
            class_name,
            class_code
          ),
          section:sections!student_class_sections_section_id_fkey (
            id,
            section_name,
            section_code
          )
        )
      `)
      .eq('role', 'student')
      .eq('school_id', schoolId)
      .eq('approved', true)
      .order('full_name', { ascending: true});
    if (error) throw error;
    
    const profiles = Array.isArray(data) ? data : [];
    return profiles.map((profile: any) => {
      const classSection = profile.student_class_sections?.find(
        (scs: any) => scs.academic_year === academicYear
      );
      return {
        ...profile,
        school_name: profile.schools?.school_name || null,
        class_name: classSection?.class?.class_name || null,
        class_code: classSection?.class?.class_code || null,
        class_id: classSection?.class?.id || null,
        section_name: classSection?.section?.section_name || null,
        section_code: classSection?.section?.section_code || null,
        section_id: classSection?.section?.id || null,
        schools: undefined,
        student_class_sections: undefined
      };
    });
  },
};

// School APIs
export const schoolApi = {
  async getAllSchools(): Promise<School[]> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .order('school_name', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getSchoolById(id: string): Promise<School | null> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async createSchool(school: Omit<School, 'id' | 'school_code' | 'created_at' | 'updated_at'>): Promise<School | null> {
    const { data, error } = await supabase
      .from('schools')
      .insert(school)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateSchool(id: string, updates: Partial<School>): Promise<School | null> {
    const { data, error } = await supabase
      .from('schools')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async deleteSchool(id: string): Promise<void> {
    const { error } = await supabase
      .from('schools')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async getSchoolByPrincipalId(principalId: string): Promise<School | null> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('principal_id', principalId)
      .maybeSingle();
    if (error) throw error;
    return data;
  },
};

// Subject APIs
export const subjectApi = {
  async getAllSubjects(): Promise<Subject[]> {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('subject_name', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getTeacherAssignedSubjects(teacherId: string, classId?: string): Promise<Subject[]> {
    let query = supabase
      .from('teacher_assignments')
      .select('subject:subjects(*)')
      .eq('teacher_id', teacherId);

    if (classId) {
      query = query.eq('class_id', classId);
    }

    const { data, error } = await query;
    if (error) throw error;

    // Extract unique subjects from assignments
    const subjectsMap = new Map<string, Subject>();
    if (Array.isArray(data)) {
      data.forEach((assignment: any) => {
        if (assignment.subject && assignment.subject.id) {
          subjectsMap.set(assignment.subject.id, assignment.subject);
        }
      });
    }

    return Array.from(subjectsMap.values()).sort((a, b) => 
      a.subject_name.localeCompare(b.subject_name)
    );
  },

  async createSubject(subject: Omit<Subject, 'id' | 'created_at'>): Promise<Subject | null> {
    const { data, error } = await supabase
      .from('subjects')
      .insert(subject)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateSubject(id: string, updates: Partial<Subject>): Promise<Subject | null> {
    const { data, error } = await supabase
      .from('subjects')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async deleteSubject(id: string): Promise<void> {
    const { error } = await supabase.from('subjects').delete().eq('id', id);
    if (error) throw error;
  },
};

// Question APIs
export const questionApi = {
  async getAllQuestions(): Promise<QuestionWithSubject[]> {
    const { data, error } = await supabase
      .from('questions')
      .select(`
        *,
        subjects (
          id,
          subject_name,
          subject_code,
          class_id
        )
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getQuestionsBySubject(subjectId: string): Promise<Question[]> {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('subject_id', subjectId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createQuestion(question: Omit<Question, 'id' | 'created_at' | 'created_by'>): Promise<Question | null> {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('questions')
      .insert({ ...question, created_by: user.data.user?.id })
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateQuestion(id: string, updates: Partial<Question>): Promise<Question | null> {
    const { data, error } = await supabase
      .from('questions')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async deleteQuestion(id: string): Promise<void> {
    const { error } = await supabase.from('questions').delete().eq('id', id);
    if (error) throw error;
  },

  async getTeacherQuestionBankNames(): Promise<string[]> {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('questions')
      .select('bank_name')
      .eq('created_by', user.data.user?.id)
      .not('bank_name', 'is', null)
      .order('bank_name', { ascending: true });
    
    if (error) throw error;
    
    const uniqueBankNames = Array.from(new Set(
      (Array.isArray(data) ? data : [])
        .map(q => q.bank_name)
        .filter((name): name is string => name !== null)
    ));
    
    return uniqueBankNames;
  },

  async getQuestionsByBankName(bankName: string): Promise<Question[]> {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('created_by', user.data.user?.id)
      .eq('bank_name', bankName)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getTeacherQuestionsBySubject(subjectId: string): Promise<Question[]> {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('created_by', user.data.user?.id)
      .eq('subject_id', subjectId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },
};

// Lesson APIs
export const lessonApi = {
  async getAllLessons(): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('lesson_name', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getLessonsBySubject(subjectId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('subject_id', subjectId)
      .order('lesson_name', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createLesson(lesson: Omit<Lesson, 'id' | 'created_at'>): Promise<Lesson | null> {
    const { data, error } = await supabase
      .from('lessons')
      .insert(lesson)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateLesson(id: string, updates: Partial<Lesson>): Promise<Lesson | null> {
    const { data, error } = await supabase
      .from('lessons')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async deleteLesson(id: string): Promise<void> {
    const { error } = await supabase.from('lessons').delete().eq('id', id);
    if (error) throw error;
  },
};

// Academic Management APIs
export const academicApi = {
  // Class APIs
  async getAllClasses(): Promise<Class[]> {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('class_code', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getClassesBySchoolId(schoolId: string): Promise<Class[]> {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .eq('school_id', schoolId)
      .order('class_code', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getTeacherAssignedClasses(teacherId: string): Promise<Class[]> {
    const { data, error } = await supabase
      .from('teacher_assignments')
      .select('class:classes(*)')
      .eq('teacher_id', teacherId);

    if (error) throw error;

    // Extract unique classes from assignments
    const classesMap = new Map<string, Class>();
    if (Array.isArray(data)) {
      data.forEach((assignment: any) => {
        if (assignment.class && assignment.class.id) {
          classesMap.set(assignment.class.id, assignment.class);
        }
      });
    }

    return Array.from(classesMap.values()).sort((a, b) => 
      a.class_code.localeCompare(b.class_code)
    );
  },

  async createClass(classData: Omit<Class, 'id' | 'created_at'>): Promise<Class | null> {
    const { data, error } = await supabase
      .from('classes')
      .insert(classData)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateClass(id: string, updates: Partial<Class>): Promise<Class | null> {
    const { data, error } = await supabase
      .from('classes')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async deleteClass(id: string): Promise<void> {
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // Section APIs
  async getSectionsByClassId(classId: string): Promise<Section[]> {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .eq('class_id', classId)
      .order('section_code', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createSection(sectionData: Omit<Section, 'id' | 'created_at'>): Promise<Section | null> {
    const { data, error } = await supabase
      .from('sections')
      .insert(sectionData)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateSection(id: string, updates: Partial<Section>): Promise<Section | null> {
    const { data, error } = await supabase
      .from('sections')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async deleteSection(id: string): Promise<void> {
    const { error } = await supabase
      .from('sections')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // Subject APIs
  async getSubjectsBySchoolId(schoolId: string): Promise<AcademicSubject[]> {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('school_id', schoolId)
      .order('subject_name', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getSubjectsByClassId(classId: string): Promise<AcademicSubject[]> {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('class_id', classId)
      .order('subject_name', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createSubject(subjectData: Omit<AcademicSubject, 'id' | 'created_at'>): Promise<AcademicSubject | null> {
    const { data, error } = await supabase
      .from('subjects')
      .insert(subjectData)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateSubject(id: string, updates: Partial<AcademicSubject>): Promise<AcademicSubject | null> {
    const { data, error } = await supabase
      .from('subjects')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async deleteSubject(id: string): Promise<void> {
    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // Student Class Section APIs
  async getStudentClassSection(studentId: string, academicYear: string): Promise<StudentClassSection | null> {
    const { data, error } = await supabase
      .from('student_class_sections')
      .select('*')
      .eq('student_id', studentId)
      .eq('academic_year', academicYear)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getStudentsByClassSection(classId: string, sectionId: string, academicYear: string): Promise<StudentClassSectionWithDetails[]> {
    const { data, error } = await supabase
      .from('student_class_sections')
      .select(`
        *,
        student:profiles!student_class_sections_student_id_fkey(*),
        class:classes!student_class_sections_class_id_fkey(*),
        section:sections!student_class_sections_section_id_fkey(*)
      `)
      .eq('class_id', classId)
      .eq('section_id', sectionId)
      .eq('academic_year', academicYear)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async assignStudentToClassSection(assignment: Omit<StudentClassSection, 'id' | 'created_at'>): Promise<StudentClassSection | null> {
    const { data, error } = await supabase
      .from('student_class_sections')
      .upsert(assignment, { onConflict: 'student_id,academic_year' })
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async removeStudentFromClassSection(studentId: string, academicYear: string): Promise<void> {
    const { error } = await supabase
      .from('student_class_sections')
      .delete()
      .eq('student_id', studentId)
      .eq('academic_year', academicYear);
    if (error) throw error;
  },

  // Teacher Assignment APIs
  async getTeacherAssignments(teacherId: string, academicYear: string): Promise<TeacherAssignmentWithDetails[]> {
    const { data, error } = await supabase
      .from('teacher_assignments')
      .select(`
        *,
        teacher:profiles!teacher_assignments_teacher_id_fkey(*),
        subject:subjects!teacher_assignments_subject_id_fkey(*),
        class:classes!teacher_assignments_class_id_fkey(*),
        section:sections!teacher_assignments_section_id_fkey(*)
      `)
      .eq('teacher_id', teacherId)
      .eq('academic_year', academicYear)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getAssignmentsByClassSection(classId: string, sectionId: string, academicYear: string): Promise<TeacherAssignmentWithDetails[]> {
    const { data, error } = await supabase
      .from('teacher_assignments')
      .select(`
        *,
        teacher:profiles!teacher_assignments_teacher_id_fkey(*),
        subject:subjects!teacher_assignments_subject_id_fkey(*),
        class:classes!teacher_assignments_class_id_fkey(*),
        section:sections!teacher_assignments_section_id_fkey(*)
      `)
      .eq('class_id', classId)
      .eq('section_id', sectionId)
      .eq('academic_year', academicYear)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createTeacherAssignment(assignment: Omit<TeacherAssignment, 'id' | 'created_at'>): Promise<TeacherAssignment | null> {
    const { data, error } = await supabase
      .from('teacher_assignments')
      .insert(assignment)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async deleteTeacherAssignment(id: string): Promise<void> {
    const { error } = await supabase
      .from('teacher_assignments')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // Question Paper API
  async getQuestionPapers(status?: 'draft' | 'final'): Promise<QuestionPaperWithDetails[]> {
    let query = supabase
      .from('question_papers')
      .select(`
        *,
        class:classes(*),
        subject:subjects(*)
      `)
      .order('created_at', { ascending: false });
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getQuestionPaperById(id: string): Promise<QuestionPaperWithDetails | null> {
    const { data, error } = await supabase
      .from('question_papers')
      .select(`
        *,
        class:classes(*),
        subject:subjects(*)
      `)
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async createQuestionPaper(paper: Omit<QuestionPaper, 'id' | 'created_at' | 'updated_at' | 'total_marks'>): Promise<QuestionPaper | null> {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('question_papers')
      .insert({ ...paper, created_by: user.data.user?.id })
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateQuestionPaper(id: string, updates: Partial<QuestionPaper>): Promise<QuestionPaper | null> {
    const { data, error } = await supabase
      .from('question_papers')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async deleteQuestionPaper(id: string): Promise<void> {
    const { error } = await supabase
      .from('question_papers')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async getQuestionPaperQuestions(questionPaperId: string): Promise<QuestionPaperQuestionWithDetails[]> {
    const { data, error } = await supabase
      .from('question_paper_questions')
      .select(`
        *,
        question:questions(*)
      `)
      .eq('question_paper_id', questionPaperId)
      .order('display_order', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async addQuestionToPaper(paperQuestion: Omit<QuestionPaperQuestion, 'id' | 'created_at'>): Promise<QuestionPaperQuestion | null> {
    const { data, error } = await supabase
      .from('question_paper_questions')
      .insert(paperQuestion)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async removeQuestionFromPaper(id: string): Promise<void> {
    const { error } = await supabase
      .from('question_paper_questions')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async updateQuestionPaperQuestion(id: string, updates: Partial<QuestionPaperQuestion>): Promise<QuestionPaperQuestion | null> {
    const { data, error } = await supabase
      .from('question_paper_questions')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },
};

// Exam API
export const examApi = {
  async getExams(): Promise<ExamWithDetails[]> {
    const { data, error } = await supabase
      .from('exams')
      .select(`
        *,
        question_paper:question_papers(*),
        class:classes(*),
        subject:subjects(*),
        teacher:profiles!exams_teacher_id_fkey(*),
        approver:profiles!exams_approved_by_fkey(*)
      `)
      .order('start_time', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getExamById(id: string): Promise<ExamWithDetails | null> {
    const { data, error } = await supabase
      .from('exams')
      .select(`
        *,
        question_paper:question_papers(*),
        class:classes(*),
        subject:subjects(*),
        teacher:profiles!exams_teacher_id_fkey(*),
        approver:profiles!exams_approved_by_fkey(*)
      `)
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getExamsByTeacher(teacherId: string): Promise<ExamWithDetails[]> {
    const { data, error } = await supabase
      .from('exams')
      .select(`
        *,
        question_paper:question_papers(*),
        class:classes(*),
        subject:subjects(*),
        teacher:profiles!exams_teacher_id_fkey(*),
        approver:profiles!exams_approved_by_fkey(*)
      `)
      .eq('teacher_id', teacherId)
      .order('start_time', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getPublishedExamsForStudent(classId: string): Promise<ExamWithDetails[]> {
    const { data, error } = await supabase
      .from('exams')
      .select(`
        *,
        question_paper:question_papers(*),
        class:classes(*),
        subject:subjects(*),
        teacher:profiles!exams_teacher_id_fkey(*)
      `)
      .eq('class_id', classId)
      .eq('status', 'published')
      .order('start_time', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createExam(exam: Omit<Exam, 'id' | 'created_at' | 'updated_at'>): Promise<Exam> {
    const { data, error } = await supabase
      .from('exams')
      .insert(exam)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateExam(id: string, updates: Partial<Exam>): Promise<Exam | null> {
    const { data, error } = await supabase
      .from('exams')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async deleteExam(id: string): Promise<void> {
    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async forceDeleteExam(id: string): Promise<{ success: boolean; message: string; attempts_deleted?: number }> {
    const { data, error } = await supabase
      .rpc('force_delete_exam', { exam_id: id });
    
    if (error) throw error;
    
    if (!data?.success) {
      throw new Error(data?.message || 'Failed to force delete exam');
    }
    
    return data;
  },

  async approveExam(examId: string, approverId: string): Promise<Exam | null> {
    const { data, error } = await supabase
      .from('exams')
      .update({
        status: 'approved',
        approved_by: approverId,
        approved_at: new Date().toISOString(),
      })
      .eq('id', examId)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async publishExam(examId: string): Promise<Exam | null> {
    const { data, error } = await supabase
      .from('exams')
      .update({ status: 'published' })
      .eq('id', examId)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateExamStatus(examId: string, status: ExamStatus): Promise<Exam | null> {
    const { data, error } = await supabase
      .from('exams')
      .update({ status })
      .eq('id', examId)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getExamsBySchool(schoolId: string): Promise<ExamWithDetails[]> {
    const { data, error } = await supabase
      .from('exams')
      .select(`
        *,
        question_paper:question_papers(*),
        class:classes(*),
        subject:subjects(*),
        teacher:profiles!exams_teacher_id_fkey(*),
        approver:profiles!exams_approved_by_fkey(*)
      `)
      .eq('class.school_id', schoolId)
      .order('start_time', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getExamsByClass(classId: string): Promise<ExamWithDetails[]> {
    const { data, error } = await supabase
      .from('exams')
      .select(`
        *,
        question_paper:question_papers(*),
        class:classes(*),
        subject:subjects(*),
        teacher:profiles!exams_teacher_id_fkey(*)
      `)
      .eq('class_id', classId)
      .eq('status', 'published')
      .order('start_time', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },
};

// Exam Attempt API
export const examAttemptApi = {
  async getAttemptsByExam(examId: string): Promise<ExamAttemptWithDetails[]> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .select(`
        *,
        exam:exams(*),
        student:profiles(*)
      `)
      .eq('exam_id', examId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getAttemptsByStudent(studentId: string): Promise<ExamAttemptWithDetails[]> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .select(`
        *,
        exam:exams(
          *,
          class:classes(*),
          subject:subjects(*),
          teacher:profiles(*)
        )
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getAttemptById(id: string): Promise<ExamAttemptWithDetails | null> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .select(`
        *,
        exam:exams(
          *,
          class:classes(*),
          subject:subjects(*),
          teacher:profiles(*)
        ),
        student:profiles(*)
      `)
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getOrCreateAttempt(examId: string, studentId: string): Promise<ExamAttempt> {
    const { data: existing, error: fetchError } = await supabase
      .from('exam_attempts')
      .select()
      .eq('exam_id', examId)
      .eq('student_id', studentId)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existing) {
      return existing;
    }

    const { data, error } = await supabase
      .from('exam_attempts')
      .insert({
        exam_id: examId,
        student_id: studentId,
        status: 'not_started',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async startAttempt(attemptId: string): Promise<ExamAttempt | null> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .update({
        status: 'in_progress',
        started_at: new Date().toISOString(),
      })
      .eq('id', attemptId)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async submitAttempt(attemptId: string): Promise<ExamAttempt | null> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .update({
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      })
      .eq('id', attemptId)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async markAsEvaluated(attemptId: string): Promise<ExamAttempt | null> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .update({ status: 'evaluated' })
      .eq('id', attemptId)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getAttemptByStudent(examId: string, studentId: string): Promise<ExamAttempt | null> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .select()
      .eq('exam_id', examId)
      .eq('student_id', studentId)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async createAttempt(attempt: Omit<ExamAttempt, 'id' | 'created_at' | 'updated_at'>): Promise<ExamAttempt> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .insert(attempt)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// Exam Answer API
export const examAnswerApi = {
  async getAnswersByAttempt(attemptId: string): Promise<ExamAnswerWithDetails[]> {
    const { data, error } = await supabase
      .from('exam_answers')
      .select(`
        *,
        question:questions(*),
        evaluator:profiles(*)
      `)
      .eq('attempt_id', attemptId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async saveAnswer(answer: Omit<ExamAnswer, 'id' | 'created_at' | 'updated_at' | 'is_correct' | 'marks_obtained' | 'evaluated_by' | 'evaluated_at'>): Promise<ExamAnswer> {
    const { data, error } = await supabase
      .from('exam_answers')
      .upsert({
        attempt_id: answer.attempt_id,
        question_id: answer.question_id,
        student_answer: answer.student_answer,
        marks_allocated: answer.marks_allocated,
      }, {
        onConflict: 'attempt_id,question_id',
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async evaluateAnswer(answerId: string, marksObtained: number, evaluatorId: string): Promise<ExamAnswer | null> {
    const { data, error } = await supabase
      .from('exam_answers')
      .update({
        marks_obtained: marksObtained,
        evaluated_by: evaluatorId,
        evaluated_at: new Date().toISOString(),
      })
      .eq('id', answerId)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },
};

// Question Paper Template API
export const questionPaperTemplateApi = {
  async getTemplatesByTeacher(teacherId: string): Promise<QuestionPaperTemplateWithDetails[]> {
    const { data, error } = await supabase
      .from('question_paper_templates')
      .select(`
        *,
        class:classes(*),
        subject:subjects(*)
      `)
      .eq('created_by', teacherId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getTemplatesBySubject(subjectId: string): Promise<QuestionPaperTemplate[]> {
    const { data, error } = await supabase
      .from('question_paper_templates')
      .select('*')
      .eq('subject_id', subjectId)
      .order('name', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getTemplateById(id: string): Promise<QuestionPaperTemplateWithDetails | null> {
    const { data, error } = await supabase
      .from('question_paper_templates')
      .select(`
        *,
        class:classes(*),
        subject:subjects(*)
      `)
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async createTemplate(template: Omit<QuestionPaperTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<QuestionPaperTemplate | null> {
    const { data, error } = await supabase
      .from('question_paper_templates')
      .insert(template)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateTemplate(id: string, updates: Partial<QuestionPaperTemplate>): Promise<QuestionPaperTemplate | null> {
    const { data, error } = await supabase
      .from('question_paper_templates')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async deleteTemplate(id: string): Promise<void> {
    const { error } = await supabase
      .from('question_paper_templates')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Question Paper Version API
export const questionPaperVersionApi = {
  async getVersionsByPaper(paperId: string): Promise<QuestionPaperVersion[]> {
    const { data, error } = await supabase
      .from('question_paper_versions')
      .select('*')
      .eq('question_paper_id', paperId)
      .order('version_label', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getVersionById(id: string): Promise<QuestionPaperVersionWithDetails | null> {
    const { data, error } = await supabase
      .from('question_paper_versions')
      .select(`
        *,
        question_paper:question_papers(*)
      `)
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async createVersion(version: Omit<QuestionPaperVersion, 'id' | 'created_at'>): Promise<QuestionPaperVersion | null> {
    const { data, error } = await supabase
      .from('question_paper_versions')
      .insert(version)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateVersion(id: string, updates: Partial<QuestionPaperVersion>): Promise<QuestionPaperVersion | null> {
    const { data, error } = await supabase
      .from('question_paper_versions')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async deleteVersion(id: string): Promise<void> {
    const { error } = await supabase
      .from('question_paper_versions')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async deleteVersionsByPaper(paperId: string): Promise<void> {
    const { error } = await supabase
      .from('question_paper_versions')
      .delete()
      .eq('question_paper_id', paperId);
    if (error) throw error;
  },
};
