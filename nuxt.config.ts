import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],

  css: ['~/assets/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    // Backend API origin for server-side code (sitemap). Override with NUXT_API_URL.
    apiUrl: process.env.NUXT_API_URL || process.env.VITE_API_URL || '',
    // Public site origin used for canonical URLs, og:url and the sitemap.
    // Override at deploy time with NUXT_PUBLIC_SITE_URL.
    public: {
      siteUrl: 'https://www.mavlono.net',
    },
  },

  // Pages that depend on localStorage-based sign-in, or contain private data, are
  // rendered in the browser only. Everything else is rendered on the server so
  // crawlers receive complete HTML.
  routeRules: {
    '/admin': { redirect: '/admin/poems' },
    '/admin/**': { ssr: false },
    '/users/**': { ssr: false },
    '/profile': { ssr: false },
    '/write': { ssr: false },
    '/settings': { ssr: false },
    '/auth': { ssr: false },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'tg' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'shortcut icon', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/assets/brand/logo.png' },
      ],
      meta: [{ name: 'theme-color', content: '#312E81' }],
    },
  },
})
