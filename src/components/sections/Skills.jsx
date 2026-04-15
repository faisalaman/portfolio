import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Section } from '../ui/Section';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { skills } from '../../data/profile';
import { AnimatedHeading } from '../ui/AnimatedHeading';

export function Skills() {
  const reduce = useReducedMotion();
  return (
    <Section id="skills">
      <div className="mb-12 text-center">
        <AnimatedHeading className="text-3xl font-bold tracking-tight md:text-4xl">Skills</AnimatedHeading>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">Core competencies and proficiency levels.</p>
      </div>
      <Motion.ul
        variants={reduce ? undefined : stagger(0.05)}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={viewportOnce}
        className="grid gap-5 sm:grid-cols-2"
      >
        {skills.map((s) => {
          const pct = `${(s.level / 5) * 100}%`;
          return (
            <Motion.li key={s.name} variants={reduce ? undefined : fadeUp}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium">{s.name}</span>
                <span className="text-text-muted">{s.level}/5</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface border border-border">
                <Motion.div
                  initial={reduce ? false : { width: 0 }}
                  whileInView={reduce ? undefined : { width: pct }}
                  style={reduce ? { width: pct } : undefined}
                  viewport={viewportOnce}
                  transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-magenta"
                />
              </div>
            </Motion.li>
          );
        })}
      </Motion.ul>
    </Section>
  );
}

export default Skills;
