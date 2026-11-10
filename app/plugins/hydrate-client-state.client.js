import { initLang } from '~/i18n'
import { useAuthStore } from '~/stores/auth'
import { useAdminStore } from '~/stores/admin'

// Browser-only state (saved language, signed-in user) must be applied only AFTER the
// whole app has hydrated. The layout is an async component and hydrates later than
// `app:mounted`, so using that hook made the layout hydrate against already-signed-in
// state (class/node mismatches that Vue does not repair in production).
// `app:suspense:resolve` fires once initial hydration, including async layouts, is done.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:suspense:resolve', async () => {
    await nextTick()
    initLang()
    useAuthStore(nuxtApp.$pinia).hydrate()
    useAdminStore(nuxtApp.$pinia).hydrate()
  })
})
