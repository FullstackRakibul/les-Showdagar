import { useNuxtApp } from '#app'

export const useSmoothScroll = () => {
  const { $lenis } = useNuxtApp()

  const start = () => {
    $lenis.value?.start()
  }

  const stop = () => {
    $lenis.value?.stop()
  }

  const scrollTo = (target: string | HTMLElement | number, options = {}) => {
    $lenis.value?.scrollTo(target, options)
  }

  return {
    lenis: $lenis,
    start,
    stop,
    scrollTo
  }
}
