import { type Ref, onMounted, onUnmounted } from 'vue'

export function useCardTilt(el: Ref<HTMLElement | null>, intensity = 5) {
  let rafId = 0
  let enabled = false

  onMounted(() => {
    enabled =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  const onMouseMove = (e: MouseEvent) => {
    if (!enabled || !el.value) return
    const rect = el.value.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      if (el.value)
        el.value.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(6px)`
    })
  }

  const onMouseLeave = () => {
    if (!enabled || !el.value) return
    cancelAnimationFrame(rafId)
    el.value.style.transform = ''
  }

  onUnmounted(() => cancelAnimationFrame(rafId))

  return { onMouseMove, onMouseLeave }
}
