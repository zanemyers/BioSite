/**
 * Renders /resume/print in headless Chromium and writes public/zm-resume.pdf.
 *
 *   bun run resume:pdf
 *
 * The output is a real vector PDF: selectable text, Letter size, parseable by the ATS software
 * that ignores an image-only résumé. Re-run it whenever résumé data changes — `bun run
 * resume:check` compares a hash of that data against the one recorded here and fails if the PDF
 * has gone stale.
 *
 * This renders against the DEV server, not a production preview, because /resume/print is
 * registered only when import.meta.env.DEV is true and so does not exist in a production build.
 * Layout is identical either way: the sheet's sizing is all inches and points, and the fonts come
 * from the same stylesheet.
 */
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
// The callbacks passed to page.evaluate() run in the browser, not in this process, so this file
// needs DOM types alongside the Node ones. Declared here rather than in tsconfig.node.json to
// keep the reason next to the code that needs it. Note this widens the whole tsconfig.node.json
// program, not just this file — TypeScript has no per-file lib scoping. dom.iterable is what gives
// HTMLCollection a [Symbol.iterator], without which spreading `.children` doesn't typecheck.
import { writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { createServer } from 'vite';
import { HASH_FILE, PDF_FILE, sourceHash } from './resume-sources.ts';

const server = await createServer({ server: { port: 4319, strictPort: false } });
await server.listen();
const base = server.resolvedUrls?.local[0];
if (!base) throw new Error('vite dev server did not report a local URL');

let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
try {
  browser = await chromium.launch();
  const page = await browser.newPage({
    colorScheme: 'light',
    viewport: { width: 1100, height: 1500 },
  });

  await page.goto(new URL('resume/print', base).href, { waitUntil: 'networkidle' });
  // Measure in print media, which is what page.pdf() lays out with.
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });
  await page.evaluate(() => document.fonts.ready);

  // Fonts first: fallback metrics would make every measurement below meaningless, and the run
  // would still stamp a fresh hash. `fonts.check()` returns true when NO matching face exists,
  // so an empty face set has to be tested separately — that is the offline case.
  const fonts = await page.evaluate(() => ({
    faceCount: document.fonts.size,
    missing: [
      '700 24pt "Space Grotesk"',
      '600 11pt "Space Grotesk"',
      '400 9.4pt "Inter"',
      '400 8.2pt "JetBrains Mono"',
    ].filter((face) => !document.fonts.check(face)),
  }));
  if (fonts.faceCount === 0 || fonts.missing.length > 0) {
    throw new Error(
      `web fonts unavailable (${fonts.missing.join(', ') || 'no @font-face rules loaded at all'}). ` +
        'The PDF would be laid out in fallback fonts. Check network access to fonts.googleapis.com.',
    );
  }

  // The sheet clips overflow so a stray line can't spill onto a second page — which means an
  // overflow would silently lose content. Measure each column's real content extent (its last
  // child's bottom edge, since the columns themselves stretch to full height) and fail if it
  // runs past the printable area.
  const fit = await page.evaluate(() => {
    const sheet = document.querySelector('.resume-sheet');
    if (!sheet) return null;
    return [...sheet.children].map((col) => {
      const top = col.getBoundingClientRect().top;
      const kids = [...col.children].filter((el) => !el.hasAttribute('aria-hidden'));
      const last = kids[kids.length - 1];
      const style = getComputedStyle(col);
      return {
        tag: col.tagName.toLowerCase(),
        content: Math.round((last?.getBoundingClientRect().bottom ?? top) - top),
        available: Math.round(col.getBoundingClientRect().height - parseFloat(style.paddingBottom)),
        // Columns clip horizontally too, so a long unbreakable run would vanish silently.
        overflowX: Math.max(0, col.scrollWidth - col.clientWidth),
      };
    });
  });

  if (!fit) throw new Error('no .resume-sheet found on /resume/print');

  for (const col of fit) {
    const slack = col.available - col.content;
    const fill = Math.round((col.content / col.available) * 100);
    console.log(
      `  ${col.tag.padEnd(6)} ${col.content}px of ${col.available}px (${fill}% full,` +
        ` ${slack >= 0 ? `${slack}px slack` : `${-slack}px OVER`})`,
    );
  }

  const over = fit.filter((col) => col.content > col.available);
  if (over.length > 0) {
    throw new Error(
      `résumé content overflows the page: ${over
        .map((c) => `${c.tag} by ${c.content - c.available}px`)
        .join(', ')}. Trim content or tighten the sheet, then regenerate.`,
    );
  }

  const wide = fit.filter((col) => col.overflowX > 0);
  if (wide.length > 0) {
    throw new Error(
      `résumé content is too wide and would be clipped: ${wide
        .map((c) => `${c.tag} by ${c.overflowX}px`)
        .join(', ')}. Usually an unbreakable run with no space to wrap at.`,
    );
  }

  await page.evaluate(() => {
    document.title = 'Zane Myers — Résumé';
  });

  await page.pdf({
    path: PDF_FILE,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  writeFileSync(HASH_FILE, `${sourceHash()}\n`);
  console.log(`\n  wrote ${PDF_FILE}`);
} finally {
  // Swallow cleanup failures: a close() error must not replace the diagnostic above.
  await browser?.close().catch(() => {});
  await server.close().catch(() => {});
}
