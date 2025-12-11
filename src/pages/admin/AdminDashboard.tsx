import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, FileQuestion, ClipboardList } from 'lucide-react';
import { profileApi, subjectApi, questionApi, examApi } from '@/db/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSubjects: 0,
    totalQuestions: 0,
    totalExams: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [profiles, subjects, questions, exams] = await Promise.all([
        profileApi.getAllProfiles(),
        subjectApi.getAllSubjects(),
        questionApi.getAllQuestions(),
        examApi.getAllExams(),
      ]);

      setStats({
        totalUsers: profiles.length,
        totalSubjects: subjects.length,
        totalQuestions: questions.length,
        totalExams: exams.length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Total Subjects',
      value: stats.totalSubjects,
      icon: BookOpen,
      color: 'text-secondary',
    },
    {
      title: 'Total Questions',
      value: stats.totalQuestions,
      icon: FileQuestion,
      color: 'text-accent',
    },
    {
      title: 'Total Exams',
      value: stats.totalExams,
      icon: ClipboardList,
      color: 'text-chart-3',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          System overview and statistics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to the admin section of the Online Exam Management System.
            Here you can manage users, assign roles, and control system settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
