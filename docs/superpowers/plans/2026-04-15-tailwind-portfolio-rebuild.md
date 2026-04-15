# Tailwind + Framer Motion Portfolio Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing CSS-variable portfolio with a clean rebuild on Tailwind CSS v4 + Framer Motion, preserving content from `src/data/profile.js` and the same single-page section structure, with a refined Aurora Glass aesthetic, light/dark toggle, and full motion treatment.

**Architecture:** Single-page React 19 + Vite app. Tailwind v4 with CSS-first `@theme` tokens, light/dark via `.dark` class on `<html>`. Framer Motion for all animations. Bottom-up build: tokens → primitives (Section, Card, Button, GradientText, ThemeToggle, AuroraBackground) → layout (Navbar, Footer) → sections (Hero, About, Services, TechExpertise, Experience, Skills, Contact) → widgets (PageLoader, ScrollToTop, AIChatAssistant) → App composition.

**Tech Stack:** React 19, Vite 8, Tailwind CSS v4, Framer Motion 11, clsx. Branch: `feature/aurora-glass-theme` (replacing prior contents).

**Verification model:** No test framework. Each task ends with `npm run lint` and `npm run build` (must pass — only NEW errors block; pre-existing errors on `main` are tolerated). After all tasks: manual visual check via `npm run dev`.

---

## File map

**Delete (Task 1):**
- `src/styles.css`
- `src/components/*.jsx` (all)
- `src/hooks/useFadeIn.jsx`
- `src/hooks/useTilt.jsx`
- `src/hooks/useTypingEffect.js`

**Keep untouched:**
- `src/data/profile.js`
- `src/main.jsx` (re-import will be updated to `./index.css`)
- `eslint.config.js`

**Create:**
- `src/index.css`
- `src/App.jsx` (rewrite)
- `src/lib/cn.js`
- `src/lib/motion.js`
- `src/hooks/useTheme.js`
- `src/hooks/useCounter.js` (rewrite)
- `src/components/ui/Section.jsx`
- `src/components/ui/Card.jsx`
- `src/components/ui/Button.jsx`
- `src/components/ui/GradientText.jsx`
- `src/components/ui/ThemeToggle.jsx`
- `src/components/ui/AuroraBackground.jsx`
- `src/components/layout/Navbar.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/sections/Hero.jsx`
- `src/components/sections/About.jsx`
- `src/components/sections/Services.jsx`
- `src/components/sections/TechExpertise.jsx`
- `src/components/sections/Experience.jsx`
- `src/components/sections/Skills.jsx`
- `src/components/sections/Contact.jsx`
- `src/components/widgets/PageLoader.jsx`
- `src/components/widgets/ScrollToTop.jsx`
- `src/components/widgets/AIChatAssistant.jsx`

**Modify:**
- `package.json` (deps via `npm install`)
- `vite.config.js` (add Tailwind v4 plugin)
- `index.html` (Inter font link, title)
- `src/main.jsx` (import path: `./index.css` instead of `./styles.css`)

---

## Task 1: Teardown + dependency install + Vite/Tailwind config + tokens

