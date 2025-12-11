import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileQuestion, ClipboardList, BookOpen } from 'lucide-react';

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ஆசிரியர் டாஷ்போர்டு</h1>
        <p className="text-muted-foreground mt-2">
          வினாக்கள் மற்றும் தேர்வுகளை நிர்வகிக்கவும்
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">மொத்த வினாக்கள்</CardTitle>
            <FileQuestion className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">மொத்த தேர்வுகள்</CardTitle>
            <ClipboardList className="w-5 h-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">மொத்த பாடங்கள்</CardTitle>
            <BookOpen className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>வரவேற்பு</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            ஆசிரியர் பகுதிக்கு வரவேற்கிறோம். இங்கு நீங்கள் வினாக்களை உருவாக்கலாம்,
            வினாத்தாள்களை தயாரிக்கலாம் மற்றும் தேர்வுகளை நடத்தலாம்.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
