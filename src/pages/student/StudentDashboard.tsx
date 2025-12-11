import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Award, Clock } from 'lucide-react';
import { examApi } from '@/db/api';

export default function StudentDashboard() {
  const [stats, setStats] = useState({
    availableExams: 0,
    completedExams: 0,
    upcomingExams: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const exams = await examApi.getAllExams();
      setStats({
        availableExams: exams.length,
        completedExams: 0,
        upcomingExams: exams.length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Available Exams',
      value: stats.availableExams,
      icon: BookOpen,
      color: 'text-primary',
    },
    {
      title: 'Completed Exams',
      value: stats.completedExams,
      icon: Award,
      color: 'text-secondary',
    },
    {
      title: 'Upcoming Exams',
      value: stats.upcomingExams,
      icon: Clock,
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
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Exams and Results
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

      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to the student section. Here you can view available exams, take tests, and check your results.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
