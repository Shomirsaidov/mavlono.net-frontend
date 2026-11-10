import { useAuthStore } from '~/stores/auth'

// Replaces the old router.beforeEach(requiresUserAuth) guard. These routes are
// client-rendered only (see routeRules), so localStorage is available here.
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return
  if (to.path !== '/profile') return
  const auth = useAuthStore()
  auth.hydrate()
  if (!auth.isAuthenticated) return navigateTo('/auth')
})
