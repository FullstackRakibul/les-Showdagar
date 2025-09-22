<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="productStore.showProductModal && productStore.selectedProduct"
        class="fixed inset-0 z-[9999] overflow-y-auto transition duration-300">
        <div class="flex items-center justify-center min-h-screen px-4 py-8">
          <div class="fixed inset-0 bg-black bg-opacity-50" @click="productStore.closeProductModal"></div>

          <div
            class="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <button @click="productStore.closeProductModal"
              class="absolute top-6 right-6 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200">
              <X class="w-6 h-6" />
            </button>

            <div class="flex flex-col lg:flex-row max-h-[80vh] overflow-y-auto">
              <!-- Left side with reels section and main product image -->
              <div class="lg:w-1/2 p-6">
                <!-- Reels Section -->
                <div class="mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Play class="w-5 h-5 mr-2 text-red-500" />
                    Product Reels
                  </h3>
                  <div class="grid grid-cols-2 gap-3">
                    <div v-for="reel in productReels" :key="reel.id"
                      class="relative aspect-[9/16] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-300"
                      @click="playReel(reel)">
                      <img :src="reel.thumbnail" :alt="reel.title" class="w-full h-full object-cover" />
                      <div
                        class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                        <div class="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                          <Play class="w-6 h-6 text-gray-800 ml-1" />
                        </div>
                      </div>
                      <div class="absolute bottom-2 left-2 right-2">
                        <p class="text-white text-xs font-medium line-clamp-2">{{ reel.title }}</p>
                        <div class="flex items-center mt-1 text-white text-xs">
                          <Eye class="w-3 h-3 mr-1" />
                          <span>{{ reel.views }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Main Product Image -->
                <div class="relative">
                  <img :src="product.image" :alt="product.name" class="w-full rounded-2xl object-cover shadow-lg"
                    style="max-height: 400px" />
                  <div class="absolute top-4 left-4 flex flex-col space-y-2">
                    <span v-if="product.isNew"
                      class="bg-emerald-500 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-sm">NEW</span>
                    <span v-if="product.isHot"
                      class="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-sm">🔥 HOT</span>
                  </div>
                </div>
              </div>

              <!-- Right side with social media style product details -->
              <div class="lg:w-1/2 p-6 lg:py-8 ">


                  <!-- Creator info -->
                  <div class="  flex items-center mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <img :src="creatorAvatar" :alt="creatorName"
                      class="w-12 h-12 rounded-full object-cover border-2 border-gray-200" />
                    <div class="ml-3 flex-1">
                      <h4 class="font-semibold text-gray-900 dark:text-white">{{ creatorName }}</h4>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ creatorRole }}</p>
                    </div>
                    <button
                      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Follow
                    </button>
                  </div>

                  <p v-if="product.brand"
                    class="text-sm text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide font-medium">
                    {{ product.brand }}
                  </p>
                  <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {{ product.name }}
                  </h2>

                  <!-- Social engagement stats -->
                  <div class="flex items-center space-x-6 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-center">
                      <div class="text-xl font-bold text-gray-900 dark:text-white">{{ likeCount }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Likes</div>
                    </div>
                    <div class="text-center">
                      <div class="text-xl font-bold text-gray-900 dark:text-white">{{ product.reviews }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Comments</div>
                    </div>
                    <div class="text-center">
                      <div class="text-xl font-bold text-gray-900 dark:text-white">{{ shareCount }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Shares</div>
                    </div>
                    <div class="text-center">
                      <div class="flex text-yellow-400 justify-center mb-1">
                        <Star class="w-4 h-4 fill-current" />
                      </div>
                      <div class="text-xl font-bold text-gray-900 dark:text-white">{{ product.rating }}</div>
                    </div>
                  </div>

                  <div class="flex items-center mb-6">
                    <span class="text-4xl font-bold text-gray-900 dark:text-white">৳{{ product.price }}</span>
                    <span v-if="product.originalPrice" class="text-xl text-gray-500 line-through ml-4">৳{{
                      product.originalPrice }}</span>
                    <span v-if="product.originalPrice"
                      class="ml-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Save ৳{{
                      (product.originalPrice - product.price).toFixed(2) }}</span>
                  </div>

                  <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {{ product.description }}
                  </p>

                  <!-- Social media style action buttons -->
                  <div class="flex space-x-3 mb-6">
                    <button @click="handleAddToCart" :disabled="!product.inStock"
                      class="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 px-6 rounded-xl transition-all duration-300 font-bold text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                      <ShoppingCart class="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                    <button @click="toggleLike"
                      class="w-16 h-16 border-2 border-gray-300 dark:border-gray-600 hover:border-red-500 rounded-xl transition-colors flex items-center justify-center"
                      :class="{ 'border-red-500 text-red-500': isLiked, 'text-gray-400 hover:text-red-500': !isLiked }">
                      <Heart class="w-6 h-6" :class="{ 'fill-current': isLiked }" />
                    </button>
                    <button
                      class="w-16 h-16 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:text-blue-500 rounded-xl transition-colors flex items-center justify-center text-gray-400">
                      <Share class="w-6 h-6" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed } from "vue";
import { X, Star, ShoppingCart, Heart, Share, Play, Eye } from "lucide-vue-next";
import { useProductStore } from "@/stores/products";

const productStore = useProductStore();

