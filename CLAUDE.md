# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev        # Start development server (Vite HMR)
bun run build      # Type-check (tsc -b) then bundle for production
bun run typecheck  # Type-check only (tsc -b) — covers src, scripts, and tests
bun run test       # Fast checks: PDF invariants, colour contrast, sitemap
bun run test:browser # Route smoke test (needs Chromium; not run in CI)
bun run resume:pdf # Regenerate public/zm-resume.pdf from the résumé data
bun run screenshots # Recapture the light/dark BioSite screenshots
bun run lint       # Lint with Biome
bun run format     # Format with Biome
bun run check      # Biome check + auto-fix
bun run preview    # Preview production build locally
```

Package manager is **Bun** (`bun.lock`). Linting/formatting is **Biome** (`biome.json`). Tests use Bun's built-in runner — no separate test framework.

The browser tests and `resume:pdf` need Chromium, which Playwright does not install automatically: run `bunx playwright install chromium` once per machine. CI never needs it, because `bun run test` covers only the browser-free suites.

## Architecture

Personal portfolio/biography site built with **React 19 + TypeScript + Vite**.

**Routing** (`src/App.tsx`): React Router v7 with `BrowserRouter`. Every route is nested inside a single layout route rendering `src/components/Layout.tsx`. Routes: `/` (Home), `/resume`, `/projects`, `/updates`, `/terms-of-service`, `/privacy-policy`, `*` (NotFound).

**Layout** (`src/components/Layout.tsx`): owns all shared chrome — skip link, ambient `Backdrop`, `ScrollProgress`, `Header`, `<main id="main">` with the route `Outlet`, and `Footer` — plus scroll reset on navigation. **Pages must not render `Header`, `Footer`, or `<main>`, and must not wrap themselves in `min-h-screen`/`bg-background`**; they return their sections directly. The nav list is defined once as the exported `navigation` array in `Header.tsx` and reused by `Footer.tsx`.

**Data**: All content is static TypeScript data files (no backend/API). Jobs are in `jobEntries.ts` (typed `JobRecord` — `JobProps` plus the `olderExperience` flag the Resume page filters on), updates in `updateEntries.ts` (typed `UpdateEntry`, exported newest-first as `sortedUpdates`). Projects are defined inline in `src/pages/Projects/Projects.tsx` as a `projects` array — the first item is rendered as the "Featured Project" in a larger hero layout; the rest appear in the grid below. To add new content, edit these files.

Recurring details — email, phone, résumé path, social URLs, role, location — live in **`src/siteConfig.ts`**. Import `site` / `mailto` rather than hardcoding them, so an address change is one edit.

**Update categories** are the keys of `categoryTones` in `UpdateCard.tsx`; `UpdateCategory` is derived from them, so a typo in `updateEntries.ts` is a type error and the Updates filter row is generated from the same list.

**Update photos** (`UpdateCard.tsx`) follow one rule, driven by **container** queries on the card rather than viewport ones — so a card in a narrow column behaves like a phone even on a wide screen.

**Above a 48rem card the photo floats left and the text wraps around it**, continuing underneath once it outruns the photo. Floats are used deliberately over a flex row: they're self-adjusting, so a short entry sits alongside the photo and a long one wraps under, with no threshold to tune. Three consequences to know:

- The body must not be a flex container at that width (`@min-[48rem]:block`), or it becomes its own formatting context and refuses to wrap around the float.
- The wrapper needs `flow-root` so the card encloses the float. It has to sit on the inner wrapper, not the `@container` article — an element can't respond to a container query it declares itself, and `@min-[48rem]:flex-row` on the article silently never matched.
- No vertical divider between photo and text; a full-height rule would cut through wrapped text.

`imageFit` on the entry picks the size cap, not the layout. `cover` (default) caps **width** at 400px inside a 16:9 frame — capping a 16:9 photo's height at 400px would make it 711px wide and swallow the card. `tall` is for portraits and caps **height** at 400px. Below 48rem both go full-bleed and stacked, and `tall` additionally drops its cap below 28rem so a phone gets the whole photo at full card width — uncropped on purpose, since a centre crop into a landscape frame cuts the tops of heads off a 3:4 photo. Updates is `max-w-5xl` specifically so its 840px card clears the 48rem float stage.

The body text carries no measure cap. `max-w-prose` (65ch) used to be there and left 154px dead on the right of every landscape card once Updates widened; the paragraph now settles around 780px on its own.

**ProjectCard**: Accepts an optional `deprecated` boolean that renders a "Deprecated" badge. Its exported `Props` type is what `Projects.tsx` types the `projects` array with, so the two can't drift. Both the card and the featured hero honor an optional `imageDark`: the light image gets `dark:hidden` and the dark one `not-dark:hidden`, only when a dark variant exists — otherwise the light image would vanish in dark mode. Both render, so the theme toggle is instant.

**Theme system**: Dark/light mode uses a CSS custom property design token system defined in `src/styles/styles.css` (HSL channel triplets like `--background`, `--foreground`, `--accent`, so every token composes with `/ alpha`). The `dark` class on the `<html>` element switches palettes. Theme is persisted to `localStorage` under the `theme` key and applied by an inline script in `index.html` before first paint to prevent a flash of the wrong theme.

The light-mode `--accent` and `--cyan` values are deliberately held dark (50% / 28% lightness) so accent-on-`accent/10` pills and white-on-gradient buttons clear WCAG AA. Don't lighten them without re-checking contrast.

**Styling**: Tailwind CSS v4 via the `@tailwindcss/vite` plugin (no PostCSS config). Theme tokens and `@custom-variant dark` live in `src/styles/styles.css`. Use semantic color tokens (`text-foreground`, `bg-card`, `text-muted-foreground`, `text-accent`) rather than raw colors. Three font families load from Google Fonts in `index.html`: Inter (`font-sans`, body), Space Grotesk (`font-display`, headings — applied automatically to `h1`/`h2`/`h3`), JetBrains Mono (`font-mono`, labels/dates/tags).

**Design system classes** (`src/styles/styles.css`, `@layer components` / `@layer utilities`): `.panel` is the standard frosted card surface (use it instead of hand-rolling `bg-card shadow-lg rounded-lg`), with `.panel-interactive` for hover lift + glow. Also `.eyebrow` (mono kicker), `.chip` (pill geometry — shared with `Tag`, which layers a tone's colors on top; use `.chip` bare only for the plain muted pill and a `<Tag>` for anything with a tone), `.hairline` (full-bleed section rule), `.micro-label` (small mono metadata label), `.ring-gradient` (1px gradient outline), `.text-gradient`, `.grid-lines` / `.grid-lines-fine`, `.aurora-blob`, and the `.animate-float` / `.animate-pulse-ring` / `.animate-caret` ambient motions. All motion is disabled under `prefers-reduced-motion`, which also forces `[data-reveal]` elements visible; a `@media print` rule does the same so nothing prints blank.

Tokens are pruned to what's actually consumed. The `primary` / `secondary` / `accent-soft` color tokens were removed, so utilities named after them no longer resolve — add the token back if you need one. Gradients use the Tailwind v4 names (`bg-linear-to-*`), not the deprecated v3 alias.

Note `@source not "../../**/*.md"` at the top of `styles.css`: Tailwind v4 auto-scans every project file for class names, and prose in this file was emitting real rules into the bundle. Keep that exclusion if you write class names in Markdown.

**Résumé PDF** (`public/zm-resume.pdf`): generated, not hand-made. `src/pages/Resume/ResumePrint.tsx` is a Letter-sized print sheet that `scripts/generate-resume-pdf.ts` renders in headless Chromium via `page.pdf()`. Résumé content lives in `src/pages/Resume/resumeData.ts` + `jobEntries.ts`, so the page and the PDF can't disagree.

- The print route is registered **only when `import.meta.env.DEV`**, so it's absent from production builds (the module tree-shakes out). That's why the generator renders against the dev server rather than a preview of `dist`.
- The sheet clips overflow so nothing can spill onto page two, which means an overflow would silently *lose* content. The generator measures both axes and fails with the exact pixel overrun instead. It also prints each column's fill percentage: the main column is 85% full with the current role's bullets empty, and every two-line bullet costs ~37px of the 154px that leaves, so a populated current role runs it to 96–100%. Treat the printed overrun as the limit rather than a percentage target, and buy room for a new bullet by trimming an older entry — Canopy and Rescue River carry five each.
- Only current roles appear; `olderExperience` entries are excluded by design. `additionalSkills` in `resumeData.ts` works the same way for skills — the four `skillGroups` are all the sidebar has room for, so anything beyond them lives there and surfaces only in the `/resume` "More Skills" disclosure.
- After editing résumé data, run `bun run resume:pdf` and commit both the PDF and `scripts/zm-resume.hash`. `tests/resume-pdf.test.ts` compares that hash against the current sources, so CI fails if you forget. The hash covers typography too — `styles.css` and `index.html` — since a font change alters the render without touching any résumé text.
- `tests/resume-pdf.test.ts` guards the properties that matter: one Letter page, real font resources, and that the file hasn't regressed to an image-only export (the version this replaced was a single raster with zero extractable text, invisible to ATS parsers).

**Tests**: there are deliberately few, and none on component markup — the content is static and type-checked, so snapshots would churn on every design tweak and catch little. What exists covers things nothing else can: the PDF invariants above, `tests/contrast.test.ts` (asserts the token pairings clear WCAG AA in both themes, since the light-mode accent/cyan values are deliberately dark and easy to "fix" by lightening), `tests/sitemap.test.ts` (schema validation plus parity with the router's actual routes), and `tests/browser/routes.test.ts` (every route renders with no console errors and exactly one `h1`).

Tests live in `tests/`, owned by `tsconfig.node.json` rather than the app project. Anything needing a browser goes in `tests/browser/` so the default `bun run test` — and therefore CI — needs no Chromium download; `bun run test` globs `tests/*.test.ts`, so a new fast test is picked up without editing package.json.

**Components vs Pages**: Shared primitives live in `src/components/ui/` — `Reveal` (scroll-reveal wrapper; put grid layout classes like `h-full` on it, since it becomes the grid child), `SectionHeading` (eyebrow + `h2` + description) which also exports `Eyebrow` for page heads that render their own `h1`, `Tag` (pill; also exports `toneText(tone)` for text-only tone colors), `Button` (a `Link` for `to`, an anchor for `href` — exactly one is required), `Timeline` (`TimelineRail` + `TimelineNode`, shared by the Resume experience list and the Updates feed), and `Clause` (+ `Item`, shared by the Terms and Privacy pages). Reuse these rather than re-implementing them. Other reusable display components live in `src/components/`; route-specific page components live in `src/pages/` and own local UI state (e.g. mobile menu open/closed, category filter selection).

**Conventions**: section eyebrows are numbered (`01 — About`) while page-head eyebrows are not; content page titles are `text-4xl md:text-6xl` (the Home hero and the 404 are deliberately larger); major sections use `py-20 md:py-28` and page heads `pt-14 md:pt-20`; Home and Projects are `max-w-7xl`, Updates is `max-w-5xl`, Resume/Terms/Privacy/404 are `max-w-4xl`; `Reveal` staggers step by 80ms; `Button` icons are `size={16}`; decorative layers carry `aria-hidden="true"`, plus `pointer-events-none` whenever they overlay content.
