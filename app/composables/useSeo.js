import { computed, toValue } from 'vue'

export const SITE_NAME = 'mavlono.net'

/**
 * Sets the <title>, meta description, canonical link, Open Graph / Twitter tags and
 * (optionally) JSON-LD for the current page. Rendered on the server, so crawlers and
 * link-preview bots (Telegram, WhatsApp, Facebook) see the final values.
 *
 * Pass a plain object or a getter returning one; values may depend on reactive data:
 *   useSeo(() => ({ title: poem.value.title, description: ..., image: ... }))
 *
 * Options: title, description, image, path, type ('website' | 'article' | 'profile'),
 *          noindex, jsonLd (object or array), publishedTime, author, tags, withSiteName.
 */
export function useSeo(options) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const siteUrl = String(config.public.siteUrl || '').replace(/\/+$/, '')

  const absolute = (url) => {
    if (!url) return ''
    if (/^https?:\/\//i.test(url)) return url
    return siteUrl + (url.startsWith('/') ? url : '/' + url)
  }

  const o = computed(() => {
    const v = toValue(options) || {}
    const path = v.path ?? route.path
    const fullTitle = v.withSiteName === false ? v.title : `${v.title} | ${SITE_NAME}`
    const hasOwnImage = !!v.image
    return {
      ...v,
      fullTitle,
      url: siteUrl + (path === '/' ? '/' : path),
      image: hasOwnImage ? absolute(v.image) : `${siteUrl}/og-image.png`,
      hasOwnImage,
    }
  })

  useSeoMeta({
    title: () => o.value.fullTitle,
    description: () => o.value.description,
    robots: () => (o.value.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'),
    ogType: () => o.value.type || 'website',
    ogSiteName: SITE_NAME,
    ogLocale: 'tg_TJ',
    ogUrl: () => o.value.url,
    ogTitle: () => o.value.fullTitle,
    ogDescription: () => o.value.description,
    ogImage: () => o.value.image,
    ogImageAlt: () => o.value.imageAlt || o.value.title,
    twitterCard: () => (o.value.hasOwnImage ? 'summary' : 'summary_large_image'),
    twitterTitle: () => o.value.fullTitle,
    twitterDescription: () => o.value.description,
    twitterImage: () => o.value.image,
    articlePublishedTime: () => (o.value.type === 'article' ? o.value.publishedTime : undefined),
    articleAuthor: () => (o.value.type === 'article' && o.value.author ? [o.value.author] : undefined),
    articleTag: () => (o.value.type === 'article' && o.value.tags?.length ? o.value.tags : undefined),
  })

  useHead(
    computed(() => ({
      // noindex pages should not advertise a canonical URL
      link: o.value.noindex ? [] : [{ rel: 'canonical', href: o.value.url }],
      script: o.value.jsonLd
        ? [
            {
              type: 'application/ld+json',
              // "<" is escaped so poem text can never close the script tag
              innerHTML: JSON.stringify(o.value.jsonLd).replace(/</g, '\\u003c'),
            },
          ]
        : [],
    })),
  )
}
