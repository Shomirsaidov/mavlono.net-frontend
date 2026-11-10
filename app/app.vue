<template>
  <NuxtLayout>
    <NuxtPage :page-key="(route) => route.fullPath" />
  </NuxtLayout>
</template>

<script setup>
import { lang } from './i18n'

// Keep <html lang> in sync with the interface language (server renders "tg").
useHead({ htmlAttrs: { lang: computed(() => lang.value) } })
</script>

<style>
.hidden-mobile { display: block; }
@media (max-width: 768px) { .hidden-mobile { display: none !important; } }
</style>
