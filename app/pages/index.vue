<template>
  <div class="min-h-screen">
    <!-- 1. Full-Screen Hero Banner -->
    <HeroBanner />

    <!-- 2. Clip Cart Section -->
    <div id="clip-section">
      <ClipCartSection />
    </div>

    <!-- 3. Business Clubs Section -->
    <BusinessClubsSection />

    <!-- 4. E-Commerce Product Section -->
    <FeaturedProducts />

    <!-- 5. Product Request Section -->
    <ProductRequestSection />
  </div>
</template>

<script setup lang="ts">
import HeroBanner from '@/components/index/HeroBanner.vue'
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