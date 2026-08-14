import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { PDF_FILE } from '../scripts/resume-sources.ts';

/**
 * Guards the properties that make the résumé usable rather than decorative. The version this
 * replaced was a single full-page image with zero extractable text, which reads as blank to the
 * applicant tracking systems that parse résumés — a regression that looks perfectly fine on screen.
 *
 * Reads structure off the raw file rather than taking a PDF library as a dependency. Two limits of
 * that approach, learned the hard way:
 *   - `/FontFile2` and friends sit inside Flate-compressed object streams, so their absence from
 *     the raw bytes proves nothing. `/Font` resource entries are visible, and are what an
 *     image-only export lacks entirely.
 *   - An image's `/Width` and `/Height` are pixels, not points, so they can't be compared against
 *     the page box. Byte share is the honest proxy: the decorative sidebar gradient Chromium
 *     rasterizes accounts for ~15% of this file, where a scanned page would be nearly all of it.
 *
 * Everything is derived into a small value before asserting, so a failure prints a readable number
 * rather than 300KB of binary.
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

// Count the dicts and the ones we could size separately: a dict whose key order defeats the
// pattern would otherwise contribute zero bytes and make the share assertion silently vacuous.
const imageDicts = (raw.match(/\/Subtype\s*\/Image/g) ?? []).length;
const sizedImages = [...raw.matchAll(/\/Subtype\s*\/Image.{0,400}?\/Length\s+(\d+)/gs)].map((m) =>
  Number(m[1]),
);
const imageBytes = sizedImages.reduce((sum, n) => sum + n, 0);
const imageShare = imageBytes / pdf.length;

// `/Type /Font` entries survive in the raw bytes; `/FontFile*` and `/BaseFont` do not, because
// Chromium writes them inside Flate-compressed object streams.
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

  test('is not a scanned or image-exported résumé', () => {
    // Every image dict must be accounted for, or the share below proves nothing.
    expect(sizedImages).toHaveLength(imageDicts);
    expect(imageShare).toBeLessThan(0.5);
  });

  test('is a plausible size for a single vector page', () => {
    expect(pdf.length).toBeGreaterThan(20_000);
    expect(pdf.length).toBeLessThan(600_000);
  });
});
