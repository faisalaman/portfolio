import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
import { profile } from '../../data/profile';

const links = [
  { href: '#about', label: 'About' },
  { href: '#capabilities', label: 'AI' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
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
          <Motion.div
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
                <Motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="text-text hover:text-primary">
                    {l.label}
                  </a>
                </Motion.li>
              ))}
            </ul>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
