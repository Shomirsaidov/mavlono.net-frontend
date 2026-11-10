import { initLang } from '~/i18n'
import { useAuthStore } from '~/stores/auth'
import { useAdminStore } from '~/stores/admin'

// Browser-only state (saved language, signed-in user) is applied after the app has
// hydrated, so the first client render exactly matches the server-rendered HTML.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    initLang()
    useAuthStore(nuxtApp.$pinia).hydrate()
    useAdminStore(nuxtApp.$pinia).hydrate()
  })
})
