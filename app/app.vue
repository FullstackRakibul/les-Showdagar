<template>
  <div class="min-h-screen bg-background text-foreground">

    <!-- Floating header sits outside scroll flow -->
    <AppHeader />

    <!-- The header is fixed, so `main` pads to clear it by default. Pages that
         open with a full-bleed hero put `full-bleed` on their root element to
         cancel that padding and let the hero reach the top of the viewport;
         those heroes pad from within instead. -->
    <main class="main-offset">
      <NuxtPage />
      <AppFooter />
    </main>

    <!-- Compact floating theme toggle -->
    <ThemeToggleButton />

    <!-- Global product modal -->
    <ProductModal />

    <!-- RabbITic AI assistant (Ctrl/Cmd+K) -->
    <RabbITicFloatingButton />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useNuxtApp } from '#app'

const { $lenis, $Lenis } = useNuxtApp()

let rafId = 0

onMounted(() => {
  if (!import.meta.client || !$Lenis) return

  // Scrolls the window, not a wrapper element. Passing a `wrapper` that is not
  // itself scrollable makes Lenis capture wheel events and drop them.
  $lenis.value = new $Lenis({
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
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  $lenis.value?.destroy()
  $lenis.value = null
})
</script>

<style>
/*
 * The fixed header sits outside document flow, so `main` pads to clear it.
 * A page whose first section is a full-bleed hero adds `full-bleed` to its
 * root, cancelling the padding so the hero background reaches the very top —
 * that hero is then responsible for its own internal top padding.
 */
.main-offset {
  padding-top: 5rem;
}

.main-offset > .full-bleed {
  margin-top: -5rem;
}

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
