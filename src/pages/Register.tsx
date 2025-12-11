import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BookOpen } from 'lucide-react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password || !confirmPassword) {
      toast({
        title: 'பிழை',
        description: 'அனைத்து புலங்களும் தேவை',
        variant: 'destructive',
      });
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast({
        title: 'பிழை',
        description: 'பயனர்பெயரில் எழுத்துக்கள், எண்கள் மற்றும் _ மட்டுமே அனுமதிக்கப்படும்',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'பிழை',
        description: 'கடவுச்சொற்கள் பொருந்தவில்லை',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'பிழை',
        description: 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்கள் இருக்க வேண்டும்',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await signUp(username, password, fullName);
      toast({
        title: 'வெற்றி',
        description: 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது',
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'பதிவு தோல்வி',
        description: error.message || 'கணக்கை உருவாக்க முடியவில்லை',
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
          <CardTitle className="text-2xl font-bold">பதிவு செய்யவும்</CardTitle>
          <CardDescription>
            புதிய கணக்கை உருவாக்கவும்
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">பயனர்பெயர் *</Label>
              <Input
                id="username"
                type="text"
                placeholder="பயனர்பெயரை உள்ளிடவும்"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                required
              />
              <p className="text-xs text-muted-foreground">
                எழுத்துக்கள், எண்கள் மற்றும் _ மட்டுமே
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">முழு பெயர்</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="உங்கள் முழு பெயரை உள்ளிடவும்"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">கடவுச்சொல் *</Label>
              <Input
                id="password"
                type="password"
                placeholder="கடவுச்சொல்லை உள்ளிடவும்"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">கடவுச்சொல் உறுதிப்படுத்தல் *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="கடவுச்சொல்லை மீண்டும் உள்ளிடவும்"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'பதிவு செய்கிறது...' : 'பதிவு செய்க'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              ஏற்கனவே கணக்கு உள்ளதா?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                உள்நுழைக
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
