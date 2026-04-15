import { motion as Motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { AnimatedHeading } from '../ui/AnimatedHeading';
import { bounceUp, stagger, viewportOnce } from '../../lib/motion';
import { posts, formatDate } from '../../lib/posts';

function PostCard({ post }) {
  return (
    <a href={`#/blog/${post.slug}`} className="block h-full">
      <Card className="flex h-full flex-col">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">
          {formatDate(post.date)}
        </div>
        <h3 className="mt-3 text-lg font-bold tracking-tight">{post.title}</h3>
        {post.excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{post.excerpt}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">{t}</span>
          ))}
        </div>
        <div className="mt-auto pt-5 text-sm font-semibold text-text hover:text-primary">Read →</div>
      </Card>
    </a>
  );
}

export function Blog() {
  if (posts.length === 0) return null;
  const recent = posts.slice(0, 3);
  return (
    <Section id="blog">
      <div className="mb-12 text-center">
        <AnimatedHeading className="text-3xl font-bold tracking-tight md:text-4xl">Writing</AnimatedHeading>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          Notes on shipping AI, building backends, and the edge cases docs never cover.
        </p>
      </div>
      <Motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{ perspective: 1200 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {recent.map((p) => (
          <Motion.div key={p.slug} variants={bounceUp}>
            <PostCard post={p} />
          </Motion.div>
        ))}
      </Motion.div>
      {posts.length > 3 && (
        <div className="mt-10 text-center">
          <a href="#/blog" className="text-sm font-semibold text-primary hover:underline">
            View all posts →
          </a>
        </div>
      )}
    </Section>
  );
}

export default Blog;
