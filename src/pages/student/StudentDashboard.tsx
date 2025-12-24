import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Award } from 'lucide-react';

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your learning portal
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/student/exams')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              My Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              View and take your assigned exams
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/student/exams')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              My Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              View your exam results and performance
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to the student dashboard. Here you can access your exams and view your results.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
