import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your learning portal
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Welcome</CardTitle>
          <BookOpen className="w-5 h-5 text-primary" />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to the student section. Your teachers are preparing questions for your learning.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
