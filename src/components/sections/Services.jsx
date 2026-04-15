import { motion as Motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { bounceUp, stagger, viewportOnce } from '../../lib/motion';
import { services } from '../../data/profile';
import { AnimatedHeading } from '../ui/AnimatedHeading';

const ICONS = {
  backend: 'M4 6h16M4 12h16M4 18h7',
  frontend: 'M3 5h18v14H3z M3 9h18',
  cloud: 'M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A4 4 0 0 1 17 18z',
  database: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6',
  architecture: 'M12 2 2 7l10 5 10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
  consulting: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
};

export function Services() {
  return (
    <Section id="services">
      <div className="mb-12 text-center">
        <AnimatedHeading className="text-3xl font-bold tracking-tight md:text-4xl">What I do</AnimatedHeading>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">Full-stack engineering services across the .NET ecosystem.</p>
      </div>
      <Motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{ perspective: 1200 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s) => (
          <Motion.div key={s.title} variants={bounceUp}>
            <Card tilt className="h-full">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ICONS[s.icon] ?? ICONS.consulting} />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.description}</p>
            </Card>
          </Motion.div>
        ))}
      </Motion.div>
    </Section>
  );
}

export default Services;
