import { type ReactNode, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  /** Stagger in ms, applied as a transition delay when the element enters view. */
  delay?: number;
}

/**
 * Fades + lifts its children into view the first time they intersect the viewport.
 * Elements start hidden via the `[data-reveal]` rule in styles.css; the
 * `prefers-reduced-motion` override there keeps content visible when motion is off.
 */
export default function Reveal({ children, delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
