<template>
  <!-- Calcifer Minimalist Header -->
  <header :class="[
    'sticky top-0 z-40 transition-all duration-300',
    layoutStore.headerScrolled 
      ? 'bg-background/80 backdrop-blur-md border-b border-border/50' 
      : 'bg-transparent border-b border-transparent'
  ]">
    <div class="px-6 sm:px-8 max-w-7xl mx-auto">
      <div class="flex items-center justify-between h-16">
        
        <!-- Left: Brand -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center opacity-90 hover:opacity-100 transition-opacity">
            <span class="text-2xl font-bold tracking-tight">Calcifer</span>
          </NuxtLink>
        </div>

        <!-- Center: Navigation (hidden on mobile) -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-sm font-medium hover:text-foreground/70 transition-colors">Features</a>
          <a href="#specs" class="text-sm font-medium hover:text-foreground/70 transition-colors">Specs</a>
          <a href="#ecosystem" class="text-sm font-medium hover:text-foreground/70 transition-colors">Ecosystem</a>
        </nav>

        <!-- Right: Actions -->
        <div class="flex items-center gap-4">
          <!-- Cart -->
          <CartDropdown />

          <!-- Pre-Order CTA -->
          <Button @click="scrollToPreOrder" size="sm" class="hidden sm:inline-flex">
            Pre-Order Now
          </Button>

          <!-- Mobile menu toggle -->
          <Button 
            variant="ghost" 
            size="icon" 
            class="md:hidden"
            @click="layoutStore.toggleMobileMenu"
          >
            <HugeiconsIcon :icon="Menu01Icon" :size="20" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide">
      <div v-if="layoutStore.mobileMenuOpen" class="md:hidden border-t border-border/50">
        <nav class="px-6 py-4 space-y-3">
          <a href="#features" @click="layoutStore.closeMobileMenu" class="block text-sm font-medium hover:text-foreground/70">Features</a>
          <a href="#specs" @click="layoutStore.closeMobileMenu" class="block text-sm font-medium hover:text-foreground/70">Specs</a>
          <a href="#ecosystem" @click="layoutStore.closeMobileMenu" class="block text-sm font-medium hover:text-foreground/70">Ecosystem</a>
          <Button @click="scrollToPreOrder; layoutStore.closeMobileMenu()" class="w-full mt-4">
            Pre-Order Now
          </Button>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { Button } from '@/components/ui/button'
import CartDropdown from '@/components/CartDropdown.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Menu01Icon } from '@hugeicons/core-free-icons'

const layoutStore = useLayoutStore()

const scrollToPreOrder = () => {
  const element = document.getElementById('preorder-section')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = () => {
  layoutStore.updateHeaderScroll(window.scrollY)
}

onMounted(() => {
  layoutStore.init()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  layoutStore.destroy()
  window.removeEventListener('scroll', handleScroll)
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
