# Aurora Glass Theme + Modern Animation Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 7th "Aurora Glass" theme with an animated aurora background and glassmorphism surfaces, plus a global animation pass (scroll reveal, tilt, gradient text, micro-interactions) without touching content, dependencies, or component structure.

**Architecture:** Pure CSS for theme + most animations (keyframes scoped under `[data-theme="aurora"]` for theme-only styling; global utility classes for cross-theme animations). One new React hook (`useTilt`) for mouse-tracked card tilt. Extend existing `useFadeIn` to support slide-up.

**Tech Stack:** React 19 + Vite 8, plain CSS (CSS variables, `backdrop-filter`, `@keyframes`), IntersectionObserver. No new npm dependencies.

**Verification model:** No test framework exists. Each task ends with `npm run lint`, `npm run build` (where touched), and manual browser verification via `npm run dev`.

---

## File map

**Create**
- `src/hooks/useTilt.jsx` — mouse-tracked tilt hook (returns `ref`, attaches listeners)

**Modify**
- `src/styles.css` — Aurora theme block + keyframes + glass surface rules + gradient-text + button shimmer + link underline + reveal slide variant
- `src/components/ThemeSwitcher.jsx` — add Aurora entry
- `src/hooks/useFadeIn.jsx` — extend to support optional `slideUp` offset
- `src/components/Hero.jsx` — add `gradient-text` class to headline
- `src/components/Services.jsx` — apply `useTilt` to cards
- `src/components/Experience.jsx` — apply `useTilt` to cards
- `src/components/About.jsx`, `Skills.jsx`, `TechExpertise.jsx`, `Contact.jsx` — wrap with `useFadeIn` if not already
- `CLAUDE.md` — update theme count (6 → 7) and theme list

---

## Task 1: Add Aurora theme variables and glass surfaces

**Files:**
- Modify: `src/styles.css` (append after the `[data-theme="light"]` overrides block, ~line 80)

- [ ] **Step 1: Append Aurora theme block to `src/styles.css`**

```css
/* ===== Aurora Glass Theme ===== */
[data-theme="aurora"] {
  --bg: #0a0a18;
  --bg-alt: #10102a;
  --surface: rgba(255, 255, 255, 0.06);
  --surface-hover: rgba(255, 255, 255, 0.10);
  --border: rgba(255, 255, 255, 0.10);
  --border-hover: rgba(255, 255, 255, 0.18);
  --text: #f5f5fa;
  --text-secondary: #c7c7d9;
  --text-muted: #8a8aa3;
  --primary: #a78bfa;
  --primary-light: #c4b5fd;
  --primary-glow: rgba(167, 139, 250, 0.25);
  --accent: #22d3ee;
  --accent-glow: rgba(34, 211, 238, 0.20);
  --gradient: linear-gradient(135deg, #a78bfa, #22d3ee, #f472b6);
}

/* Aurora animated background — fixed full-viewport layer */
[data-theme="aurora"] body::before,
html[data-theme="aurora"] body::before {
  content: "";
  position: fixed;
  inset: -20vh -20vw;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(40vw 40vw at 20% 30%, rgba(167, 139, 250, 0.55), transparent 60%),
    radial-gradient(45vw 45vw at 80% 20%, rgba(34, 211, 238, 0.45), transparent 60%),
    radial-gradient(50vw 50vw at 60% 80%, rgba(244, 114, 182, 0.45), transparent 60%);
  filter: blur(80px) saturate(140%);
  animation: auroraDrift 30s ease-in-out infinite alternate;
}

@keyframes auroraDrift {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(-4vw, 3vh, 0) scale(1.08); }
  100% { transform: translate3d(3vw, -2vh, 0) scale(0.96); }
}

/* Glass surfaces — Aurora theme only */
@supports (backdrop-filter: blur(1px)) {
  [data-theme="aurora"] .nav,
  [data-theme="aurora"] .service-card,
  [data-theme="aurora"] .experience-card,
  [data-theme="aurora"] .skill-category,
  [data-theme="aurora"] .tech-card,
  [data-theme="aurora"] .theme-panel,
  [data-theme="aurora"] .ai-chat-window {
    background: var(--surface);
    backdrop-filter: blur(20px) saturate(140%);
    -webkit-backdrop-filter: blur(20px) saturate(140%);
    border: 1px solid var(--border);
  }
}

/* Reduced motion — disable aurora drift */
@media (prefers-reduced-motion: reduce) {
  [data-theme="aurora"] body::before { animation: none; }
}
```

- [ ] **Step 2: Verify lint and build**

Run: `npm run lint && npm run build`
Expected: both pass with no errors

- [ ] **Step 3: Commit**

```bash
git add src/styles.css
git commit -m "Add Aurora Glass theme variables, animated bg, glass surfaces"
```

---

## Task 2: Register Aurora in ThemeSwitcher

**Files:**
- Modify: `src/components/ThemeSwitcher.jsx` (themes array, ~line 4)

