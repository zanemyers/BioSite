/**
 * Fails if public/zm-resume.pdf is older than the data it was generated from.
 *
 *   bun run resume:check
 *
 * Run in CI so a résumé edit can't ship without the PDF being regenerated.
 */
import { existsSync, readFileSync } from 'node:fs';
import { HASH_FILE, PDF_FILE, SOURCES, sourceHash } from './resume-sources.ts';

if (!existsSync(PDF_FILE)) {
  console.error(`${PDF_FILE} is missing. Run: bun run resume:pdf`);
  process.exit(1);
}

const recorded = existsSync(HASH_FILE) ? readFileSync(HASH_FILE, 'utf8').trim() : '';
const current = sourceHash();

if (recorded !== current) {
  console.error(
    `résumé PDF is stale.\n` +
      `  recorded: ${recorded || '(none)'}\n` +
      `  current:  ${current}\n` +
      `  sources:  ${SOURCES.join(', ')}\n\n` +
      `Run: bun run resume:pdf`,
  );
  process.exit(1);
}

console.log(`résumé PDF is current (${current})`);
