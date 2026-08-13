import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The files the résumé PDF is derived from. Kept separate from the generator so the staleness
 * check can import it without launching a browser.
 *
 * Typography counts: the sheet renders with the `--font-*` stacks from styles.css and the webfont
 * request in index.html, so a change to either alters the PDF even though no résumé text moved.
 */
export const SOURCES = [
  'index.html',
  'src/styles/styles.css',
  'src/siteConfig.ts',
  'src/pages/Resume/resumeData.ts',
  'src/pages/Resume/jobEntries.ts',
  'src/pages/Resume/ResumePrint.tsx',
];

/** Repo root, so these paths hold wherever the script is invoked from. */
const ROOT = join(import.meta.dir, '..');

export const fromRoot = (path: string) => join(ROOT, path);

/** Build metadata, deliberately outside public/ so it isn't published with the site. */
export const HASH_FILE = fromRoot('scripts/zm-resume.hash');
export const PDF_FILE = fromRoot('public/zm-resume.pdf');

export function sourceHash() {
  const hash = createHash('sha256');
  for (const file of SOURCES) {
    // Separator keeps a run of bytes moving between files from hashing the same.
    hash.update(file);
    hash.update(readFileSync(fromRoot(file)));
  }
  return hash.digest('hex').slice(0, 16);
}
