import { supabase } from './supabase';
import type {
  Profile,
  School,
  Subject,
  Question,
  Exam,
  ExamQuestion,
  ExamSchedule,
  ExamAttempt,
  ExamAnswer,
  ExamWithDetails,
  QuestionWithSubject,
  AttemptWithDetails,
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
      .order('name', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createSubject(subject: Omit<Subject, 'id' | 'created_at'>): Promise<Subject | null> {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('subjects')
      .insert({ ...subject, created_by: user.data.user?.id })
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
      .select('*, subject:subjects(*)')
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
};

// Exam APIs
export const examApi = {
  async getAllExams(): Promise<ExamWithDetails[]> {
    const { data, error } = await supabase
      .from('exams')
      .select('*, subject:subjects(*)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getExamById(id: string): Promise<ExamWithDetails | null> {
    const { data, error } = await supabase
      .from('exams')
      .select('*, subject:subjects(*)')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getPublishedExams(): Promise<ExamWithDetails[]> {
    const { data, error } = await supabase
      .from('exams')
      .select('*, subject:subjects(*)')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createExam(exam: Omit<Exam, 'id' | 'created_at' | 'created_by' | 'approved_by' | 'approved_at'>): Promise<Exam | null> {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('exams')
      .insert({ ...exam, created_by: user.data.user?.id, total_marks: 0 })
      .select()
      .maybeSingle();
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
    const { error } = await supabase.from('exams').delete().eq('id', id);
    if (error) throw error;
  },

  async approveExam(id: string): Promise<Exam | null> {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('exams')
      .update({
        status: 'approved',
        approved_by: user.data.user?.id,
        approved_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },
};

// Exam Question APIs
export const examQuestionApi = {
  async getExamQuestions(examId: string): Promise<Question[]> {
    const { data, error } = await supabase
      .from('exam_questions')
      .select('question_id, questions(*)')
      .eq('exam_id', examId)
      .order('question_order', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data.map((item: any) => item.questions) : [];
  },

  async addQuestionToExam(examId: string, questionId: string, order: number): Promise<ExamQuestion | null> {
    const { data, error } = await supabase
      .from('exam_questions')
      .insert({ exam_id: examId, question_id: questionId, question_order: order })
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async removeQuestionFromExam(examId: string, questionId: string): Promise<void> {
    const { error } = await supabase
      .from('exam_questions')
      .delete()
      .eq('exam_id', examId)
      .eq('question_id', questionId);
    if (error) throw error;
  },
};

// Exam Schedule APIs
export const examScheduleApi = {
  async getExamSchedule(examId: string): Promise<ExamSchedule | null> {
    const { data, error } = await supabase
      .from('exam_schedules')
      .select('*')
      .eq('exam_id', examId)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async createSchedule(schedule: Omit<ExamSchedule, 'id' | 'created_at' | 'created_by'>): Promise<ExamSchedule | null> {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('exam_schedules')
      .insert({ ...schedule, created_by: user.data.user?.id })
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateSchedule(id: string, updates: Partial<ExamSchedule>): Promise<ExamSchedule | null> {
    const { data, error } = await supabase
      .from('exam_schedules')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },
};

// Exam Attempt APIs
export const examAttemptApi = {
  async getStudentAttempts(studentId: string): Promise<AttemptWithDetails[]> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .select('*, exam:exams(*, subject:subjects(*))')
      .eq('student_id', studentId)
      .order('started_at', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getAttemptById(id: string): Promise<AttemptWithDetails | null> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .select('*, exam:exams(*, subject:subjects(*))')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getExamAttempts(examId: string): Promise<AttemptWithDetails[]> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .select('*, exam:exams(*), student:profiles(*)')
      .eq('exam_id', examId)
      .order('started_at', { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async startAttempt(examId: string): Promise<ExamAttempt | null> {
    const user = await supabase.auth.getUser();
    const exam = await examApi.getExamById(examId);
    const { data, error } = await supabase
      .from('exam_attempts')
      .insert({
        exam_id: examId,
        student_id: user.data.user?.id,
        total_marks: exam?.total_marks || 0,
      })
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async submitAttempt(id: string, timeTaken: number): Promise<ExamAttempt | null> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .update({
        submitted_at: new Date().toISOString(),
        status: 'submitted',
        time_taken_minutes: timeTaken,
      })
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },
};

// Exam Answer APIs
export const examAnswerApi = {
  async getAttemptAnswers(attemptId: string): Promise<ExamAnswer[]> {
    const { data, error } = await supabase
      .from('exam_answers')
      .select('*')
      .eq('attempt_id', attemptId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async saveAnswer(answer: Omit<ExamAnswer, 'id' | 'created_at' | 'is_correct' | 'marks_obtained'>): Promise<ExamAnswer | null> {
    const { data, error } = await supabase
      .from('exam_answers')
      .upsert(answer, { onConflict: 'attempt_id,question_id' })
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },
};
