import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { zoomIn, viewportOnce } from '../../lib/motion';
import { profile } from '../../data/profile';
import { AnimatedHeading } from '../ui/AnimatedHeading';

export function Contact() {
  const reduce = useReducedMotion();
  return (
    <Section id="contact">
      <Motion.div
        variants={reduce ? undefined : zoomIn}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={viewportOnce}
        className="relative rounded-2xl glass p-10 text-center md:p-16 overflow-hidden"
      >
        <Motion.div
          aria-hidden
          animate={reduce ? undefined : { opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_60%)] opacity-20 blur-2xl"
        />
        <div className="relative z-10">
          <AnimatedHeading className="text-3xl font-bold tracking-tight md:text-4xl">Let's build something</AnimatedHeading>
          <p className="mx-auto mt-4 max-w-xl text-text-muted">
            Open to consulting, contract, and full-time roles. Drop a line — I'll get back within a day.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button as="a" href={`mailto:${profile.email}`}>{profile.email}</Button>
            <Button as="a" href={profile.linkedin} target="_blank" rel="noreferrer" variant="ghost">LinkedIn</Button>
          </div>
          <p className="mt-6 text-sm text-text-muted">{profile.phone} · {profile.location}</p>
        </div>
      </Motion.div>
    </Section>
  );
}

export default Contact;
