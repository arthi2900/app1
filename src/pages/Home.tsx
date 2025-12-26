import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, FileQuestion, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Student Performance &amp; Skill Analysis
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive platform for conducting and managing online exams efficiently
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
        <Card>
          <CardHeader>
            <BookOpen className="w-10 h-10 text-primary mb-2" />
            <CardTitle>Exam Management</CardTitle>
            <CardDescription>
              Create and manage exams with ease
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Teachers can create exams, set schedules, and manage question banks efficiently.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="w-10 h-10 text-primary mb-2" />
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Role-based access control
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Admins can manage users, assign roles, and control system access.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileQuestion className="w-10 h-10 text-primary mb-2" />
            <CardTitle>Question Bank</CardTitle>
            <CardDescription>
              Comprehensive question repository
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Build and maintain a rich question bank with multiple question types.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Award className="w-10 h-10 text-primary mb-2" />
            <CardTitle>Results & Reports</CardTitle>
            <CardDescription>
              Detailed performance analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View detailed results, generate reports, and track student performance.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