const product = computed(() => productStore.selectedProduct || {});
const isLiked = ref(false);
const likeCount = ref(Math.floor(Math.random() * 500) + 50);
const shareCount = ref(Math.floor(Math.random() * 100) + 20);

const creatorInfo = computed(() => {
  const creators = {
    'Electronics': { name: 'TechReviewer', role: 'Tech Enthusiast', avatar: 'https://scontent.fzyl2-2.fna.fbcdn.net/v/t39.30808-6/346868074_747880563801104_5042220215925177930_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KRpnzHLGdbgQ7kNvwGlbhwM&_nc_oc=Admvbgs2We413zQ5tEBGTOgIcheAv9q2uFwrgm4G2QQK2A4EavypJIvzf3idZkcufnA&_nc_zt=23&_nc_ht=scontent.fzyl2-2.fna&_nc_gid=ny4yrjYCS73TfrpZRFKYzw&oh=00_AfVwS-TIuKc3ORJxOkEYJcfyZP8GQrx86BKsiFD7BCYSgw&oe=68B8E4F3' },
    'Sports': { name: 'SportsPro', role: 'Athlete', avatar: 'https://scontent.fzyl2-2.fna.fbcdn.net/v/t39.30808-6/346868074_747880563801104_5042220215925177930_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KRpnzHLGdbgQ7kNvwGlbhwM&_nc_oc=Admvbgs2We413zQ5tEBGTOgIcheAv9q2uFwrgm4G2QQK2A4EavypJIvzf3idZkcufnA&_nc_zt=23&_nc_ht=scontent.fzyl2-2.fna&_nc_gid=ny4yrjYCS73TfrpZRFKYzw&oh=00_AfVwS-TIuKc3ORJxOkEYJcfyZP8GQrx86BKsiFD7BCYSgw&oe=68B8E4F3' },
    'Gaming': { name: 'GameMaster', role: 'Pro Gamer', avatar: 'https://scontent.fzyl2-2.fna.fbcdn.net/v/t39.30808-6/346868074_747880563801104_5042220215925177930_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KRpnzHLGdbgQ7kNvwGlbhwM&_nc_oc=Admvbgs2We413zQ5tEBGTOgIcheAv9q2uFwrgm4G2QQK2A4EavypJIvzf3idZkcufnA&_nc_zt=23&_nc_ht=scontent.fzyl2-2.fna&_nc_gid=ny4yrjYCS73TfrpZRFKYzw&oh=00_AfVwS-TIuKc3ORJxOkEYJcfyZP8GQrx86BKsiFD7BCYSgw&oe=68B8E4F3' },
    'Photography': { name: 'PhotoExpert', role: 'Photographer', avatar: 'https://scontent.fzyl2-2.fna.fbcdn.net/v/t39.30808-6/346868074_747880563801104_5042220215925177930_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KRpnzHLGdbgQ7kNvwGlbhwM&_nc_oc=Admvbgs2We413zQ5tEBGTOgIcheAv9q2uFwrgm4G2QQK2A4EavypJIvzf3idZkcufnA&_nc_zt=23&_nc_ht=scontent.fzyl2-2.fna&_nc_gid=ny4yrjYCS73TfrpZRFKYzw&oh=00_AfVwS-TIuKc3ORJxOkEYJcfyZP8GQrx86BKsiFD7BCYSgw&oe=68B8E4F3' },
    'default': { name: 'ShopInfluencer', role: 'Product Curator', avatar: 'https://scontent.fzyl2-2.fna.fbcdn.net/v/t39.30808-6/346868074_747880563801104_5042220215925177930_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KRpnzHLGdbgQ7kNvwGlbhwM&_nc_oc=Admvbgs2We413zQ5tEBGTOgIcheAv9q2uFwrgm4G2QQK2A4EavypJIvzf3idZkcufnA&_nc_zt=23&_nc_ht=scontent.fzyl2-2.fna&_nc_gid=ny4yrjYCS73TfrpZRFKYzw&oh=00_AfVwS-TIuKc3ORJxOkEYJcfyZP8GQrx86BKsiFD7BCYSgw&oe=68B8E4F3' }
  };
  return creators[product.value.category] || creators.default;
});

const creatorName = computed(() => creatorInfo.value.name);
const creatorRole = computed(() => creatorInfo.value.role);
const creatorAvatar = computed(() => creatorInfo.value.avatar);

const productReels = computed(() => [
  {
    id: 1,
    title: `${product.value.name} - Unboxing & First Look`,
    thumbnail: '/tech-unboxing-thumbnail.png',
    views: '12.5K'
  },
  {
    id: 2,
    title: `Why I Love This ${product.value.category} Product`,
    thumbnail: '/sports-gear-thumbnail.png',
    views: '8.2K'
  },
  {
    id: 3,
    title: `${product.value.brand} vs Competition`,
    thumbnail: '/gaming-setup-thumbnail.png',
    views: '15.1K'
  },
  {
    id: 4,
    title: `Setup & Usage Tips`,
    thumbnail: '/home-decor-thumbnail.png',
    views: '6.8K'
  }
]);

const toggleLike = () => {
  isLiked.value = !isLiked.value;
  likeCount.value += isLiked.value ? 1 : -1;
};

const playReel = (reel) => {
  console.log('Playing reel:', reel.title);
  // Here you would implement reel playback functionality
};

const handleAddToCart = () => {
  if (product.value) {
    productStore.addToCart(product.value);
    productStore.closeProductModal();
  }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>