// Lightweight frontmatter parser — avoids gray-matter's eval + node-buffer polyfill.
// Supports: string, quoted string, ISO date (kept as string), [a, b] inline arrays.
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const [, header, body] = m;
  const data = {};
  for (const line of header.split('\n')) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, rawVal] = kv;
    let val = rawVal.trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, content: body };
}

const modules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });

export const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = path.split('/').pop().replace(/\.md$/, '');
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author ?? '',
      content,
    };
  })
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(input) {
  if (!input) return '';
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return String(input);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
