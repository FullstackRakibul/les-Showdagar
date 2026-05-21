<template>
  <div class="relative w-full sm:w-auto">
    <Button variant="ghost" size="sm"
      class="flex items-center gap-2 border border-border rounded-full px-3 py-1 bg-primary/10 text-primary"
      @click="toggleMenu" ref="triggerRef">
      <HugeiconsIcon :icon="Clubs02Icon" :size="16" class="transition-transform" :class="{ 'rotate-180': isOpen }" />
      <span class="hidden sm:block text-sm font-medium">Clubs</span>
    </Button>

    <Transition name="menu">
      <div v-if="isOpen"
        class="absolute left-0 top-full mt-2 z-50 w-[min(600px,calc(100vw-24px))] bg-card border border-border rounded-xl shadow-lg max-h-[80vh] overflow-y-auto"
        ref="menuRef">
        <div class="p-4 sm:p-6">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-6 divide-y sm:divide-y-0 divide-border">
            <!-- Quantum Club -->
            <div class="py-4 sm:py-0">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-7 h-7 sm:w-8 sm:h-8 bg-quantum-500/20 rounded-lg flex items-center justify-center">
                  <HugeiconsIcon :icon="CpuIcon" :size="16" class="text-quantum-500" />
                </div>
                <h3 class="font-semibold text-foreground text-sm">Quantum</h3>
              </div>
              <ul class="space-y-1 pl-9 sm:pl-0">
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
            <div class="py-4 sm:py-0">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-7 h-7 sm:w-8 sm:h-8 bg-elegance-500/20 rounded-lg flex items-center justify-center">
                  <HugeiconsIcon :icon="DiamondIcon" :size="16" class="text-elegance-500" />
                </div>
                <h3 class="font-semibold text-foreground text-sm">Elegance</h3>
              </div>
              <ul class="space-y-1 pl-9 sm:pl-0">
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
            <div class="py-4 sm:py-0">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-7 h-7 sm:w-8 sm:h-8 bg-nextstop-500/20 rounded-lg flex items-center justify-center">
                  <HugeiconsIcon :icon="Airplane01Icon" :size="16" class="text-nextstop-500" />
                </div>
                <h3 class="font-semibold text-foreground text-sm">NextStop</h3>
              </div>
              <ul class="space-y-1 pl-9 sm:pl-0">
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

          <div class="mt-4 pt-3 border-t border-border flex items-center justify-between">
            <NuxtLink to="/products"
              class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              @click="closeMenu">
              View All Products
            </NuxtLink>
            <button class="text-sm text-muted-foreground hover:text-foreground sm:hidden" @click="closeMenu">
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Clubs02Icon,
  CpuIcon,
  DiamondIcon,
  Airplane01Icon,
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

const toggleMenu = () => { isOpen.value = !isOpen.value }
const closeMenu = () => { isOpen.value = false }

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  if (
    triggerRef.value && !triggerRef.value.contains(target) &&
    menuRef.value && !menuRef.value.contains(target)
  ) {
    closeMenu()
  }
}

onMounted(() => { document.addEventListener('click', handleClickOutside) })
onUnmounted(() => { document.removeEventListener('click', handleClickOutside) })
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
