import { motion as Motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { AnimatedHeading } from '../ui/AnimatedHeading';
import { bounceUp, stagger, viewportOnce } from '../../lib/motion';
import { projects } from '../../data/profile';

function StatusPill({ status }) {
  const color =
    status === 'In production' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
      : status === 'Prototype' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
      : 'bg-primary/15 text-primary border-primary/30';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${color}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function ProjectCard({ project }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
          <p className="mt-1 text-sm text-text-muted">{project.tagline}</p>
        </div>
        <StatusPill status={project.status} />
      </div>

      <div className="mt-6 space-y-4 text-sm">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Problem</div>
          <p className="mt-1 text-text-muted">{project.problem}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Solution</div>
          <p className="mt-1 text-text-muted">{project.solution}</p>
        </div>

        <details className="group rounded-xl border border-border bg-bg-alt/50 p-3">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-primary">
            Architecture
          </summary>
          <ul className="mt-3 space-y-1.5 text-text">
            {project.architecture.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>

        <details className="group rounded-xl border border-border bg-bg-alt/50 p-3">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-primary">
            Key features
          </summary>
          <ul className="mt-3 space-y-1.5 text-text">
            {project.features.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>

        {project.learnings && (
          <div className="rounded-xl border border-border bg-bg-alt/50 p-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Challenges &amp; Learnings</div>
            <p className="mt-1 text-text-muted">{project.learnings}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((t) => (
          <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">{t}</span>
        ))}
      </div>

      {(project.github || project.demo) && (
        <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="text-sm font-semibold text-text hover:text-primary">
              GitHub →
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="text-sm font-semibold text-text hover:text-primary">
              Live demo →
            </a>
          )}
        </div>
      )}
    </Card>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <div className="mb-12 text-center">
        <AnimatedHeading className="text-3xl font-bold tracking-tight md:text-4xl">Selected projects</AnimatedHeading>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          Case studies: problem → solution → architecture → what I learned.
        </p>
      </div>
      <Motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{ perspective: 1200 }}
        className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3"
      >
        {projects.map((p) => (
          <Motion.div key={p.slug} variants={bounceUp}>
            <ProjectCard project={p} />
          </Motion.div>
        ))}
      </Motion.div>
    </Section>
  );
}

export default Projects;
