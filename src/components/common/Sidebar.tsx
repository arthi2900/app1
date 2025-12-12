import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FileQuestion,
  ClipboardList,
  Award,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const { profile } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getRoleBasedLinks = () => {
    if (!profile) return [];

    const links = [];

    if (profile.role === 'admin') {
      links.push(
        { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/admin/users', label: 'User Management', icon: Users }
      );
    }

    if (profile.role === 'principal') {
      links.push(
        { to: '/principal', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/principal/approvals', label: 'Exam Approvals', icon: ClipboardList },
        { to: '/principal/reports', label: 'Reports', icon: Award }
      );
    }

    if (profile.role === 'teacher') {
      links.push(
        { to: '/teacher', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/teacher/questions', label: 'Question Bank', icon: FileQuestion },
        { to: '/teacher/exams', label: 'Manage Exams', icon: ClipboardList }
      );
    }

    if (profile.role === 'student') {
      links.push(
        { to: '/student', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/student/exams', label: 'My Exams', icon: ClipboardList },
        { to: '/student/results', label: 'Results', icon: Award }
      );
    }

    return links;
  };

  const links = getRoleBasedLinks();

  if (!profile || links.length === 0) {
    return null;
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r transition-all duration-300 z-40',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="font-semibold text-sm">Navigation</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={cn('h-8 w-8', collapsed && 'mx-auto')}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;

              return (
                <Link key={link.to} to={link.to}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start gap-3',
                      collapsed && 'justify-center px-2',
                      isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <span className="truncate">{link.label}</span>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          {!collapsed && (
            <div className="p-4 border-t">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {profile.full_name?.[0]?.toUpperCase() || profile.username?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {profile.full_name || profile.username}
                  </p>
                  {profile.school_name && (
                    <p className="text-xs text-muted-foreground truncate">
                      {profile.school_name}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground capitalize">
                    {profile.role}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Spacer to prevent content from going under sidebar */}
      <div
        className={cn(
          'transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      />
    </>
  );
}