**Files:**
- Delete: as listed above
- Modify: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`
- Create: `src/index.css`

- [ ] **Step 1: Delete old source files**

```bash
rm src/styles.css
rm src/components/About.jsx src/components/AIChatAssistant.jsx src/components/ConstellationBackground.jsx src/components/Contact.jsx src/components/Experience.jsx src/components/Footer.jsx src/components/Hero.jsx src/components/Icons.jsx src/components/Navbar.jsx src/components/PageLoader.jsx src/components/ScrollToTop.jsx src/components/Services.jsx src/components/Skills.jsx src/components/TechExpertise.jsx src/components/ThemeSwitcher.jsx
rm src/hooks/useFadeIn.jsx src/hooks/useTilt.jsx src/hooks/useTypingEffect.js src/hooks/useCounter.js
```

- [ ] **Step 2: Install dependencies**

```bash
npm install tailwindcss@4 @tailwindcss/vite framer-motion clsx
```

- [ ] **Step 3: Update `vite.config.js`**

Read existing file first, then replace its contents with:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 4: Update `index.html`**

Read existing file first. Replace `<title>` with `Faisal Aman — Senior .NET Consultant` and add the Inter font link inside `<head>` (above the title):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

Also add `<meta name="description" content="Senior .NET Consultant — full-stack developer specializing in .NET Core, Azure, and microservices." />`.

- [ ] **Step 5: Update `src/main.jsx`**

Replace existing import of `./styles.css` (or whatever it currently imports) with `import './index.css';`. Keep all other lines unchanged.

- [ ] **Step 6: Create `src/index.css`**

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --radius-xl: 16px;
  --radius-2xl: 24px;

  --color-bg: #f8fafc;
  --color-bg-alt: #f1f5f9;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-primary: #6366f1;
  --color-accent: #0ea5e9;
  --color-magenta: #ec4899;
}

@layer base {
  html.dark {
    --color-bg: #0a0a18;
    --color-bg-alt: #10102a;
    --color-surface: rgba(255, 255, 255, 0.06);
    --color-border: rgba(255, 255, 255, 0.10);
    --color-text: #f5f5fa;
    --color-text-muted: #8a8aa3;
    --color-primary: #a78bfa;
    --color-accent: #22d3ee;
    --color-magenta: #f472b6;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
}

@layer utilities {
  .glass {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    backdrop-filter: blur(20px) saturate(140%);
    -webkit-backdrop-filter: blur(20px) saturate(140%);
  }

  .gradient-text {
    background: linear-gradient(120deg, var(--color-primary), var(--color-accent), var(--color-magenta), var(--color-primary));
    background-size: 300% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: gradient-shift 8s ease-in-out infinite;
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .gradient-text { animation: none; }
    html { scroll-behavior: auto; }
  }
}
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: succeeds with no errors. (App.jsx and components are gone — build will likely fail. If it fails, that's expected; proceed to Step 8 which puts a temporary minimal App in place so the build succeeds.)

- [ ] **Step 8: Create temporary minimal `src/App.jsx`**

(This is a placeholder so the build passes between tasks. Replaced fully in Task 12.)

```jsx
export default function App() {
  return <div className="p-8 text-text">Rebuilding…</div>;
}
```

- [ ] **Step 9: Verify build + lint pass**

```bash
npm run build && npm run lint
```

Expected: build succeeds; lint shows only pre-existing errors (none from new files).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "Teardown old src; install Tailwind v4 + Framer Motion; add index.css tokens"
```

---

## Task 2: Lib utilities + hooks

**Files:**
- Create: `src/lib/cn.js`, `src/lib/motion.js`, `src/hooks/useTheme.js`, `src/hooks/useCounter.js`

- [ ] **Step 1: Create `src/lib/cn.js`**

```js
import clsx from 'clsx';
export const cn = (...args) => clsx(args);
```

- [ ] **Step 2: Create `src/lib/motion.js`**

```js
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export const viewportOnce = { once: true, amount: 0.2 };
```

- [ ] **Step 3: Create `src/hooks/useTheme.js`**

```js
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggle };
}
```

- [ ] **Step 4: Create `src/hooks/useCounter.js`**

```js
import { useEffect, useRef, useState } from 'react';

export function useCounter(target, { duration = 1500, start = false } = {}) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!start) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(target);
      return;
    }
    const startTime = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, start]);

  return value;
}
```

- [ ] **Step 5: Verify**

```bash
npm run lint && npm run build
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add src/lib src/hooks
git commit -m "Add cn, motion variants, useTheme, useCounter"
```

---

## Task 3: UI primitives — Section, Button, GradientText

**Files:**
- Create: `src/components/ui/Section.jsx`, `src/components/ui/Button.jsx`, `src/components/ui/GradientText.jsx`

- [ ] **Step 1: Create `src/components/ui/Section.jsx`**

