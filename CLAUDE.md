# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev        # Start development server (Vite HMR)
bun run build      # Type-check (tsc -b) then bundle for production
bun run lint       # Lint with Biome
bun run format     # Format with Biome
bun run check      # Biome check + auto-fix
bun run preview    # Preview production build locally
```

Package manager is **Bun** (`bun.lock`). Linting/formatting is **Biome** (`biome.json`). No test runner is configured.

## Architecture

Personal portfolio/biography site built with **React 19 + TypeScript + Vite**.

**Routing** (`src/App.tsx`): React Router v6 with `BrowserRouter`. Routes: `/` (Home), `/resume`, `/projects`, `/updates`, `/terms-of-service`, `/privacy-policy`, `*` (NotFound).

**Data**: All content is static TypeScript data files (no backend/API). Jobs are in `jobEntries.ts`, updates in `updateEntries.ts`. Projects are defined inline in `src/pages/Projects/Projects.tsx` as a `projects` array — the first item is rendered as the "Featured Project" in a larger hero layout; the rest appear in the grid below. To add new content, edit these files.

**ProjectCard**: Accepts an optional `deprecated` boolean that renders a yellow "Deprecated" badge on the card. The featured project hero also supports an optional `imageDark` property to swap in a dark-mode variant image (`dark:block` / `dark:hidden` CSS classes handle the toggle).

**Theme system**: Dark/light mode uses a CSS custom property design token system defined in `src/styles/styles.css` (HSL variables like `--background`, `--foreground`, etc.). The `dark` class on the `<html>` element switches palettes. Theme is persisted to `localStorage` under the `theme` key and initialized early in `src/index.tsx` to prevent flash of unstyled content. Radix UI Themes wraps the app with `appearance="inherit"`.

**Styling**: Tailwind CSS v4 via the `@tailwindcss/vite` plugin (no PostCSS config). Theme tokens and `@custom-variant dark` live in `src/styles/styles.css`. Use semantic color tokens (`text-foreground`, `bg-card`, `text-muted-foreground`) rather than raw colors. Three font families are configured: Inter (sans), Lora (serif), Space Mono (mono).

**Components vs Pages**: Reusable display components live in `src/components/`. Route-specific page components live in `src/pages/`. Pages compose components and own local UI state (e.g., mobile menu open/closed, category filter selection).
