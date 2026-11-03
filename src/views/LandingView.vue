<template>
  <div class="landing bg-bg text-text-main">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-border/70 bg-white/85 backdrop-blur-md">
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <router-link to="/" class="shrink-0">
          <img src="/assets/brand/logo-horizontal.png" alt="mavlono.tj" class="h-7 md:h-8 object-contain">
        </router-link>

        <nav class="hidden items-center gap-8 lg:flex" :aria-label="$t('Меню')">
          <a v-for="link in navLinks" :key="link.id" :href="'#' + link.id" class="nav-link" @click.prevent="scrollTo(link.id)">{{ $t(link.label) }}</a>
        </nav>

        <div class="flex items-center gap-3">
          <div class="flex items-center rounded-full border border-border bg-white p-0.5 text-[0.7rem] font-bold" role="group" :aria-label="$t('Забон')">
            <button
              v-for="option in languages"
              :key="option.code"
              type="button"
              class="cursor-pointer rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors"
              :class="lang === option.code ? 'bg-indigo text-white' : 'text-text-muted hover:text-indigo'"
              :aria-pressed="lang === option.code"
              @click="setLang(option.code)"
            >{{ option.short }}</button>
          </div>
          <router-link to="/auth" class="hidden text-sm font-semibold text-text-muted transition-colors hover:text-indigo sm:inline">{{ $t('Вуруд') }}</router-link>
          <router-link to="/auth" class="btn btn-indigo px-5 py-2 text-sm">{{ $t('Оғоз кардан') }}</router-link>
        </div>
      </div>
    </header>

    <main>
      <!-- Hero -->
      <section class="relative overflow-hidden">
        <div class="hero-bg" aria-hidden="true"></div>
        <div class="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div class="reveal">
            <span class="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-light px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold-dark">
              <span class="h-1.5 w-1.5 rounded-full bg-gold"></span>
              {{ $t('Маркази кушоди шеъри форсӣ-тоҷикӣ') }}
            </span>
            <h1 class="mt-6 font-serif text-[2.4rem] font-bold leading-[1.12] tracking-tight text-text-main sm:text-5xl lg:text-[3.6rem]">
              {{ $t('Шеъри бузургон,') }}
              <span class="text-indigo">{{ $t('фаҳмо ба забони имрӯз') }}</span>
            </h1>
            <p class="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-text-muted md:text-lg">
              {{ $t('mavlono.net — маркази кушод барои хондан, ҷустуҷӯ ва фаҳмидани шеъри форсӣ-тоҷикӣ. Ҳуши сунъӣ калимаҳо ва мисраъҳои кӯҳнаро ба тоҷикии имрӯза шарҳ медиҳад.') }}
            </p>
            <div class="mt-9 flex flex-wrap items-center gap-3">
              <router-link to="/auth" class="btn btn-indigo px-8 py-3.5 text-[0.95rem] shadow-lg shadow-indigo/20">
                {{ $t('Оғози хондан') }}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </router-link>
              <router-link to="/catalog" class="btn btn-outline px-7 py-3.5 text-[0.95rem]">{{ $t('Дидани каталог') }}</router-link>
            </div>
            <ul class="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-text-muted">
              <li class="flex items-center gap-2"><span class="check" v-html="icons.check"></span>{{ $t('8 800+ шеър') }}</li>
              <li class="flex items-center gap-2"><span class="check" v-html="icons.check"></span>{{ $t('Шарҳи AI ба тоҷикии имрӯза') }}</li>
              <li class="flex items-center gap-2"><span class="check" v-html="icons.check"></span>{{ $t('Луғат дар паҳлуи шеър') }}</li>
            </ul>
          </div>

          <!-- Hero visual: poem card with AI explanation -->
          <div class="reveal delay-1 relative mx-auto w-full max-w-md lg:max-w-none">
            <div class="absolute -right-4 -top-6 h-44 w-44 rounded-full bg-indigo-light blur-2xl" aria-hidden="true"></div>
            <img src="/assets/brand/character_nobg.png" alt="" class="mascot" width="500" height="500" loading="eager">

            <div class="poem-card relative">
              <div class="flex items-center gap-3 border-b border-border/70 pb-4">
                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-indigo text-sm font-bold text-white">М</div>
                <div>
                  <div class="text-sm font-bold text-text-main">{{ $t('Ҷалолиддини Балхӣ') }}</div>
                  <div class="text-[0.65rem] font-bold uppercase tracking-widest text-text-faint">{{ $t('маснавӣ') }}</div>
                </div>
              </div>
              <p class="mt-5 font-serif text-[1.2rem] italic leading-[2.05] text-gray-700 md:text-[1.3rem]">
                {{ $t('Бишнав ин най чун шикоят мекунад,') }}<br>
                {{ $t('Аз ҷудоиҳо ҳикоят мекунад.') }}<br>
                {{ $t('К-аз') }} <mark class="mark">{{ $t('найистон') }}</mark> {{ $t('то маро') }} <mark class="mark">{{ $t('бибридаанд') }}</mark>,
              </p>
              <div class="ai-note">
                <div class="mb-2 flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-indigo">
                  <span class="flex h-5 w-5 items-center justify-center rounded-md bg-indigo text-white" v-html="icons.sparklesBadge"></span>
                  {{ $t('Шарҳи AI') }}
                </div>
                <p class="text-[0.85rem] leading-relaxed text-text-muted">
                  <b class="text-text-main">{{ $t('найистон') }}</b> — {{ $t('нейзор, ҷое, ки най мерӯяд;') }}
                  <b class="text-text-main">{{ $t('бибридаанд') }}</b> — {{ $t('аз решаам ҷудо кардаанд.') }}
                  {{ $t('Най аз ҷудоии худ аз найистон нола мекунад — рамзи ҷоне, ки аз сарчашмаи худ дур афтодааст.') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="bg-indigo text-white" aria-labelledby="stats-title">
        <h2 id="stats-title" class="sr-only">{{ $t('Мо дар рақамҳо') }}</h2>
        <div class="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          <div v-for="s in stats" :key="s.label" class="reveal bg-indigo px-6 py-9 text-center md:py-12">
            <div class="font-serif text-4xl font-bold text-gold md:text-5xl">
              <span class="stat-value" :data-value="s.value" :data-decimals="s.decimals || 0" :data-prefix="s.prefix || ''" :data-suffix="s.suffix || ''">{{ s.prefix }}{{ s.value }}{{ s.suffix }}</span>
            </div>
            <div class="mx-auto mt-3 max-w-[14rem] text-[0.82rem] font-medium leading-snug text-white/80">{{ $t(s.label) }}</div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section id="features" class="scroll-mt-20 mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div class="reveal mx-auto max-w-2xl text-center">
          <div class="eyebrow">{{ $t('Имкониятҳо') }}</div>
          <h2 class="section-h2">{{ $t('Ҳама чиз барои хондани шеър') }}</h2>
          <p class="mt-4 text-text-muted">{{ $t('Аз лентаи шеърҳои нав то шарҳи ҳуши сунъӣ — ҳар чизе, ки барои хондан, фаҳмидан ва мубодилаи шеър лозим аст, дар як ҷо.') }}</p>
        </div>
        <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="(f, i) in features" :key="f.title" class="reveal feature-card" :style="{ transitionDelay: (i % 3) * 70 + 'ms' }">
            <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="icons[f.icon]"></svg></div>
            <h3 class="mt-5 font-serif text-xl font-bold text-text-main">{{ $t(f.title) }}</h3>
            <p class="mt-2 text-[0.92rem] leading-relaxed text-text-muted">{{ $t(f.text) }}</p>
          </article>
        </div>
      </section>

      <!-- AI explains -->
      <section id="ai" class="scroll-mt-20 bg-white py-20 md:py-28">
        <div class="mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
          <div class="reveal">
            <div class="eyebrow">{{ $t('Ҳуши сунъӣ') }}</div>
            <h2 class="section-h2 text-left">{{ $t('Калимаҳои кӯҳна дигар монеа нестанд') }}</h2>
            <p class="mt-4 leading-relaxed text-text-muted">
              {{ $t('Шеъри классикӣ пур аз калимаҳо ва таркибҳоест, ки имрӯз кам истифода мешаванд. Ҳуши сунъии mavlono онҳоро ба забони равони тоҷикии имрӯза шарҳ медиҳад — то шумо на танҳо бихонед, балки бифаҳмед.') }}
            </p>
            <router-link to="/ai" class="mt-8 inline-flex items-center gap-2 text-sm font-bold text-indigo hover:underline">
              {{ $t('Санҷидани шарҳи AI') }}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </router-link>
          </div>
          <ol class="reveal delay-1 space-y-4">
            <li v-for="(step, i) in steps" :key="step.title" class="step">
              <span class="step-n">{{ i + 1 }}</span>
              <div>
                <h3 class="font-serif text-lg font-bold text-text-main">{{ $t(step.title) }}</h3>
                <p class="mt-1 text-[0.92rem] leading-relaxed text-text-muted">{{ $t(step.text) }}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <!-- Media -->
      <section id="media" class="scroll-mt-20 mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div class="reveal mx-auto max-w-2xl text-center">
          <div class="eyebrow">{{ $t('Дар расонаҳо') }}</div>
          <h2 class="section-h2">{{ $t('Мо дар Sughd TV') }}</h2>
          <p class="mt-4 text-text-muted">{{ $t('Мусоҳибаҳо дар телевизион дар бораи лоиҳа, шеъри тоҷикӣ ва он ки чӣ тавр технология онро ба наслҳои нав наздик мекунад.') }}</p>
        </div>
        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <figure v-for="v in videos" :key="v.id" class="reveal video-card">
            <div class="aspect-video w-full overflow-hidden rounded-2xl bg-surface-2">
              <iframe
                :src="v.src"
                :title="$t(v.title)"
                class="h-full w-full border-0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <figcaption class="mt-3 flex items-center gap-2 px-1 text-sm font-semibold text-text-muted">
              <span class="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-light text-indigo" v-html="icons.tv"></span>
              {{ $t(v.title) }}
            </figcaption>
          </figure>
        </div>
        <div class="reveal mt-10 flex flex-wrap justify-center gap-3">
          <span class="badge"><span v-html="icons.users"></span>{{ $t('Муаррифӣ дар назди 400+ донишҷӯ') }}</span>
          <span class="badge"><span v-html="icons.award"></span>{{ $t('Ҷои 2-юм дар озмуни миллии ихтироъ') }}</span>
          <span class="badge"><span v-html="icons.tv"></span>{{ $t('Мусоҳибаҳо дар Sughd TV') }}</span>
        </div>
      </section>

      <!-- Two editions -->
      <section class="bg-white py-20 md:py-24" aria-labelledby="editions-title">
        <div class="mx-auto max-w-6xl px-5 md:px-8">
          <div class="reveal mx-auto max-w-2xl text-center">
            <div class="eyebrow">{{ $t('Ду нусха') }}</div>
            <h2 id="editions-title" class="section-h2">{{ $t('Як платформа — ду хона') }}</h2>
            <p class="mt-4 text-text-muted">{{ $t('Платформаи мо ду нусха дорад. Ҳар ду ба як мақсад хидмат мекунанд: шеъри форсӣ-тоҷикӣ барои ҳама.') }}</p>
          </div>
          <div class="mt-12 grid gap-6 md:grid-cols-2">
            <div class="reveal edition edition-current">
              <span class="edition-tag">{{ $t('Шумо ҳоло инҷоед') }}</span>
              <div class="font-serif text-3xl font-bold">mavlono.net</div>
              <p class="mt-3 text-[0.95rem] leading-relaxed text-white/80">{{ $t('Нусхаи нав бо лентаи шахсӣ, шарҳи ҳуши сунъӣ, луғат, обуна ба шоирон ва ҳисоби шахсӣ.') }}</p>
              <router-link to="/auth" class="btn mt-7 bg-white px-6 py-2.5 text-sm text-indigo hover:bg-gold-light">{{ $t('Оғози хондан') }}</router-link>
            </div>
            <div class="reveal delay-1 edition">
              <span class="edition-tag edition-tag-muted">{{ $t('Нусхаи дигар') }}</span>
              <div class="font-serif text-3xl font-bold text-text-main">shoiron.tj</div>
              <p class="mt-3 text-[0.95rem] leading-relaxed text-text-muted">{{ $t('Нусхаи дигари платформаи мо дар shoiron.tj дастрас аст — бузургтарин маркази кушод барои хондан, мубодила ва шарҳи шеъри форсӣ-тоҷикӣ.') }}</p>
              <a href="https://shoiron.tj" target="_blank" rel="noopener" class="btn btn-outline mt-7 px-6 py-2.5 text-sm">
                {{ $t('Боз кардани shoiron.tj') }}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Founder -->
      <section id="founder" class="scroll-mt-20 mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div class="reveal founder">
          <div class="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
            <div class="flex h-24 w-24 items-center justify-center rounded-full bg-indigo font-serif text-4xl font-bold text-white shadow-xl shadow-indigo/20 ring-4 ring-gold-light">А</div>
            <div>
              <div class="eyebrow md:text-left">{{ $t('Асосгузор') }}</div>
              <h2 class="font-serif text-3xl font-bold text-text-main">{{ $t('Абубакр Шомирсаидов') }}</h2>
              <p class="mt-1 text-sm font-semibold text-indigo">{{ $t('Хуҷанд, Тоҷикистон') }}</p>
            </div>
            <div class="flex flex-wrap justify-center gap-2 md:justify-start">
              <span class="chip">Moní AI</span>
              <span class="chip">Poputki.online</span>
              <span class="chip">Common Voice Tajik</span>
              <span class="chip">Yale YGS 2026</span>
            </div>
          </div>
          <div class="space-y-4 text-[0.98rem] leading-relaxed text-text-muted">
            <p>{{ $t('Абубакр Шомирсаидов — барномасоз ва тадқиқотчии соҳаи ҳуши сунъӣ аз Хуҷанд, ки зиёда аз се сол маҳсулоти барномавӣ месозад. Корашро дар чорроҳаи ҳуши сунъӣ, муҳандисии нармафзор ва тадқиқоти амалӣ пеш мебарад.') }}</p>
            <p>{{ $t('Ӯ асосгузори Shoiron.tj (пештар mavlono.tj) аст — бузургтарин маркази кушод барои хондан, мубодила ва шарҳи шеъри форсӣ-тоҷикӣ, ки зиёда аз 8 800 шеър ва беш аз 2 000 хонандаи фаъоли моҳона дорад.') }}</p>
            <div class="flex flex-wrap gap-3 pt-2">
              <a href="https://mechtatnevredno.com" target="_blank" rel="noopener" class="btn btn-gold px-6 py-2.5 text-sm">{{ $t('Сайти шахсӣ') }}</a>
              <router-link to="/settings" class="btn btn-outline px-6 py-2.5 text-sm">{{ $t('Бештар дар бораи ӯ') }}</router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="px-5 pb-20 md:px-8 md:pb-28">
        <div class="reveal cta mx-auto max-w-6xl">
          <h2 class="font-serif text-3xl font-bold leading-tight text-white md:text-[2.6rem]">{{ $t('Шеърро на танҳо бихонед — бифаҳмед') }}</h2>
          <p class="mx-auto mt-4 max-w-xl leading-relaxed text-white/80">{{ $t('Ҳисоб кушоед, то лентаи шахсии худро бинед, шеърҳоро писанд кунед, назар нависед ва ба шоирони дӯстдоштаатон обуна шавед.') }}</p>
          <div class="mt-9 flex flex-wrap justify-center gap-3">
            <router-link to="/auth" class="btn bg-white px-8 py-3.5 text-[0.95rem] text-indigo shadow-lg hover:bg-gold-light">{{ $t('Бақайдгирӣ') }}</router-link>
            <router-link to="/auth" class="btn border border-white/30 px-8 py-3.5 text-[0.95rem] text-white hover:bg-white/10">{{ $t('Вуруд') }}</router-link>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border bg-white">
      <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-8 md:flex-row md:px-8">
        <img src="/assets/brand/logo-horizontal.png" alt="mavlono.tj" class="h-6 object-contain">
        <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-text-muted" :aria-label="$t('Меню')">
          <router-link to="/catalog" class="hover:text-indigo">{{ $t('Каталог') }}</router-link>
          <router-link to="/ai" class="hover:text-indigo">{{ $t('AI Шарҳ') }}</router-link>
          <router-link to="/settings" class="hover:text-indigo">{{ $t('Танзимот') }}</router-link>
          <a href="https://shoiron.tj" target="_blank" rel="noopener" class="hover:text-indigo">shoiron.tj</a>
        </nav>
        <span class="text-xs font-medium text-text-faint">mavlono.net © {{ year }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { lang, setLang } from '../i18n'

const year = new Date().getFullYear()

const languages = [
  { code: 'tg', short: 'TJ' },
  { code: 'en', short: 'EN' },
]

const navLinks = [
  { id: 'features', label: 'Имкониятҳо' },
  { id: 'ai', label: 'Шарҳи AI' },
  { id: 'media', label: 'Дар расонаҳо' },
  { id: 'founder', label: 'Асосгузор' },
]

const stats = [
  { value: 8.8, decimals: 1, suffix: 'K+', label: 'шеър дар сомона' },
  { value: 2, suffix: 'K+', label: 'хонандаи фаъол дар як моҳ' },
  { value: 400, suffix: '+', label: 'донишҷӯ, ки лоиҳа дар назди онҳо муаррифӣ шуд' },
  { value: 2, prefix: '#', label: 'ҷой дар озмуни миллии ихтироъ' },
]

const features = [
  { icon: 'feed', title: 'Лентаи шеърҳои нав', text: 'Тозатарин шеърҳо аз шоирони тоҷик дар як лента — бо филтр аз рӯи муаллиф, жанр ва мавзӯъ.' },
  { icon: 'search', title: 'Каталог ва ҷустуҷӯ', text: 'Рӯйхати адибон, мавзӯъҳои маъмул ва ҷустуҷӯи зуд аз рӯи шеър, шоир ё калима.' },
  { icon: 'sparkles', title: 'Шарҳи ҳуши сунъӣ', text: 'Мисраъҳои душворро ворид кунед ва маънои онҳоро ба забони тоҷикии имрӯза гиред.' },
  { icon: 'book', title: 'Луғат дар паҳлуи шеър', text: 'Калимаҳои кӯҳна ва душворфаҳмро бевосита дар саҳифаи худи шеър ҷустуҷӯ кунед.' },
  { icon: 'feather', title: 'Саҳифаи шоирон', text: 'Тарҷумаи ҳол, шеърҳои машҳур ва навтарин; ба шоири дӯстдоштаатон обуна шавед.' },
  { icon: 'heart', title: 'Лайк ва шарҳҳо', text: 'Шеърро писанд кунед, назар нависед ва бо дигар хонандагон андеша мубодила намоед.' },
  { icon: 'pen', title: 'Шеъри худро илова кунед', text: 'Шеър ё байтҳои худро ба сомона илова кунед ва жанр ва тегҳоро нишон диҳед.' },
  { icon: 'user', title: 'Саҳифаи шахсӣ', text: 'Шеърҳои писандида, обунаҳо, шеърҳои иловашуда ва ҷойгоҳи шумо дар рейтинг.' },
  { icon: 'globe', title: 'Тоҷикӣ ва English', text: 'Интерфейси сомона ба забонҳои тоҷикӣ ва англисӣ; худи шеърҳо бетағйир мемонанд.' },
]

const steps = [
  { title: 'Шеърро пайдо кунед', text: 'Дар лента, каталог ё ҷустуҷӯ шеъри дилхоҳро ёбед.' },
  { title: 'Шарҳ гиред', text: 'Ҳуши сунъӣ калимаҳо ва мисраъҳои кӯҳнаро ба тоҷикии равони имрӯза шарҳ медиҳад.' },
  { title: 'Амиқтар бифаҳмед', text: 'Луғатро кушоед, шарҳҳои хонандагонро бихонед ва шеърҳои монандро бубинед.' },
]

const videos = [
  { id: 'v1', title: 'Мусоҳиба дар Sughd TV — 1', src: 'https://www.youtube-nocookie.com/embed/xp-xcWJOdTA' },
  { id: 'v2', title: 'Мусоҳиба дар Sughd TV — 2', src: 'https://www.youtube-nocookie.com/embed/vd0fOLZYWAI?start=138' },
]

// Lucide-style 24x24 icon bodies (stroke icons, no emojis).
const icons = {
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  sparklesBadge: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>',
  tv: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>',
  users: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  award: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/></svg>',
  feed: '<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  feather: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="9" y1="15" y2="15"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2.1C10.5 3.5 9.26 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
}

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

let observer
const animateCount = (el) => {
  const target = parseFloat(el.dataset.value)
  const decimals = parseInt(el.dataset.decimals || '0', 10)
  const prefix = el.dataset.prefix || ''
  const suffix = el.dataset.suffix || ''
  const duration = 1400
  const start = performance.now()
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = prefix + (target * eased).toFixed(decimals) + suffix
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const targets = document.querySelectorAll('.landing .reveal')
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'))
    return
  }
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-in')
      entry.target.querySelectorAll('.stat-value').forEach(animateCount)
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
  targets.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => observer && observer.disconnect())
</script>

<style scoped>
@reference "../assets/main.css";

.landing { min-height: 100vh; }

.nav-link { @apply text-sm font-semibold text-text-muted transition-colors hover:text-indigo; }

/* Hero */
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60rem 28rem at 85% -10%, rgba(238, 242, 255, 0.95), transparent 60%),
    radial-gradient(40rem 22rem at 0% 20%, rgba(249, 244, 232, 0.9), transparent 60%),
    linear-gradient(to bottom, #ffffff, var(--color-bg));
}
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(49, 46, 129, 0.07) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: linear-gradient(to bottom, black, transparent 75%);
}

