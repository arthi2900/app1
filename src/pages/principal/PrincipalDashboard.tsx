import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ClipboardList, BookOpen, UserCheck, GraduationCap } from 'lucide-react';
import { profileApi, examApi } from '@/db/api';
import { useAuth } from '@/hooks/useAuth';
import SchoolProfile from '@/components/principal/SchoolProfile';
import type { Profile } from '@/types/types';

export default function PrincipalDashboard() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [teachers, setTeachers] = useState<Profile[]>([]);
  const [students, setStudents] = useState<Profile[]>([]);
  const [totalExams, setTotalExams] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [profile?.school_id]);

  // புதிய தரவு ஏற்றும் செயல்பாடு - ஆசிரியர்கள் மற்றும் மாணவர்களை தனித்தனியாக சேமிக்கிறது
  const loadData = async () => {
    if (!profile?.school_id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log('பள்ளி ID-க்கான தரவு ஏற்றுகிறது:', profile.school_id);
      
      // ஆசிரியர்கள், மாணவர்கள் மற்றும் தேர்வுகளை ஒரே நேரத்தில் பெறுதல்
      const [teachersData, studentsData, examsData] = await Promise.all([
        profileApi.getTeachersBySchoolId(profile.school_id),
        profileApi.getStudentsBySchoolId(profile.school_id),
        examApi.getAllExams(),
      ]);

      console.log('ஆசிரியர்கள்:', teachersData.length, 'மாணவர்கள்:', studentsData.length, 'தேர்வுகள்:', examsData.length);

      setTeachers(teachersData);
      setStudents(studentsData);
      setTotalExams(examsData.length);
    } catch (error) {
      console.error('தரவு ஏற்றுவதில் பிழை:', error);
      setTeachers([]);
      setStudents([]);
      setTotalExams(0);
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
      title: 'Exams',
      value: totalExams,
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
          <p className="text-muted-foreground">ஏற்றுகிறது...</p>
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

        {/* புதிய ஆசிரியர்கள் கார்டு - தமிழில் */}
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/principal/teachers')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ஆசிரியர்கள்</CardTitle>
            <UserCheck className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              விவரங்களைப் பார்க்க கிளிக் செய்யவும்
            </p>
          </CardContent>
        </Card>

        {/* புதிய மாணவர்கள் கார்டு - தமிழில் */}
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/principal/students')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">மாணவர்கள்</CardTitle>
            <GraduationCap className="w-5 h-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              விவரங்களைப் பார்க்க கிளிக் செய்யவும்
            </p>
          </CardContent>
        </Card>
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
