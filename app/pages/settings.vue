<template>
  <div class="max-w-3xl mx-auto pb-20">
    <div class="mb-10 pb-6 border-b border-border">
      <h1 class="text-3xl font-serif font-bold text-text-main">{{ $t('Танзимот') }}</h1>
      <p class="text-sm text-text-muted mt-2">{{ $t('Дар бораи лоиҳа ва ҷамоаи мо') }}</p>
    </div>

    <!-- Language -->
    <section class="mb-12">
      <div class="text-[0.7rem] font-bold text-text-faint uppercase tracking-wider mb-4">{{ $t('Забон') }}</div>
      <div class="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm">
        <h2 class="text-lg font-serif font-bold text-text-main">{{ $t('Забони интерфейс') }}</h2>
        <p class="text-sm text-text-muted mt-1 mb-5">{{ $t('Забони интерфейсро интихоб кунед. Шеърҳо ва маълумоти дигар бетағйир мемонанд.') }}</p>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="option in languages"
            :key="option.code"
            type="button"
            class="px-6 py-2.5 rounded-xl border text-sm font-semibold transition-colors"
            :class="lang === option.code ? 'bg-indigo text-white border-indigo shadow-lg shadow-indigo/20' : 'border-border text-text-muted hover:bg-surface-2'"
            :aria-pressed="lang === option.code"
            @click="setLang(option.code)"
          >{{ option.label }}</button>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="mb-12">
      <div class="text-[0.7rem] font-bold text-text-faint uppercase tracking-wider mb-4">{{ $t('Ҷамоаи мо') }}</div>
      <div class="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm">
        <div class="flex items-center gap-4 mb-5">
          <div class="w-16 h-16 rounded-full bg-indigo text-white flex items-center justify-center font-serif text-2xl font-bold shrink-0">{{ $t('А') }}</div>
          <div>
            <h2 class="text-xl font-serif font-bold text-text-main">{{ $t('Абубакр Шомирсаидов') }}</h2>
            <p class="text-sm text-indigo font-semibold">{{ $t('Асосгузор') }}</p>
          </div>
        </div>
        <div class="space-y-3 text-[0.95rem] leading-relaxed text-gray-800">
          <p>
            {{ $t('Абубакр Шомирсаидов — барномасоз ва тадқиқотчии соҳаи ҳуши сунъӣ аз Хуҷанд, ки зиёда аз се сол маҳсулоти барномавӣ месозад. Корашро дар чорроҳаи ҳуши сунъӣ, муҳандисии нармафзор ва тадқиқоти амалӣ пеш мебарад.') }}
          </p>
          <p>
            {{ $t('Ӯ асосгузори Shoiron.tj (пештар mavlono.tj) аст — бузургтарин маркази кушод барои хондан, мубодила ва шарҳи шеъри форсӣ-тоҷикӣ, ки зиёда аз 8 800 шеър ва беш аз 2 000 хонандаи фаъоли моҳона дорад.') }}
          </p>
          <p>
            {{ $t('Дар соҳаи технология ӯ ҳамчун ходими таҷрибаомӯзи омӯзиши мошинӣ дар Zypl.ai дар сохтани моделҳои скоринг барои чор бонки Осиёи Марказӣ ва АМА иштирок кардааст. Ӯ ҳамчунин CTO-и Moní AI (tajiklaw.ai) — мушовири ҳуқуқии ҳуши сунъӣ оид ба қонунгузории Тоҷикистон ва CTO-и Poputki.online — аввалин платформаи ҳамсафарӣ ва фурӯши чиптаи автобус дар кишвар мебошад.') }}
          </p>
          <p>
            {{ $t('Ғайр аз ин, Абубакр дар ҷомеа фаъол аст: сафири минтақавии Common Voice Tajik, ташкилкунандаи се ҳакатон дар вилояти Суғд, мураббии ихтиёрӣ дар лоиҳаи UNICEF Тоҷикистон ва ҳаммуассиси Aurora Rising Sun, ки ба духтарони афғон дарсҳои ройгон медиҳад. Ӯ иштирокчии барномаи Yale Young Global Scholars (тобистони 2026) ва дугона қаҳрамони Лигаи миллии мунозира мебошад.') }}
          </p>
        </div>
        <div class="flex flex-wrap gap-3 mt-6">
          <a href="https://mechtatnevredno.com" target="_blank" rel="noopener" class="btn btn-gold px-5 py-2 text-sm">{{ $t('Сайти шахсӣ') }}</a>
          <a href="mailto:shomirsaidov.abubakr@mail.ru" class="px-5 py-2 text-sm rounded-xl border border-border text-text-muted hover:bg-surface-2 transition-colors font-semibold">shomirsaidov.abubakr@mail.ru</a>
        </div>
      </div>
    </section>

    <!-- Media -->
    <section>
      <div class="text-[0.7rem] font-bold text-text-faint uppercase tracking-wider mb-4">{{ $t('Мо дар расонаҳо') }}</div>
      <p class="text-[0.95rem] text-gray-800 leading-relaxed mb-4">
        {{ $t('Лоиҳаи мо дар шабакаҳои телевизионӣ нишон дода шудааст:') }}
      </p>
      <div class="grid sm:grid-cols-2 gap-4">
        <div v-for="m in media" :key="m" class="bg-white rounded-2xl border border-border p-5 flex items-center gap-4">
          <div class="w-11 h-11 rounded-xl bg-surface-2 text-indigo flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
          </div>
          <div>
            <div class="font-serif font-bold text-text-main">{{ m }}</div>
            <div class="text-xs text-text-muted">{{ $t('Телевизион') }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { lang, setLang } from '../i18n'

useSeo({ title: 'Танзимот', description: 'Танзимоти mavlono.net.', noindex: true })

const languages = [
  { code: 'tg', label: 'Тоҷикӣ' },
  { code: 'en', label: 'English' },
]
const media = ['Sughd TV', 'SM-1 TV']
</script>
