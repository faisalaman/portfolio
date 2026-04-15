import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import { TypingTitle } from '../ui/TypingTitle';
import { Marquee } from '../ui/Marquee';
import { AIOrb } from '../ui/AIOrb';
import { profile } from '../../data/profile';

// A small curated list — "the headline stack", not everything
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

const bounce = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 16, mass: 0.8 },
  },
};

const stagger = (delay = 0.05) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative flex flex-col justify-center pt-28 pb-0 overflow-hidden">
      <div className="flex min-h-[calc(100vh-100px)] items-center">
        {/* Dotted grid backdrop */}
        <div aria-hidden className="grid-dots pointer-events-none absolute inset-0 -z-10" />

        {/* Soft glow */}
        <Motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="pointer-events-none absolute right-0 top-1/3 -z-0 h-[60vh] w-[60vh]"
        >
          <Motion.div
            animate={reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_60%)] opacity-25 dark:opacity-50 blur-3xl"
          />
        </Motion.div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 md:px-8 lg:grid-cols-[1.2fr_1fr]">
          {/* LEFT: text */}
          <Motion.div
            variants={reduce ? undefined : stagger(0.1)}
            initial={reduce ? false : 'hidden'}
            animate={reduce ? false : 'visible'}
          >
            <Motion.div variants={bounce} className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-text">AI-Powered Developer</span>
              <span className="text-text-muted hidden sm:inline">· Available for hire</span>
            </Motion.div>

            <Motion.p variants={bounce} className="mb-4 text-sm font-medium tracking-widest text-primary uppercase">
              <TypingTitle words={profile.typingRoles} />
            </Motion.p>

            <Motion.h1
              variants={bounce}
              className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
            >
              Hi, I'm <GradientText>{profile.name}</GradientText>
            </Motion.h1>

            <Motion.p
              variants={bounce}
              className="mt-6 max-w-xl text-base leading-relaxed text-text-muted md:text-lg"
            >
              {profile.summary}
            </Motion.p>

            <Motion.div variants={bounce} className="mt-8 flex flex-wrap gap-3">
              <Button as="a" href="#contact">Get in touch</Button>
              <Button as="a" href="#experience" variant="ghost">View experience</Button>
            </Motion.div>
          </Motion.div>

          {/* RIGHT: animated AI neural orb */}
          <Motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -10 }}
            animate={reduce ? false : { opacity: 1, scale: 1, rotate: 0 }}
            transition={reduce ? undefined : { type: 'spring', stiffness: 120, damping: 14, mass: 1, delay: 0.3 }}
            className="mx-auto hidden lg:block"
          >
            <AIOrb />
          </Motion.div>
        </div>
      </div>

      {/* Single slim marquee — the "headline stack" only */}
      <div className="relative z-10 mt-6 pb-4">
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
