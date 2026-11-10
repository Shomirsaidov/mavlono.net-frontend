import { defineEventHandler, setHeader } from 'h3'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Dynamic sitemap: every poet page, biography page and poem page, so search engines
// can discover all content. Poem ids come from /api/poems/sitemap/all.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const site = String(config.public.siteUrl).replace(/\/+$/, '')
  const api = String(config.apiUrl || '').replace(/\/+$/, '')

  const urls: { loc: string; lastmod?: string; priority: string; changefreq: string }[] = [
    { loc: `${site}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${site}/catalog`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${site}/ai`, priority: '0.4', changefreq: 'monthly' },
  ]

  try {
    const [poets, poems] = await Promise.all([
      $fetch<any[]>(`${api}/api/poets`),
      $fetch<any[]>(`${api}/api/poems/sitemap/all`),
    ])
    for (const p of poets || []) {
      urls.push({ loc: `${site}/poets/${p.id}`, priority: '0.8', changefreq: 'weekly' })
      if (p.bio && String(p.bio).length > 10) {
        urls.push({ loc: `${site}/poets/${p.id}/bio`, priority: '0.6', changefreq: 'monthly' })
      }
    }
    for (const p of poems || []) {
      urls.push({
        loc: `${site}/poems/${p.id}`,
        lastmod: p.created_at ? new Date(p.created_at).toISOString() : undefined,
        priority: '0.7',
        changefreq: 'monthly',
      })
    }
  } catch (e) {
    console.error('[sitemap] could not load content from the API:', (e as Error).message)
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
      )
      .join('\n') +
    `\n</urlset>\n`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=3600')
  return body
})
