import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Section } from '../ui/Section';
import { flipRight, stagger, viewportOnce } from '../../lib/motion';
import { skills } from '../../data/profile';
import { AnimatedHeading } from '../ui/AnimatedHeading';

const GROUP_ORDER = ['AI', 'Backend', 'Cloud', 'Frontend'];

function SkillRow({ skill, reduce }) {
  const pct = `${(skill.level / 5) * 100}%`;
  return (
    <Motion.li variants={reduce ? undefined : flipRight}>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{skill.name}</span>
        <span className="text-text-muted">{skill.level}/5</span>
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
}

export function Skills() {
  const reduce = useReducedMotion();

  // Group skills and preserve desired order. Fall back to "Other" for anything uncategorised.
  const grouped = skills.reduce((acc, s) => {
    const key = s.group || 'Other';
    (acc[key] = acc[key] || []).push(s);
    return acc;
  }, {});
  const orderedGroups = [
    ...GROUP_ORDER.filter((g) => grouped[g]),
    ...Object.keys(grouped).filter((g) => !GROUP_ORDER.includes(g)),
  ];

  return (
    <Section id="skills">
      <div className="mb-12 text-center">
        <AnimatedHeading className="text-3xl font-bold tracking-tight md:text-4xl">Skills</AnimatedHeading>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          AI engineering on top of a deep backend + cloud foundation.
        </p>
      </div>

      <div className="space-y-10">
        {orderedGroups.map((group) => (
          <div key={group}>
            <div className="mb-5 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{group}</span>
              <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>
            <Motion.ul
              variants={reduce ? undefined : stagger(0.05)}
              initial={reduce ? false : 'hidden'}
              whileInView={reduce ? undefined : 'visible'}
              viewport={viewportOnce}
              style={{ perspective: 1200 }}
              className="grid gap-5 sm:grid-cols-2"
            >
              {grouped[group].map((s) => (
                <SkillRow key={s.name} skill={s} reduce={reduce} />
              ))}
            </Motion.ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Skills;
