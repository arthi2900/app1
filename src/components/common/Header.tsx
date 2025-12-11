import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookOpen, User, LogOut, LayoutDashboard, Users, FileQuestion, ClipboardList, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Header() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'வெற்றி',
        description: 'வெற்றிகரமாக வெளியேறினீர்கள்',
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'பிழை',
        description: error.message || 'வெளியேற முடியவில்லை',
        variant: 'destructive',
      });
    }
  };

  const getRoleBasedLinks = () => {
    if (!profile) return [];

    const links = [];

    if (profile.role === 'admin') {
      links.push(
        { to: '/admin', label: 'நிர்வாகம்', icon: LayoutDashboard },
        { to: '/admin/users', label: 'பயனர்கள்', icon: Users }
      );
    }

    if (profile.role === 'principal') {
      links.push(
        { to: '/principal', label: 'டாஷ்போர்டு', icon: LayoutDashboard },
        { to: '/principal/approvals', label: 'ஒப்புதல்கள்', icon: ClipboardList },
        { to: '/principal/reports', label: 'அறிக்கைகள்', icon: Award }
      );
    }

    if (profile.role === 'teacher') {
      links.push(
        { to: '/teacher', label: 'டாஷ்போர்டு', icon: LayoutDashboard },
        { to: '/teacher/questions', label: 'வினாவங்கி', icon: FileQuestion },
        { to: '/teacher/exams', label: 'தேர்வுகள்', icon: ClipboardList }
      );
    }

    if (profile.role === 'student') {
      links.push(
        { to: '/student', label: 'டாஷ்போர்டு', icon: LayoutDashboard },
        { to: '/student/exams', label: 'தேர்வுகள்', icon: ClipboardList },
        { to: '/student/results', label: 'முடிவுகள்', icon: Award }
      );
    }

    return links;
  };

  const links = getRoleBasedLinks();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">
              ஆன்லைன் தேர்வு
            </span>
          </Link>

          {profile && (
            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.to} to={link.to}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline-block">
                    {profile.full_name || profile.username}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {profile.full_name || profile.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {profile.role === 'admin' && 'நிர்வாகி'}
                      {profile.role === 'principal' && 'தலைமை ஆசிரியர்'}
                      {profile.role === 'teacher' && 'ஆசிரியர்'}
                      {profile.role === 'student' && 'மாணவர்'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="md:hidden">
                  {links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <DropdownMenuItem key={link.to} asChild>
                        <Link to={link.to} className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                </div>
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  வெளியேறு
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  உள்நுழைக
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">பதிவு செய்க</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
