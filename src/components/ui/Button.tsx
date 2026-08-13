import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-all duration-300 disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-linear-to-r from-accent to-cyan text-accent-foreground shadow-glow hover:brightness-110 hover:-translate-y-0.5',
  outline:
    'border border-border-strong bg-card/70 text-foreground hover:border-accent/50 hover:text-accent hover:-translate-y-0.5',
  ghost: 'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

interface Common {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconAfter?: ReactNode;
  external?: boolean;
  download?: boolean;
  'aria-label'?: string;
}

/** Every button on this site navigates somewhere, so exactly one of `to`/`href` is required. */
type Props = (Common & { to: string; href?: never }) | (Common & { href: string; to?: never });

/** One button surface for the whole site: a router Link for `to`, an anchor for `href`. */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconAfter,
  external = false,
  download = false,
  'aria-label': ariaLabel,
}: Props) {
  const classes = `${base} ${variants[variant]} ${sizes[size]}`;

  const inner = (
    <>
      {/* Light sweep on hover — only visible on the filled variant. */}
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      {icon && (
        <span aria-hidden="true" className="relative shrink-0">
          {icon}
        </span>
      )}
      <span className="relative">{children}</span>
      {iconAfter && (
        <span
          aria-hidden="true"
          className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
        >
          {iconAfter}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      download={download || undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {inner}
    </a>
  );
}
