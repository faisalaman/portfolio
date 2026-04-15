# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint (flat config, JS/JSX only)

No test framework is configured. If adding tests, none is preinstalled — confirm with the user before choosing one.

## Entry points

- `index.html` — Vite entry; page `<title>` and meta tags live here.
- `src/main.jsx` — Mounts `<App />` into `#root`.

## Architecture

Single-page React 19 portfolio site built with Vite 8. Plain JavaScript (no TypeScript). All styling is in `src/styles.css` (single file, CSS custom properties for theming).

### Data layer

`src/data/profile.js` is the single source of truth for all portfolio content: personal info, stats, services, skills, tech expertise, and work experience. Components import from this file rather than hardcoding content.

### Key components

- **App.jsx** — Renders a loading screen (`PageLoader`) then the full page as sequential sections: Navbar, Hero, About, Services, TechExpertise, Experience, Skills, Contact, Footer
- **Hero.jsx** — Uses `ConstellationBackground` (canvas animation) and `useTypingEffect` hook for rotating role titles
- **AIChatAssistant.jsx** — Client-side chat widget with a keyword-matching knowledge base (no external API). Matches user input against keyword arrays to return canned answers from profile data.
- **ThemeSwitcher.jsx** — Persists selected theme to localStorage, applies via CSS class on `document.body`. Seven themes available (Indigo, Ocean, Sunset, Emerald, Rose, Light, Aurora). Adding a theme = define the CSS class in `src/styles.css` and add an entry in `ThemeSwitcher`.
- **ConstellationBackground.jsx** — Canvas-based animated background for the hero section (circuit traces, pulses, spec labels)

### Custom hooks (`src/hooks/`)

- `useTypingEffect` — Typewriter animation cycling through an array of strings
- `useCounter` — Animated number counter (used for stats)
- `useFadeIn` — IntersectionObserver-based fade-in animation

### ESLint

Flat config (`eslint.config.js`). Unused variables starting with uppercase or underscore are allowed (`varsIgnorePattern: '^[A-Z_]'`). Includes react-hooks and react-refresh plugins.
