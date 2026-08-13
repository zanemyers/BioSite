import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

/** Mirrors of `--background`; the theme is class-driven, so the meta can't use a media query. */
const THEME_COLORS = { dark: '#070a13', light: '#fafbfd' };

const syncThemeColor = (isDark: boolean) => {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isDark ? THEME_COLORS.dark : THEME_COLORS.light);
};

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
          syncThemeColor(true);
        } else if (val === 'light') {
          document.documentElement.classList.remove('dark');
          setIsDark(false);
          syncThemeColor(false);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleTheme = () => {
    try {
      const nextIsDark = !document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', nextIsDark);
      localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
      setIsDark(nextIsDark);
      syncThemeColor(nextIsDark);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Dark mode"
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-lg border border-border bg-card/70 text-muted-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent md:h-9 md:w-9"
    >
      <FiSun
        aria-hidden="true"
        size={16}
        className={`absolute transition-all duration-500 ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
      />
      <FiMoon
        aria-hidden="true"
        size={16}
        className={`absolute transition-all duration-500 ${
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
