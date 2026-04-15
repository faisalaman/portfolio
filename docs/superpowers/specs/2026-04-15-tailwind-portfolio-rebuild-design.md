# Tailwind + Framer Motion Portfolio Rebuild — Design

**Date:** 2026-04-15
**Status:** Approved for planning
**Branch:** `feature/aurora-glass-theme` (contents replaced; Aurora CSS rebuild abandoned)

## Goal

Replace the existing CSS-variable-based portfolio implementation with a clean rebuild on **Tailwind CSS v4 + Framer Motion**. Preserve all content from `src/data/profile.js` and the same single-page section structure, but rebuild every component from scratch with a refined Aurora Glass aesthetic, light/dark toggle, and full motion treatment.

## Non-goals

- No changes to `src/data/profile.js` content
- No routing / multi-page (single-page scroll, same sections)
- No 7-theme switcher (light + dark only)
- No constellation/circuit canvas (replaced by Framer Motion gradient mesh)
- No tests (project has no test framework)
- No new copy

## Stack

| Concern | Choice |
|---------|--------|
| Framework | React 19 + Vite 8 (existing) |
| Styling | Tailwind CSS v4 (CSS-first config via `@theme`) |
| Animation | Framer Motion 11 |
| Theme | Custom `useTheme` hook + `class="dark"` on `<html>`, persisted to `localStorage` |
| Class merge | `clsx` |

No other new dependencies. ESLint config unchanged.

## Sections (single page, in order)

Hero · About · Services · TechExpertise · Experience · Skills · Contact · Footer

Plus widgets: PageLoader, ScrollToTop, AIChatAssistant.

## File structure

```
src/
  main.jsx                      # mount React tree
  App.jsx                       # composes layout + sections + widgets
  index.css                     # Tailwind import, @theme tokens, base layer
  data/profile.js               # UNCHANGED
  lib/
    motion.js                   # shared variants (fadeUp, stagger, scaleIn)
    cn.js                       # clsx wrapper
  hooks/
    useTheme.js                 # 'light' | 'dark', toggles html.class, persists
    useCounter.js               # animated number counter
  components/
    layout/
      Navbar.jsx                # responsive: full nav ≥md, hamburger sheet <md
      Footer.jsx
    sections/
      Hero.jsx
      About.jsx
      Services.jsx
      TechExpertise.jsx
      Experience.jsx
      Skills.jsx
      Contact.jsx
    ui/
      Section.jsx               # <motion.section> wrapper: container + scroll reveal
      Card.jsx                  # base glass card; optional tilt prop
      Button.jsx                # variants: primary, ghost
      GradientText.jsx          # animated gradient (CSS keyframes via Tailwind arbitrary)
      ThemeToggle.jsx           # sun/moon icon button
      AuroraBackground.jsx      # 3 blurred gradient motion.div blobs
    widgets/
      PageLoader.jsx
      ScrollToTop.jsx
      AIChatAssistant.jsx       # ported behavior, restyled with Tailwind
```

## Design tokens (Tailwind v4 `@theme`)

Defined in `src/index.css` using Tailwind v4's `@theme` directive. Both light and dark token sets; `.dark` selector swaps semantic colors.

**Dark (Aurora):**
- `--color-bg`: `#0a0a18`
- `--color-bg-alt`: `#10102a`
- `--color-surface`: `rgba(255,255,255,0.06)` (glass)
- `--color-border`: `rgba(255,255,255,0.10)`
- `--color-text`: `#f5f5fa`
- `--color-text-muted`: `#8a8aa3`
- `--color-primary`: `#a78bfa` (violet)
- `--color-accent`: `#22d3ee` (cyan)
- `--color-magenta`: `#f472b6`

**Light:**
- `--color-bg`: `#f8fafc`
- `--color-bg-alt`: `#f1f5f9`
- `--color-surface`: `#ffffff`
- `--color-border`: `#e2e8f0`
- `--color-text`: `#0f172a`
- `--color-text-muted`: `#64748b`
- `--color-primary`: `#6366f1`
- `--color-accent`: `#0ea5e9`
- `--color-magenta`: `#ec4899`

**Type:**
- Font: Inter via Google Fonts (link in `index.html`)
- Fluid headings: `clamp()` arbitrary values where needed

