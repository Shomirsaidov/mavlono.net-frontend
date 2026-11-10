<template>
  <div v-if="poet" class="max-w-3xl mx-auto pb-20">
    <!-- Header Section -->
    <header class="flex flex-col items-center text-center mb-10 md:mb-12 pt-6">
      <PoetAvatar :src="poet.avatar" :alt="poet.name" size="110" class="mb-5 shadow-lg border-4 ring-4 ring-indigo-light/20" />
      <h1 class="font-serif text-4xl md:text-5xl font-bold text-text-main mb-3 tracking-tight">{{ poet.name }}</h1>
      <div v-if="poet.lifetime" class="inline-flex items-center px-4 py-1 bg-indigo-light text-indigo text-xs font-bold tracking-wider rounded-full border border-indigo/20">
        {{ poet.lifetime }}
      </div>
    </header>

    <!-- Biography Content -->
    <article class="prose prose-indigo max-w-none mb-12 px-4 md:px-0">
      <div class="section-title text-center mb-6">{{ $t('Тарҷумаи ҳол') }}</div>
      <div v-if="poet.bio && poet.bio.length > 10" 
           class="font-serif text-lg md:text-xl leading-[1.75] text-gray-800 whitespace-pre-line first-letter:text-5xl first-letter:font-bold first-letter:text-indigo first-letter:mr-2 first-letter:float-left first-letter:leading-[1]"
           v-html="formattedBio">
      </div>
      <div v-else class="text-center text-text-faint italic py-10 bg-gray-50 rounded-2xl border border-dashed border-border">
        {{ $t('Маълумоти бештар дар бораи ин шахсият дар ҳоли омодашавӣ аст...') }}
      </div>
    </article>

    <!-- Popular Poems (Snap Scroll) -->
    <section v-if="popularPoems.length > 0" class="mt-10 mb-10 overflow-hidden">
      <div class="px-4 md:px-0 flex items-center justify-between mb-5">
        <h2 class="text-lg font-bold text-text-main flex items-center gap-3">
          <span class="w-8 h-[3px] bg-gold rounded-full"></span>
          {{ $t('Шеърҳои машҳур') }}
        </h2>
        <router-link :to="'/poets/' + poet.id" class="text-[0.7rem] font-black text-indigo uppercase tracking-[0.2em] hover:underline">{{ $t('Ҳамааш →') }}</router-link>
      </div>

      <div class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar px-4 md:px-0">
        <div 
          v-for="poem in popularPoems" 
          :key="poem.id"
          class="snap-start shrink-0 w-[260px] md:w-[300px] glass-card p-5 rounded-2xl border border-border hover:border-gold/40 transition-all group"
        >
          <router-link :to="'/poems/' + poem.id" class="decoration-transparent h-full flex flex-col">
            <p class="font-serif text-lg leading-relaxed text-gray-700 italic line-clamp-6 mb-4 flex-1 whitespace-pre-line">
              {{ formatSnippet(poem.content) }}
            </p>
            <div v-if="poem.tags" class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in poem.tags.split(',').slice(0, 2)" :key="tag" class="text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 bg-surface-2 text-text-muted rounded-md border border-border/50">#{{ tag.trim() }}</span>
            </div>
            <div class="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
              <div class="flex items-center gap-2.5 text-text-faint text-sm font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2.1C10.5 3.5 9.26 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                {{ poem.likeCount }}
              </div>
              <span class="text-[0.7rem] font-black text-indigo uppercase tracking-widest">{{ $t('Хондан →') }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Recommended Poets (Snap Scroll) -->
    <section v-if="recommendedPoets.length > 0" class="mt-10 mb-6 overflow-hidden">
      <div class="px-4 md:px-0 mb-5">
        <h2 class="text-lg font-bold text-text-main flex items-center gap-3">
          <span class="w-8 h-[3px] bg-gold rounded-full"></span>
          {{ $t('Дигар адибон') }}
        </h2>
      </div>

      <div class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar px-4 md:px-0">
        <div 
          v-for="recommend in recommendedPoets" 
          :key="recommend.id"
          class="snap-start shrink-0 w-[130px] md:w-[150px] text-center"
        >
          <router-link :to="'/poets/' + recommend.id" class="decoration-transparent group">
            <div class="mb-3 relative inline-block">
              <PoetAvatar :src="recommend.avatar" :alt="recommend.name" size="72" class="mx-auto shadow-md group-hover:scale-105 transition-all" />
              <div class="absolute -bottom-2 -right-2 bg-gold text-white p-2 rounded-full border-4 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
              </div>
            </div>
            <div class="font-serif font-bold text-lg text-text-main group-hover:text-gold transition-colors line-clamp-1">{{ recommend.name }}</div>
            <div class="text-[0.65rem] text-text-faint uppercase font-bold tracking-wider mt-1">{{ recommend.category || $t('Шоир') }}</div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { normalizeBreaks, escapeHtml, poemLines, truncate } from '../../../utils/text'
import PoetAvatar from '../../../components/PoetAvatar.vue'

const route = useRoute()
const poetId = route.params.id

const data = await useApiRecord(`poet-bio-${poetId}`, `/api/poets/${poetId}`, {
  notFoundMessage: 'Poet not found',
  transform: (res) => ({
    poet: res.poet && { ...res.poet, subscriptions: undefined },
    poems: (res.poems || []).map(p => ({
      id: p.id,
      content: poemLines(p.content, 6).join('\n'),
      tags: p.tags,
      likeCount: p.likes?.length || 0,
    })),
  }),
})
const poet = ref(data.value?.poet || null)
const poems = ref(data.value?.poems || [])

// Other poets are listed for internal linking. Not randomised: the server and the
// browser must render identical HTML, and stable links are better for crawlers.
const allPoets = await usePoets()
const otherPoets = computed(() => {
  const list = Array.isArray(allPoets.value) ? allPoets.value : []
  const i = list.findIndex(p => p.id == poetId)
  return list.length ? [...list.slice(i + 1), ...list.slice(0, Math.max(i, 0))] : []
})

const popularPoems = computed(() => {
  return [...poems.value]
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 5)
})

