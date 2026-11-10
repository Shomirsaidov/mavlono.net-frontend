import { useAdminStore } from '~/stores/admin'

// Replaces the old router.beforeEach(requiresAuth) guard for /admin pages.
export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return
  const admin = useAdminStore()
  admin.hydrate()
  if (!admin.isAuthenticated) return navigateTo('/admin/login')
})
