<template>
  <div
    class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300">
    <!-- Added social media style header with user profile -->
    <div class="flex items-center p-4 pb-2">
      <img :src="creatorAvatar" :alt="creatorName"
        class="w-10 h-10 rounded-full object-cover border-2 border-gray-200" />
      <div class="ml-3 flex-1">
        <h4 class="font-semibold text-gray-900 dark:text-white text-sm">{{ creatorName }}</h4>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ creatorRole }}</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
        <MoreHorizontal class="w-5 h-5" />
      </button>
    </div>

    <!-- Product image with video play overlay -->
    <div class="relative cursor-pointer group" @click="openModal">
      <img :src="product.image" :alt="product.name" class="w-full aspect-square object-cover" />
      <!-- Video play overlay -->
      <div
        class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
            <Play class="w-8 h-8 text-gray-800 ml-1" />
          </div>
        </div>
      </div>

      <!-- Product badges -->
      <div class="absolute top-3 left-3 flex flex-col space-y-1">
        <span v-if="product.isNew"
          class="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">NEW</span>
        <span v-if="product.isHot"
          class="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">🔥 HOT</span>
      </div>
    </div>

    <!-- Social media style engagement buttons -->
    <div class="p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-4">
          <button @click="toggleLike"
            class="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
            :class="{ 'text-red-500': isLiked }">
            <Heart class="w-6 h-6" :class="{ 'fill-current': isLiked }" />
            <span class="text-sm font-medium">{{ likeCount }}</span>
          </button>
          <button
            class="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
            <MessageCircle class="w-6 h-6" />
            <span class="text-sm font-medium">{{ product.reviews }}</span>
          </button>
          <button
            class="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
            <Share class="w-6 h-6" />
          </button>
        </div>
        <button @click="toggleBookmark" class="text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors"
          :class="{ 'text-yellow-500': isBookmarked }">
          <Bookmark class="w-6 h-6" :class="{ 'fill-current': isBookmarked }" />
        </button>
      </div>

      <!-- Product info -->
      <div class="space-y-2">
        <h3 class="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
          {{ product.name }}
        </h3>

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <!-- <span class="text-lg font-bold text-gray-900 dark:text-white">৳{{ product.price }}</span>
            <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
              ৳{{ product.originalPrice }}
            </span> -->
          </div>
          <div class="flex items-center space-x-1">
            <LucideStar class="w-4 h-4 text-yellow-400 fill-current" />
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ product.rating }}</span>
          </div>
        </div>

        <!-- Social media style action button -->
        <!-- <button @click="handleAddToCart" :disabled="!product.inStock"
          class="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white py-2.5 px-4 rounded-xl transition-all duration-300 font-semibold text-sm flex items-center justify-center space-x-2 shadow-sm hover:shadow-md transform hover:scale-[1.02]">
          <ShoppingBag class="w-4 h-4" />
          <span>{{ product.inStock ? "Add to Cart" : "Out of Stock" }}</span>
        </button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Star,
  ShoppingBag,
  Play,
  MoreHorizontal
} from "lucide-vue-next";
import { useProductStore } from "@/stores/products";

const props = defineProps({
  product: { type: Object, required: true }
});

const productStore = useProductStore();

// Social media interactions
const isLiked = ref(false);
const isBookmarked = ref(false);
const likeCount = ref(Math.floor(Math.random() * 500) + 50);

// Creator info based on product category
const creators = {
  'Electronics': { name: 'Quantum Club', role: 'Tech Enthusiast', avatar: '@/assets/img/globalUse/rhbusinessclub-logo.png' },
  'Sports': { name: 'Quantum Club', role: 'Athlete', avatar: 'https://scontent.fzyl2-2.fna.fbcdn.net/v/t39.30808-6/346868074_747880563801104_5042220215925177930_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KRpnzHLGdbgQ7kNvwGlbhwM&_nc_oc=Admvbgs2We413zQ5tEBGTOgIcheAv9q2uFwrgm4G2QQK2A4EavypJIvzf3idZkcufnA&_nc_zt=23&_nc_ht=scontent.fzyl2-2.fna&_nc_gid=ny4yrjYCS73TfrpZRFKYzw&oh=00_AfVwS-TIuKc3ORJxOkEYJcfyZP8GQrx86BKsiFD7BCYSgw&oe=68B8E4F3' },
  'Gaming': { name: 'Quantum Club', role: 'Pro Gamer', avatar: 'https://scontent.fzyl2-2.fna.fbcdn.net/v/t39.30808-6/346868074_747880563801104_5042220215925177930_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KRpnzHLGdbgQ7kNvwGlbhwM&_nc_oc=Admvbgs2We413zQ5tEBGTOgIcheAv9q2uFwrgm4G2QQK2A4EavypJIvzf3idZkcufnA&_nc_zt=23&_nc_ht=scontent.fzyl2-2.fna&_nc_gid=ny4yrjYCS73TfrpZRFKYzw&oh=00_AfVwS-TIuKc3ORJxOkEYJcfyZP8GQrx86BKsiFD7BCYSgw&oe=68B8E4F3' },
  'Photography': { name: 'Elegance Club', role: 'Photographer', avatar: 'https://scontent.fzyl2-2.fna.fbcdn.net/v/t39.30808-6/346868074_747880563801104_5042220215925177930_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KRpnzHLGdbgQ7kNvwGlbhwM&_nc_oc=Admvbgs2We413zQ5tEBGTOgIcheAv9q2uFwrgm4G2QQK2A4EavypJIvzf3idZkcufnA&_nc_zt=23&_nc_ht=scontent.fzyl2-2.fna&_nc_gid=ny4yrjYCS73TfrpZRFKYzw&oh=00_AfVwS-TIuKc3ORJxOkEYJcfyZP8GQrx86BKsiFD7BCYSgw&oe=68B8E4F3' },
  'default': { name: 'RH Business Club', role: 'Product Curator', avatar: 'https://scontent.fzyl2-2.fna.fbcdn.net/v/t39.30808-6/346868074_747880563801104_5042220215925177930_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KRpnzHLGdbgQ7kNvwGlbhwM&_nc_oc=Admvbgs2We413zQ5tEBGTOgIcheAv9q2uFwrgm4G2QQK2A4EavypJIvzf3idZkcufnA&_nc_zt=23&_nc_ht=scontent.fzyl2-2.fna&_nc_gid=ny4yrjYCS73TfrpZRFKYzw&oh=00_AfVwS-TIuKc3ORJxOkEYJcfyZP8GQrx86BKsiFD7BCYSgw&oe=68B8E4F3' }
};

const creatorInfo = computed(() => creators[props.product.category] || creators.default);

const creatorName = computed(() => creatorInfo.value.name);
const creatorRole = computed(() => creatorInfo.value.role);
const creatorAvatar = computed(() => creatorInfo.value.avatar);

const toggleLike = () => {
  isLiked.value = !isLiked.value;
  likeCount.value += isLiked.value ? 1 : -1;
};

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;
};

const openModal = () => productStore.openProductModal(props.product);
const handleAddToCart = () => productStore.addToCart(props.product);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>