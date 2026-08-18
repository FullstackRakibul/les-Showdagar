<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="aspect-square bg-muted rounded-2xl animate-pulse" />
      <div class="space-y-4">
        <div class="h-8 bg-muted rounded-xl animate-pulse w-3/4" />
        <div class="h-4 bg-muted rounded animate-pulse w-1/2" />
        <div class="h-12 bg-muted rounded-xl animate-pulse w-1/3" />
      </div>
    </div>

    <!-- Not found -->
    <div v-else-if="!product" class="py-20 text-center space-y-4">
      <p class="text-muted-foreground">Product not found.</p>
      <NuxtLink to="/browse" class="text-sm font-medium text-foreground underline underline-offset-2">Back to browse</NuxtLink>
    </div>

    <!-- Product detail -->
    <div v-else class="space-y-8">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <NuxtLink to="/browse" class="hover:text-foreground transition-colors">Browse</NuxtLink>
        <span>›</span>
        <NuxtLink :to="`/category/${product.categoryId}`" class="hover:text-foreground transition-colors capitalize">{{ product.category }}</NuxtLink>
        <span>›</span>
        <span class="text-foreground truncate max-w-40">{{ product.name }}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Images -->
        <div class="space-y-3">
          <div class="aspect-square bg-muted rounded-2xl overflow-hidden">
            <img :src="activeImage" :alt="product.name" class="w-full h-full object-cover" />
          </div>
          <div v-if="product.images.length > 1" class="flex gap-2">
            <button v-for="(img, i) in product.images" :key="i" @click="activeImage = img"
              :class="['w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors', activeImage === img ? 'border-ring' : 'border-border']">
              <img :src="img" :alt="`View ${i + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="space-y-5">
          <!-- Badge + title -->
          <div>
            <span class="text-[10px] font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{{ product.category }}</span>
            <h1 class="text-xl font-bold text-foreground mt-2 leading-snug">{{ product.name }}</h1>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs text-yellow-500">★</span>
              <span class="text-xs text-muted-foreground">{{ product.rating }} · {{ product.reviews }} reviews</span>
              <span v-if="product.brand" class="text-xs text-muted-foreground">· {{ product.brand }}</span>
            </div>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-3">
            <Price :amount="product.price" class="text-3xl font-bold text-foreground" />
            <Price v-if="product.originalPrice" :amount="product.originalPrice" class="text-lg text-muted-foreground line-through" />
            <span v-if="product.originalPrice" class="text-xs font-semibold text-nextstop-600 bg-nextstop-50 px-2 py-0.5 rounded-full">
              {{ Math.round((1 - product.price / product.originalPrice) * 100) }}% off
            </span>
          </div>

          <!-- Stock -->
          <div class="flex items-center gap-2">
            <div :class="['w-2 h-2 rounded-full', product.inStock ? 'bg-nextstop-500' : 'bg-destructive']" />
            <span class="text-sm" :class="product.inStock ? 'text-nextstop-600' : 'text-destructive'">
              {{ product.inStock ? `In Stock (${product.stock})` : 'Out of Stock' }}
            </span>
          </div>

          <!-- Color selector -->
          <div v-if="product.colors?.length">
            <p class="text-xs font-medium text-muted-foreground mb-2">Color: <span class="text-foreground">{{ selectedColor }}</span></p>
            <div class="flex flex-wrap gap-2">
              <button v-for="color in product.colors" :key="color" @click="selectedColor = color"
                :class="['px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors', selectedColor === color ? 'border-ring bg-muted text-foreground' : 'border-border text-muted-foreground hover:border-muted-foreground/40']">
                {{ color }}
              </button>
            </div>
          </div>

          <!-- Size selector -->
          <div v-if="product.sizes?.length">
            <p class="text-xs font-medium text-muted-foreground mb-2">Size: <span class="text-foreground">{{ selectedSize }}</span></p>
            <div class="flex flex-wrap gap-2">
              <button v-for="size in product.sizes" :key="size" @click="selectedSize = size"
                :class="['w-10 h-10 rounded-xl border text-xs font-medium transition-colors', selectedSize === size ? 'border-ring bg-muted text-foreground' : 'border-border text-muted-foreground hover:border-muted-foreground/40']">
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Quantity + Add to Cart -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
              <button @click="qty = Math.max(1, qty - 1)" class="w-6 h-6 flex items-center justify-center text-foreground font-bold">−</button>
              <span class="text-sm font-medium w-6 text-center">{{ qty }}</span>
              <button @click="qty++" class="w-6 h-6 flex items-center justify-center text-foreground font-bold">+</button>
            </div>
            <ClipToCartButton :product="product" :selected-color="selectedColor" :selected-size="selectedSize" :quantity="qty" class="flex-1" />
          </div>

          <!-- Description -->
          <div class="border-t border-border pt-4">
            <p class="text-sm text-muted-foreground leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Specs -->
          <div v-if="product.specifications && Object.keys(product.specifications).length" class="border-t border-border pt-4 space-y-2">
            <h3 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Specifications</h3>
            <dl class="space-y-1.5">
              <div v-for="(val, key) in product.specifications" :key="key" class="flex gap-3 text-sm">
                <dt class="text-muted-foreground min-w-24">{{ key }}</dt>
                <dd class="text-foreground font-medium">{{ val }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <!-- Related products -->
      <div v-if="related.length > 0" class="border-t border-border pt-8">
        <h2 class="text-base font-semibold text-foreground mb-4">More from {{ product.category }}</h2>
        <ProductGrid :products="related" :columns="4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/products'
import type { Product } from '@/types/index'

const route = useRoute()
const slug = route.params.slug as string
const productStore = useProductStore()

const product = ref<Product | undefined>()
const loading = ref(true)
const qty = ref(1)
const selectedColor = ref('')
const selectedSize = ref('')
const activeImage = ref('')

const related = computed(() =>
  product.value
    ? productStore.products.filter(p => p.category === product.value!.category && p.id !== product.value!.id).slice(0, 4)
    : [],
)

onMounted(async () => {
  product.value = await productStore.fetchProductBySlug(slug)
  if (product.value) {
    activeImage.value = product.value.image
    selectedColor.value = product.value.colors?.[0] ?? ''
    selectedSize.value = product.value.sizes?.[0] ?? ''
  }
  loading.value = false
})

useHead(() => ({ title: product.value ? `${product.value.name} — RH Business Club` : 'Product' }))
</script>
