import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

/**
 * Locks in the contrast work behind the colour tokens.
 *
 * These pairings were each measured and several were adjusted to clear WCAG AA — light-mode
 * `--accent` and `--cyan` in particular are held darker than they'd otherwise be. That reasoning
 * lives in a comment in styles.css, which is easy to override with "the blue looks a bit dark".
 * This fails the build instead.
 *
 * Reads the tokens straight out of the stylesheet so the test can't drift from the source.
 * The path is relative to the repo root, which is where `bun test` runs from.
 */

const css = readFileSync('src/styles/styles.css', 'utf8');

function tokens(selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`no ${selector} block in styles.css`);
  const block = css.slice(start, css.indexOf('}', start));
  const found: Record<string, string> = {};
  for (const [, name, value] of block.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    found[name] = value.trim();
  }
  return found;
}

type Rgb = [number, number, number];

/** `H S% L%` triplets, as the tokens are stored, to linear-ready sRGB in 0..1. */
function rgb(triplet: string): Rgb {
  const [h, s, l] = triplet.split(/\s+/).map((part) => Number.parseFloat(part));
  const sat = s / 100;
  const lum = l / 100;
  const c = (1 - Math.abs(2 * lum - 1)) * sat;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  const wheel: Rgb[] = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ];
  const [r, g, b] = wheel[Math.floor(hp) % 6];
  const m = lum - c / 2;
  return [r + m, g + m, b + m];
}

const channel = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const luminance = ([r, g, b]: Rgb) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

/** WCAG contrast ratio. Everything stays in sRGB — no round-tripping back to HSL. */
function contrast(a: Rgb, b: Rgb) {
  const [la, lb] = [luminance(a), luminance(b)];
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const ratio = (a: string, b: string) => contrast(rgb(a), rgb(b));

/** Composites `fg` at `alpha` over `bg`, the way an `accent/10` fill does. */
function over(fg: string, alpha: number, bg: string): Rgb {
  const f = rgb(fg);
  const b = rgb(bg);
  return [0, 1, 2].map((i) => f[i] * alpha + b[i] * (1 - alpha)) as Rgb;
}

const AA_BODY = 4.5;
const AA_LARGE = 3;

describe.each([
  ['light', tokens(':root {')],
  ['dark', tokens('.dark {')],
])('%s theme', (_name, t) => {
  test('body text on the page background', () => {
    expect(ratio(t.foreground, t.background)).toBeGreaterThanOrEqual(AA_BODY);
  });

  test('muted text on the page background', () => {
    expect(ratio(t['muted-foreground'], t.background)).toBeGreaterThanOrEqual(AA_BODY);
  });

  test('muted text on a card', () => {
    expect(ratio(t['muted-foreground'], t.card)).toBeGreaterThanOrEqual(AA_BODY);
  });

  test('accent text on a card', () => {
    expect(ratio(t.accent, t.card)).toBeGreaterThanOrEqual(AA_BODY);
  });

  test('accent-on-accent/10 pills, the most common pairing on the site', () => {
    expect(contrast(rgb(t.accent), over(t.accent, 0.1, t.card))).toBeGreaterThanOrEqual(AA_BODY);
  });

  test('button label on the accent fill', () => {
    expect(ratio(t['accent-foreground'], t.accent)).toBeGreaterThanOrEqual(AA_BODY);
  });

  test('cyan, the far stop of the gradient button and .text-gradient', () => {
    expect(ratio(t['accent-foreground'], t.cyan)).toBeGreaterThanOrEqual(AA_BODY);
    expect(ratio(t.cyan, t.background)).toBeGreaterThanOrEqual(AA_LARGE);
  });

  test('violet, the last stop of .text-gradient', () => {
    expect(ratio(t.violet, t.background)).toBeGreaterThanOrEqual(AA_LARGE);
  });
});
