<template>

  <header
    class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-200">
    <div class="px-4 sm:px-6">
      <div class="flex items-center justify-between h-16 gap-4">

        <!-- Left: Megamenu + Mobile sidebar toggle -->
        <div class="flex items-center space-x-2">
          <!-- Mobile menu toggle for left sidebar -->
          <button @click="layoutStore.toggleLeftSidebar"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
            title="Toggle Sidebar">
            <LucideMenu class="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          <!-- Megamenu Component -->
          <HeaderMegamenu />
        </div>

        <!-- Center: Logo -->
        <div class="flex-1 flex justify-center">
          <button @click="navigateTo('/')" class="flex items-center hover:opacity-80 transition-opacity">
            <img src="../assets/img/globalUse/RH-Business-Club-logo-trsns-vvv.png" alt="RH Business Club"
              class="h-8 sm:h-10 w-auto" />
          </button>
        </div>

        <!-- Right: Icons (Theme, Notifications, Cart, Profile, Right sidebar) -->
        <div class="flex items-center space-x-2">
          <!-- Theme Toggle -->
          <!-- <button @click="toggleTheme" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
            <Sun v-if="isDarkMode" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <Moon v-else class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button> -->

          <!-- Notifications and Cart when logged in -->
          <template v-if="authStore.isLoggedIn">
            <!-- Notifications -->
            <NotificationDropdown />
            <!-- Cart -->
            <CartDropdown />

            <!-- Profile Menu -->
            <div class="relative" ref="profileDropdown">
              <button @click="showProfileMenu = !showProfileMenu"
                class="flex items-center border border-primary space-x-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Profile Menu">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                  {{ authStore.user?.initials || 'RH' }}
                </div>
                <LucideChevronDown class="w-4 h-4 text-gray-600 dark:text-gray-400 hidden sm:block transition-transform"
                  :class="{ 'rotate-180': showProfileMenu }" />
              </button>

              <!-- Profile Dropdown -->
              <transition name="dropdown">
                <div v-if="showProfileMenu"
                  class="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {{ authStore.user?.initials || 'RH' }}
                      </div>
                      <div>
                        <h3 class="font-semibold text-gray-900 dark:text-white">
                          {{ authStore.user?.name || 'Guest User' }}
                        </h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          {{ authStore.user?.email || 'guest@example.com' }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="py-2">
                    <button @click="navigateTo('/settings')"
                      class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                      <LucideUser class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm">Profile Settings</span>
                    </button>
                    <button @click="navigateTo('/orders')"
                      class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                      <LucidePackage class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm">My Orders</span>
                    </button>
                    <button @click="handleLogout"
                      class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-red-600 dark:text-red-400">
                      <LucideLogOut class="w-4 h-4" />
                      <span class="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </template>

          <!-- Login button when not logged in -->
          <template v-else>
            <button @click="navigateTo('/login')"
              class="flex items-center space-x-2 p-2 border border-primary text-white hover:text-white rounded-full hover:bg-primary-dark transition-colors font-medium  text-sm">
              <LucideUserSearch class="w-4 h-4 text-primary hover:text-white" />
            </button>
          </template>

          <!-- Right Sidebar Toggle -->
          <button @click="layoutStore.toggleRightSidebar"
            class="hidden xl:flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :class="{ 'text-primary': layoutStore.rightSidebarOpen, 'text-gray-500 dark:text-gray-400': !layoutStore.rightSidebarOpen }"
            title="Toggle Offers">
            <LucidePanelRight class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import { useProductStore } from '@/stores/products';
import { useLayoutStore } from '@/stores/layout';
import { useAuthStore } from '@/stores/auth';
import NotificationDropdown from '@/components/NotificationDropdown.vue';
import CartDropdown from '@/components/CartDropdown.vue';
import HeaderMegamenu from '@/components/header/HeaderMegamenu.vue';

const router = useRouter();
const productStore = useProductStore();
const layoutStore = useLayoutStore();
const authStore = useAuthStore();

const showProfileMenu = ref(false);
const profileDropdown = ref<HTMLElement | null>(null);
const isDarkMode = ref(false);

const navigateTo = (path: string) => {
  router.push(path);
  showProfileMenu.value = false;
};

const handleLogout = () => {
  authStore.logout();
  showProfileMenu.value = false;
  router.push('/products');
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

const toggleLeftSidebar = () => {
  layoutStore.toggleLeftSidebar();
};

const handleClickOutside = (event: any) => {
  if (profileDropdown.value && !profileDropdown.value.contains(event.target)) {
    showProfileMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDarkMode.value = false;
    document.documentElement.classList.remove('dark');
    if (!savedTheme) {
      localStorage.setItem('theme', 'light');
    }
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>