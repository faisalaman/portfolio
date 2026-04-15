import { motion as Motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { AnimatedHeading } from '../ui/AnimatedHeading';
import { bounceUp, stagger, viewportOnce } from '../../lib/motion';
import { capabilities } from '../../data/profile';

const ICONS = {
  llm: 'M4 4h16v12H4z M4 20h16 M8 8h8 M8 12h5',
  prompt: 'M7 8h10 M7 12h6 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  vector: 'M4 4l16 16 M20 4L4 20',
  api: 'M10 8l-4 4 4 4 M14 8l4 4-4 4',
  auth: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0',
  architecture: 'M4 7l8-4 8 4-8 4z M4 7v10l8 4 8-4V7',
};

export function Capabilities() {
  return (
    <Section id="capabilities">
      <div className="mb-12 text-center">
        <AnimatedHeading className="text-3xl font-bold tracking-tight md:text-4xl">AI capabilities</AnimatedHeading>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          Production patterns I use to ship LLM-backed features end-to-end.
        </p>
      </div>
      <Motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{ perspective: 1200 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {capabilities.map((c) => (
          <Motion.div key={c.title} variants={bounceUp}>
            <Card tilt className="h-full">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ICONS[c.icon] ?? ICONS.api} />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{c.description}</p>
            </Card>
          </Motion.div>
        ))}
      </Motion.div>
    </Section>
  );
}

export default Capabilities;
