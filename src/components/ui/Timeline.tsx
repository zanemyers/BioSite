/** Shared timeline motif: the résumé's experience list and the Updates feed both use it. */

/**
 * The hairline every timeline node sits on. Drop it into a `relative` wrapper
 * around the list — an `<ol>` may only contain `<li>` children.
 */
export function TimelineRail() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-3 left-1.75 w-px bg-linear-to-b from-accent/50 via-border-strong to-transparent"
    />
  );
}

/**
 * The glowing marker that sits on a rail. Shared with the Updates feed so both timelines
 * read as one motif; `dot`/`ring` are Tailwind color classes.
 */
export function TimelineNode({
  className = '',
  dot = 'bg-accent',
  ring = 'border-accent/50',
  pulse = false,
}: {
  className?: string;
  dot?: string;
  ring?: string;
  pulse?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border bg-background ${ring} ${className}`}
    >
      <span className={`absolute -inset-1 rounded-full opacity-40 blur-[5px] ${dot}`} />
      {pulse && (
        <span className={`absolute -inset-px rounded-full opacity-50 animate-pulse-ring ${dot}`} />
      )}
      <span
        className={`relative h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-125 ${dot}`}
      />
    </span>
  );
}
