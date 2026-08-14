/**
 * Captures the light and dark screenshots used by the BioSite card on the Projects page.
 *
 *   bun run screenshots
 *
 * These go stale on every design change — the pair this replaced predated an entire redesign and
 * was advertising a site that no longer existed. Re-run this instead of cropping by hand.
 */
/// <reference lib="dom" />
// The addInitScript and evaluate callbacks run in the browser, so this file needs DOM types
// alongside Node's. This widens the whole tsconfig.node.json program — no per-file lib scoping.
import { chromium } from 'playwright';
import { createServer } from 'vite';
import { fromRoot } from './resume-sources.ts';

/**
 * 16:9 to match the aspect-video frame the cards render in, and wide enough to stay above the lg
 * breakpoint so the hero captures in its desktop layout rather than stacked. deviceScaleFactor
 * stays at 1: the featured hero renders about 620px wide, so 1600px is already 2.5x — capturing at
 * 2x tripled the file size for no visible gain.
 */
const VIEWPORT = { width: 1600, height: 900 };

const SHOTS = [
  { theme: 'light', file: 'src/pages/Projects/imgs/bioSite.jpg' },
  { theme: 'dark', file: 'src/pages/Projects/imgs/bioSite_dark.jpg' },
] as const;

const server = await createServer({ server: { port: 4371, strictPort: false } });
await server.listen();
const base = server.resolvedUrls?.local[0];
if (!base) throw new Error('vite dev server did not report a local URL');

let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
try {
  browser = await chromium.launch();

  for (const shot of SHOTS) {
    const page = await browser.newPage({
      viewport: VIEWPORT,
      colorScheme: shot.theme,
      // styles.css forces every [data-reveal] visible under reduced motion, so the capture can't
      // race the IntersectionObserver, and the aurora drift freezes for a repeatable frame.
      reducedMotion: 'reduce',
    });
    // The site reads its theme from localStorage before first paint.
    await page.addInitScript(`localStorage.setItem('theme', '${shot.theme}')`);

    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    if (isDark !== (shot.theme === 'dark')) {
      throw new Error(`expected ${shot.theme} theme, but html.dark is ${isDark}`);
    }

    await page.screenshot({ path: fromRoot(shot.file), type: 'jpeg', quality: 82 });
    await page.close();
    console.log(`  wrote ${shot.file}`);
  }
} finally {
  await browser?.close().catch(() => {});
  await server.close().catch(() => {});
}
