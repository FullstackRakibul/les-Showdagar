<template>
  <div class="fixed inset-x-0 top-3 z-50 px-3 sm:px-4">
    <header class="max-w-7xl mx-auto flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all duration-300"
      :class="scrolled
        ? 'bg-background/90 backdrop-blur-xl border-border/80 shadow-lg shadow-background/20'
        : 'bg-background/70 backdrop-blur-md border-border/50 shadow-md shadow-background/10'">

      <!-- § 1 — Logo -->
      <NuxtLink to="/" class="shrink-0 flex items-center" aria-label="Home">
        <img src="../assets/img/globalUse/RH-Business-Club-logo-trsns.png" alt="RH Business Club"
          class="h-8 w-auto sm:hidden" />
        <img src="../assets/img/globalUse/RH-Business-Club-logo-trsns-vvv.png" alt="RH Business Club"
          class="hidden sm:block h-7 w-auto" />
      </NuxtLink>

      <!-- Divider -->
      <div class="hidden lg:block h-5 w-px bg-border/60 shrink-0 mx-1" />

      <!-- § 2 — Nav links (desktop) -->
      <nav class="hidden lg:flex items-center gap-0.5 flex-1 min-w-0" aria-label="Main navigation">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to"
          class="px-2.5 xl:px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-150"
          :class="isActive(link.to)
            ? 'text-foreground bg-muted'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'">
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Spacer (pushes § 3 + § 4 right on non-lg) -->
      <div class="flex-1 lg:hidden" />

      <!-- § 3 — Search -->
      <div class="flex items-center min-w-0">
        <!-- Expanded input from md; shrinks rather than overflowing -->
        <div
          class="hidden md:flex items-center gap-2 bg-muted/50 border border-border/50 rounded-full px-3 py-1.5 w-40 lg:w-36 xl:w-52 focus-within:w-56 xl:focus-within:w-64 focus-within:border-border transition-all duration-300 shrink">
          <HugeiconsIcon :icon="Search01Icon" :size="14" class="text-muted-foreground shrink-0" />
          <input v-model="searchQuery" type="text" placeholder="Search..."
            class="flex-1 min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            @keydown.enter="handleSearch" />
        </div>

        <!-- Icon-only below md, toggles overlay -->
        <button
          class="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Search" @click="mobileSearchOpen = !mobileSearchOpen">
          <HugeiconsIcon :icon="Search01Icon" :size="18" />
        </button>
      </div>

      <!-- Divider -->
      <div class="hidden md:block h-5 w-px bg-border/60 shrink-0 mx-1" />

      <!-- § 4 — Profile & actions -->
      <div class="flex items-center gap-1 shrink-0">

        <!-- Cart dropdown -->
        <CartDropdown />

        <!-- Mobile nav hamburger -->
        <button
          class="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Menu" @click="mobileNavOpen = !mobileNavOpen">
          <HugeiconsIcon :icon="mobileNavOpen ? Cancel01Icon : Menu01Icon" :size="18" />
        </button>

        <!-- Profile -->
        <div class="relative" ref="profileRef">
          <button class="flex items-center gap-2 pl-1 pr-2 py-1 rounded-md hover:bg-muted transition-colors"
            @click="profileOpen = !profileOpen" aria-label="Profile menu" :aria-expanded="profileOpen">
            <div
              class="w-7 h-7 rounded-full bg-quantum-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              {{ authStore.user?.initials || 'G' }}
            </div>
            <span class="hidden xl:block text-sm font-medium text-foreground max-w-22.5 truncate">
              {{ authStore.user?.name?.split(' ')[0] || 'Guest' }}
            </span>
            <HugeiconsIcon :icon="ArrowDown01Icon" :size="14"
              class="text-muted-foreground transition-transform duration-200" :class="{ 'rotate-180': profileOpen }" />
          </button>

          <!-- Profile dropdown -->
          <Transition name="dropdown">
            <div v-if="profileOpen"
              class="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card shadow-xl py-1 z-50">
              <!-- User info -->
              <div class="px-3 py-2.5 border-b border-border">
                <p class="text-sm font-semibold text-foreground truncate">
                  {{ authStore.user?.name || 'Guest User' }}
                </p>
                <p class="text-xs text-muted-foreground truncate">
                  {{ authStore.user?.email || 'Not signed in' }}
                </p>
              </div>

              <div class="py-1">
                <button v-for="item in profileMenuItems" :key="item.label"
                  class="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors" :class="item.destructive
                    ? 'text-destructive hover:bg-destructive/10'
                    : 'text-foreground hover:bg-muted'" @click="handleProfileAction(item)">
                  <HugeiconsIcon :icon="item.icon" :size="15" class="shrink-0 text-muted-foreground" />
                  {{ item.label }}
                </button>
              </div>

              <template v-if="!authStore.isLoggedIn">
                <div class="border-t border-border py-1">
                  <button
                    class="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                    @click="handleProfileAction({ to: '/login' })">
                    <HugeiconsIcon :icon="Login01Icon" :size="15" class="shrink-0 text-muted-foreground" />
                    Sign In
                  </button>
                </div>
              </template>
            </div>
          </Transition>
        </div>
      </div>
    </header>

    <!-- Mobile search overlay -->
    <Transition name="slide-down">
      <div v-if="mobileSearchOpen"
        class="md:hidden mt-2 mx-0 rounded-2xl border border-border bg-background/90 backdrop-blur-xl shadow-lg px-3 py-2 flex items-center gap-2">
        <HugeiconsIcon :icon="Search01Icon" :size="16" class="text-muted-foreground shrink-0" />
        <input ref="mobileSearchInput" v-model="searchQuery" type="text"
          placeholder="Search products, brands, categories..."
          class="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          @keydown.enter="handleSearch" @keydown.esc="mobileSearchOpen = false" />
        <button class="text-muted-foreground hover:text-foreground transition-colors" @click="mobileSearchOpen = false">
          <HugeiconsIcon :icon="Cancel01Icon" :size="16" />
        </button>
      </div>
    </Transition>

    <!-- Mobile nav dropdown -->
    <Transition name="slide-down">
      <nav v-if="mobileNavOpen"
        class="lg:hidden mt-2 rounded-2xl border border-border bg-background/90 backdrop-blur-xl shadow-lg overflow-hidden"
        aria-label="Mobile navigation">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to"
          class="flex items-center gap-3 px-4 py-3 text-sm font-medium border-b border-border/50 last:border-0 transition-colors"
          :class="isActive(link.to)
            ? 'text-foreground bg-muted'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'" @click="mobileNavOpen = false">
          <HugeiconsIcon :icon="link.icon" :size="16" class="shrink-0" />
          {{ link.label }}
        </NuxtLink>
      </nav>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Search01Icon,
  Menu01Icon,
  Cancel01Icon,
  ArrowDown01Icon,
  UserIcon,
  Package01Icon,
  Settings01Icon,
  Logout01Icon,
  Login01Icon,
  Home01Icon,
  Store01Icon,
  Award01Icon,
  ShoppingBag01Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// ── State ──────────────────────────────────────────────────────────────────────
