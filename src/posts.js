// Each .md file in src/posts/ is a blog post. The file name (without .md)
// becomes the post's URL slug: #blog/<file-name>.
// The top section between the --- lines holds the title, date (YYYY-MM-DD),
// and summary. Everything below is the Markdown body.
const files = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parsePost(path, raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  const meta = {}
  let body = raw
  if (match) {
    body = match[2]
    for (const line of match[1].split(/\r?\n/)) {
      const idx = line.indexOf(':')
      if (idx > -1) {
        meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
      }
    }
  }
  const slug = path.split('/').pop().replace(/\.md$/, '')
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    summary: meta.summary || '',
    body,
  }
}

const posts = Object.entries(files)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export default posts
