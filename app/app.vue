<template>
  <div class="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- Left Sidebar Overlay (Mobile) -->
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" @click="layoutStore.closeLeftSidebar"
      v-if="layoutStore.isMobile && layoutStore.leftSidebarOpen"></div>

    <!-- Left Sidebar -->
    <transition name="slide-left">
      <div class="fixed lg:relative top-0 left-0 h-full z-50 lg:z-10 flex-shrink-0"
        :class="layoutStore.isMobile ? 'w-80' : 'w-64'" v-if="layoutStore.leftSidebarOpen">
        <LeftSidebar />
      </div>
    </transition>

    <!-- Main Content -->
    <div class="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
      <!-- Header -->
      <AppHeader />

      <!-- Page Content - Fixed height with internal scrolling -->
      <main class="flex-1 overflow-hidden">
        <div class="h-full overflow-y-auto p-4">
          <NuxtPage />
        </div>
      </main>
    </div>

    <!-- Right Sidebar Overlay (Mobile) -->
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden" @click="layoutStore.closeRightSidebar"
      v-if="layoutStore.isMobile && layoutStore.rightSidebarOpen"></div>

    <!-- Right Sidebar -->
    <transition name="slide-right">
      <div class="fixed xl:relative top-0 right-0 h-full z-50 xl:z-10 flex-shrink-0"
        :class="layoutStore.isMobile ? 'w-80' : 'w-72'" v-if="layoutStore.rightSidebarOpen">
        <RightSidebar />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useLayout } from '@/composables/useLayout'
import AppHeader from '@/components/AppHeader.vue'
import LeftSidebar from '@/components/LeftSidebar.vue'
import RightSidebar from '@/components/RightSidebar.vue'

const layoutStore = useLayout()
</script>

<style>
body {
  margin: 0;
  height: 100vh;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

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
</style>