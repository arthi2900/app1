import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ClipboardList, BookOpen } from 'lucide-react';
import { profileApi, examApi } from '@/db/api';
import { useAuth } from '@/hooks/useAuth';
import SchoolProfile from '@/components/principal/SchoolProfile';

export default function PrincipalDashboard() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalExams: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [profile?.school_id]);

  const loadStats = async () => {
    if (!profile?.school_id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log('Loading stats for school_id:', profile.school_id);
      const [teachers, students, exams] = await Promise.all([
        profileApi.getTeachersBySchoolId(profile.school_id),
        profileApi.getStudentsBySchoolId(profile.school_id),
        examApi.getAllExams(),
      ]);

      console.log('Teachers:', teachers.length, 'Students:', students.length, 'Exams:', exams.length);

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
      title: 'Academic Management',
      value: 'Setup',
      icon: BookOpen,
      color: 'text-blue-600',
      onClick: () => navigate('/principal/academics'),
      clickable: true,
      description: 'Manage classes, sections & subjects',
    },
    {
      title: 'Teachers',
      value: stats.totalTeachers,
      icon: Users,
      color: 'text-primary',
      onClick: () => navigate('/principal/teachers'),
      clickable: true,
    },
    {
      title: 'Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'text-secondary',
      onClick: () => navigate('/principal/students'),
      clickable: true,
    },
    {
      title: 'Exams',
      value: stats.totalExams,
      icon: ClipboardList,
      color: 'text-accent',
      clickable: false,
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

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className={stat.clickable ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}
              onClick={stat.clickable ? stat.onClick : undefined}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.clickable && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {(stat as any).description || 'Click to view details'}
                  </p>
                )}
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
