import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Award, Clock } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">மாணவர் டாஷ்போர்டு</h1>
        <p className="text-muted-foreground mt-2">
          தேர்வுகள் மற்றும் முடிவுகள்
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">கிடைக்கும் தேர்வுகள்</CardTitle>
            <ClipboardList className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">முடிக்கப்பட்ட தேர்வுகள்</CardTitle>
            <Award className="w-5 h-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">நடப்பில் உள்ள தேர்வுகள்</CardTitle>
            <Clock className="w-5 h-5 text-accent" />
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
            மாணவர் பகுதிக்கு வரவேற்கிறோம். இங்கு நீங்கள் தேர்வுகளை எழுதலாம்,
            முடிவுகளை பார்க்கலாம் மற்றும் உங்கள் செயல்திறனை கண்காணிக்கலாம்.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
