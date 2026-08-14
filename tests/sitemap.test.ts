import { describe, expect, test } from 'bun:test';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

/**
 * Guards public/sitemap.xml, which nothing else checks.
 *
 * Two layers, because they catch different mistakes:
 *   - Schema validation via xmllint, which catches malformed structure and illegal values (a
 *     `<changefreq>` of "occasionally", say). Skipped with a warning if xmllint isn't installed;
 *     it ships with libxml2-utils and is present on GitHub's ubuntu runners.
 *   - Route parity, which no schema can check: the sitemap has to list the routes the app
 *     actually serves. Every loc was rewritten by hand at one point with nothing verifying it.
 */

const sitemap = readFileSync('public/sitemap.xml', 'utf8');
const app = readFileSync('src/App.tsx', 'utf8');

const ORIGIN = 'https://zm1.org';

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

/** Paths the router serves publicly: not the catch-all, not the dev-only print sheet. */
const routes = app
  .split('\n')
  .filter((line) => line.includes('<Route path=') && !line.includes('import.meta.env.DEV'))
  .map((line) => line.match(/path="([^"]+)"/)?.[1])
  .filter((path): path is string => !!path && path !== '*');

describe('sitemap', () => {
  test('validates against the schema', () => {
    const xmllint = spawnSync(
      'xmllint',
      ['--noout', '--schema', 'sitemap.xsd', 'public/sitemap.xml'],
      {
        encoding: 'utf8',
      },
    );
    if (xmllint.error) {
      console.warn('  ! xmllint not available — schema validation skipped');
      return;
    }
    expect(xmllint.stderr.trim()).toBe('public/sitemap.xml validates');
    expect(xmllint.status).toBe(0);
  });

  test('lists every route the app serves, and nothing else', () => {
    const expected = routes.map((path) => `${ORIGIN}${path === '/' ? '/' : path}`).sort();
    expect([...locs].sort()).toEqual(expected);
  });

  test('has no trailing slashes, which would not match the routes', () => {
    const trailing = locs.filter((loc) => loc !== `${ORIGIN}/` && loc.endsWith('/'));
    expect(trailing).toEqual([]);
  });

  test('uses one origin', () => {
    expect(locs.filter((loc) => !loc.startsWith(`${ORIGIN}/`))).toEqual([]);
  });

  test('has a parseable lastmod for every entry', () => {
    const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
    expect(lastmods).toHaveLength(locs.length);
    for (const date of lastmods) {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(date))).toBe(false);
    }
  });
});
