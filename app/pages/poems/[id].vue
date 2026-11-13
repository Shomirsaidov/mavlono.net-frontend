<template>
  <div v-if="poem">
    <div class="flex items-center justify-between mb-10">
      <router-link :to="'/poets/' + poem.poet?.id" class="flex items-center gap-4 group decoration-transparent">
        <PoetAvatar :src="poem.poet?.avatar" :alt="poem.poet?.name" size="48" class="border-2" />
        <div>
          <div class="font-serif text-lg font-bold text-text-main group-hover:text-gold transition-colors">{{ poem.poet?.name }}</div>
          <div class="text-[0.7rem] text-text-faint uppercase font-bold tracking-widest mt-0.5">{{ formatDate(poem.created_at) }}</div>
        </div>
      </router-link>
    </div>

    <!-- Poem body -->
    <h1 class="sr-only">{{ pageTitle }}</h1>
    <p class="font-serif text-xl md:text-2xl leading-[1.7] text-gray-800 mb-12 whitespace-pre-line selection:bg-gold/10 italic">
      {{ normalizeBreaks(poem.content) }}
    </p>

    <!-- Stats row -->
    <div class="flex items-center gap-6 mb-10 py-6 border-y border-border">
      <button 
        class="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all"
        :class="hasLiked ? 'bg-heart text-white shadow-lg shadow-heart/20' : 'bg-surface-2 text-text-faint hover:text-heart hover:bg-heart/5'"
        @click="handleLike"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2.1C10.5 3.5 9.26 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        {{ likeCount }}
      </button>
      
      <div class="flex items-center gap-2 text-text-faint text-sm font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        {{ $t('{n} бор хонда шуд', { n: poem.views?.length || 0 }) }}
      </div>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 mb-12" v-if="poem.genre || poem.tags">
      <span class="px-4 py-1.5 bg-indigo text-white text-[0.7rem] font-bold uppercase tracking-widest rounded-full shadow-md shadow-indigo/20">{{ poem.genre }}</span>
      <router-link v-for="tag in currentTags" :key="tag" :to="{ path: '/search', query: { q: tag } }" class="decoration-transparent">
        <span class="px-4 py-1.5 bg-surface-2 text-text-muted hover:text-indigo hover:bg-indigo-light text-[0.7rem] font-bold uppercase tracking-widest rounded-full transition-all border border-border">{{ tag }}</span>
      </router-link>
    </div>

    <div v-if="poem.user" class="mb-12">
      <div class="section-title">{{ $t('Иловакунандаи шеър') }}</div>
      <router-link :to="'/users/' + poem.user.id" class="flex w-full items-center gap-4 p-4 bg-surface-2 hover:bg-gold/10 rounded-2xl transition-all group decoration-transparent border border-border">
        <div class="bg-white p-2 rounded-xl shadow-sm group-hover:shadow-indigo/10 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="text-indigo group-hover:text-gold transition-colors" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div>
          <div class="text-sm font-bold text-text-main group-hover:text-gold transition-colors">{{ poem.user.name }}</div>
        </div>
      </router-link>
    </div>

    <!-- Dictionary search -->
    <div class="mb-12">
      <div class="section-title">{{ $t('Луғат ва калимаҳои душворфаҳм') }}</div>
      <div class="flex gap-2">
        <input v-model="vocabQuery" @keyup.enter="searchVocab" class="input-base flex-1" :placeholder="$t('калимаро нависед...')">
        <button @click="searchVocab" class="btn btn-gold">{{ $t('Маъно') }}</button>
      </div>
      <div v-show="showVocab" class="mt-6 rounded-2xl overflow-hidden shadow-2xl border border-border">
        <iframe :src="vocabUrl" class="w-full h-[480px] border-0 bg-white" loading="lazy"></iframe>
      </div>
    </div>

    <!-- AI meaning button -->
    <div class="mb-12">
      <router-link :to="{ path: '/ai', query: { query: normalizeBreaks(poem.content) } }" class="decoration-transparent">
        <button class="btn btn-outline w-full md:w-auto py-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          {{ $t('Маънои шеър (AI Шарҳ)') }}
        </button>
      </router-link>
    </div>

    <!-- Comments -->
    <div class="mb-12">
      <div class="section-title">{{ $t('Шарҳҳо') }}</div>
      <div class="space-y-4">
        <div v-if="poem.comments?.length === 0" class="text-text-faint text-sm italic py-4">{{ $t('Ҳоло шарҳе нест.') }}</div>
        <div v-for="comment in poem.comments || []" :key="comment.id" class="bg-surface-2 p-5 rounded-2xl border border-border group transition-all hover:bg-white hover:shadow-md">
          <div class="flex items-center gap-3 mb-2">
            <PoetAvatar :src="null" size="28" />
            <router-link v-if="comment.user" :to="'/users/' + comment.user.id" class="text-sm font-bold text-text-main hover:text-gold transition-colors decoration-transparent">{{ comment.user.name }}</router-link>
            <span v-else class="text-sm font-bold text-text-main">{{ $t('Хонанда') }}</span>
          </div>
          <p class="text-[0.95rem] text-gray-700 leading-relaxed">{{ comment.text }}</p>
        </div>
      </div>

      <!-- Comment form -->
      <div class="mt-8 bg-surface p-6 rounded-2xl border border-indigo/10 shadow-sm shadow-indigo/5">
        <div class="text-[0.7rem] font-black uppercase tracking-widest text-indigo mb-4">{{ $t('Назари худро нависед') }}</div>
        <textarea v-model="newComment" class="input-base min-h-[120px]" :placeholder="$t('Фикратонро нависед...')"></textarea>
        <div class="mt-4 flex justify-end">
          <button @click="submitComment" class="btn btn-indigo px-8">{{ $t('Фиристодан') }}</button>
        </div>
      </div>
    </div>

    <!-- Poet promo block -->
    <div class="glass-card p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6" v-if="poem.poet">
      <router-link :to="'/poets/' + poem.poet.id" class="decoration-transparent">
        <PoetAvatar :src="poem.poet.avatar" :alt="poem.poet.name" size="80" class="shadow-xl" />
      </router-link>
      <div class="flex-1 text-center md:text-left">
        <router-link :to="'/poets/' + poem.poet.id" class="font-serif text-2xl font-bold text-text-main mb-2 block hover:text-gold transition-colors decoration-transparent">
          {{ poem.poet.name }}
        </router-link>
        <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
          <button class="btn btn-gold px-8 py-2.5">{{ $t('Обуна шудан +') }}</button>
          <router-link :to="'/poets/' + poem.poet.id" class="btn btn-outline px-6 py-2.5">{{ $t('Шеърҳои дигари') }} {{ poem.poet.name }}</router-link>
        </div>
      </div>
    </div>

    <!-- Similar Poems -->
    <div v-if="similarPoems.length > 0" class="mt-20">
      <div class="section-title mb-8 flex items-center gap-3">
        <span class="w-1.5 h-6 bg-gold rounded-full"></span>
        {{ $t('Шеърҳои монанд') }}
      </div>
      
      <div class="space-y-6">
        <div
          v-for="p in similarPoems"
          :key="p.id"
          class="bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gold/30 group"
        >
          <router-link :to="'/poets/' + p.poet?.id" class="flex items-center gap-3 mb-4 decoration-transparent">
            <PoetAvatar :src="p.poet?.avatar" :alt="p.poet?.name" size="36" />
            <span class="text-sm font-bold text-text-main group-hover:text-indigo transition-colors">{{ p.poet?.name }}</span>
          </router-link>

          <router-link :to="'/poems/' + p.id" class="block decoration-transparent">
            <p class="font-serif text-xl leading-relaxed text-gray-700 whitespace-pre-line italic">{{ formatContent(p.content) }}</p>
            
            <div v-if="p.tags" class="flex flex-wrap gap-2 mt-4">
              <span v-for="tag in p.tags.split(',').filter(t => t.trim())" :key="tag" class="text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 bg-surface-2 text-text-muted rounded-md border border-border/50">#{{ tag.trim() }}</span>
            </div>

            <span class="inline-block mt-4 text-[0.8rem] font-bold text-indigo group-hover:underline uppercase tracking-wider">{{ $t('Муфассал хонед →') }}</span>
          </router-link>

          <div class="mt-6 pt-5 border-t border-border flex items-center justify-between">
            <button 
              class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
              :class="p._liked ? 'bg-heart text-white shadow-lg shadow-heart/20' : 'bg-surface-2 text-text-faint hover:text-heart hover:bg-heart/5'"
              @click.prevent="toggleLikeSimilar(p)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2.1C10.5 3.5 9.26 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              {{ p._likeCount }}
            </button>
            <span class="text-[0.6rem] font-black uppercase tracking-widest text-text-faint italic" v-if="p.genre">{{ p.genre }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { t } from '../../i18n'
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { API_URL } from '../../config'
import { normalizeBreaks, poemLines, truncate, formatDate } from '../../utils/text'
import PoetAvatar from '../../components/PoetAvatar.vue'

const authStore = useAuthStore()
const route = useRoute()

// Rendered on the server so search engines receive the full poem text.
// Only the fields the page needs are kept (the API also returns the author's e-mail).
const data = await useApiRecord(`poem-${route.params.id}`, `/api/poems/${route.params.id}`, {
  notFoundMessage: 'Poem not found',
  transform: (res) => ({
    poem: res.poem && { ...res.poem, user: res.poem.user && { id: res.poem.user.id, name: res.poem.user.name } },
    similars: res.similars || [],
  }),
})

const poem = ref(data.value?.poem || null)
const hasLiked = ref(false)
const likeCount = ref(poem.value?.likes?.length || 0)
const vocabQuery = ref('')
const vocabUrl = ref('')
const showVocab = ref(false)
const newComment = ref('')

const similarPoems = ref(
  (data.value?.similars || []).map(p => ({
    ...p,
    _liked: false,
    _likeCount: p.likes?.length || 0
  }))
)

// Signed-in state is only known in the browser (after hydration).
onMounted(() => {
  const uid = authStore.currentUserId
  if (!authStore.isAuthenticated) return
  hasLiked.value = (poem.value?.likes || []).some(l => l.user_id === uid)
  similarPoems.value.forEach(p => { p._liked = (p.likes || []).some(l => l.user_id === uid) })
})
watch(() => authStore.isAuthenticated, (v) => {
  if (!v) return
  const uid = authStore.currentUserId
  hasLiked.value = (poem.value?.likes || []).some(l => l.user_id === uid)
  similarPoems.value.forEach(p => { p._liked = (p.likes || []).some(l => l.user_id === uid) })
})

const currentTags = computed(() => poem.value?.tags ? poem.value.tags.split(',').map(t => t.trim()).filter(Boolean) : [])

const formatContent = (c) => {
  if (!c) return ''
  const lines = normalizeBreaks(c).split('\n').filter(l => l.trim())
  return lines.slice(0, 4).join('\n') + (lines.length > 4 ? '\n...' : '')
}

// ── SEO: title = first line of the poem + poet; description = first four lines ──
const poetName = computed(() => poem.value?.poet?.name || '')
const firstLine = computed(() => truncate(poemLines(poem.value?.content, 1)[0] || '', 70))
const pageTitle = computed(() => [firstLine.value, poetName.value].filter(Boolean).join(' — '))
const seoDescription = computed(() => {
  const body = truncate(poemLines(poem.value?.content, 4).join(' / '), 300)
  return body || `Шеъри ${poetName.value} дар mavlono.net`
})
const poetAvatar = computed(() => {
  const a = poem.value?.poet?.avatar
  return a && a.startsWith('http') ? a : ''
})

useSeo(() => ({
  title: pageTitle.value,
  description: seoDescription.value,
  type: 'article',
  image: poetAvatar.value,
  imageAlt: poetName.value,
  publishedTime: poem.value?.created_at,
  author: poetName.value,
  tags: currentTags.value,
  jsonLd: poem.value && {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: pageTitle.value,
    headline: firstLine.value,
    text: normalizeBreaks(poem.value.content),
    inLanguage: 'tg',
    genre: poem.value.genre || undefined,
    keywords: currentTags.value.join(', ') || undefined,
    datePublished: poem.value.created_at,
    author: poem.value.poet && {
      '@type': 'Person',
      name: poetName.value,
      url: `https://www.mavlono.net/poets/${poem.value.poet.id}`,
    },
    isPartOf: { '@type': 'WebSite', name: 'mavlono.net', url: 'https://www.mavlono.net/' },
  },
}))

const toggleLikeSimilar = async (p) => {
  if (!authStore.isAuthenticated) {
    alert(t('Лутфан аввал ба система ворид шавед.'))
    return
  }
  
  const wasLiked = p._liked
  p._liked = !p._liked
  p._likeCount += p._liked ? 1 : -1
  
  try {
    const res = await fetch(`${API_URL}/api/poems/${p.id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: authStore.currentUserId })
    })
    const data = await res.json()
    if (data.action === 'liked') p._liked = true
    else if (data.action === 'unliked') p._liked = false
    if (typeof data.newCount === 'number') p._likeCount = data.newCount
  } catch(e) {
    p._liked = wasLiked
    p._likeCount += wasLiked ? 0 : 0
  }
}


const searchVocab = () => {
  if (!vocabQuery.value.trim()) return
  vocabUrl.value = `https://vazhaju.tj/search/${encodeURIComponent(vocabQuery.value.trim())}`
  showVocab.value = true
}

const handleLike = async () => {
  // Optimistic
  const wasLiked = hasLiked.value
  hasLiked.value = !hasLiked.value
  likeCount.value += hasLiked.value ? 1 : -1

  if (!authStore.isAuthenticated) {
    alert(t('Лутфан аввал ба система ворид шавед.'))
    return
  }

  try {
    const res = await fetch(`${API_URL}/api/poems/${poem.value.id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: authStore.currentUserId })
    })
    const data = await res.json()
    if (data.action === 'liked') hasLiked.value = true
    else if (data.action === 'unliked') hasLiked.value = false

    if (typeof data.newCount === 'number') {
      likeCount.value = data.newCount
    }
  } catch(e) {
    hasLiked.value = wasLiked
    likeCount.value += wasLiked ? 0 : 0
  }
}

const submitComment = async () => {
  if (!authStore.isAuthenticated) {
    alert(t('Лутфан аввал ба система ворид шавед.'))
    return
  }
  if (!newComment.value.trim()) return
  const text = newComment.value.trim()
  poem.value.comments = poem.value.comments || []
  poem.value.comments.push({ id: Date.now(), text, user: { name: authStore.user?.name || t('Шумо') } })
  newComment.value = ''
  try {
    await fetch(`${API_URL}/api/poems/${poem.value.id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: authStore.currentUserId, text })
    })
  } catch(e) {}
}
</script>
