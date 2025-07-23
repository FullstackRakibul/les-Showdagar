<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <!-- Left Sidebar Overlay (Mobile) -->
    <div v-if="isMobile && leftSidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="toggleLeftSidebar"></div>

    <!-- Left Sidebar -->
    <transition name="slide-left">
      <div v-if="leftSidebarOpen" class="fixed lg:relative top-0 left-0 h-full z-50 lg:z-10"
        :class="isMobile ? 'w-80' : 'w-64'">
        <LeftSidebar />
      </div>
    </transition>

    <!-- Right Sidebar Overlay (Mobile) -->
    <div v-if="isMobile && rightSidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden"
      @click="toggleRightSidebar"></div>

    <!-- Right Sidebar -->
    <transition name="slide-right">
      <div v-if="rightSidebarOpen" class="fixed xl:relative top-0 right-0 h-full z-50 xl:z-10 order-3"
        :class="isMobile ? 'w-80' : 'w-72'">
        <RightSidebar />
      </div>
    </transition>

    <!-- Main Content -->
    <div class="flex flex-col flex-1 h-full overflow-hidden order-2">
      <!-- Header -->
      <AppHeader />

      <!-- Page Content -->
      <main
        class="flex-1 overflow-y-auto bg-gray-50 p-4 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-pink-100">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useLayout } from '@/composables/useLayout'
import AppHeader from '@/components/AppHeader.vue'
import LeftSidebar from '@/components/LeftSidebar.vue'
import RightSidebar from '@/components/RightSidebar.vue'

const { leftSidebarOpen, rightSidebarOpen, isMobile, toggleLeftSidebar, toggleRightSidebar, checkMobile } = useLayout()

onMounted(() => {
  window.addEventListener('resize', checkMobile)
  checkMobile()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
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