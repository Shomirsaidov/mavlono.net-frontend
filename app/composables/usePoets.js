import { API_URL } from '~/config'

/**
 * All poets (id, name, avatar, category). One shared, server-rendered request, so the
 * sidebar, catalog and bio pages all show crawlable poet links without refetching.
 */
export async function usePoets() {
  const { data } = await useAsyncData(
    'poets',
    () => $fetch(`${API_URL}/api/poets`),
    {
      // the API returns every poet's full biography; the lists don't need it
      transform: (list) =>
        (Array.isArray(list) ? list : []).map(({ id, name, avatar, category, lifetime }) => ({ id, name, avatar, category, lifetime })),
      default: () => [],
    },
  )
  return data
}
