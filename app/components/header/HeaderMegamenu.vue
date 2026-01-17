<template>
  <div class="relative">
    <Button variant="ghost" size="sm" class="flex items-center gap-2" @click="toggleMenu" ref="triggerRef">
      <HugeiconsIcon :icon="Menu09Icon" :size="20" />
      <span class="hidden sm:inline text-sm">Browse</span>
      <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" class="transition-transform"
        :class="{ 'rotate-180': isOpen }" />
    </Button>

    <!-- Megamenu Dropdown -->
    <Transition name="menu">
      <div v-if="isOpen"
        class="absolute left-0 top-full mt-2 w-[600px] bg-card border border-border rounded-xl shadow-lg z-50"
        ref="menuRef">
        <div class="p-6">
          <div class="grid grid-cols-3 gap-6">
            <!-- Quantum Club -->
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div class="w-8 h-8 bg-quantum-500/20 rounded-lg flex items-center justify-center">
                  <HugeiconsIcon :icon="CpuIcon" :size="16" class="text-quantum-500" />
                </div>
                <h3 class="font-medium text-foreground">Quantum</h3>
              </div>
              <ul class="space-y-2">
                <li v-for="cat in quantumCategories" :key="cat.slug">
                  <NuxtLink :to="`/products?category=${cat.slug}`"
                    class="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                    @click="closeMenu">
                    {{ cat.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Elegance Club -->
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div class="w-8 h-8 bg-elegance-500/20 rounded-lg flex items-center justify-center">
                  <HugeiconsIcon :icon="DiamondIcon" :size="16" class="text-elegance-500" />
                </div>
                <h3 class="font-medium text-foreground">Elegance</h3>
              </div>
              <ul class="space-y-2">
                <li v-for="cat in eleganceCategories" :key="cat.slug">
                  <NuxtLink :to="`/products?category=${cat.slug}`"
                    class="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                    @click="closeMenu">
                    {{ cat.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- NextStop Club -->
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div class="w-8 h-8 bg-nextstop-500/20 rounded-lg flex items-center justify-center">
                  <HugeiconsIcon :icon="Airplane01Icon" :size="16" class="text-nextstop-500" />
                </div>
                <h3 class="font-medium text-foreground">NextStop</h3>
              </div>
              <ul class="space-y-2">
                <li v-for="cat in nextstopCategories" :key="cat.slug">
                  <NuxtLink :to="`/products?category=${cat.slug}`"
                    class="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                    @click="closeMenu">
                    {{ cat.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Footer -->
          <div class="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <NuxtLink to="/products" class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              @click="closeMenu">
              View All Products
            </NuxtLink>
            <Button variant="outline" size="sm" @click="closeMenu">
              <HugeiconsIcon :icon="Search01Icon" :size="16" class="mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Menu09Icon,
  ArrowDown01Icon,
  CpuIcon,
  DiamondIcon,
  Airplane01Icon,
  Search01Icon,
} from '@hugeicons/core-free-icons'

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const quantumCategories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Smartphones', slug: 'smartphones' },
  { name: 'Audio', slug: 'audio' },
  { name: 'Accessories', slug: 'accessories' },
]

const eleganceCategories = [
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Watches', slug: 'watches' },
  { name: 'Jewelry', slug: 'jewelry' },
  { name: 'Lifestyle', slug: 'lifestyle' },
]

const nextstopCategories = [
  { name: 'Visa Services', slug: 'visa' },
  { name: 'Travel Packages', slug: 'travel' },
  { name: 'Consultation', slug: 'consultation' },
  { name: 'Immigration', slug: 'immigration' },
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  if (
    triggerRef.value && !triggerRef.value.contains(target) &&
    menuRef.value && !menuRef.value.contains(target)
  ) {
    closeMenu()
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
.menu-enter-active,
.menu-leave-active {
  transition: all 0.15s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>