import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';

const routes = [
  { index: '01', path: '/resume' },
  { index: '02', path: '/projects' },
  { index: '03', path: '/updates' },
];

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grid-lines" />

      <div className="mx-auto grid min-h-[60vh] max-w-4xl place-items-center px-4 py-24 sm:px-6 md:py-36 lg:px-8">
        <div className="w-full text-center">
          <Reveal>
            <span className="chip uppercase tracking-[0.18em]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              ERR_ROUTE_NOT_FOUND
            </span>

            <h1 className="mt-8 text-7xl font-semibold leading-[0.9] tracking-tighter text-gradient md:text-9xl">
              404
            </h1>

            <h2 className="mt-4 text-2xl font-semibold text-foreground text-balance md:text-3xl">
              Oops! Page Not Found
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground leading-relaxed">
              We can't seem to find the page you're looking for.
            </p>

            <div className="mt-10 flex justify-center">
              <Button to="/" size="lg" icon={<FiArrowLeft size={16} />}>
                Back to Homepage
              </Button>
            </div>
          </Reveal>

          <Reveal delay={80} className="mx-auto mt-16 max-w-sm">
            <div aria-hidden="true" className="hairline" />
            <p className="mt-6 micro-label">Available routes</p>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {routes.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    <span className="tabular-nums text-muted-foreground">{route.index}</span>
                    {route.path}
                    <FiArrowUpRight
                      size={12}
                      aria-hidden="true"
                      className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
