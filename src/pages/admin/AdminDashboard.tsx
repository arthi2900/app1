import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users } from 'lucide-react';
import { profileApi, schoolApi } from '@/db/api';

interface UserStats {
  admins: number;
  principals: number;
  teachers: number;
  students: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSchools: 0,
    userStats: {
      admins: 0,
      principals: 0,
      teachers: 0,
      students: 0,
    } as UserStats,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      console.log('Admin Dashboard: Loading stats...');
      const [profiles, schools] = await Promise.all([
        profileApi.getAllProfiles(),
        schoolApi.getAllSchools(),
      ]);

      const userStats: UserStats = {
        admins: profiles.filter(p => p.role === 'admin').length,
        principals: profiles.filter(p => p.role === 'principal').length,
        teachers: profiles.filter(p => p.role === 'teacher').length,
        students: profiles.filter(p => p.role === 'student').length,
      };

      console.log('Admin Dashboard Stats:', {
        schools: schools.length,
        users: userStats,
      });

      setStats({
        totalSchools: schools.length,
        userStats,
      });
    } catch (error) {
      console.error('Error loading admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = stats.userStats.admins + stats.userStats.principals + 
                     stats.userStats.teachers + stats.userStats.students;

  const statCards = [
    {
      title: 'Total Schools',
      value: stats.totalSchools,
      icon: Building2,
      color: 'text-primary',
      description: 'Registered schools',
    },
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'text-secondary',
      description: `${stats.userStats.admins} Admins, ${stats.userStats.principals} Principals, ${stats.userStats.teachers} Teachers, ${stats.userStats.students} Students`,
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

      <div className="grid gap-4 md:grid-cols-2">
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
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
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
