import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Backdrop from './Backdrop';
import Footer from './Footer';
import Header from './Header';
import ScrollProgress from './ScrollProgress';

/** Shared chrome for every route: backdrop, header, footer, and scroll behavior. */
export default function Layout() {
  const { pathname } = useLocation();

  // React Router keeps scroll position across navigations; reset it.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a read
  useEffect(() => {
    // 'instant', not 'auto' — 'auto' defers to `scroll-behavior: smooth` on HTML, which would
    // animate a full-page scroll on every navigation.
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <Backdrop />
      <ScrollProgress />
      <Header />

      {/* tabIndex allows the skip link to actually move focus in Safari. */}
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
