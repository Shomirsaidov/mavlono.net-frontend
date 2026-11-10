import { API_URL } from '~/config'

/**
 * Fetches one record from the API during SSR (and reuses the server result in the
 * browser instead of fetching again). A 404 from the API becomes a real 404 page; any
 * other failure becomes a 503 so crawlers retry later instead of dropping the URL.
 */
export async function useApiRecord(key, path, { transform, notFoundMessage = 'Not found' } = {}) {
  const { data, error } = await useAsyncData(key, () => $fetch(`${API_URL}${path}`), { transform })

  if (error.value) {
    const status = error.value.statusCode || error.value.status
    throw createError({
      statusCode: status === 404 ? 404 : 503,
      statusMessage: status === 404 ? notFoundMessage : 'Service temporarily unavailable',
      fatal: true,
    })
  }
  return data
}
