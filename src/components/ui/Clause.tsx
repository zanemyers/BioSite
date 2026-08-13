import type { ReactNode } from 'react';

/**
 * A section of a legal document, shared by the Terms and Privacy pages so their typography and
 * spacing can't drift. Pass `index` for the numbered form Terms uses; omit it for the plain
 * form Privacy uses, which gets an accent tick instead.
 */
export function Clause({
  index,
  title,
  children,
}: {
  index?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      {!index && <span aria-hidden="true" className="block h-px w-6 bg-accent/60" />}
      <h2 className="flex items-baseline gap-3 text-xl font-semibold text-foreground md:text-2xl">
        {index && <span className="font-mono text-xs tabular-nums text-accent">{index}</span>}
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

/** List row inside a Clause, with an accent dash instead of a bullet glyph. */
export function Item({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="mt-3 h-px w-2.5 shrink-0 bg-accent/70" />
      <span>{children}</span>
    </li>
  );
}