**Radius:** Tailwind `rounded-2xl` (24px) for cards, `rounded-xl` (16px) for buttons
**Shadows:** Dark: `shadow-[0_8px_40px_rgba(167,139,250,0.15)]`. Light: `shadow-md` with `slate-200/50`.

## Theme toggle

- `useTheme()` returns `{ theme, toggle }`
- On mount: read `localStorage.getItem('theme')` → fall back to `prefers-color-scheme`
- Apply by toggling `dark` class on `document.documentElement`
- `<ThemeToggle />` renders sun (when dark) / moon (when light) icon, with rotate+scale Framer Motion transition between icons

## Animation set (Framer Motion + CSS)

| Element | Animation | Mechanism |
|---------|-----------|-----------|
| Page mount | `<PageLoader>` fades+scales out → triggers hero reveal | Framer `AnimatePresence` |
| Hero headline | Char/word stagger entrance + animated gradient | Framer `staggerChildren` + CSS keyframes via `@layer utilities` |
| Hero CTAs | Fade+slide up after headline | Framer variants |
| Sections | `whileInView` fade+slide-up 16px, `once: true`, viewport amount 0.2 | `<Section>` wrapper |
| Service / Experience cards | Stagger entrance + hover lift + spring tilt (rotateX/Y from `useMotionValue` on mousemove) | `<Card tilt>` |
| Stat counters (About) | Count from 0 to value when in view | `useCounter` triggered by `useInView` |
| Buttons | `whileHover={{ scale: 1.02 }}` + shimmer pseudo via Tailwind arbitrary | `<Button>` |
| Nav links | Underline grow on hover (CSS transform) | Tailwind |
| Theme toggle | Icon swap with rotate+fade | Framer `AnimatePresence` |
| Aurora background | 3 blurred radial-gradient `motion.div` blobs with infinite drift | Framer `animate` loop, dark-only |
| Smooth scroll | `scroll-behavior: smooth` on `html` | CSS |
| Reduced motion | All Framer animations gated via `useReducedMotion()` | Framer hook |

## Responsive

- Mobile-first; breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`)
- Container: `max-w-6xl mx-auto px-4 md:px-8`
- Navbar: hamburger sheet `<md`, inline nav `≥md`
- Hero: stacked `<lg`, two-column (text / portrait or accent visual) `≥lg`
- Cards: 1 col mobile → 2 col `md` → 3 col `lg`
- Footer: stacked on mobile, three-column on desktop

## Migration steps (destructive)

1. On branch `feature/aurora-glass-theme`, delete:
   - `src/styles.css`
   - `src/components/*.jsx` (all)
   - `src/hooks/useFadeIn.jsx`, `useTilt.jsx`, `useTypingEffect.js`
   - (keep `src/hooks/useCounter.js` as reference; rewrite if needed)
2. Keep untouched: `src/data/profile.js`, `index.html` (update fonts/title only)
3. Install: `tailwindcss@4`, `@tailwindcss/vite`, `framer-motion`, `clsx`
4. Configure Vite for Tailwind v4 (add plugin to `vite.config.js`)
5. Create new file tree per File Structure section
6. Implement bottom-up: tokens → ui primitives → sections → layout → widgets → App
7. Verify: `npm run lint`, `npm run build`, manual visual check in `npm run dev`

## Acceptance criteria

1. All sections from `profile.js` render with the same content as before
2. Light/dark toggle works, persists across reloads, respects system preference on first load
3. Page loader shows on initial mount, fades out within ~800ms
4. Sections fade+slide up exactly once when scrolled into view
5. Service and experience cards tilt on hover (desktop, no touch, no reduced-motion)
6. Stat counters animate from 0 when About section enters view
7. Hero headline shows animated gradient text in both themes
8. AI chat widget floats bottom-right, opens/closes, returns canned answers from `profile.js` (same behavior as today)
9. Scroll-to-top button appears after scrolling past hero
10. Fully responsive: no horizontal scroll on `≥320px` widths; navbar collapses to hamburger `<md`
11. With `prefers-reduced-motion: reduce`, all decorative motion disabled (counters jump to final value)
12. `npm run lint` passes (no new errors beyond pre-existing); `npm run build` succeeds

## Out of scope

- 7-theme switcher
- Constellation canvas / circuit animation
- Routing
- Tests
- Content/copy changes
- SEO/meta beyond a single page title + description in `index.html`
