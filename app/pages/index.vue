<template>
  <div class="min-h-screen full-bleed">
    <!-- 1. Full-Screen Hero Search -->
    <HeroSearch />
    <!-- 2. Clip Cart Section -->
    <div id="clip-section">
      <ClipCartSection />
    </div>
    <!-- 3. E-Commerce Product Section -->
    <FeaturedProducts />
    <!-- 4. Business Clubs Section -->
    <BusinessClubsSection />
    <!-- 5. Product Request Section -->
    <ProductRequestSection />
  </div>
</template>

<script setup lang="ts">
import HeroSearch from '@/components/index/HeroSearch.vue'
import ClipCartSection from '@/components/clip/ClipCartSection.vue'
import BusinessClubsSection from '@/components/index/BusinessClubsSection.vue'
import FeaturedProducts from '@/components/index/FeaturedProducts.vue'
import ProductRequestSection from '@/components/index/ProductRequestSection.vue'

// Page meta
useHead({
  title: 'RH Business Club - Premium Commerce Platform',
  meta: [
    { name: 'description', content: 'Your premier commercial hub for sourcing high-quality specialized products and services across exclusive sectors.' }
  ]
})
</script>