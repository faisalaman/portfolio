import { motion as Motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { rotateIn, stagger, viewportOnce } from '../../lib/motion';
import { techExpertise } from '../../data/profile';
import { AnimatedHeading } from '../ui/AnimatedHeading';

export function TechExpertise() {
  const entries = Object.entries(techExpertise);
  return (
    <Section id="tech">
      <div className="mb-12 text-center">
        <AnimatedHeading className="text-3xl font-bold tracking-tight md:text-4xl">Tech expertise</AnimatedHeading>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">Tools, frameworks, and platforms I work with.</p>
      </div>
      <Motion.div
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {entries.map(([category, list]) => (
          <Motion.div key={category} variants={rotateIn}>
            <Card className="h-full">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{category}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text">{list}</p>
            </Card>
          </Motion.div>
        ))}
      </Motion.div>
    </Section>
  );
}

export default TechExpertise;
