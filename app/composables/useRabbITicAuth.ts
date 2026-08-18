import { computed, ref } from 'vue'
import { useCookie, useRuntimeConfig } from '#app'

export interface RabbITicCredentials {
  username: string
  password: string
}

export interface RabbITicAuthResult {
  success: boolean
  error?: string
}

const WEEK = 60 * 60 * 24 * 7

/**
 * Session for the RabbitIC (.NET) backend.
 *
 * The token lives in a cookie rather than localStorage so SSR can read it too —
 * `isAuthenticated` is then correct on the very first render and the chat button
 * does not flash in and out on hydration.
 *
 * When `rabbiticApiUrl` is unset the backend is considered absent: callers get a
 * clear error instead of a request to a relative URL that would 404.
 */
export function useRabbITicAuth() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.rabbiticApiUrl as string

  const token = useCookie<string | null>('rabbitic_token', { maxAge: WEEK, path: '/', sameSite: 'lax' })
  const username = useCookie<string | null>('rabbitic_user', { maxAge: WEEK, path: '/', sameSite: 'lax' })

  const isAuthenticated = computed(() => !!token.value)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  function messageFor(status: number | undefined, fallback: string): string {
    if (status === 401) return 'Invalid username or password.'
    if (status === 400) return 'Please check the details you entered.'
    if (status === 409) return 'That username is already taken.'
    if (status === 429) return 'Too many attempts. Please wait a moment.'
    if (status && status >= 500) return 'The server is unavailable. Please try again later.'
    return fallback
  }

  async function post(path: string, body: RabbITicCredentials): Promise<RabbITicAuthResult> {
    if (!baseUrl) {
      error.value = 'RabbITic backend is not configured.'
      return { success: false, error: error.value }
    }

    isLoading.value = true
    error.value = null

    try {
      const res = await $fetch<{ token: string; username?: string }>(`${baseUrl}${path}`, {
        method: 'POST',
        body,
      })

      if (!res?.token) throw new Error('No token returned')

      token.value = res.token
      username.value = res.username ?? body.username
      return { success: true }
    } catch (e: any) {
      token.value = null
      username.value = null
      error.value = messageFor(e?.status ?? e?.statusCode, 'Could not reach the server. Check your connection.')
      return { success: false, error: error.value! }
    } finally {
      isLoading.value = false
    }
  }

  const login = (credentials: RabbITicCredentials) => post('/auth/login', credentials)
  const register = (credentials: RabbITicCredentials) => post('/auth/register', credentials)

  function logout() {
    token.value = null
    username.value = null
    error.value = null
  }

  return { token, username, isAuthenticated, isLoading, error, login, register, logout }
}
