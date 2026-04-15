import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import { fadeUp, stagger } from '../../lib/motion';
import { profile } from '../../data/profile';

const chips = [
  { label: '.NET', x: '6%',  y: '18%', delay: 0 },
  { label: 'C#',   x: '88%', y: '14%', delay: 0.4 },
  { label: 'Azure',x: '4%',  y: '72%', delay: 0.8 },
  { label: 'Angular', x: '90%', y: '70%', delay: 1.2 },
  { label: 'SQL',  x: '14%', y: '88%', delay: 1.6 },
  { label: 'React', x: '82%', y: '40%', delay: 2.0 },
  { label: 'Node', x: '8%',  y: '42%', delay: 2.4 },
];

function FloatingChip({ chip, reduce }) {
  const drift = reduce
    ? {}
    : {
        animate: { y: ['0px', '-12px', '0px'], x: ['0px', '6px', '0px'] },
        transition: { duration: 8 + chip.delay, repeat: Infinity, ease: 'easeInOut', delay: chip.delay },
      };
  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 + chip.delay * 0.1, duration: 0.6 }}
      style={{ left: chip.x, top: chip.y }}
      className="pointer-events-none absolute hidden md:block"
    >
      <Motion.div
        {...drift}
        className="rounded-xl glass px-3 py-1.5 text-xs font-medium text-text-muted shadow-lg backdrop-blur-md"
      >
        {chip.label}
      </Motion.div>
    </Motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative min-h-[92vh] flex items-center pt-28 pb-20 overflow-hidden">
      {/* Soft glow behind the headline */}
      <Motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2"
      >
        <Motion.div
          animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_60%)] opacity-20 dark:opacity-40 blur-3xl"
        />
      </Motion.div>

      {/* Floating tech chips banner */}
      {chips.map((c) => (
        <FloatingChip key={c.label} chip={c} reduce={reduce} />
      ))}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-8">
        <Motion.div
          variants={reduce ? undefined : stagger(0.12, 0.1)}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? false : 'visible'}
          className="max-w-3xl"
        >
          <Motion.p variants={fadeUp} className="mb-4 text-sm font-medium tracking-widest text-primary uppercase">
            {profile.title}
          </Motion.p>
          <Motion.h1
            variants={fadeUp}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
          >
            Hi, I'm <GradientText>{profile.name}</GradientText>
          </Motion.h1>
          <Motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl"
          >
            {profile.summary}
          </Motion.p>
          <Motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <Button as="a" href="#contact">Get in touch</Button>
            <Button as="a" href="#experience" variant="ghost">View experience</Button>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
}

export default Hero;
