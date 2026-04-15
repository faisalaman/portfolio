import { motion as Motion } from 'framer-motion';
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
      <Motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="space-y-6"
      >
        {experience.map((job) => (
          <Motion.div key={`${job.role}-${job.company}`} variants={fadeUp}>
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
          </Motion.div>
        ))}
      </Motion.div>
    </Section>
  );
}

export default Experience;
