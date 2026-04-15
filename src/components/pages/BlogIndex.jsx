import { motion as Motion } from 'framer-motion';
import { AnimatedHeading } from '../ui/AnimatedHeading';
import { Card } from '../ui/Card';
import { bounceUp, stagger, viewportOnce } from '../../lib/motion';
import { posts, formatDate } from '../../lib/posts';

export function BlogIndex() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-20 pt-28 md:px-8">
      <a href="#" className="text-sm text-text-muted hover:text-primary">← Back to home</a>
      <div className="mt-6 mb-10">
        <AnimatedHeading className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Writing
        </AnimatedHeading>
        <p className="mt-4 text-text-muted md:text-lg">
          Notes on shipping AI, building backends, and the edge cases docs never cover.
        </p>
      </div>
      <Motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="space-y-5"
      >
        {posts.map((p) => (
          <Motion.div key={p.slug} variants={bounceUp}>
            <a href={`#/blog/${p.slug}`} className="block">
              <Card>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">{p.title}</h2>
                    <p className="mt-2 text-sm text-text-muted">{p.excerpt}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {formatDate(p.date)}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">{t}</span>
                  ))}
                </div>
              </Card>
            </a>
          </Motion.div>
        ))}
      </Motion.div>
    </main>
  );
}

export default BlogIndex;
