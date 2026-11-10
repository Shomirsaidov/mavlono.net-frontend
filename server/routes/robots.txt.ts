import { defineEventHandler, setHeader } from 'h3'

export default defineEventHandler((event) => {
  const site = String(useRuntimeConfig(event).public.siteUrl).replace(/\/+$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /auth',
    'Disallow: /profile',
    'Disallow: /users/',
    'Disallow: /write',
    'Disallow: /settings',
    'Disallow: /search',
    '',
    `Sitemap: ${site}/sitemap.xml`,
    '',
  ].join('\n')
})
