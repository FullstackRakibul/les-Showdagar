import { type Ref, ref, onMounted, onUnmounted } from 'vue'

export function useScrollReveal(el: Ref<HTMLElement | null>, threshold = 0.12) {
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!el.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
          observer = null
        }
      },
      { threshold }
    )
    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { isVisible }
}