const formattedBio = computed(() => {
  if (!poet.value?.bio) return ''
  return escapeHtml(normalizeBreaks(poet.value.bio))
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
})

const recommendedPoets = computed(() => otherPoets.value.slice(0, 8))

const formatSnippet = (c) => {
  if (!c) return ''
  const lines = normalizeBreaks(c).split('\n').filter(l => l.trim())
  return lines.slice(0, 6).join('\n') + (lines.length > 6 ? '\n...' : '')
}


// ── SEO ──
const bioPlain = computed(() => normalizeBreaks(poet.value?.bio).replace(/\s*\n\s*/g, ' ').replace(/[*_]/g, '').trim())
const bioDescription = computed(() => {
  if (bioPlain.value.length > 10) return truncate(bioPlain.value, 200)
  const first = poems.value[0]
  const lines = first ? poemLines(first.content, 4).join(' / ') : ''
  return truncate(`Тарҷумаи ҳоли ${poet.value?.name}${lines ? '. ' + lines : ' дар mavlono.net'}`, 200)
})
const poetAvatar = computed(() => (poet.value?.avatar && poet.value.avatar.startsWith('http') ? poet.value.avatar : ''))

useSeo(() => ({
  title: `${poet.value.name} — тарҷумаи ҳол${poet.value.lifetime ? ' (' + poet.value.lifetime + ')' : ''}`,
  description: bioDescription.value,
  type: 'profile',
  image: poetAvatar.value,
  imageAlt: poet.value.name,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: poet.value.name,
    description: bioDescription.value,
    image: poetAvatar.value || undefined,
    url: `https://www.mavlono.net/poets/${poet.value.id}`,
  },
}))
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
