/**
 * Fixed ambient background: drifting aurora blobs behind a blueprint grid.
 * Purely decorative and non-interactive; sits behind all page content.
 */
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      {/* One alpha per blob: these are blurred 90px behind a vignette, so the few points of
          difference a dark-mode override used to add were not perceptible. */}
      <div
        className="aurora-blob -left-32 -top-40 h-136 w-136 bg-accent/25"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="aurora-blob -right-40 -top-48 h-120 w-120 bg-cyan/20"
        style={{ animationDelay: '-7s' }}
      />
      <div
        className="aurora-blob -bottom-56 left-1/3 h-128 w-lg bg-violet/15"
        style={{ animationDelay: '-14s' }}
      />

      <div className="absolute inset-0 grid-lines-fine opacity-60" />

      {/* Vignette keeps the center readable and the edges atmospheric. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_40%,transparent,hsl(var(--background)/0.85))]" />
    </div>
  );
}
