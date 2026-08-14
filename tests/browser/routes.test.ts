/// <reference lib="dom" />
// The page.evaluate callbacks run in the browser, so this file needs DOM types alongside Node's.
import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { type Browser, chromium } from 'playwright';
import { createServer, type ViteDevServer } from 'vite';

/**
 * Smoke test: every route renders, throws nothing, and has exactly one h1.
 *
 * Deliberately shallow. The content is static and type-checked, so asserting on copy would break on
 * every design tweak. What nothing else catches is a route crashing at runtime — a data edit that
 * trips a render, a bad import, a null deref — which stays invisible until someone loads the page.
 */

const ROUTES = [
  { path: '/', h1: "Hi, I'm Zane Myers" },
  { path: '/resume', h1: 'Zane Myers' },
  { path: '/projects', h1: 'My Projects' },
  { path: '/updates', h1: 'Life Updates' },
  { path: '/terms-of-service', h1: 'Terms of Service' },
  { path: '/privacy-policy', h1: 'Privacy Policy' },
  { path: '/no-such-page', h1: '404' },
];

let server: ViteDevServer;
let browser: Browser;
let base: string;

beforeAll(async () => {
  server = await createServer({ server: { port: 4341, strictPort: false } });
  await server.listen();
  const url = server.resolvedUrls?.local[0];
  if (!url) throw new Error('vite dev server did not report a local URL');
  base = url;
  browser = await chromium.launch();

  // Vite optimises dependencies on first load, and in-flight chunk requests 404 while it does. Warm
  // the server once so that can't be mistaken for a real broken resource below.
  const warmup = await browser.newPage();
  await warmup.goto(base, { waitUntil: 'networkidle' });
  await warmup.close();
}, 60_000);

afterAll(async () => {
  await browser?.close();
  await server?.close();
});

describe.each(ROUTES)('$path', ({ path, h1 }) => {
  test('renders without console errors and with exactly one h1', async () => {
    const page = await browser.newPage();
    // Stub the webfont requests: this test is about the app, and a slow or blocked
    // fonts.googleapis.com would otherwise surface as a console error or eat the timeout.
    await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) =>
      route.fulfill({ status: 200, contentType: 'text/css', body: '' }),
    );
    const problems: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') problems.push(`console: ${msg.text()}`);
    });
    page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`));

    await page.goto(new URL(path.slice(1), base).href, { waitUntil: 'networkidle' });

    const headings = await page.evaluate(() =>
      [...document.querySelectorAll('h1')].map((el) => el.textContent?.trim() ?? ''),
    );
    expect(headings).toHaveLength(1);
    expect(headings[0]).toContain(h1);
    expect(problems).toEqual([]);

    await page.close();
  }, 30_000);
});
