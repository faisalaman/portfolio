# Aurora Glass Theme + Modern Animation Pass — Design

**Date:** 2026-04-15
**Status:** Approved for planning

## Goal

Add a 7th "Aurora Glass" theme (glassmorphism on an animated aurora background) and apply a global modern-animation pass across the portfolio site without altering content, structure, or dependencies.

## Non-goals

- No changes to `src/data/profile.js` content
- No changes to component layout/structure or section ordering
- No new npm dependencies
- No removal or restyling of the existing six themes

## Theme: Aurora Glass

Added as `[data-theme="aurora"]` in `src/styles.css` and a new entry in `ThemeSwitcher.jsx`.

**Palette**
- `--bg`: `#0a0a18` (deep midnight)
- `--bg-alt`: `#10102a`
- `--surface`: `rgba(255,255,255,0.06)` (translucent for glass)
- `--surface-hover`: `rgba(255,255,255,0.10)`
- `--border`: `rgba(255,255,255,0.10)`
- `--primary`: `#a78bfa` (violet)
- `--primary-light`: `#c4b5fd`
- `--primary-glow`: `rgba(167,139,250,0.25)`
- `--accent`: `#22d3ee` (cyan)
- `--accent-glow`: `rgba(34,211,238,0.20)`
- `--gradient`: `linear-gradient(135deg, #a78bfa, #22d3ee, #f472b6)`

**Aurora background layer**
- Fixed-position `::before` on `body[data-theme="aurora"]`
- 3 large blurred radial gradients (violet, cyan, magenta), each ~40vw, `filter: blur(80px)`, `opacity: 0.5`
- `@keyframes auroraDrift` — slow translate + scale loop, 30s, infinite, alternate
- `@supports not (backdrop-filter: blur(1px))` fallback: solid `--bg` and disable aurora layer

**Glass surfaces (Aurora theme only)**
- Cards, navbar, theme panel, chat widget: `background: var(--surface)` + `backdrop-filter: blur(20px) saturate(140%)` + `border: 1px solid var(--border)`
- Other themes keep their existing solid surfaces

## Animations (global — apply across all themes)

| ID | Animation | Targets | Implementation |
|----|-----------|---------|----------------|
| A1 | Aurora drift bg | Aurora theme only | CSS `@keyframes` on body `::before` |
| A2 | Scroll-reveal (fade + slide-up 16px) | All `<section>` children, cards | Reuse `useFadeIn` hook; extend with `translateY` |
| A3 | Magnetic tilt hover (max 6deg rotateX/Y) | Service cards, experience cards | New `src/hooks/useTilt.js` — mousemove → CSS transform; disabled on touch + `prefers-reduced-motion` |
| A4 | Animated gradient text | Hero `h1`, section `h2` titles | `background-clip: text` + `@keyframes gradientShift` on `background-position` (8s) |
| A5 | Button shimmer sweep on hover | Primary CTA buttons | `::after` pseudo with translucent gradient sliding L→R |
| A6 | Underline grow on links | Nav links, footer links | `::after` width transition |
| A7 | Social icon lift + glow | Footer/contact icons | Transform translateY + box-shadow on hover |

**Reduced motion:** All animations gated by `@media (prefers-reduced-motion: no-preference)`. Tilt hook checks `matchMedia` and no-ops when reduced motion is set.

## Files touched

| File | Change |
|------|--------|
| `src/styles.css` | Add `[data-theme="aurora"]` block, aurora keyframes, glass surface rules, gradient-text utility, button shimmer, link underline, scroll-reveal slide variant |
| `src/components/ThemeSwitcher.jsx` | Add Aurora entry to themes array |
| `src/hooks/useTilt.js` | New — mousemove tilt with reduced-motion + touch guards |
| `src/hooks/useFadeIn.js` | Extend to support optional slide-up offset |
| `src/components/Services.jsx` (or service card component) | Apply `useTilt` to cards |
| `src/components/Experience.jsx` | Apply `useTilt` to cards |
| `src/components/Hero.jsx` | Add `gradient-text` class to headline |
| Section components missing reveal | Wrap with `useFadeIn` |
| `CLAUDE.md` | Update theme count (6 → 7) and theme list |

## Architecture notes

- **Theme isolation:** Aurora-specific styles scoped under `[data-theme="aurora"]` selector; no other theme is affected
- **Hook reuse:** `useFadeIn` is the canonical reveal mechanism — extending it (rather than creating a parallel hook) keeps reveal behavior consistent
- **`useTilt` boundary:** Pure presentation hook, takes a ref, returns nothing, attaches/cleans up listeners. Independent of theme.
- **Performance:** Aurora layer uses `transform`/`opacity` only (GPU-friendly). `backdrop-filter` is the main cost — acceptable on modern browsers; gracefully degraded via `@supports`.

## Acceptance criteria

1. Selecting "Aurora" in the theme switcher applies the glass+aurora look; switching back restores prior themes exactly
2. All 6 existing themes render unchanged (visual diff in dev should show no drift outside the new theme)
3. Sections fade+slide on first scroll into view (once, not repeated)
4. Service and experience cards tilt subtly on mouse hover; no tilt on touch devices
5. Hero headline shows animated gradient text in all themes
6. With `prefers-reduced-motion: reduce`, all decorative animations are disabled
7. `npm run lint` passes; `npm run build` succeeds