- [ ] **Step 1: Add Aurora entry to `themes` array**

Replace the `themes` array with:

```js
const themes = [
  { id: "default", name: "Indigo", color: "#6366f1" },
  { id: "ocean", name: "Ocean", color: "#0ea5e9" },
  { id: "sunset", name: "Sunset", color: "#f97316" },
  { id: "emerald", name: "Emerald", color: "#10b981" },
  { id: "rose", name: "Rose", color: "#ec4899" },
  { id: "light", name: "Light", color: "#f8fafc" },
  { id: "aurora", name: "Aurora", color: "linear-gradient(135deg, #a78bfa, #22d3ee, #f472b6)" },
];
```

- [ ] **Step 2: Manually verify theme switch in browser**

Run: `npm run dev`
Open http://localhost:5173, click theme switcher, select Aurora.
Expected: animated aurora background appears, cards become translucent/blurred, switching to other themes restores their look exactly.

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemeSwitcher.jsx
git commit -m "Register Aurora theme in ThemeSwitcher"
```

---

## Task 3: Add gradient-text utility and apply to Hero headline

**Files:**
- Modify: `src/styles.css` (append a new `/* Animated gradient text */` block at end)
- Modify: `src/components/Hero.jsx` (add class to headline element)

- [ ] **Step 1: Append gradient-text utility to `src/styles.css`**

```css
/* ===== Animated Gradient Text (global) ===== */
.gradient-text {
  background: linear-gradient(120deg, var(--primary), var(--accent), var(--primary-light), var(--primary));
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: gradientShift 8s ease-in-out infinite;
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  .gradient-text { animation: none; }
}
```

- [ ] **Step 2: Apply class to hero headline**

In `src/components/Hero.jsx`, locate the main headline element (the one currently rendered as the largest hero text — likely `<h1>` or an element with class `hero-name` / `hero-title`). Add `gradient-text` to its className. Example:

```jsx
<h1 className="hero-name gradient-text">{profile.name}</h1>
```

(Preserve any existing classes; only add `gradient-text`.)

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Expected: hero headline shows shifting violet→cyan→pink gradient, smooth loop ~8s.

- [ ] **Step 4: Commit**

```bash
git add src/styles.css src/components/Hero.jsx
git commit -m "Add animated gradient-text utility, apply to hero headline"
```

---

## Task 4: Extend useFadeIn with slide-up support

**Files:**
- Modify: `src/hooks/useFadeIn.jsx`
- Modify: `src/styles.css` (reveal classes)

- [ ] **Step 1: Read current hook**

Run: `cat src/hooks/useFadeIn.jsx`
Note its current API. The hook likely returns a `ref` (and possibly an `inView` boolean) and toggles a class via state.

- [ ] **Step 2: Update hook to accept options and apply both `is-visible` and optional `slide-up` class**

Replace the hook body so it accepts `{ slideUp = true, threshold = 0.15 } = {}` and toggles `is-visible` (existing) on intersection. The hook must return `ref`. If the existing hook already returns just `ref`, keep that signature; just ensure it adds the `is-visible` class once when intersecting and stops observing.

Example final shape (reconcile with existing imports/usage — do not break callers):

```jsx
import { useEffect, useRef } from 'react';

export function useFadeIn({ threshold = 0.15 } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('reveal');
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default useFadeIn;
```

If existing callers destructure differently, preserve their expected return shape — only adjust internals to add the `reveal` class on mount.

- [ ] **Step 3: Append reveal CSS to `src/styles.css`**

```css
/* ===== Scroll Reveal (global) ===== */
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
  will-change: opacity, transform;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 4: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useFadeIn.jsx src/styles.css
git commit -m "Add reveal slide-up animation via useFadeIn"
```

---

## Task 5: Apply scroll-reveal to sections that lack it

**Files:**
- Modify: `src/components/About.jsx`, `Services.jsx`, `Experience.jsx`, `Skills.jsx`, `TechExpertise.jsx`, `Contact.jsx`

- [ ] **Step 1: Audit which sections already use `useFadeIn`**

Run: `grep -l useFadeIn src/components/*.jsx`
For each section component listed in Files above that does NOT appear in the grep output, perform Step 2.

- [ ] **Step 2: Wrap section root with `useFadeIn` ref**

Pattern (apply to each missing component):

```jsx
import useFadeIn from '../hooks/useFadeIn';

function About() {
  const ref = useFadeIn();
  return (
    <section ref={ref} id="about" className="about">
      {/* existing content unchanged */}
    </section>
  );
}
```

Preserve all existing props and content; only add the import, the `const ref = useFadeIn()` line, and `ref={ref}` on the root element.

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Scroll the page. Expected: each section fades + slides up the first time it enters the viewport.

- [ ] **Step 4: Commit**

```bash
git add src/components/
git commit -m "Apply scroll-reveal to all major sections"
```

---

## Task 6: Create useTilt hook

**Files:**
- Create: `src/hooks/useTilt.jsx`

- [ ] **Step 1: Write the hook**

Create `src/hooks/useTilt.jsx` with:

```jsx
import { useEffect, useRef } from 'react';

