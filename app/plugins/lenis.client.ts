import Lenis from 'lenis'
import { defineNuxtPlugin } from 'nuxt/app'
import { ref } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  const lenis = ref<Lenis | null>(null)

  return {
    provide: {
      lenis,
      Lenis
    }
  }
})
