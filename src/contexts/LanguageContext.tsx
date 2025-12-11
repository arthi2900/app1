import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.loginButton': 'Login',
    'auth.registerButton': 'Register',
    'auth.loggingIn': 'Logging in...',
    'auth.registering': 'Registering...',
    'auth.noAccount': "Don't have an account?",
    'auth.haveAccount': 'Already have an account?',
    'auth.logout': 'Logout',
    'auth.usernameRule': 'Letters, numbers and _ only',
    'auth.enterUsername': 'Enter your username',
    'auth.enterPassword': 'Enter your password',
    'auth.reenterPassword': 'Re-enter password',
    'auth.enterFullName': 'Enter your full name',
    
    'app.title': 'Online Exam Management System',
    'app.shortTitle': 'Online Exam',
    
    'common.loading': 'Loading...',
    'common.success': 'Success',
    'common.error': 'Error',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.actions': 'Actions',
    
    'role.admin': 'Admin',
    'role.principal': 'Principal',
    'role.teacher': 'Teacher',
    'role.student': 'Student',
    
    'nav.dashboard': 'Dashboard',
    'nav.users': 'Users',
    'nav.questionBank': 'Question Bank',
    'nav.exams': 'Exams',
    'nav.results': 'Results',
    'nav.reports': 'Reports',
    'nav.approvals': 'Approvals',
    
    'admin.dashboard.title': 'Admin Dashboard',
    'admin.dashboard.subtitle': 'System overview and statistics',
    'admin.dashboard.totalUsers': 'Total Users',
    'admin.dashboard.totalSubjects': 'Total Subjects',
    'admin.dashboard.totalQuestions': 'Total Questions',
    'admin.dashboard.totalExams': 'Total Exams',
    'admin.dashboard.welcome': 'Welcome',
    'admin.dashboard.welcomeText': 'Welcome to the admin section of the Online Exam Management System. Here you can manage users, assign roles, and control system settings.',
    
    'users.title': 'User Management',
    'users.subtitle': 'Manage user accounts and roles',
    'users.username': 'Username',
    'users.fullName': 'Full Name',
    'users.role': 'Role',
    'users.createdAt': 'Created At',
    'users.selectRole': 'Select role',
    'users.noUsers': 'No users found',
    
    'questions.title': 'Question Bank',
    'questions.subtitle': 'Create and manage questions',
    'questions.newQuestion': 'New Question',
    'questions.addQuestion': 'Add New Question',
    'questions.fillDetails': 'Fill in the question details',
    'questions.question': 'Question',
    'questions.subject': 'Subject',
    'questions.type': 'Type',
    'questions.difficulty': 'Difficulty',
    'questions.marks': 'Marks',
    'questions.options': 'Options',
    'questions.correctAnswer': 'Correct Answer',
    'questions.selectSubject': 'Select subject',
    'questions.enterQuestion': 'Enter question',
    'questions.enterAnswer': 'Enter correct answer',
    'questions.option': 'Option',
    'questions.allQuestions': 'All Questions',
    'questions.noQuestions': 'No questions',
    
    'questionType.mcq': 'Multiple Choice',
    'questionType.trueFalse': 'True/False',
    'questionType.shortAnswer': 'Short Answer',
    
    'difficulty.easy': 'Easy',
    'difficulty.medium': 'Medium',
    'difficulty.hard': 'Hard',
    
    'exams.title': 'Available Exams',
    'exams.subtitle': 'Take exams and view results',
    'exams.duration': 'Duration',
    'exams.minutes': 'minutes',
    'exams.totalMarks': 'Total Marks',
    'exams.passMarks': 'Pass Marks',
    'exams.startExam': 'Start Exam',
    'exams.notAvailable': 'Not Available',
    'exams.noExams': 'No Exams',
    'exams.noExamsText': 'No exams available at the moment',
    'exams.status.upcoming': 'Upcoming',
    'exams.status.ongoing': 'Ongoing',
    'exams.status.completed': 'Completed',
    
    'message.loginSuccess': 'Successfully logged in',
    'message.loginFailed': 'Login failed',
    'message.invalidCredentials': 'Invalid username or password',
    'message.registerSuccess': 'Account created successfully',
    'message.registerFailed': 'Registration failed',
    'message.allFieldsRequired': 'All fields are required',
    'message.usernameInvalid': 'Username can only contain letters, numbers and underscore',
    'message.passwordMismatch': 'Passwords do not match',
    'message.passwordTooShort': 'Password must be at least 6 characters',
    'message.logoutSuccess': 'Successfully logged out',
    'message.logoutFailed': 'Could not log out',
    'message.roleUpdateSuccess': 'Role updated successfully',
    'message.roleUpdateFailed': 'Could not update role',
    'message.questionAddSuccess': 'Question added successfully',
    'message.questionAddFailed': 'Could not add question',
    'message.questionDeleteSuccess': 'Question deleted successfully',
    'message.questionDeleteFailed': 'Could not delete question',
    'message.confirmDelete': 'Are you sure you want to delete this question?',
    'message.dataLoadFailed': 'Could not load data',
  },
  ta: {
    'auth.login': 'உள்நுழைவு',
    'auth.register': 'பதிவு செய்யவும்',
    'auth.username': 'பயனர்பெயர்',
    'auth.password': 'கடவுச்சொல்',
    'auth.confirmPassword': 'கடவுச்சொல் உறுதிப்படுத்தல்',
    'auth.fullName': 'முழு பெயர்',
    'auth.loginButton': 'உள்நுழைக',
    'auth.registerButton': 'பதிவு செய்க',
    'auth.loggingIn': 'உள்நுழைகிறது...',
    'auth.registering': 'பதிவு செய்கிறது...',
    'auth.noAccount': 'கணக்கு இல்லையா?',
    'auth.haveAccount': 'ஏற்கனவே கணக்கு உள்ளதா?',
    'auth.logout': 'வெளியேறு',
    'auth.usernameRule': 'எழுத்துக்கள், எண்கள் மற்றும் _ மட்டுமே',
    'auth.enterUsername': 'உங்கள் பயனர்பெயரை உள்ளிடவும்',
    'auth.enterPassword': 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
    'auth.reenterPassword': 'கடவுச்சொல்லை மீண்டும் உள்ளிடவும்',
    'auth.enterFullName': 'உங்கள் முழு பெயரை உள்ளிடவும்',
    
    'app.title': 'ஆன்லைன் தேர்வு மேலாண்மை அமைப்பு',
    'app.shortTitle': 'ஆன்லைன் தேர்வு',
    
    'common.loading': 'ஏற்றுகிறது...',
    'common.success': 'வெற்றி',
    'common.error': 'பிழை',
    'common.cancel': 'ரத்து செய்',
    'common.save': 'சேமி',
    'common.delete': 'நீக்கு',
    'common.edit': 'திருத்து',
    'common.add': 'சேர்க்கவும்',
    'common.actions': 'செயல்கள்',
    
    'role.admin': 'நிர்வாகி',
    'role.principal': 'தலைமை ஆசிரியர்',
    'role.teacher': 'ஆசிரியர்',
    'role.student': 'மாணவர்',
    
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.users': 'பயனர்கள்',
    'nav.questionBank': 'வினாவங்கி',
    'nav.exams': 'தேர்வுகள்',
    'nav.results': 'முடிவுகள்',
    'nav.reports': 'அறிக்கைகள்',
    'nav.approvals': 'ஒப்புதல்கள்',
    
    'admin.dashboard.title': 'நிர்வாக டாஷ்போர்டு',
    'admin.dashboard.subtitle': 'அமைப்பு கண்ணோட்டம் மற்றும் புள்ளிவிவரங்கள்',
    'admin.dashboard.totalUsers': 'மொத்த பயனர்கள்',
    'admin.dashboard.totalSubjects': 'மொத்த பாடங்கள்',
    'admin.dashboard.totalQuestions': 'மொத்த வினாக்கள்',
    'admin.dashboard.totalExams': 'மொத்த தேர்வுகள்',
    'admin.dashboard.welcome': 'வரவேற்பு',
    'admin.dashboard.welcomeText': 'ஆன்லைன் தேர்வு மேலாண்மை அமைப்பின் நிர்வாக பகுதிக்கு வரவேற்கிறோம். இங்கு நீங்கள் பயனர்களை நிர்வகிக்கலாம், பாத்திரங்களை ஒதுக்கலாம் மற்றும் அமைப்பு அமைப்புகளை கட்டுப்படுத்தலாம்.',
    
    'users.title': 'பயனர் மேலாண்மை',
    'users.subtitle': 'பயனர் கணக்குகள் மற்றும் பாத்திரங்களை நிர்வகிக்கவும்',
    'users.username': 'பயனர்பெயர்',
    'users.fullName': 'முழு பெயர்',
    'users.role': 'பாத்திரம்',
    'users.createdAt': 'உருவாக்கப்பட்டது',
    'users.selectRole': 'பாத்திரத்தை தேர்ந்தெடுக்கவும்',
    'users.noUsers': 'பயனர்கள் இல்லை',
    
    'questions.title': 'வினாவங்கி',
    'questions.subtitle': 'வினாக்களை உருவாக்கவும் மற்றும் நிர்வகிக்கவும்',
    'questions.newQuestion': 'புதிய வினா',
    'questions.addQuestion': 'புதிய வினா சேர்க்கவும்',
    'questions.fillDetails': 'வினாவின் விவரங்களை நிரப்பவும்',
    'questions.question': 'வினா',
    'questions.subject': 'பாடம்',
    'questions.type': 'வகை',
    'questions.difficulty': 'சிரம நிலை',
    'questions.marks': 'மதிப்பெண்கள்',
    'questions.options': 'விருப்பங்கள்',
    'questions.correctAnswer': 'சரியான பதில்',
    'questions.selectSubject': 'பாடத்தை தேர்ந்தெடுக்கவும்',
    'questions.enterQuestion': 'வினாவை உள்ளிடவும்',
    'questions.enterAnswer': 'சரியான பதிலை உள்ளிடவும்',
    'questions.option': 'விருப்பம்',
    'questions.allQuestions': 'அனைத்து வினாக்கள்',
    'questions.noQuestions': 'வினாக்கள் இல்லை',
    
    'questionType.mcq': 'பல தேர்வு',
    'questionType.trueFalse': 'உண்மை/பொய்',
    'questionType.shortAnswer': 'குறுகிய பதில்',
    
    'difficulty.easy': 'எளிது',
    'difficulty.medium': 'நடுத்தரம்',
    'difficulty.hard': 'கடினம்',
    
    'exams.title': 'கிடைக்கும் தேர்வுகள்',
    'exams.subtitle': 'தேர்வுகளை எழுதவும் மற்றும் முடிவுகளை பார்க்கவும்',
    'exams.duration': 'காலம்',
    'exams.minutes': 'நிமிடங்கள்',
    'exams.totalMarks': 'மொத்த மதிப்பெண்கள்',
    'exams.passMarks': 'தேர்ச்சி மதிப்பெண்கள்',
    'exams.startExam': 'தேர்வை தொடங்கு',
    'exams.notAvailable': 'கிடைக்கவில்லை',
    'exams.noExams': 'தேர்வுகள் இல்லை',
    'exams.noExamsText': 'தற்போது கிடைக்கும் தேர்வுகள் இல்லை',
    'exams.status.upcoming': 'விரைவில்',
    'exams.status.ongoing': 'நடப்பில்',
    'exams.status.completed': 'முடிந்தது',
    
    'message.loginSuccess': 'வெற்றிகரமாக உள்நுழைந்துள்ளீர்கள்',
    'message.loginFailed': 'உள்நுழைவு தோல்வி',
    'message.invalidCredentials': 'தவறான பயனர்பெயர் அல்லது கடவுச்சொல்',
    'message.registerSuccess': 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது',
    'message.registerFailed': 'பதிவு தோல்வி',
    'message.allFieldsRequired': 'அனைத்து புலங்களும் தேவை',
    'message.usernameInvalid': 'பயனர்பெயரில் எழுத்துக்கள், எண்கள் மற்றும் _ மட்டுமே அனுமதிக்கப்படும்',
    'message.passwordMismatch': 'கடவுச்சொற்கள் பொருந்தவில்லை',
    'message.passwordTooShort': 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்கள் இருக்க வேண்டும்',
    'message.logoutSuccess': 'வெற்றிகரமாக வெளியேறினீர்கள்',
    'message.logoutFailed': 'வெளியேற முடியவில்லை',
    'message.roleUpdateSuccess': 'பாத்திரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
    'message.roleUpdateFailed': 'பாத்திரத்தை புதுப்பிக்க முடியவில்லை',
    'message.questionAddSuccess': 'வினா வெற்றிகரமாக சேர்க்கப்பட்டது',
    'message.questionAddFailed': 'வினாவை சேர்க்க முடியவில்லை',
    'message.questionDeleteSuccess': 'வினா வெற்றிகரமாக நீக்கப்பட்டது',
    'message.questionDeleteFailed': 'வினாவை நீக்க முடியவில்லை',
    'message.confirmDelete': 'இந்த வினாவை நீக்க விரும்புகிறீர்களா?',
    'message.dataLoadFailed': 'தரவை ஏற்ற முடியவில்லை',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'ta' ? 'ta' : 'en') as Language;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
