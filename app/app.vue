<template>
  <div
    class="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
  >
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-30"
      @click="closeMobileSidebars"
      v-if="isMobile && (leftSidebarOpen || rightSidebarOpen)"
    ></div>

    <transition name="slide-left">
      <div
        v-if="leftSidebarOpen"
        class="z-40 flex-shrink-0"
        :class="[isMobile ? 'fixed top-0 left-0 h-full w-80' : 'relative w-64']"
      >
        <LeftSidebar />
      </div>
    </transition>

    <div class="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
      <div class="relative z-20 flex-shrink-0">
        <AppHeader />
      </div>
      <main class="flex-1 overflow-hidden">
        <div class="h-full overflow-y-auto">
          <div class="p-4 sm:p-6">
            <NuxtPage />
          </div>
        </div>
      </main>
    </div>

    <transition name="slide-right">
      <div
        v-if="rightSidebarOpen"
        class="z-40 flex-shrink-0"
        :class="[isMobile ? 'fixed top-0 right-0 h-full w-80' : 'relative w-80']"
      >
        <RightSidebar />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useLayoutStore } from "@/stores/layout";
import AppHeader from "@/components/AppHeader.vue";
import LeftSidebar from "@/components/LeftSidebar.vue";
import RightSidebar from "@/components/RightSidebar.vue";

const layoutStore = useLayoutStore();

const leftSidebarOpen = computed(() => layoutStore.leftSidebarOpen);
const rightSidebarOpen = computed(() => layoutStore.rightSidebarOpen);
const isMobile = computed(() => layoutStore.isMobile);

const closeMobileSidebars = () => {
  if (isMobile.value) layoutStore.closeBothSidebars();
};

onMounted(() => {
  layoutStore.init();
});
onUnmounted(() => {
  layoutStore.destroy();
});
</script>

<style>
body {
  margin: 0;
  height: 100vh;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Sidebar transitions */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(-100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

/* CSS Variables for theme colors */
:root {
  --color-primary: #3b82f6;
  --color-primary-rgb: 59, 130, 246;
  --color-primary-dark: #2563eb;
  --font-size-base: 16px;
  --layout-density: 1;
}

/* Tailwind CSS custom utilities */
.bg-primary {
  background-color: var(--color-primary);
}

.bg-primary-dark {
  background-color: var(--color-primary-dark);
}

.text-primary {
  color: var(--color-primary);
}

.border-primary {
  border-color: var(--color-primary);
}

.ring-primary {
  --tw-ring-color: var(--color-primary);
}

.focus\:ring-primary:focus {
  --tw-ring-color: var(--color-primary);
}

/* Hover states */
.hover\:bg-primary:hover {
  background-color: var(--color-primary);
}

.hover\:bg-primary-dark:hover {
  background-color: var(--color-primary-dark);
}

/* Smooth transitions for theme changes */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* IMPORTANT: do not override .fixed on desktop (this broke modals/sidebars) */
main {
  pointer-events: auto;
}

main * {
  pointer-events: auto;
}
</style>
