import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
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
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const { profile, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: t('common.success'),
        description: t('message.logoutSuccess'),
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error.message || t('message.logoutFailed'),
        variant: 'destructive',
      });
    }
  };

  const getRoleBasedLinks = () => {
    if (!profile) return [];

    const links = [];

    if (profile.role === 'admin') {
      links.push(
        { to: '/admin', label: t('nav.dashboard'), icon: LayoutDashboard },
        { to: '/admin/users', label: t('nav.users'), icon: Users }
      );
    }

    if (profile.role === 'principal') {
      links.push(
        { to: '/principal', label: t('nav.dashboard'), icon: LayoutDashboard },
        { to: '/principal/approvals', label: t('nav.approvals'), icon: ClipboardList },
        { to: '/principal/reports', label: t('nav.reports'), icon: Award }
      );
    }

    if (profile.role === 'teacher') {
      links.push(
        { to: '/teacher', label: t('nav.dashboard'), icon: LayoutDashboard },
        { to: '/teacher/questions', label: t('nav.questionBank'), icon: FileQuestion },
        { to: '/teacher/exams', label: t('nav.exams'), icon: ClipboardList }
      );
    }

    if (profile.role === 'student') {
      links.push(
        { to: '/student', label: t('nav.dashboard'), icon: LayoutDashboard },
        { to: '/student/exams', label: t('nav.exams'), icon: ClipboardList },
        { to: '/student/results', label: t('nav.results'), icon: Award }
      );
    }

    return links;
  };

  const links = getRoleBasedLinks();

  const getRoleLabel = (role: string) => {
    const roleMap: Record<string, string> = {
      admin: t('role.admin'),
      principal: t('role.principal'),
      teacher: t('role.teacher'),
      student: t('role.student'),
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
              {t('app.shortTitle')}
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

          <div className="flex items-center gap-2">
            <LanguageToggle />
            
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
                    {t('auth.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {t('auth.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">{t('auth.register')}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
