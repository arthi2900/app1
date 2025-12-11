import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
      title={language === 'en' ? 'Switch to Tamil' : 'தமிழுக்கு மாறவும்'}
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">{language === 'en' ? 'EN' : 'த'}</span>
    </Button>
  );
}
