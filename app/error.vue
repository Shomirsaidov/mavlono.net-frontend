<template>
  <NuxtLayout name="default">
    <div class="empty-state py-24 text-center">
      <p class="text-6xl font-serif font-bold text-indigo mb-4">{{ is404 ? '404' : error.statusCode }}</p>
      <p class="text-lg text-text-muted mb-8">
        {{ is404 ? $t('Саҳифа ёфт нашуд.') : $t('Хатогӣ рух дод. Дубора кӯшиш кунед.') }}
      </p>
      <NuxtLink to="/" class="btn btn-indigo px-8 py-3" @click.prevent="handleError">{{ $t('Асосӣ') }}</NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps({ error: Object })
const is404 = computed(() => props.error?.statusCode === 404)
useSeo(() => ({ title: is404.value ? 'Саҳифа ёфт нашуд' : 'Хатогӣ', description: 'mavlono.net', noindex: true }))
const handleError = () => clearError({ redirect: '/' })
</script>
