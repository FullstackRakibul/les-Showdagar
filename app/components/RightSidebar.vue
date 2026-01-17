<template>
  <aside class="h-full bg-card border-l border-border flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-border">
      <div class="flex items-center justify-between">
        <h2 class="font-medium text-foreground">Offers & Updates</h2>
        <Button v-if="isMobile" variant="ghost" size="icon" @click="layoutStore.closeRightSidebar">
          <HugeiconsIcon :icon="Cancel01Icon" :size="20" />
        </Button>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-4 space-y-6">
      <!-- Featured Offer -->
      <Card class="overflow-hidden">
        <div class="h-32 bg-gradient-to-br from-quantum-500 to-quantum-600 flex items-center justify-center">
          <HugeiconsIcon :icon="PercentIcon" :size="48" color="rgba(255,255,255,0.8)" />
        </div>
        <CardContent class="p-4">
          <Badge variant="secondary" class="mb-2">Limited Time</Badge>
          <h3 class="font-medium text-foreground mb-1">New Year Sale</h3>
          <p class="text-sm text-muted-foreground mb-3">
            Up to 40% off on electronics
          </p>
          <Button variant="outline" size="sm" class="w-full">
            Shop Now
          </Button>
        </CardContent>
      </Card>

      <!-- Quick Stats -->
      <div class="space-y-3">
        <h3 class="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Your Activity
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-muted rounded-lg p-3 text-center">
            <p class="text-xl font-semibold text-foreground">{{ cartCount }}</p>
            <p class="text-xs text-muted-foreground">In Cart</p>
          </div>
          <div class="bg-muted rounded-lg p-3 text-center">
            <p class="text-xl font-semibold text-foreground">{{ wishlistCount }}</p>
            <p class="text-xs text-muted-foreground">Wishlist</p>
          </div>
        </div>
      </div>

      <!-- Trending -->
      <div class="space-y-3">
        <h3 class="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Trending Now
        </h3>
        <ul class="space-y-2">
          <li v-for="item in trendingItems" :key="item.id">
            <NuxtLink :to="`/products?search=${item.query}`"
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
              <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <HugeiconsIcon :icon="item.icon" :size="20" class="text-muted-foreground" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-foreground truncate">{{ item.name }}</p>
                <p class="text-xs text-muted-foreground">{{ item.searches }} searches</p>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { useProductStore } from '@/stores/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Cancel01Icon,
  PercentIcon,
  HeadphonesIcon,
  SmartPhoneIcon,
  WatchIcon,
} from '@hugeicons/core-free-icons'

const layoutStore = useLayoutStore()
const productStore = useProductStore()

const isMobile = computed(() => layoutStore.isMobile)
const cartCount = computed(() => productStore.cartItemsCount)
const wishlistCount = computed(() => 0)

const trendingItems = [
  { id: 1, name: 'Wireless Earbuds', query: 'earbuds', searches: '2.4k', icon: HeadphonesIcon },
  { id: 2, name: 'Smart Phones', query: 'phone', searches: '1.8k', icon: SmartPhoneIcon },
  { id: 3, name: 'Luxury Watches', query: 'watch', searches: '1.2k', icon: WatchIcon },
]
</script>