```jsx
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { fadeUp, viewportOnce } from '../../lib/motion';

export function Section({ id, className, children, container = true }) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn('py-20 md:py-28', className)}
    >
      {container ? (
        <div className="mx-auto max-w-6xl px-4 md:px-8">{children}</div>
      ) : (
        children
      )}
    </motion.section>
  );
}

export default Section;
```

- [ ] **Step 2: Create `src/components/ui/Button.jsx`**

```jsx
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

const variants = {
  primary:
    'bg-primary text-white hover:shadow-[0_8px_32px_var(--color-primary)] dark:hover:shadow-[0_8px_32px_rgba(167,139,250,0.4)]',
  ghost:
    'border border-border bg-transparent text-text hover:bg-surface',
};

export function Button({ as = 'button', variant = 'primary', className, children, ...props }) {
  const Comp = motion[as] ?? motion.button;
  return (
    <Comp
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export default Button;
```

- [ ] **Step 3: Create `src/components/ui/GradientText.jsx`**

```jsx
import { cn } from '../../lib/cn';

export function GradientText({ as: Tag = 'span', className, children }) {
  return <Tag className={cn('gradient-text', className)}>{children}</Tag>;
}

export default GradientText;
```

- [ ] **Step 4: Verify**

```bash
npm run lint && npm run build
```

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui
git commit -m "Add Section, Button, GradientText primitives"
```

---

## Task 4: UI primitives — Card, ThemeToggle, AuroraBackground

**Files:**
- Create: `src/components/ui/Card.jsx`, `src/components/ui/ThemeToggle.jsx`, `src/components/ui/AuroraBackground.jsx`

- [ ] **Step 1: Create `src/components/ui/Card.jsx`**

```jsx
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../../lib/cn';

export function Card({ children, className, tilt = false, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className={cn(
        'glass rounded-2xl p-6 transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgba(167,139,250,0.15)]',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default Card;
```

- [ ] **Step 2: Create `src/components/ui/ThemeToggle.jsx`**

```jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const Sun = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
);
const Moon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);

export function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-text hover:scale-105 active:scale-95 transition-transform ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid place-items-center"
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default ThemeToggle;
```

- [ ] **Step 3: Create `src/components/ui/AuroraBackground.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion';

const blobBase = 'absolute rounded-full blur-[80px] opacity-50 mix-blend-screen';

export function AuroraBackground() {
  const reduce = useReducedMotion();
  const transition = reduce
    ? { duration: 0 }
    : { duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden hidden dark:block">
      <motion.div
        className={`${blobBase} h-[40vw] w-[40vw] bg-[#a78bfa]`}
        style={{ top: '10%', left: '10%' }}
        animate={{ x: ['0vw', '4vw', '-2vw', '0vw'], y: ['0vh', '3vh', '-2vh', '0vh'], scale: [1, 1.08, 0.96, 1] }}
        transition={transition}
      />
      <motion.div
        className={`${blobBase} h-[45vw] w-[45vw] bg-[#22d3ee]`}
        style={{ top: '5%', right: '5%' }}
        animate={{ x: ['0vw', '-5vw', '3vw', '0vw'], y: ['0vh', '4vh', '-3vh', '0vh'], scale: [1, 0.95, 1.1, 1] }}
        transition={transition}
      />
      <motion.div
        className={`${blobBase} h-[50vw] w-[50vw] bg-[#f472b6]`}
        style={{ bottom: '0%', left: '30%' }}
        animate={{ x: ['0vw', '3vw', '-4vw', '0vw'], y: ['0vh', '-3vh', '2vh', '0vh'], scale: [1, 1.1, 0.95, 1] }}
        transition={transition}
      />
    </div>
  );
}

export default AuroraBackground;
```

- [ ] **Step 4: Verify**

```bash
npm run lint && npm run build
```

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui
git commit -m "Add Card with tilt, ThemeToggle, AuroraBackground primitives"
```

---

## Task 5: Layout — Navbar + Footer

**Files:**
- Create: `src/components/layout/Navbar.jsx`, `src/components/layout/Footer.jsx`

- [ ] **Step 1: Create `src/components/layout/Navbar.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
import { profile } from '../../data/profile';

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#tech', label: 'Tech' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled ? 'backdrop-blur-md bg-bg/70 border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#top" className="text-base font-semibold tracking-tight">
          {profile.name.split(' ')[0]}<span className="text-primary">.</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-text-muted transition-colors hover:text-text">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface md:hidden"
            onClick={() => setOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-md md:hidden"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-base font-semibold">{profile.name.split(' ')[0]}<span className="text-primary">.</span></span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-border"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <ul className="flex flex-col items-center gap-6 pt-12 text-lg">
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="text-text hover:text-primary">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
```

- [ ] **Step 2: Create `src/components/layout/Footer.jsx`**

```jsx
import { profile } from '../../data/profile';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-10 text-sm text-text-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 md:flex-row md:justify-between md:px-8">
        <p>© {year} {profile.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${profile.email}`} className="hover:text-text">Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-text">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```

Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout
git commit -m "Add Navbar (with mobile sheet) and Footer"
```

---

## Task 6: Hero section

**Files:**
- Create: `src/components/sections/Hero.jsx`

- [ ] **Step 1: Create `src/components/sections/Hero.jsx`**

```jsx
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import { fadeUp, stagger } from '../../lib/motion';
import { profile } from '../../data/profile';

export function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] flex items-center pt-28 pb-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p variants={fadeUp} className="mb-4 text-sm font-medium tracking-widest text-primary uppercase">
            {profile.title}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
          >
            Hi, I'm <GradientText>{profile.name}</GradientText>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl"
          >
            {profile.summary}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <Button as="a" href="#contact">Get in touch</Button>
            <Button as="a" href="#experience" variant="ghost">View experience</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
