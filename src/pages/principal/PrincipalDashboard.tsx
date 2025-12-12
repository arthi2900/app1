import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ClipboardList } from 'lucide-react';
import { profileApi, examApi } from '@/db/api';
import { useAuth } from '@/hooks/useAuth';
import SchoolProfile from '@/components/principal/SchoolProfile';

export default function PrincipalDashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalExams: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [profiles, exams] = await Promise.all([
        profileApi.getAllProfiles(),
        examApi.getAllExams(),
      ]);

      const teachers = profiles.filter((p) => p.role === 'teacher');
      const students = profiles.filter((p) => p.role === 'student');

      setStats({
        totalTeachers: teachers.length,
        totalStudents: students.length,
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
      title: 'Total Teachers',
      value: stats.totalTeachers,
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'text-secondary',
    },
    {
      title: 'Total Exams',
      value: stats.totalExams,
      icon: ClipboardList,
      color: 'text-accent',
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
        <h1 className="text-3xl font-bold">Principal Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          System overview and school management
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
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

      {profile && <SchoolProfile principalId={profile.id} />}

      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to the principal section. Here you can approve exams, view reports, and monitor system activities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
