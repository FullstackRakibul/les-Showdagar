<template>
  <aside class="h-full bg-card border-r border-border flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-border">
      <div class="flex items-center justify-between">
        <h2 class="font-medium text-foreground">Navigation</h2>
        <Button v-if="isMobile" variant="ghost" size="icon" @click="layoutStore.closeLeftSidebar">
          <HugeiconsIcon :icon="Cancel01Icon" :size="20" />
        </Button>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-4">
      <ul class="space-y-1">
        <li v-for="item in navItems" :key="item.path">
          <NuxtLink :to="item.path" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" :class="[
            isActive(item.path)
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          ]" @click="handleNavClick">
            <HugeiconsIcon :icon="item.icon" :size="20" />
            <span class="text-sm">{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Clubs Section -->
      <div class="mt-8">
        <h3 class="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Business Clubs
        </h3>
        <ul class="space-y-1">
          <li v-for="club in clubs" :key="club.id">
            <NuxtLink :to="`/products?club=${club.id}`"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              @click="handleNavClick">
              <div class="w-2 h-2 rounded-full" :class="club.colorClass" />
              <span class="text-sm">{{ club.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-border">
      <Button variant="outline" size="sm" class="w-full" @click="navigateTo('/settings')">
        <HugeiconsIcon :icon="Settings01Icon" :size="16" class="mr-2" />
        Settings
      </Button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home01Icon,
  Store01Icon,
  ShoppingCart01Icon,
  FavouriteIcon,
  Package01Icon,
  Settings01Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons'

const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()

const isMobile = computed(() => layoutStore.isMobile)

const navItems = [
  { path: '/', icon: Home01Icon, label: 'Home' },
  { path: '/products', icon: Store01Icon, label: 'Products' },
  { path: '/cart', icon: ShoppingCart01Icon, label: 'Cart' },
  { path: '/wishlist', icon: FavouriteIcon, label: 'Wishlist' },
  { path: '/orders', icon: Package01Icon, label: 'Orders' },
]

const clubs = [
  { id: 'quantum', name: 'Quantum Club', colorClass: 'bg-quantum-500' },
  { id: 'elegance', name: 'Elegance Club', colorClass: 'bg-elegance-500' },
  { id: 'nextstop', name: 'NextStop Club', colorClass: 'bg-nextstop-500' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const handleNavClick = () => {
  if (isMobile.value) {
    layoutStore.closeLeftSidebar()
  }
}

const navigateTo = (path: string) => {
  router.push(path)
  if (isMobile.value) {
    layoutStore.closeLeftSidebar()
  }
}
</script>