```

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.jsx
git commit -m "Add Hero section with staggered entrance and gradient name"
```

---

## Task 7: About section + Stat counter

**Files:**
- Create: `src/components/sections/About.jsx`

- [ ] **Step 1: Create `src/components/sections/About.jsx`**

```jsx
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../ui/Section';
import { useCounter } from '../../hooks/useCounter';
import { profile, stats } from '../../data/profile';

function Stat({ stat, start }) {
  const value = useCounter(stat.number, { start });
  return (
    <div className="text-center">
      <div className="text-4xl font-extrabold text-primary md:text-5xl">
        {value}{stat.suffix}
      </div>
      <div className="mt-2 text-sm text-text-muted">{stat.label}</div>
    </div>
  );
}

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">About me</h2>
          <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">{profile.summary}</p>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div><dt className="text-text-muted">Location</dt><dd className="font-medium">{profile.location}</dd></div>
            <div><dt className="text-text-muted">Email</dt><dd className="font-medium">{profile.email}</dd></div>
            <div><dt className="text-text-muted">Languages</dt><dd className="font-medium">{profile.languages}</dd></div>
            <div><dt className="text-text-muted">Education</dt><dd className="font-medium">{profile.education.degree}</dd></div>
          </dl>
        </div>
        <div ref={ref} className="grid grid-cols-2 gap-6 rounded-2xl glass p-8">
          {stats.map((s) => (
            <Stat key={s.label} stat={s} start={inView} />
          ))}
        </div>
      </div>
    </Section>
  );
}

export default About;
```

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/About.jsx
git commit -m "Add About section with animated stat counters"
```

---

## Task 8: Services + TechExpertise sections

**Files:**
- Create: `src/components/sections/Services.jsx`, `src/components/sections/TechExpertise.jsx`

- [ ] **Step 1: Create `src/components/sections/Services.jsx`**

```jsx
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { services } from '../../data/profile';

const ICONS = {
  backend: 'M4 6h16M4 12h16M4 18h7',
  frontend: 'M3 5h18v14H3z M3 9h18',
  cloud: 'M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A4 4 0 0 1 17 18z',
  database: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6',
  architecture: 'M12 2 2 7l10 5 10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
  consulting: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
};

