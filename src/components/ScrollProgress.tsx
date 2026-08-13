import { useEffect, useRef } from 'react';

/**
 * Thin gradient bar pinned under the header showing read progress. The scale is written
 * straight to the node rather than held in state — this updates on every scroll frame, and
 * a decorative bar shouldn't cost a React render each time.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-linear-to-r from-accent via-cyan to-violet"
      />
    </div>
  );
}
