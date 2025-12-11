import { useAuth } from '@/hooks/useAuth';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { profile } = useAuth();

  // Check if current route should show sidebar
  const shouldShowSidebar = profile && ['/admin', '/principal', '/teacher', '/student'].some(
    path => window.location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16">
        {shouldShowSidebar && <Sidebar />}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
