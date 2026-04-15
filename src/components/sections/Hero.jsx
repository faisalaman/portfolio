import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import { TypingTitle } from '../ui/TypingTitle';
import { Marquee } from '../ui/Marquee';
import { fadeUp, stagger } from '../../lib/motion';
import { profile, techExpertise } from '../../data/profile';

const aiTokens = ['AI', 'GPT-4', 'LLM', 'RAG', 'Vector DB', 'Embeddings', 'Agents', 'MCP'];
const techTokens = Object.values(techExpertise)
  .flatMap((s) => s.split(/[,/]/))
  .map((s) => s.trim())
  .filter(Boolean);

const rowOne = [...aiTokens, ...techTokens.slice(0, 8)];
const rowTwo = techTokens.slice(8, 24);

const chips = [
  { label: '<C# />',  x: '6%',  y: '20%', delay: 0 },
  { label: '{ AI }',  x: '88%', y: '14%', delay: 0.4 },
  { label: 'Azure',   x: '4%',  y: '68%', delay: 0.8 },
  { label: '⚡ .NET', x: '90%', y: '64%', delay: 1.2 },
  { label: '⌘ React', x: '14%', y: '88%', delay: 1.6 },
  { label: 'SQL',     x: '82%', y: '38%', delay: 2.0 },
];

function FloatingChip({ chip, reduce }) {
  const drift = reduce
    ? {}
    : {
        animate: { y: ['0px', '-14px', '0px'], x: ['0px', '6px', '0px'], rotate: ['0deg', '2deg', '0deg'] },
        transition: { duration: 9 + chip.delay, repeat: Infinity, ease: 'easeInOut', delay: chip.delay },
      };
  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.7, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6 + chip.delay * 0.1, duration: 0.6 }}
      style={{ left: chip.x, top: chip.y }}
      className="pointer-events-none absolute hidden md:block"
    >
      <Motion.div
        {...drift}
        className="rounded-xl glass px-3 py-1.5 text-xs font-mono font-medium text-text shadow-[0_8px_24px_rgba(167,139,250,0.18)]"
      >
        {chip.label}
      </Motion.div>
    </Motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative flex flex-col justify-center pt-32 pb-0 overflow-hidden">
      <div className="flex min-h-[calc(100vh-120px)] items-center">
        {/* Dotted grid backdrop */}
        <div aria-hidden className="grid-dots pointer-events-none absolute inset-0 -z-10" />

        {/* Soft glow behind the headline */}
        <Motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2"
        >
          <Motion.div
            animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_60%)] opacity-25 dark:opacity-50 blur-3xl"
          />
        </Motion.div>

        {/* Floating tech chips */}
        {chips.map((c) => (
          <FloatingChip key={c.label} chip={c} reduce={reduce} />
        ))}

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-8">
          <Motion.div
            variants={reduce ? undefined : stagger(0.1, 0.05)}
            initial={reduce ? false : 'hidden'}
            animate={reduce ? false : 'visible'}
            className="max-w-3xl"
          >
            <Motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-text">AI-Powered Developer</span>
              <span className="text-text-muted hidden sm:inline">· Available for hire</span>
            </Motion.div>
            <Motion.p variants={fadeUp} className="mb-4 text-sm font-medium tracking-widest text-primary uppercase">
              <TypingTitle words={profile.typingRoles} />
            </Motion.p>
            <Motion.h1
              variants={fadeUp}
              className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
            >
              Hi, I'm <GradientText>{profile.name}</GradientText>
            </Motion.h1>
            <Motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg"
            >
              {profile.summary}
            </Motion.p>
            <Motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Button as="a" href="#contact">Get in touch</Button>
              <Button as="a" href="#experience" variant="ghost">View experience</Button>
            </Motion.div>
          </Motion.div>
        </div>
      </div>

      {/* Dual marquee strip — sits flush at bottom of hero */}
      <div className="relative z-10 mt-8 space-y-2 pb-4">
        <Marquee items={rowOne} speed={40} />
        <Marquee items={rowTwo} reverse speed={50} />
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
