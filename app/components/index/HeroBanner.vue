<template>
  <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
    <!-- Background -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-10" />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-quantum-500/5 via-transparent to-transparent" />
    </div>

    <!-- Content -->
    <div class="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6">
      <!-- Logo Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-8">
        <span class="w-2 h-2 bg-nextstop-500 rounded-full animate-pulse" />
        <span class="text-sm text-muted-foreground">Premium Commerce Platform</span>
      </div>

      <!-- Headline -->
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
        Curated Excellence for
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-quantum-500 via-elegance-500 to-nextstop-500">
          Refined Taste
        </span>
      </h1>

      <!-- Subheadline -->
      <p class="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
        Your premier commercial hub for sourcing high-quality specialized products
        and services across exclusive sectors.
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" @click="scrollToClips">
          <HugeiconsIcon :icon="PlayIcon" :size="20" class="mr-2" />
          Explore Now
        </Button>
        <Button variant="outline" size="lg" @click="navigateToProducts">
          Browse Products
        </Button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
        <div class="text-center">
          <p class="text-2xl font-bold text-foreground">500+</p>
          <p class="text-xs text-muted-foreground">Products</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-foreground">3</p>
          <p class="text-xs text-muted-foreground">Business Clubs</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-foreground">24/7</p>
          <p class="text-xs text-muted-foreground">Support</p>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
      <div class="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
        <div class="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-bounce" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'

import { HugeiconsIcon } from '@hugeicons/vue'
import { PlayIcon } from '@hugeicons/core-free-icons'

const router = useRouter()

const scrollToClips = () => {
  const clipSection = document.querySelector('#clip-section')
  clipSection?.scrollIntoView({ behavior: 'smooth' })
}

const navigateToProducts = () => {
  router.push('/products')
}
</script>