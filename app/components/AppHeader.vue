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
        <div class="flex items-center gap-2">
          <!-- Theme Settings Popover -->
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <HugeiconsIcon :icon="themeIcon" :size="20" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" class="w-56">
              <div class="space-y-4">
                <div>
                  <p class="text-sm font-semibold mb-3">Appearance</p>
                </div>
                
                <!-- Theme Toggle -->
                <div>
                  <p class="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-medium">Theme</p>
                  <div class="grid grid-cols-3 gap-2">
                    <button 
                      @click="setTheme('light')"
                      :class="['px-3 py-2 rounded-lg border text-xs font-medium transition-all', theme === 'light' ? 'bg-accent text-accent-foreground border-accent' : 'border-border hover:border-foreground/20']"
                    >
                      Light
                    </button>
                    <button 
                      @click="setTheme('dark')"
                      :class="['px-3 py-2 rounded-lg border text-xs font-medium transition-all', theme === 'dark' ? 'bg-accent text-accent-foreground border-accent' : 'border-border hover:border-foreground/20']"
                    >
                      Dark
                    </button>
                    <button 
                      @click="setTheme('system')"
                      :class="['px-3 py-2 rounded-lg border text-xs font-medium transition-all', theme === 'system' ? 'bg-accent text-accent-foreground border-accent' : 'border-border hover:border-foreground/20']"
                    >
                      System
                    </button>
                  </div>
                </div>

                <!-- Font Selector -->
                <div class="border-t border-border pt-4">
                  <p class="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-medium">Font</p>
                  <div class="space-y-1">
                    <button 
                      @click="setFont('ubuntu')"
                      :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors', selectedFont === 'ubuntu' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted']"
                    >
                      Ubuntu
                    </button>
                    <button 
                      @click="setFont('system')"
                      :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors', selectedFont === 'system' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted']"
                    >
                      System
                    </button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <!-- Cart -->
          <CartDropdown />

          <!-- Sign In Button -->
          <Button 
            @click="handleSignIn" 
            variant="outline" 
            size="sm" 
            class="hidden sm:inline-flex gap-2"
          >
            <HugeiconsIcon :icon="UserIcon" :size="16" />
            Sign In
          </Button>

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
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import CartDropdown from '@/components/CartDropdown.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Menu01Icon, Sun01Icon, Moon01Icon, UserIcon } from '@hugeicons/core-free-icons'

const router = useRouter()
const layoutStore = useLayoutStore()

const theme = ref<'light' | 'dark' | 'system'>('dark')
const selectedFont = ref<'ubuntu' | 'system'>('ubuntu')

const themeIcon = computed(() => {
  if (theme.value === 'light') return Sun01Icon
  if (theme.value === 'dark') return Moon01Icon
  return Sun01Icon
})

const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
  theme.value = newTheme
  if (typeof window !== 'undefined') {
    const html = document.documentElement
    if (newTheme === 'light') {
      html.classList.remove('dark')
    } else if (newTheme === 'dark') {
      html.classList.add('dark')
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (isDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
    localStorage.setItem('theme', newTheme)
  }
}

const setFont = (newFont: 'ubuntu' | 'system') => {
  selectedFont.value = newFont
  if (typeof window !== 'undefined') {
    const html = document.documentElement
    if (newFont === 'ubuntu') {
      html.style.fontFamily = '"Ubuntu", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    } else {
      html.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }
    localStorage.setItem('font', newFont)
  }
}

const scrollToPreOrder = () => {
  const element = document.getElementById('preorder-section')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleSignIn = () => {
  router.push('/login')
}

const handleScroll = () => {
  layoutStore.updateHeaderScroll(window.scrollY)
}

const loadPreferences = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null) || 'dark'
    const savedFont = (localStorage.getItem('font') as 'ubuntu' | 'system' | null) || 'ubuntu'
    
    setTheme(savedTheme)
    setFont(savedFont)
  }
}

onMounted(() => {
  layoutStore.init()
  loadPreferences()
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
