<template>
  <div class="relative" ref="dropdownRef">
    <Button variant="ghost" size="icon" class="relative" @click="toggleDropdown">
      <HugeiconsIcon :icon="Notification03Icon" :size="20" />
      <span v-if="unreadCount > 0"
        class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] font-medium text-white flex items-center justify-center">
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </Button>

    <!-- Dropdown -->
    <Transition name="dropdown">
      <div v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
        <!-- Header -->
        <div class="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 class="font-medium text-foreground">Notifications</h3>
          <button v-if="unreadCount > 0" class="text-xs text-muted-foreground hover:text-foreground transition-colors"
            @click="markAllRead">
            Mark all read
          </button>
        </div>

        <!-- List -->
        <div class="max-h-80 overflow-y-auto">
          <div v-if="notifications.length === 0" class="py-8 text-center">
            <HugeiconsIcon :icon="Notification03Icon" :size="40" class="text-muted-foreground/50 mx-auto mb-2" />
            <p class="text-sm text-muted-foreground">No notifications</p>
          </div>
          <div v-else>
            <button v-for="notification in notifications" :key="notification.id"
              class="w-full px-4 py-3 flex items-start gap-3 hover:bg-muted transition-colors text-left"
              :class="{ 'bg-muted/50': !notification.read }" @click="handleNotificationClick(notification)">
              <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                :class="notificationIconClass(notification.type)">
                <HugeiconsIcon :icon="notificationIcon(notification.type)" :size="16" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm text-foreground">{{ notification.title }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">{{ notification.time }}</p>
              </div>
              <div v-if="!notification.read" class="w-2 h-2 bg-quantum-500 rounded-full mt-1.5" />
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-4 py-2 border-t border-border">
          <NuxtLink to="/notifications" class="text-xs text-muted-foreground hover:text-foreground transition-colors"
            @click="isOpen = false">
            View all notifications
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Notification03Icon,
  Package01Icon,
  PercentIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons'

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const notifications = ref([
  { id: 1, title: 'Your order has been shipped', type: 'order', time: '2 hours ago', read: false },
  { id: 2, title: 'New sale: 20% off electronics', type: 'promo', time: '5 hours ago', read: false },
  { id: 3, title: 'Order delivered successfully', type: 'success', time: '1 day ago', read: true },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const markAllRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const handleNotificationClick = (notification: any) => {
  notification.read = true
  isOpen.value = false
}

const notificationIcon = (type: string) => {
  const icons: Record<string, any> = {
    order: Package01Icon,
    promo: PercentIcon,
    success: CheckmarkCircle01Icon,
  }
  return icons[type] || Notification03Icon
}

const notificationIconClass = (type: string): string => {
  const classes: Record<string, string> = {
    order: 'bg-quantum-500/20 text-quantum-500',
    promo: 'bg-elegance-500/20 text-elegance-500',
    success: 'bg-nextstop-500/20 text-nextstop-500',
  }
  return classes[type] || 'bg-muted text-muted-foreground'
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>