import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Award, Users } from 'lucide-react';

export default function PrincipalDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">தலைமை ஆசிரியர் டாஷ்போர்டு</h1>
        <p className="text-muted-foreground mt-2">
          தேர்வு ஒப்புதல்கள் மற்றும் அறிக்கைகள்
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ஒப்புதல் காத்திருக்கும் தேர்வுகள்</CardTitle>
            <ClipboardList className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">மொத்த ஆசிரியர்கள்</CardTitle>
            <Users className="w-5 h-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">மொத்த மாணவர்கள்</CardTitle>
            <Award className="w-5 h-5 text-accent" />
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
            தலைமை ஆசிரியர் பகுதிக்கு வரவேற்கிறோம். இங்கு நீங்கள் தேர்வுகளை ஒப்புதல் செய்யலாம்,
            மாணவர் அறிக்கைகளை பார்க்கலாம் மற்றும் ஆசிரியர் செயல்திறனை கண்காணிக்கலாம்.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
