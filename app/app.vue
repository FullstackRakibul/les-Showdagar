<template>
  <div class="min-h-screen bg-background text-foreground">

    <!-- Floating header sits outside scroll flow -->
    <AppHeader />

    <!-- Page content -->
    <main ref="scrollContainer">
      <NuxtPage />
      <AppFooter />
    </main>

    <!-- Compact floating theme toggle -->
    <ThemeToggleButton />

    <!-- Global product modal -->
    <ProductModal />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useNuxtApp } from '#app'

const { $lenis, $Lenis } = useNuxtApp()
const scrollContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (import.meta.client && $Lenis && scrollContainer.value) {
    $lenis.value = new $Lenis({
      wrapper: scrollContainer.value,
      content: scrollContainer.value.firstElementChild ?? undefined,
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      $lenis.value?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }
})

onUnmounted(() => {
  $lenis.value?.destroy()
})
</script>

<style>
/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Lenis smooth scroll */
html.lenis,
html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
</style>