const scrolled = ref(false)
const profileOpen = ref(false)
const mobileNavOpen = ref(false)
const mobileSearchOpen = ref(false)
const searchQuery = ref('')
const profileRef = ref<HTMLElement | null>(null)
const mobileSearchInput = ref<HTMLInputElement | null>(null)

// ── Nav links ──────────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'Home', to: '/', icon: Home01Icon },
  { label: 'Products', to: '/products', icon: Store01Icon },
  { label: 'Clubs', to: '/clubs', icon: Award01Icon },
  { label: 'Shop', to: '/shop', icon: ShoppingBag01Icon },
  { label: 'Contact', to: '/contact', icon: Mail01Icon },
]

const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path.startsWith(to)

// ── Profile menu ───────────────────────────────────────────────────────────────
interface ProfileMenuItem {
  label: string
  icon: typeof UserIcon
  to?: string
  action?: 'logout'
  destructive?: boolean
}

const profileMenuItems = computed<ProfileMenuItem[]>(() => {
  const base: ProfileMenuItem[] = [
    { label: 'Profile', to: '/settings', icon: UserIcon },
    { label: 'My Orders', to: '/orders', icon: Package01Icon },
    { label: 'Cart', to: '/cart', icon: ShoppingBag01Icon },
    { label: 'Settings', to: '/settings', icon: Settings01Icon },
  ]
  if (authStore.isLoggedIn) {
    base.push({ label: 'Logout', icon: Logout01Icon, destructive: true, action: 'logout' })
  }
  return base
})

const handleProfileAction = (item: Pick<ProfileMenuItem, 'to' | 'action'>) => {
  profileOpen.value = false
  if (item.action === 'logout') {
    authStore.logout()
    router.push('/products')
    return
  }
  if (item.to) router.push(item.to)
}

// ── Search ─────────────────────────────────────────────────────────────────────
const handleSearch = () => {
  const q = searchQuery.value.trim()
  if (!q) return
  mobileSearchOpen.value = false
  mobileNavOpen.value = false
  router.push(`/products?search=${encodeURIComponent(q)}`)
  searchQuery.value = ''
}

// Auto-focus mobile search input when it opens
watch(mobileSearchOpen, async (open) => {
  if (open) {
    await nextTick()
    mobileSearchInput.value?.focus()
  }
})

// Close mobile panels on route change
watch(() => route.path, () => {
  profileOpen.value = false
  mobileNavOpen.value = false
  mobileSearchOpen.value = false
})

// ── Scroll detection ───────────────────────────────────────────────────────────
const onScroll = () => { scrolled.value = window.scrollY > 24 }

// ── Click outside to close profile ────────────────────────────────────────────
const onClickOutside = (e: MouseEvent) => {
  if (profileRef.value && !profileRef.value.contains(e.target as Node)) {
    profileOpen.value = false
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClickOutside)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('click', onClickOutside)
  }
})
</script>

<style scoped>
/* Profile & nav dropdowns */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}

/* Mobile panels slide down */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>