export function useTilt({ max = 6 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (reduce || isTouch) return;

    let frame = 0;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(800px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.transform = '';
    };

    el.style.transition = 'transform 0.2s var(--ease, ease)';
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [max]);

  return ref;
}

export default useTilt;
```

- [ ] **Step 2: Verify lint**

Run: `npm run lint`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useTilt.jsx
git commit -m "Add useTilt hook for mouse-tracked card tilt"
```

---

## Task 7: Apply useTilt to Service and Experience cards

**Files:**
- Modify: `src/components/Services.jsx`
- Modify: `src/components/Experience.jsx`

- [ ] **Step 1: Update `Services.jsx`**

Locate the card render (typically `services.map(...)`). Extract the card into a small inner component so each card gets its own tilt ref:

```jsx
import useTilt from '../hooks/useTilt';

function ServiceCard({ service }) {
  const ref = useTilt();
  return (
    <div ref={ref} className="service-card">
      {/* existing card markup unchanged */}
    </div>
  );
}
```

Then in the parent, replace the inline card markup inside `.map` with `<ServiceCard key={...} service={s} />`. Keep all existing children/props.

- [ ] **Step 2: Update `Experience.jsx`**

Same pattern — extract `ExperienceCard` inner component, attach `useTilt` ref to its root.

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Hover service and experience cards. Expected: subtle 3D tilt following the cursor; resets smoothly on mouseleave.

- [ ] **Step 4: Commit**

```bash
git add src/components/Services.jsx src/components/Experience.jsx
git commit -m "Apply useTilt to service and experience cards"
```

---

## Task 8: Button shimmer + link underline micro-interactions

**Files:**
- Modify: `src/styles.css` (append micro-interaction block)

- [ ] **Step 1: Append to `src/styles.css`**

```css
/* ===== Button Shimmer (global) ===== */
.btn-primary,
.hero-cta,
.contact-btn,
button.cta {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}
.btn-primary::after,
.hero-cta::after,
.contact-btn::after,
button.cta::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s var(--ease);
  pointer-events: none;
}
.btn-primary:hover::after,
.hero-cta:hover::after,
.contact-btn:hover::after,
button.cta:hover::after {
  transform: translateX(100%);
}

/* ===== Nav link underline grow (global) ===== */
.nav-links a {
  position: relative;
}
.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 2px;
  background: var(--gradient);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s var(--ease);
}
.nav-links a:hover::after,
.nav-links a.active::after {
  transform: scaleX(1);
}

/* ===== Social icon lift (global) ===== */
.social-link,
.footer-social a,
.contact-social a {
  transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease), color 0.25s var(--ease);
}
.social-link:hover,
.footer-social a:hover,
.contact-social a:hover {
  transform: translateY(-3px);
  color: var(--primary-light);
  box-shadow: 0 8px 24px var(--primary-glow);
}

@media (prefers-reduced-motion: reduce) {
  .btn-primary::after, .hero-cta::after, .contact-btn::after, button.cta::after,
  .nav-links a::after,
  .social-link, .footer-social a, .contact-social a {
    transition: none;
    animation: none;
  }
}
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`
Hover primary CTAs (expect shimmer sweep), nav links (expect underline grow from left), social icons (expect lift + glow).

Note: if any selector above does not match the actual class names in the codebase, inspect via DevTools and update the selector list to match real class names.

- [ ] **Step 3: Commit**

```bash
git add src/styles.css
git commit -m "Add button shimmer, nav underline, social icon lift micro-interactions"
```

---

## Task 9: Update CLAUDE.md theme count

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update theme reference**

In `CLAUDE.md`, find the line describing themes (currently mentions six themes: Indigo, Ocean, Sunset, Emerald, Rose, Light). Update to:

> Persists selected theme to localStorage, applies via CSS class on `document.body`. Seven themes available (Indigo, Ocean, Sunset, Emerald, Rose, Light, Aurora). Adding a theme = define the CSS class in `src/styles.css` and add an entry in `ThemeSwitcher`.

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "Update CLAUDE.md theme list to include Aurora"
```

---

## Task 10: Final verification

- [ ] **Step 1: Lint and build**

Run: `npm run lint && npm run build`
Expected: both pass with no errors.

- [ ] **Step 2: Manual acceptance pass in `npm run dev`**

Verify each acceptance criterion from the spec:
1. Selecting "Aurora" applies glass+aurora look; switching back restores prior themes exactly
2. All 6 existing themes render unchanged
3. Sections fade + slide on first scroll into view (once)
4. Service and experience cards tilt on hover; no tilt on touch
5. Hero headline shows animated gradient text in all themes
6. With `prefers-reduced-motion: reduce` (toggle in DevTools → Rendering), decorative animations disabled
7. Lint + build pass

- [ ] **Step 3: If any criterion fails, fix in a focused commit and re-verify**
