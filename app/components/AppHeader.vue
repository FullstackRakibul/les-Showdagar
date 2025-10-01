<template>
  <header
    class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
    <div class="px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Left -->
        <div class="flex items-center space-x-3">
          <!-- Mobile menu -->
          <button @click="layoutStore.toggleLeftSidebar"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 lg:hidden"
            title="Toggle Left Sidebar">
            <Menu class="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <!-- Desktop left toggle -->
          <button @click="layoutStore.toggleLeftSidebar"
            class="hidden lg:inline-flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :title="layoutStore.leftSidebarOpen
                ? 'Collapse Left Sidebar'
                : 'Expand Left Sidebar'
              ">
            <PanelLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <!-- Logo -->
          <button @click="navigateTo('/')" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Store class="w-5 h-5 text-white" />
            </div>
            <div class="hidden sm:flex flex-col">
              <span class="font-bold text-start text-gray-900 dark:text-white text-lg leading-tight">RH Business
                Club</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 leading-tight">Building a Club of Smart
                Shoppers.</span>
            </div>
            <div class="sm:hidden">
              <span class="font-bold text-gray-900 dark:text-white text-lg">RH Business
                Club</span>
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
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
            <Sun v-if="isDarkMode" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <Moon v-else class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          <!-- Notifications and Cart only when logged in -->
          <template v-if="authStore.isLoggedIn">
            <!-- Notifications -->
            <button @click="navigateTo('/notifications')"
              class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              title="Notifications">
              <Bell class="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span class="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </button>

            <!-- Cart -->
            <button @click="showCartModal = true"
              class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              title="Shopping Cart">
              <ShoppingCart class="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span v-if="productStore.cartItemsCount > 0"
                class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {{ productStore.cartItemsCount > 9 ? "9+" : productStore.cartItemsCount }}
              </span>
            </button>

            <!-- Profile -->
            <div class="relative" ref="profileDropdown">
              <button @click="showProfileMenu = !showProfileMenu"
                class="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
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
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm">
              Sign In
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

    <!-- Cart Modal (unchanged) -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="showCartModal" class="fixed inset-0 z-[9999] overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4">
            <div class="fixed inset-0 bg-black bg-opacity-50" @click="showCartModal = false"></div>
            <div
              class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden">
              <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Shopping Cart
                </h3>
                <button @click="showCartModal = false"
                  class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <X class="w-5 h-5" />
                </button>
              </div>
              <div class="overflow-y-auto" style="max-height: calc(85vh - 200px)">
                <div v-if="productStore.cart.length === 0" class="text-center py-12">
                  <ShoppingCart class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p class="text-gray-500 dark:text-gray-400 mb-4">Your cart is empty</p>
                  <button @click="showCartModal = false"
                    class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                    Continue Shopping
                  </button>
                </div>
                <div v-else class="p-6 space-y-4">
                  <div v-for="item in productStore.cart"
                    :key="`${item.product.id}-${item.selectedColor}-${item.selectedSize}`"
                    class="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <img :src="item.product.image" :alt="item.product.name" class="w-16 h-16 object-cover rounded-lg" />
                    <div class="flex-1 min-w-0">
                      <h4 class="font-medium text-gray-900 dark:text-white truncate">
                        {{ item.product.name }}
                      </h4>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        ${{ item.product.price }}
                      </p>
                      <div class="flex items-center space-x-2 mt-1">
                        <span v-if="item.selectedColor"
                          class="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">{{
                          item.selectedColor }}</span>
                        <span v-if="item.selectedSize" class="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">{{
                          item.selectedSize }}</span>
                      </div>
                      <div class="flex items-center space-x-2 mt-2">
                        <button @click="
                          productStore.updateCartQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                          "
                          class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors">
                          <Minus class="w-3 h-3" />
                        </button>
                        <span class="font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">{{
                          item.quantity }}</span>
                        <button @click="
                          productStore.updateCartQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                          "
                          class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors">
                          <Plus class="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-semibold text-gray-900 dark:text-white">
                        ${{ (item.product.price * item.quantity).toFixed(2) }}
                      </p>
                      <button @click="
                        productStore.removeFromCart(
                          item.product.id,
                          item.selectedColor,
                          item.selectedSize
                        )
                        " class="text-red-500 hover:text-red-700 text-sm mt-1 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="productStore.cart.length > 0" class="border-t border-gray-200 dark:border-gray-700 p-6">
                <div class="flex justify-between items-center mb-4">
                  <span class="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                  <span class="text-xl font-bold text-gray-900 dark:text-white">${{ productStore.cartTotal.toFixed(2)
                  }}</span>
                </div>
                <button @click="
                  navigateTo('/checkout');
                showCartModal = false;
                "
                  class="w-full bg-primary text-white py-3 px-4 rounded-xl hover:bg-primary-dark transition-colors font-semibold text-center">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {
  Menu,
  Search,
  Bell,
  ShoppingCart,
  ChevronDown,
  Sun,
  Moon,
  User,
  Package,
  LogOut,
  PanelRight,
  PanelLeft,
  X,
  Minus,
  Plus,
  Store,
} from "lucide-vue-next";
import { useProductStore } from "@/stores/products";
import { useLayoutStore } from "@/stores/layout";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const productStore = useProductStore();
const layoutStore = useLayoutStore();
const authStore = useAuthStore();

const showCartModal = ref(false);
const showMobileSearch = ref(false);
const showProfileMenu = ref(false);
const profileDropdown = ref(null);
const isDarkMode = ref(false); // Default to light mode

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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>