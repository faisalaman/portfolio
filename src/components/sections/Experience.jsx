import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { slideInLeft, stagger, viewportOnce } from '../../lib/motion';
import { experience } from '../../data/profile';
import { AnimatedHeading } from '../ui/AnimatedHeading';

export function Experience() {
  const reduce = useReducedMotion();
  return (
    <Section id="experience">
      <div className="mb-12 text-center">
        <AnimatedHeading className="text-3xl font-bold tracking-tight md:text-4xl">Experience</AnimatedHeading>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">12+ years across enterprise and government engagements.</p>
      </div>
      <div className="relative">
        <Motion.span
          aria-hidden
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={reduce ? undefined : { scaleY: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ originY: 0 }}
          className="pointer-events-none absolute left-2 top-2 bottom-2 hidden w-px bg-gradient-to-b from-primary via-accent to-transparent md:block"
        />
        <Motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-6 md:pl-10"
        >
          {experience.map((job) => (
            <Motion.div key={`${job.role}-${job.company}`} variants={slideInLeft}>
            <Card tilt>
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
          </Motion.div>
        ))}
        </Motion.div>
      </div>
    </Section>
  );
}

export default Experience;
