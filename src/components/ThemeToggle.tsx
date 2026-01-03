import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    try {
      if (typeof document === 'undefined') return false;
      return document.documentElement.classList.contains('dark');
    } catch {
      return false;
    }
  });

  React.useEffect(() => {
    // keep local state in sync if other tabs change theme
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme') {
        const val = e.newValue;
        if (val === 'dark') {
          document.documentElement.classList.add('dark');
          setIsDark(true);
        } else if (val === 'light') {
          document.documentElement.classList.remove('dark');
          setIsDark(false);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleTheme = () => {
    try {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDark(false);
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDark(true);
      }
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;