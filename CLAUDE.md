# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server (Vite HMR)
npm run build      # Type-check (tsc -b) then bundle for production
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

No test runner is configured.

## Architecture

Personal portfolio/biography site built with **React 19 + TypeScript + Vite**.

**Routing** (`App.tsx`): React Router v6 with `BrowserRouter`. Routes: `/` (Home), `/resume`, `/projects`, `/updates`, `/terms-of-service`, `/privacy-policy`, `*` (NotFound).

**Data**: All content is static TypeScript data files (no backend/API). Jobs are in `jobEntries.ts`, updates in `updateEntries.ts`. To add new content, edit these files.

**Theme system**: Dark/light mode uses a CSS custom property design token system defined in `styles.css` (HSL variables like `--background`, `--foreground`, etc.). The `dark` class on the `<html>` element switches palettes. Theme is persisted to `localStorage` under the `theme` key and initialized early in `index.tsx` to prevent flash of unstyled content. Radix UI Themes wraps the app with `appearance="inherit"`.

**Styling**: Tailwind CSS with class-based dark mode. Use semantic color tokens (`text-foreground`, `bg-card`, `text-muted-foreground`) rather than raw colors. Three font families are configured: Inter (sans), Lora (serif), Space Mono (mono).

**Components vs Pages**: Reusable display components live in `src/components/`. Route-specific page components live in `src/pages/`. Pages compose components and own local UI state (e.g., mobile menu open/closed, category filter selection).
