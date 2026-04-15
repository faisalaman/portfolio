import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AnimatedHeading } from '../ui/AnimatedHeading';
import { getPost, formatDate } from '../../lib/posts';

export function BlogPost({ slug }) {
  const post = getPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <main className="mx-auto max-w-2xl px-4 pb-20 pt-28 text-center md:px-8">
        <AnimatedHeading className="text-3xl font-bold">Post not found</AnimatedHeading>
        <p className="mt-4 text-text-muted">This post doesn't exist or was moved.</p>
        <a href="#/blog" className="mt-6 inline-block text-primary hover:underline">← Back to blog</a>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:px-8">
      <a href="#/blog" className="text-sm text-text-muted hover:text-primary">← All posts</a>

      <header className="mt-6 mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-primary">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.tags.length > 0 && (
            <>
              <span className="text-text-muted">·</span>
              <span className="flex flex-wrap gap-1">
                {post.tags.map((t) => <span key={t}>#{t}</span>)}
              </span>
            </>
          )}
        </div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">{post.title}</h1>
        {post.author && <p className="mt-3 text-sm text-text-muted">by {post.author}</p>}
      </header>

      <article className="blog-content text-base leading-relaxed text-text-muted">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: (props) => <h2 className="mt-10 mb-3 text-2xl font-bold tracking-tight text-text" {...props} />,
            h3: (props) => <h3 className="mt-8 mb-3 text-xl font-bold tracking-tight text-text" {...props} />,
            p: (props) => <p className="my-4" {...props} />,
            ul: (props) => <ul className="my-4 list-disc space-y-1.5 pl-6" {...props} />,
            ol: (props) => <ol className="my-4 list-decimal space-y-1.5 pl-6" {...props} />,
            strong: (props) => <strong className="text-text" {...props} />,
            a: (props) => <a className="text-primary hover:underline" target="_blank" rel="noreferrer" {...props} />,
            code: ({ inline, className, children, ...rest }) =>
              inline
                ? <code className="rounded bg-bg-alt px-1.5 py-0.5 text-sm text-text" {...rest}>{children}</code>
                : <code className={className} {...rest}>{children}</code>,
            pre: (props) => <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-bg-alt p-4 text-sm text-text" {...props} />,
            blockquote: (props) => <blockquote className="my-6 border-l-2 border-primary pl-4 italic" {...props} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}

export default BlogPost;
