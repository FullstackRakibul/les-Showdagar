<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Mobile Overlay -->
    <div v-if="isMobile && (leftSidebarOpen || rightSidebarOpen)"
      class="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm" @click="closeMobileSidebars" />

    <div class="flex h-screen overflow-hidden">
      <!-- Left Sidebar -->
      <Transition name="slide-left">
        <aside v-if="leftSidebarOpen" class="z-40 flex-shrink-0"
          :class="[isMobile ? 'fixed top-0 left-0 h-full w-72' : 'relative w-64']">
          <LeftSidebar />
        </aside>
      </Transition>

      <!-- Main Content Area -->
      <div class="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <!-- Header -->
        <header class="relative z-20 flex-shrink-0">
          <AppHeader />
        </header>

        <!-- Main Content -->
        <main class="flex-1 overflow-hidden">
          <div class="h-full overflow-y-auto" ref="scrollContainer">
            <NuxtPage />
            <AppFooter />
          </div>
        </main>
      </div>

      <!-- Right Sidebar -->
      <Transition name="slide-right">
        <aside v-if="rightSidebarOpen" class="z-40 flex-shrink-0"
          :class="[isMobile ? 'fixed top-0 right-0 h-full w-72' : 'relative w-80']">
          <RightSidebar />
        </aside>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"
import { useLayoutStore } from "@/stores/layout"
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import LeftSidebar from "@/components/LeftSidebar.vue"
import RightSidebar from "@/components/RightSidebar.vue"
import { useNuxtApp } from '#app'

const { $lenis, $Lenis } = useNuxtApp()
const scrollContainer = ref<HTMLElement | null>(null)
const layoutStore = useLayoutStore()

const leftSidebarOpen = computed(() => layoutStore.leftSidebarOpen)
const rightSidebarOpen = computed(() => layoutStore.rightSidebarOpen)
const isMobile = computed(() => layoutStore.isMobile)

const closeMobileSidebars = () => {
  if (isMobile.value) layoutStore.closeBothSidebars()
}

onMounted(() => {
  layoutStore.init()

  // Initialize Lenis smooth scroll
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
  layoutStore.destroy()
  $lenis.value?.destroy()
})
</script>

<style>
/* Sidebar Transitions */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.2s ease-out;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.2s ease-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
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