import type { ReactNode } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import SchoolManagement from './pages/admin/SchoolManagement';
import PrincipalDashboard from './pages/principal/PrincipalDashboard';
import TeachersList from './pages/principal/TeachersList';
import StudentsList from './pages/principal/StudentsList';
import AcademicsManagement from './pages/principal/AcademicsManagement';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import QuestionBank from './pages/teacher/QuestionBank';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentExams from './pages/student/StudentExams';
import ProtectedRoute from './components/common/ProtectedRoute';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
    visible: false,
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
    visible: false,
  },
  {
    name: 'Register',
    path: '/register',
    element: <Register />,
    visible: false,
  },
  {
    name: 'Forgot Password',
    path: '/forgot-password',
    element: <ForgotPassword />,
    visible: false,
  },
  {
    name: 'Reset Password',
    path: '/reset-password',
    element: <ResetPassword />,
    visible: false,
  },
  {
    name: 'Admin Dashboard',
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'User Management',
    path: '/admin/users',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <UserManagement />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'School Management',
    path: '/admin/schools',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <SchoolManagement />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'Principal Dashboard',
    path: '/principal',
    element: (
      <ProtectedRoute allowedRoles={['principal']}>
        <PrincipalDashboard />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'Teachers List',
    path: '/principal/teachers',
    element: (
      <ProtectedRoute allowedRoles={['principal']}>
        <TeachersList />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'Students List',
    path: '/principal/students',
    element: (
      <ProtectedRoute allowedRoles={['principal']}>
        <StudentsList />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'Academic Management',
    path: '/principal/academics',
    element: (
      <ProtectedRoute allowedRoles={['principal']}>
        <AcademicsManagement />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'Teacher Dashboard',
    path: '/teacher',
    element: (
      <ProtectedRoute allowedRoles={['teacher']}>
        <TeacherDashboard />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'Question Bank',
    path: '/teacher/questions',
    element: (
      <ProtectedRoute allowedRoles={['teacher']}>
        <QuestionBank />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'Student Dashboard',
    path: '/student',
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <StudentDashboard />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'Student Exams',
    path: '/student/exams',
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <StudentExams />
      </ProtectedRoute>
    ),
    visible: false,
  },
];

export default routes;
