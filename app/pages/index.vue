<template>
  <HomeView v-if="auth.isAuthenticated" />
  <LandingView v-else />
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'
import LandingView from '../views/LandingView.vue'

const auth = useAuthStore()

const description =
  'Шеърҳои Рӯдакӣ, Ҳофиз, Саъдӣ, Румӣ, Хайём ва дигар шоирон — бихонед, нависед ва бо ёрии ҳуши сунъӣ шарҳ гиред.'

useSeo({
  title: 'mavlono.net — Ҳама шеърҳои тоҷикӣ дар як сомона',
  description,
  withSiteName: false,
  path: '/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'mavlono.net',
    url: 'https://www.mavlono.net/',
    inLanguage: 'tg',
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.mavlono.net/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },
})
</script>
