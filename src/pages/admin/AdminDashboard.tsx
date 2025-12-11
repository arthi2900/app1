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
      title: 'மொத்த பயனர்கள்',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'மொத்த பாடங்கள்',
      value: stats.totalSubjects,
      icon: BookOpen,
      color: 'text-secondary',
    },
    {
      title: 'மொத்த வினாக்கள்',
      value: stats.totalQuestions,
      icon: FileQuestion,
      color: 'text-accent',
    },
    {
      title: 'மொத்த தேர்வுகள்',
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
          <p className="text-muted-foreground">ஏற்றுகிறது...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">நிர்வாக டாஷ்போர்டு</h1>
        <p className="text-muted-foreground mt-2">
          அமைப்பு கண்ணோட்டம் மற்றும் புள்ளிவிவரங்கள்
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
          <CardTitle>வரவேற்பு</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            ஆன்லைன் தேர்வு மேலாண்மை அமைப்பின் நிர்வாக பகுதிக்கு வரவேற்கிறோம்.
            இங்கு நீங்கள் பயனர்களை நிர்வகிக்கலாம், பாத்திரங்களை ஒதுக்கலாம் மற்றும்
            அமைப்பு அமைப்புகளை கட்டுப்படுத்தலாம்.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