export function Services() {
  return (
    <Section id="services">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What I do</h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">Full-stack engineering services across the .NET ecosystem.</p>
      </div>
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s) => (
          <motion.div key={s.title} variants={fadeUp}>
            <Card tilt className="h-full">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ICONS[s.icon] ?? ICONS.consulting} />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

export default Services;
```

- [ ] **Step 2: Create `src/components/sections/TechExpertise.jsx`**

```jsx
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { techExpertise } from '../../data/profile';

export function TechExpertise() {
  const entries = Object.entries(techExpertise);
  return (
    <Section id="tech">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Tech expertise</h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">Tools, frameworks, and platforms I work with.</p>
      </div>
      <motion.div
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {entries.map(([category, list]) => (
          <motion.div key={category} variants={fadeUp}>
            <Card className="h-full">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{category}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text">{list}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

export default TechExpertise;
```

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections
git commit -m "Add Services (with tilt cards) and TechExpertise sections"
```

---

## Task 9: Experience + Skills sections

**Files:**
- Create: `src/components/sections/Experience.jsx`, `src/components/sections/Skills.jsx`

- [ ] **Step 1: Create `src/components/sections/Experience.jsx`**

```jsx
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { experience } from '../../data/profile';

export function Experience() {
  return (
    <Section id="experience">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Experience</h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">12+ years across enterprise and government engagements.</p>
      </div>
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="space-y-6"
      >
        {experience.map((job) => (
          <motion.div key={`${job.role}-${job.company}`} variants={fadeUp}>
            <Card tilt={false}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{job.role}</h3>
                  <p className="text-sm text-primary">{job.company}</p>
                </div>
                <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">{job.period}</span>
              </div>
              {job.description && <p className="mt-3 text-sm text-text-muted">{job.description}</p>}
              {job.highlights?.length > 0 && (
                <ul className="mt-4 space-y-1.5 text-sm text-text">
                  {job.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary"/>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
              {job.tech?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">{t}</span>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

export default Experience;
```

- [ ] **Step 2: Create `src/components/sections/Skills.jsx`**

```jsx
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { skills } from '../../data/profile';

export function Skills() {
  return (
    <Section id="skills">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Skills</h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">Core competencies and proficiency levels.</p>
      </div>
      <motion.ul
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 sm:grid-cols-2"
      >
        {skills.map((s) => (
          <motion.li key={s.name} variants={fadeUp}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">{s.name}</span>
              <span className="text-text-muted">{s.level}/5</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface border border-border">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(s.level / 5) * 100}%` }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-magenta"
              />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}

export default Skills;
```

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections
git commit -m "Add Experience timeline and Skills with animated bars"
```

---

## Task 10: Contact section

**Files:**
- Create: `src/components/sections/Contact.jsx`

- [ ] **Step 1: Create `src/components/sections/Contact.jsx`**

```jsx
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { profile } from '../../data/profile';

export function Contact() {
  return (
    <Section id="contact">
      <div className="rounded-2xl glass p-10 text-center md:p-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Let's build something</h2>
        <p className="mx-auto mt-4 max-w-xl text-text-muted">
          Open to consulting, contract, and full-time roles. Drop a line — I'll get back within a day.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button as="a" href={`mailto:${profile.email}`}>{profile.email}</Button>
          <Button as="a" href={profile.linkedin} target="_blank" rel="noreferrer" variant="ghost">LinkedIn</Button>
        </div>
        <p className="mt-6 text-sm text-text-muted">{profile.phone} · {profile.location}</p>
      </div>
    </Section>
  );
}

export default Contact;
```

- [ ] **Step 2: Verify + commit**

```bash
npm run lint && npm run build && \
git add src/components/sections/Contact.jsx && \
git commit -m "Add Contact section"
```

---

## Task 11: Widgets — PageLoader, ScrollToTop, AIChatAssistant

**Files:**
- Create: `src/components/widgets/PageLoader.jsx`, `src/components/widgets/ScrollToTop.jsx`, `src/components/widgets/AIChatAssistant.jsx`

- [ ] **Step 1: Create `src/components/widgets/PageLoader.jsx`**

```jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function PageLoader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-bg"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative h-12 w-12"
          >
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-border border-t-primary" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageLoader;
```

- [ ] **Step 2: Create `src/components/widgets/ScrollToTop.jsx`**

```jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-text shadow-lg backdrop-blur-md hover:text-primary"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;
```

- [ ] **Step 3: Create `src/components/widgets/AIChatAssistant.jsx`**

```jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { profile, services, techExpertise } from '../../data/profile';

const responses = [
  { keys: ['who', 'name', 'about you'], answer: () => `I'm ${profile.name} — ${profile.title}. ${profile.summary}` },
  { keys: ['contact', 'email', 'reach', 'phone'], answer: () => `Email: ${profile.email} · Phone: ${profile.phone}` },
  { keys: ['location', 'where', 'based'], answer: () => `Based in ${profile.location}.` },
  { keys: ['service', 'do', 'offer', 'help'], answer: () => `I offer: ${services.map((s) => s.title).join(', ')}.` },
  { keys: ['tech', 'stack', 'skills', 'language', 'framework'], answer: () => `Core stack: ${Object.values(techExpertise).slice(0, 3).join(' · ')}.` },
  { keys: ['linkedin'], answer: () => `LinkedIn: ${profile.linkedin}` },
];

function reply(input) {
  const q = input.toLowerCase();
  for (const r of responses) {
    if (r.keys.some((k) => q.includes(k))) return r.answer();
  }
  return "I can answer questions about my background, services, tech stack, location, or how to get in touch. Try asking about one of those!";
}

export function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Hi! I'm a small assistant. Ask me about ${profile.name.split(' ')[0]}'s work, stack, or how to get in touch.` },
  ]);
  const [input, setInput] = useState('');

  const send = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'user', text }, { role: 'bot', text: reply(text) }]);
    setInput('');
  };

  return (
    <>
      <motion.button
        aria-label="Open chat"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-white shadow-lg"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-40 flex h-[70vh] max-h-[520px] w-[min(360px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl glass shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-semibold">Ask about {profile.name.split(' ')[0]}</span>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-text-muted hover:text-text">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </header>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${m.role === 'user' ? 'bg-primary text-white' : 'bg-surface border border-border text-text'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 rounded-xl border border-border bg-bg-alt px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button type="submit" className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white">Send</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatAssistant;
```

- [ ] **Step 4: Verify + commit**

```bash
npm run lint && npm run build && \
git add src/components/widgets && \
git commit -m "Add PageLoader, ScrollToTop, AIChatAssistant widgets"
```

---

## Task 12: App composition + final verification

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace `src/App.jsx` with full composition**

```jsx
import { AuroraBackground } from './components/ui/AuroraBackground';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { TechExpertise } from './components/sections/TechExpertise';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { PageLoader } from './components/widgets/PageLoader';
import { ScrollToTop } from './components/widgets/ScrollToTop';
import { AIChatAssistant } from './components/widgets/AIChatAssistant';

export default function App() {
  return (
    <>
      <PageLoader />
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <TechExpertise />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <AIChatAssistant />
    </>
  );
}
```

- [ ] **Step 2: Verify lint + build**

```bash
npm run lint && npm run build
```

Expected: both pass.

- [ ] **Step 3: Manual acceptance pass via `npm run dev`**

Verify each spec acceptance criterion:
1. All sections render with content from `profile.js`
2. Light/dark toggle works, persists across reload, respects system preference on first load
3. Page loader shows on mount, fades out within ~800ms
4. Sections fade+slide up exactly once when scrolled into view
5. Service cards tilt on hover (desktop, no touch, no reduced-motion)
6. Stat counters animate from 0 when About enters view
7. Hero headline shows animated gradient text in both themes
8. AI chat opens, closes, returns canned answers
9. Scroll-to-top button appears past hero
10. No horizontal scroll at 320px width; navbar collapses to hamburger <md
11. With `prefers-reduced-motion: reduce` (DevTools → Rendering), counters jump to final and decorative motion stops

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "Compose App with all sections and widgets"
```
