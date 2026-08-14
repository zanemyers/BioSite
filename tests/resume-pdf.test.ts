import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { HASH_FILE, PDF_FILE, sourceHash } from '../scripts/resume-sources.ts';

/**
 * Guards the properties that make the résumé usable rather than decorative: the version this
 * replaced was a single full-page image with zero extractable text — perfectly fine on screen, and
 * blank to the applicant tracking systems that parse résumés.
 *
 * Structure is read off the raw bytes rather than through a PDF library. Every check derives a
 * small value first, so a failure prints a readable number rather than 300KB of binary.
 */

const pdf = readFileSync(PDF_FILE);
// PDF syntax is ASCII; stream contents are binary, but we only match markers.
const raw = pdf.toString('latin1');

const LETTER_PT = { width: 612, height: 792 };

const pageCount = (raw.match(/\/Type\s*\/Page[^s]/g) ?? []).length;

const mediaBox = raw.match(/\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)/);
const pageSize = mediaBox
  ? { width: Math.round(Number(mediaBox[1])), height: Math.round(Number(mediaBox[2])) }
  : null;

// `/Type /Font` entries survive in the raw bytes and are what an image-only export lacks entirely.
// `/FontFile*` and `/BaseFont` don't: Chromium writes those inside Flate-compressed object streams,
// so their absence would prove nothing.
const fontObjects = (raw.match(/\/Type\s*\/Font/g) ?? []).length;

describe('résumé PDF', () => {
  test('is a single page', () => {
    expect(pageCount).toBe(1);
  });

  test('is US Letter', () => {
    expect(pageSize).toEqual(LETTER_PT);
  });

  test('draws text with real fonts, which an image-only export would not', () => {
    // The résumé this replaced had zero font objects; this one uses a subset per style.
    expect(fontObjects).toBeGreaterThanOrEqual(3);
  });

  test('is a plausible size for a single vector page', () => {
    // Byte count is the honest raster check: an image's /Width and /Height are pixels, not points,
    // so they can't be compared against the page box. The sidebar gradient Chromium rasterizes is
    // ~15% of this file, where a scanned page would be nearly all of it.
    expect(pdf.length).toBeGreaterThan(20_000);
    expect(pdf.length).toBeLessThan(600_000);
  });

  test('is current — regenerate with `bun run resume:pdf` if this fails', () => {
    // A committed artifact can silently fall behind the data it came from.
    const recorded = existsSync(HASH_FILE) ? readFileSync(HASH_FILE, 'utf8').trim() : '(none)';
    expect(recorded).toBe(sourceHash());
  });
});
