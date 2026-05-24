<template>
  <header class="bg-card border-b border-border sticky top-0 z-40">
    <div class="px-4 sm:px-6">
      <div class="flex items-center justify-between h-14 gap-4">

        <!-- Left: Menu + Megamenu -->
        <div class="flex items-center gap-2 shrink-0">
          <!-- Mobile menu toggle -->
          <Button variant="ghost" size="icon" @click="layoutStore.toggleLeftSidebar"
            class="border border-border rounded-full p-1 ">
            <Transition name="icon-rotate" mode="out-in">
              <HugeiconsIcon :key="layoutStore.leftSidebarOpen ? 'open' : 'closed'"
                :icon="layoutStore.leftSidebarOpen ? MoveLeftIcon : MoveRightIcon" :size="20" />
            </Transition>
          </Button>
          <!-- Megamenu -->
          <HeaderMegamenu />
        </div>

        <!-- Center: Search bar (hidden on home page) -->
        <div v-if="!isHomePage" class="flex-1 max-w-md mx-4">
          <div class="relative">
            <HugeiconsIcon :icon="Search01Icon" :size="16"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input v-model="searchQuery" type="text" placeholder="Search products..."
              class="w-full h-9 pl-9 pr-4 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
              @keydown.enter="handleSearch" />
          </div>
        </div>

        <NuxtLink v-if="isHomePage" to="/" class="flex items-center opacity-90 hover:opacity-100 transition-opacity">
          <!-- Mobile: square mark logo -->
          <img src="../assets/img/globalUse/RH-Business-Club-logo-trsns.png" alt="RH Business Club"
            class="h-9 w-auto sm:hidden" />
          <!-- Desktop: full logo -->
          <img src="../assets/img/globalUse/RH-Business-Club-logo-trsns-vvv.png" alt="RH Business Club"
            class="hidden sm:block h-8 w-auto" />
        </NuxtLink>


        <!-- Right: Actions -->
        <div class="flex items-center gap-1">
          <!-- Authenticated user actions -->
          <template v-if="authStore.isLoggedIn">
            <!-- Notifications -->
            <NotificationDropdown />

            <!-- Cart -->
            <CartDropdown />

            <!-- Profile Menu -->
            <div class="relative" ref="profileDropdown">
              <Button variant="ghost" size="sm" class="flex items-center gap-2 px-2"
                @click="showProfileMenu = !showProfileMenu">
                <div
                  class="w-7 h-7 bg-quantum-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {{ authStore.user?.initials || 'RH' }}
                </div>
                <!-- <HugeiconsIcon :icon="ArrowDown01Icon" :size="16"
                  class="text-muted-foreground transition-transform hidden sm:block"
                  :class="{ 'rotate-180': showProfileMenu }" /> -->
              </Button>

              <!-- Profile Dropdown -->
              <Transition name="dropdown">
                <div v-if="showProfileMenu"
                  class="absolute right-0 mt-2 w-64 bg-card rounded-lg border border-border shadow-lg py-1 z-50">
                  <div class="px-4 py-3 border-b border-border">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 bg-quantum-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {{ authStore.user?.initials || 'RH' }}
                      </div>
                      <div class="min-w-0">
                        <h3 class="font-medium text-foreground truncate">
                          {{ authStore.user?.name || 'Guest User' }}
                        </h3>
                        <p class="text-sm text-muted-foreground truncate">
                          {{ authStore.user?.email || 'guest@example.com' }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="py-1">
                    <button @click="navigateTo('/settings')"
                      class="w-full px-4 py-2 flex items-center gap-3 hover:bg-muted transition-colors text-foreground">
                      <HugeiconsIcon :icon="UserIcon" :size="16" class="text-muted-foreground" />
                      <span class="text-sm">Profile Settings</span>
                    </button>
                    <button @click="navigateTo('/orders')"
                      class="w-full px-4 py-2 flex items-center gap-3 hover:bg-muted transition-colors text-foreground">
                      <HugeiconsIcon :icon="Package01Icon" :size="16" class="text-muted-foreground" />
                      <span class="text-sm">My Orders</span>
                    </button>
                    <button @click="handleLogout"
                      class="w-full px-4 py-2 flex items-center gap-3 hover:bg-muted transition-colors text-red-400">
                      <HugeiconsIcon :icon="Logout01Icon" :size="16" />
                      <span class="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </template>

          <!-- Guest: Login button -->
          <template v-else>
            <Button variant="outline" size="sm" @click="navigateTo('/login')"
              class="border border-border rounded-full p-1">
              <HugeiconsIcon :icon="UserIcon" :size="20" />
            </Button>
          </template>

          <!-- Right Sidebar Toggle -->

          <Button variant="ghost" size="icon" @click="layoutStore.toggleRightSidebar"
            class="border border-border rounded-full p-1">
            <Transition name="icon-rotate" mode="out-in">
              <HugeiconsIcon :key="layoutStore.rightSidebarOpen ? 'open' : 'closed'"
                :icon="layoutStore.rightSidebarOpen ? MoveRightIcon : MoveLeftIcon" :size="20" />
            </Transition>
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import { useAuthStore } from '@/stores/auth'
import NotificationDropdown from '@/components/NotificationDropdown.vue'
import CartDropdown from '@/components/CartDropdown.vue'
import HeaderMegamenu from '@/components/header/HeaderMegamenu.vue'

// HugeIcons
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  MoveRightIcon,
  MoveLeftIcon,
  Clubs02Icon,
  UserIcon,
  Logout01Icon,
  ArrowDown01Icon,
  SidebarRight01Icon,
  Package01Icon,
  Search01Icon,
} from '@hugeicons/core-free-icons'

const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()
const authStore = useAuthStore()

const isHomePage = computed(() => route.path === '/')

const showProfileMenu = ref(false)
const profileDropdown = ref<HTMLElement | null>(null)
const searchQuery = ref('')

const handleSearch = () => {
  const q = searchQuery.value.trim()
  if (q) {
    router.push(`/products?search=${encodeURIComponent(q)}`)
    searchQuery.value = ''
  }
}

const navigateTo = (path: string) => {
  router.push(path)
  showProfileMenu.value = false
}

const handleLogout = () => {
  authStore.logout()
  showProfileMenu.value = false
  router.push('/products')
}

const handleClickOutside = (event: MouseEvent) => {
  if (profileDropdown.value && !profileDropdown.value.contains(event.target as Node)) {
    showProfileMenu.value = false
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

.icon-rotate-enter-active,
.icon-rotate-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}

.icon-rotate-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}

.icon-rotate-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}
</style>