import type { ReactNode } from 'react';

export type TagTone =
  | 'default'
  | 'accent'
  | 'cyan'
  | 'violet'
  | 'green'
  | 'orange'
  | 'red'
  | 'warn';

/**
 * One entry per tone, split so the text color can be reused on its own (JobEntry colors a
 * company name with it). Keeping surface and text together is what stops the two drifting.
 */
const tones: Record<TagTone, { surface: string; text: string }> = {
  default: { surface: 'border-border bg-muted/60', text: 'text-muted-foreground' },
  accent: { surface: 'border-accent/30 bg-accent/10', text: 'text-accent' },
  cyan: { surface: 'border-cyan/30 bg-cyan/10', text: 'text-cyan' },
  violet: { surface: 'border-violet/30 bg-violet/10', text: 'text-violet' },
  green: {
    surface: 'border-emerald-500/30 bg-emerald-500/10',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  orange: {
    surface: 'border-orange-500/30 bg-orange-500/10',
    text: 'text-orange-700 dark:text-orange-300',
  },
  red: {
    surface: 'border-red-500/30 bg-red-500/10',
    text: 'text-red-700 dark:text-red-300',
  },
  /** Caution rather than a palette choice — the Deprecated badge uses this. */
  warn: {
    surface: 'border-amber-500/40 bg-amber-500/10',
    text: 'text-amber-700 dark:text-amber-300',
  },
};

/** Just the text color of a tone, for surfaces that borrow the palette without being pills. */
export const toneText = (tone: TagTone) => tones[tone].text;

interface Props {
  children: ReactNode;
  tone?: TagTone;
  className?: string;
}

/** Pill for tech stacks, categories, and metadata. Borrows `.chip`'s geometry. */
export default function Tag({ children, tone = 'default', className = '' }: Props) {
  const { surface, text } = tones[tone];
  return <span className={`chip ${surface} ${text} ${className}`}>{children}</span>;
}