.mascot {
  position: absolute;
  right: -0.5rem;
  bottom: calc(100% - 3.6rem);
  width: 9.5rem;
  height: 9.5rem;
  object-fit: contain;
  z-index: 2;
  filter: drop-shadow(0 12px 20px rgba(49, 46, 129, 0.18));
}
@media (min-width: 1024px) {
  .mascot { right: -1.2rem; width: 11rem; height: 11rem; bottom: calc(100% - 4.4rem); }
}

.poem-card {
  @apply rounded-[1.75rem] border border-border bg-white p-6 md:p-8;
  box-shadow: 0 30px 60px -20px rgba(49, 46, 129, 0.25), 0 8px 18px -8px rgba(0, 0, 0, 0.08);
}
.mark {
  background: linear-gradient(to top, rgba(197, 160, 89, 0.38) 38%, transparent 38%);
  color: var(--color-indigo);
  font-weight: 600;
  border-radius: 2px;
}
.ai-note {
  @apply mt-6 rounded-2xl border border-indigo/10 bg-indigo-light/70 p-4;
}
.check {
  @apply flex h-5 w-5 items-center justify-center rounded-full bg-indigo text-white;
}

/* Sections */
.eyebrow {
  @apply mb-3 text-center text-[0.7rem] font-black uppercase tracking-[0.22em] text-gold-dark;
}
.section-h2 {
  @apply font-serif text-3xl font-bold leading-tight tracking-tight text-text-main md:text-[2.5rem];
}

