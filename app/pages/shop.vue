<template>
  <div class="space-y-8">
    <!-- Promotional Section: Google Pixel 6A -->
    <section
      class="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div class="inline-flex items-center bg-white/10 text-white/90 px-3 py-1 rounded-full text-xs mb-3">
            Limited Stock • 7 Days Delivery
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold mb-3">
            Google Pixel 6A (5G) 8/128GB
          </h2>
          <p class="text-sm sm:text-base opacity-90 mb-4">
            Japan used, but super fresh condition!
          </p>
          <div class="flex items-center space-x-3 mb-6">
            <span class="text-2xl sm:text-3xl font-extrabold">৳ 20,890</span>
            <span class="text-xs sm:text-sm bg-white/10 px-2 py-1 rounded-full">Cash on Delivery</span>
          </div>
          <div class="flex flex-wrap gap-3">
            <button @click="openPromo"
              class="bg-white text-emerald-600 font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors flex items-center space-x-2">
              <ShoppingBag class="w-4 h-4" />
              <span>View Details</span>
            </button>
            <a href="" target="_blank" rel="noopener"
              class="bg-emerald-700/70 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors flex items-center space-x-2">
              <Phone class="w-4 h-4" />
              <span>WhatsApp +971 564785090</span>
            </a>
          </div>
        </div>
        <div class="relative">
          <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2022/05/Untitled-design-9.jpg"
            alt="Google Pixel 6A promotional" class="w-full rounded-2xl shadow-2xl" />
          <div class="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </section>

    <!-- Category Filter Bar -->
    <section
      class="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex flex-wrap items-center gap-2">
        <button v-for="category in productStore.categories" :key="category.name"
          @click="productStore.selectedCategory = category.name" :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
            productStore.selectedCategory === category.name
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
          ]">
          {{ category.name }} ({{ category.count }})
        </button>
      </div>
    </section>

    <!-- All Products with Infinite Scroll -->
    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          All Products
        </h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          Showing {{ displayedProducts.length }} of
          {{ productStore.filteredProducts.length }}
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard v-for="product in displayedProducts" :key="product.id" :product="product" />
      </div>

      <!-- Empty State -->
      <div v-if="displayedProducts.length === 0" class="text-center py-16">
        <Search class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
        <h3 class="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-3">
          No products found
        </h3>
        <p class="text-gray-500 dark:text-gray-500 mb-6">
          Try adjusting your search or filter criteria
        </p>
        <button @click="resetFilters"
          class="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl transition-colors font-semibold">
          Clear Filters
        </button>
      </div>

      <!-- Infinite Scroll Sentinel -->
      <div ref="sentinel" class="h-12 flex items-center justify-center mt-6">
        <div v-if="canLoadMore" class="text-gray-500 dark:text-gray-400 text-sm">
          Loading more...
        </div>
      </div>
    </section>

    <!-- Product Modal -->
    <ProductModal />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { Search, ShoppingBag, Phone } from "lucide-vue-next";
import { useProductStore } from "@/stores/products";
import ProductCard from "@/components/ProductCard.vue";
import ProductModal from "@/components/ProductModal.vue";

const productStore = useProductStore();

// Promo action: open Pixel promo in modal if a matching product exists
const openPromo = () => {
  const match = productStore.products.find(
    (p) =>
      p.name.toLowerCase().includes("pixel") || p.name.toLowerCase().includes("google")
  );
  if (match) {
    productStore.openProductModal(match);
  }
};

// Infinite scroll state
const page = ref(1);
const pageSize = ref(12);
const sentinel = ref(null);
let observer = null;

const displayedProducts = computed(() => {
  return productStore.filteredProducts.slice(0, page.value * pageSize.value);
});

const canLoadMore = computed(
  () => displayedProducts.value.length < productStore.filteredProducts.length
);

const onIntersect = (entries) => {
  if (entries[0].isIntersecting && canLoadMore.value) {
    page.value += 1;
  }
};

onMounted(() => {
  observer = new IntersectionObserver(onIntersect, { rootMargin: "200px" });
  if (sentinel.value) observer.observe(sentinel.value);
});

onBeforeUnmount(() => {
  if (observer && sentinel.value) observer.unobserve(sentinel.value);
});

// Reset page when filters change
watch(
  () => productStore.selectedCategory,
  () => {
    page.value = 1;
  }
);
watch(
  () => productStore.searchQuery,
  () => {
    page.value = 1;
  }
);

const resetFilters = () => {
  productStore.selectedCategory = "All Products";
  productStore.searchQuery = "";
  page.value = 1;
};
</script>