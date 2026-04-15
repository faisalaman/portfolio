import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../ui/Section';
import { useCounter } from '../../hooks/useCounter';
import { profile, stats } from '../../data/profile';

function Stat({ stat, start }) {
  const value = useCounter(stat.number, { start });
  return (
    <div className="text-center">
      <div className="text-4xl font-extrabold text-primary md:text-5xl">
        {value}{stat.suffix}
      </div>
      <div className="mt-2 text-sm text-text-muted">{stat.label}</div>
    </div>
  );
}

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">About me</h2>
          <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">{profile.summary}</p>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div><dt className="text-text-muted">Location</dt><dd className="font-medium">{profile.location}</dd></div>
            <div><dt className="text-text-muted">Email</dt><dd className="font-medium">{profile.email}</dd></div>
            <div><dt className="text-text-muted">Languages</dt><dd className="font-medium">{profile.languages}</dd></div>
            <div><dt className="text-text-muted">Education</dt><dd className="font-medium">{profile.education.degree}</dd></div>
          </dl>
        </div>
        <div ref={ref} className="grid grid-cols-2 gap-6 rounded-2xl glass p-8">
          {stats.map((s) => (
            <Stat key={s.label} stat={s} start={inView} />
          ))}
        </div>
      </div>
    </Section>
  );
}

export default About;
