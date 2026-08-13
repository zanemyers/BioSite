import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { mailto, site } from '../siteConfig';
import ThemeToggle from './ThemeToggle';

export const navigation = [
  { name: 'About', href: '/' },
  { name: 'Resume', href: '/resume' },
  { name: 'Projects', href: '/projects' },
  { name: 'Life Updates', href: '/updates' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a read
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // The sheet and its toggle are both md:hidden, so if the viewport grows past md while the
  // sheet is open the scroll lock below would have no visible control left to release it.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    onChange();
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  // Lock the page behind the sheet while it's open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // The sheet covers the page, so take what's behind it out of the tab order too.
    const covered = [document.getElementById('main'), document.querySelector('footer')];
    for (const region of covered) region?.setAttribute('inert', '');

    sheetRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      for (const region of covered) region?.removeAttribute('inert');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`absolute inset-0 -z-10 border-b transition-colors duration-500 ${
          isScrolled
            ? 'border-border bg-background/80 shadow-sm backdrop-blur-xl'
            : 'border-transparent bg-background/40 backdrop-blur-md'
        }`}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-3" aria-label="Zane Myers — home">
            <span className="ring-gradient relative grid h-9 w-9 place-items-center rounded-xl bg-card/80 shadow-sm">
              <span className="font-display text-sm font-bold text-gradient">ZM</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-semibold tracking-tight text-foreground">
                Zane Myers
              </span>
              <span className="mt-0.5 micro-label">{site.role}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-accent/25 bg-accent/10"
                    />
                  )}
                  <span className="relative">{item.name}</span>
                  {!active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3.5 -bottom-px h-px origin-left scale-x-0 bg-linear-to-r from-accent to-cyan transition-transform duration-300 group-hover:scale-x-100"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={mailto}
              className="hidden items-center gap-1.5 rounded-full border border-border-strong bg-card/70 px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent lg:inline-flex"
            >
              Get In Touch
              <FiArrowUpRight size={14} aria-hidden="true" />
            </a>
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="grid h-11 w-11 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground md:hidden"
              aria-expanded={isMenuOpen}
              aria-controls={isMenuOpen ? 'mobile-nav' : undefined}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <FiX size={20} aria-hidden="true" />
              ) : (
                <FiMenu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      {isMenuOpen && (
        <div
          id="mobile-nav"
          ref={sheetRef}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
        >
          <nav className="mx-auto max-w-7xl px-4 py-6" aria-label="Mobile">
            <ul className="space-y-1">
              {navigation.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-baseline gap-4 rounded-xl px-4 py-4 transition-colors ${
                        active
                          ? 'bg-accent/10 text-accent'
                          : 'text-foreground hover:bg-muted/60 hover:text-accent'
                      }`}
                    >
                      <span
                        className={`font-mono text-xs ${
                          active ? 'text-accent' : 'text-muted-foreground'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-xl font-semibold">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 space-y-3 border-t border-border pt-6">
              <a
                href={mailto}
                className="flex items-center justify-between rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground"
              >
                {site.email}
                <FiArrowUpRight size={16} className="text-accent" aria-hidden="true" />
              </a>
              <a
                href={site.resumePath}
                download
                className="flex items-center justify-between rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground"
              >
                Download Resume (PDF)
                <FiArrowUpRight size={16} className="text-accent" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