.feature-card {
  @apply rounded-3xl border border-border bg-white p-7 transition-all duration-300;
}
.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(197, 160, 89, 0.45);
  box-shadow: 0 24px 40px -18px rgba(49, 46, 129, 0.2);
}
.feature-icon {
  @apply flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-light text-indigo transition-colors duration-300;
}
.feature-card:hover .feature-icon { @apply bg-indigo text-white; }

.step {
  @apply flex gap-5 rounded-3xl border border-border bg-bg p-6;
}
.step-n {
  @apply flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo font-serif text-lg font-bold text-white;
}

.video-card { @apply rounded-3xl border border-border bg-white p-3 shadow-sm; }

.badge {
  @apply inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[0.8rem] font-semibold text-text-muted;
}
.badge :deep(svg) { @apply text-gold-dark; }

.edition {
  @apply relative rounded-[2rem] border border-border bg-bg p-8 md:p-10;
}
.edition-current {
  @apply border-transparent bg-indigo text-white;
  background-image: radial-gradient(28rem 14rem at 100% 0%, rgba(197, 160, 89, 0.22), transparent 60%);
}
.edition-tag {
  @apply mb-5 inline-block rounded-full bg-white/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-gold;
}
.edition-tag-muted { @apply bg-surface-2 text-text-muted; }

.founder {
  @apply grid gap-10 rounded-[2rem] border border-border bg-white p-8 md:grid-cols-[18rem_1fr] md:p-12;
}
.chip {
  @apply rounded-full border border-border bg-bg px-3 py-1 text-[0.7rem] font-bold text-text-muted;
}

.cta {
  @apply rounded-[2rem] px-6 py-14 text-center md:px-12 md:py-20;
  background:
    radial-gradient(30rem 16rem at 90% 0%, rgba(197, 160, 89, 0.28), transparent 60%),
    linear-gradient(135deg, var(--color-indigo), var(--color-indigo-mid));
  box-shadow: 0 30px 60px -24px rgba(49, 46, 129, 0.55);
}

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s, box-shadow 0.3s;
}
.reveal.is-in { opacity: 1; transform: none; }
.reveal.delay-1 { transition-delay: 120ms; }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  .feature-card:hover { transform: none; }
}
</style>
