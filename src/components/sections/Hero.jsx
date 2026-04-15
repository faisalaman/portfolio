import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import { Marquee } from '../ui/Marquee';
import { AIOrb } from '../ui/AIOrb';
import { profile } from '../../data/profile';

const slimMarquee = [
  '⚡ AI / LLM',
  '◇ .NET Core',
  '◐ Azure',
  '✦ Microservices',
  '⌘ React',
  '⚙ DevOps',
  '⬡ SQL Server',
  '◢ TypeScript',
];

const subtextChips = [
  'LLM Integration',
  'Secure APIs',
  'UAE Pass / eSeal',
  'Scalable Backend',
];

const bounce = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 18, mass: 0.8 },
  },
};

const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
});

function GithubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.5-2.8 5.5-5.4 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.5 11.5 0 0 0 12 .5z"/>
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative flex flex-col justify-center pt-28 pb-0 overflow-hidden">
      <div className="flex min-h-[calc(100vh-100px)] items-center">
        {/* Dotted grid backdrop */}
        <div aria-hidden className="grid-dots pointer-events-none absolute inset-0 -z-10" />

        {/* Ambient AI orb filling the hero */}
        <Motion.div
          aria-hidden
          initial={reduce ? false : { opacity: 0, scale: 0.7 }}
          animate={reduce ? false : { opacity: 1, scale: 1 }}
          transition={reduce ? undefined : { type: 'spring', stiffness: 80, damping: 18, mass: 1.2, delay: 0.2 }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        >
          <div className="w-[min(140vh,140vw)] opacity-25 dark:opacity-45 mix-blend-screen">
            <AIOrb />
          </div>
        </Motion.div>

        {/* Soft radial glow */}
        <Motion.div
          aria-hidden
          animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={reduce ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_60%)] opacity-20 dark:opacity-40 blur-3xl"
        />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center md:px-8">
          <Motion.div
            variants={reduce ? undefined : stagger(0.05)}
            initial={reduce ? false : 'hidden'}
            animate={reduce ? false : 'visible'}
          >
            {/* Badge */}
            <Motion.div variants={bounce} className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-text">AI Engineer</span>
              <span className="text-text-muted">•</span>
              <span className="text-text">LLM Systems</span>
              <span className="text-text-muted">•</span>
              <span className="text-text">Backend Architect</span>
            </Motion.div>

            {/* Main headline */}
            <Motion.h1
              variants={bounce}
              className="text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl"
            >
              Building <GradientText>Intelligent AI Systems</GradientText><br className="hidden md:block" />
              {' '}That Solve Real Problems
            </Motion.h1>

            {/* Subtext as chips */}
            <Motion.div variants={bounce} className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {subtextChips.map((chip) => (
                <span key={chip} className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-text">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary to-accent" />
                  {chip}
                </span>
              ))}
            </Motion.div>

            {/* Short value prop */}
            <Motion.p variants={bounce} className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-text-muted md:text-base">
              I design and ship production systems that combine LLMs, vector search, and secure .NET + cloud backends — with 12+ years of enterprise engineering under them.
            </Motion.p>

            {/* CTA row */}
            <Motion.div variants={bounce} className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button as="a" href="#projects">View Projects</Button>
              <Button as="a" href="#contact" variant="ghost">Contact Me</Button>
              <Button
                as="a"
                href="/Faisal_Aman_CV_UAE.pdf"
                download
                variant="ghost"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
                </svg>
                Resume
              </Button>
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface text-text-muted transition-colors hover:text-text"
                >
                  <GithubIcon />
                </a>
              )}
            </Motion.div>

            {/* Name / signature */}
            <Motion.p variants={bounce} className="mt-8 text-xs uppercase tracking-[0.25em] text-text-muted">
              — {profile.name}, {profile.location}
            </Motion.p>
          </Motion.div>
        </div>
      </div>

      {/* Slim marquee */}
      <div className="relative z-10 mt-4 pb-4">
        <Marquee items={slimMarquee} speed={28} />
      </div>

      {/* Scroll indicator */}
      <Motion.a
        href="#about"
        aria-label="Scroll to about"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 hidden text-text-muted hover:text-primary md:block"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </Motion.a>
    </section>
  );
}

export default Hero;
