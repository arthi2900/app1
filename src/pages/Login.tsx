import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BookOpen } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password) {
      toast({
        title: 'பிழை',
        description: 'பயனர்பெயர் மற்றும் கடவுச்சொல் தேவை',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await signIn(username, password);
      toast({
        title: 'வெற்றி',
        description: 'வெற்றிகரமாக உள்நுழைந்துள்ளீர்கள்',
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'உள்நுழைவு தோல்வி',
        description: error.message || 'தவறான பயனர்பெயர் அல்லது கடவுச்சொல்',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">உள்நுழைவு</CardTitle>
          <CardDescription>
            ஆன்லைன் தேர்வு மேலாண்மை அமைப்பு
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">பயனர்பெயர்</Label>
              <Input
                id="username"
                type="text"
                placeholder="உங்கள் பயனர்பெயரை உள்ளிடவும்"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">கடவுச்சொல்</Label>
              <Input
                id="password"
                type="password"
                placeholder="உங்கள் கடவுச்சொல்லை உள்ளிடவும்"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'உள்நுழைகிறது...' : 'உள்நுழைக'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              கணக்கு இல்லையா?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                பதிவு செய்யவும்
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
