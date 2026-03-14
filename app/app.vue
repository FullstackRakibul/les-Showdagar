<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-1" ref="mainContent">
      <NuxtPage />
      <AppFooter />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import { useLayoutStore } from "@/stores/layout"
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import { useNuxtApp } from '#app'

const { $lenis, $Lenis } = useNuxtApp()
const mainContent = ref<HTMLElement | null>(null)
const layoutStore = useLayoutStore()

onMounted(() => {
  layoutStore.init()

  // Initialize Lenis smooth scroll on the main element
  if (import.meta.client && $Lenis && mainContent.value) {
    $lenis.value = new $Lenis({
      wrapper: document.documentElement,
      content: document.documentElement,
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
  layoutStore.destroy()
  $lenis.value?.destroy()
})
</script>

<style>
/* Mobile Menu Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Lenis Smooth Scroll */
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
