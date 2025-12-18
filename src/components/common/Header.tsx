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
import { BookOpen, User, LogOut, LayoutDashboard, Users, FileQuestion, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Header() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Success',
        description: 'Logged out successfully',
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to logout',
        variant: 'destructive',
      });
    }
  };

  const getRoleBasedLinks = () => {
    if (!profile) return [];

    const links = [];

    if (profile.role === 'admin') {
      links.push(
        { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/admin/users', label: 'Users', icon: Users },
        { to: '/admin/schools', label: 'Schools', icon: Building2 }
      );
    }

    if (profile.role === 'principal') {
      links.push(
        { to: '/principal', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/principal/teachers', label: 'Teachers', icon: Users },
        { to: '/principal/students', label: 'Students', icon: Users },
        { to: '/principal/academics', label: 'Academics', icon: BookOpen }
      );
    }

    if (profile.role === 'teacher') {
      links.push(
        { to: '/teacher', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/teacher/questions', label: 'Question Bank', icon: FileQuestion }
      );
    }

    if (profile.role === 'student') {
      links.push(
        { to: '/student', label: 'Dashboard', icon: LayoutDashboard }
      );
    }

    return links;
  };

  const links = getRoleBasedLinks();

  // Get user-friendly role label
  const getRoleLabel = (role: string) => {
    const roleMap: Record<string, string> = {
      admin: 'Admin',
      principal: 'Principal',
      teacher: 'Teacher',
      student: 'Student',
    };
    return roleMap[role] || role;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">
              Exam System
            </span>
          </Link>

          <div className="flex items-center gap-2">
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
                        {getRoleLabel(profile.role)}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="md:hidden">
                    {links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <DropdownMenuItem key={link.to} asChild>
                          <Link to={link.to} className="flex items-center">
                            <Icon className="w-4 h-4 mr-2" />
                            {link.label}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                    <DropdownMenuSeparator />
                  </div>
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
