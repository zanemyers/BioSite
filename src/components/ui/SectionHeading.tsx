import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Rule-and-label lockup that sits above a heading. Exported because page heads render an `h1`
 * of their own and so can't use SectionHeading, but must match its eyebrow exactly.
 */
export function Eyebrow({ children, centered = false }: { children: string; centered?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
      aria-hidden="true"
    >
      <span className="h-px w-8 bg-linear-to-r from-transparent to-accent/70" />
      <span className="eyebrow">{children}</span>
      {/* Trailing rule only when centered — left-aligned heads use a single leading rule. */}
      {centered && <span className="h-px w-8 bg-linear-to-l from-transparent to-accent/70" />}
    </div>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: Props) {
  const centered = align === 'center';

  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && <Eyebrow centered={centered}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-foreground text-balance">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base md:text-lg text-muted-foreground leading-relaxed ${
            centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
