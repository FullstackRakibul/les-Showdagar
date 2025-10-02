<template>
  <header
    class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
    <div class="px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Left -->
        <div class="flex items-center space-x-3">
          <!-- Mobile menu -->
          <button @click="toggleLeftSidebar"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 lg:hidden"
            title="Toggle Left Sidebar">
            <Menu class="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <!-- Desktop left toggle -->
          <button @click="toggleLeftSidebar"
            class="hidden lg:inline-flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :title="leftSidebarOpen ? 'Collapse Left Sidebar' : 'Expand Left Sidebar'">
            <PanelLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <!-- Logo -->
          <button @click="navigateTo('/')" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">

            <div class="hidden sm:flex flex-col">
              <img width="120" src="../assets/img/globalUse/rhbusinessclub-logo.png" />
              <span class="text-xs text-gray-500 dark:text-gray-400 leading-tight">Building a Club of Smart
                Shoppers.</span>
            </div>
            <div class="sm:hidden">
              <img width="80" src="../assets/img/globalUse/rhbusinessclub-logo.png" />
            </div>
          </button>
        </div>

        <!-- Center search -->
        <div class="hidden md:flex flex-1 max-w-2xl mx-6">
          <div class="relative w-full">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input v-model="productStore.searchQuery" placeholder="Search products, brands, categories..."
              class="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
          </div>
        </div>

        <!-- Right -->
        <div class="flex items-center space-x-2">
          <!-- Mobile search -->
          <button @click="showMobileSearch = !showMobileSearch"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
            <Search class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          <!-- Theme -->
          <button @click="toggleTheme"
            class="p-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-800 transition-colors duration-200"
            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
            <Sun v-if="isDarkMode" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <Moon v-else class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          <!-- Notifications and Cart as separate components when logged in -->
          <template v-if="authStore.isLoggedIn">
            <!-- Notifications Component -->
            <NotificationDropdown />

            <!-- Cart Component -->
            <CartDropdown />

            <!-- Profile -->
            <div class="relative" ref="profileDropdown">
              <button @click="showProfileMenu = !showProfileMenu"
                class="flex items-center bg-primary rounded-full space-x-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                title="Profile Menu">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {{ authStore.user?.initials || 'RH' }}
                </div>
                <ChevronDown
                  class="w-4 h-4 text-gray-500 dark:text-gray-400 hidden sm:block transition-transform duration-200"
                  :class="{ 'rotate-180': showProfileMenu }" />
              </button>

              <transition name="dropdown">
                <div v-if="showProfileMenu"
                  class="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold text-lg">
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
                      class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300">
                      <User class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm">Profile Settings</span>
                    </button>
                    <button @click="navigateTo('/orders')"
                      class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300">
                      <Package class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span class="text-sm">My Orders</span>
                    </button>
                    <button @click="handleLogout"
                      class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-red-600 dark:text-red-400">
                      <LogOut class="w-4 h-4" />
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
              class="p-1 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors font-medium text-sm">
              <UserSearch/>
            </button>
          </template>

          <!-- Right sidebar toggle -->
          <button @click="layoutStore.toggleRightSidebar"
            class="hidden xl:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :class="{
              'text-primary': layoutStore.rightSidebarOpen,
              'text-gray-500 dark:text-gray-400': !layoutStore.rightSidebarOpen,
            }" title="Toggle Offers">
            <PanelRight class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Search -->
      <transition name="slide-down">
        <div v-if="showMobileSearch" class="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
          <div class="relative">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input v-model="productStore.searchQuery" placeholder="Search products..."
              class="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {
  Menu,
  Search,
  ChevronDown,
  Sun,
  Moon,
  User,
  Package,
  LogOut,
  PanelRight,
  PanelLeft,
  Store,
  UserSearch,
} from "lucide-vue-next";
import { useProductStore } from "@/stores/products";
import { useLayoutStore } from "@/stores/layout";
import { useAuthStore } from "@/stores/auth";
import NotificationDropdown from "@/components/NotificationDropdown.vue";
import CartDropdown from "@/components/CartDropdown.vue";

const router = useRouter();
const productStore = useProductStore();
const layoutStore = useLayoutStore();
const authStore = useAuthStore();

const showMobileSearch = ref(false);
const showProfileMenu = ref(false);
const profileDropdown = ref(null);
const isDarkMode = ref(false);
const leftSidebarOpen = ref(false);

const navigateTo = (path) => {
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
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

const toggleLeftSidebar = () => {
  leftSidebarOpen.value = !leftSidebarOpen.value;
  layoutStore.toggleLeftSidebar();
};

const handleClickOutside = (event) => {
  if (profileDropdown.value && !profileDropdown.value.contains(event.target)) {
    showProfileMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  } else {
    isDarkMode.value = false;
    document.documentElement.classList.remove("dark");
    if (!savedTheme) {
      localStorage.setItem("theme", "light");
    }
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
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

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>