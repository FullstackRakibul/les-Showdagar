<template>
  <section class="py-20 bg-card/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl font-semibold text-foreground mb-3">
          Our Specialized Business Clubs
        </h2>
        <p class="text-muted-foreground max-w-xl mx-auto">
          Three distinct subsidiaries, one unified platform
        </p>
      </div>

      <!-- Clubs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Quantum Club -->
        <Card class="group relative overflow-hidden border-border hover:border-quantum-500/50 transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-quantum-500/10 rounded-bl-full" />
          <CardContent class="p-8">
            <div
              class="w-14 h-14 bg-quantum-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <HugeiconsIcon :icon="CpuIcon" :size="28" class="text-quantum-500" />
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-2">Quantum Club</h3>
            <p class="text-sm text-quantum-500 font-medium mb-4 uppercase tracking-wide">
              Tech-Inspired Quality Products
            </p>
            <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
              Latest high-quality and innovative technology goods, gadgets, and smart solutions.
            </p>
            <Button variant="ghost" class="text-quantum-500 hover:text-quantum-400 p-0"
              @click="navigateToClub('quantum')">
              Explore Tech
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" class="ml-2" />
            </Button>
          </CardContent>
        </Card>

        <!-- Elegance Club -->
        <Card class="group relative overflow-hidden border-border hover:border-elegance-500/50 transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-elegance-500/10 rounded-bl-full" />
          <CardContent class="p-8">
            <div
              class="w-14 h-14 bg-elegance-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <HugeiconsIcon :icon="DiamondIcon" :size="28" class="text-elegance-500" />
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-2">Elegance Club</h3>
            <p class="text-sm text-elegance-500 font-medium mb-4 uppercase tracking-wide">
              Premium Fashion & Lifestyle
            </p>
            <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
              Curated premium and designer fashion, accessories, and luxury lifestyle items.
            </p>
            <Button variant="ghost" class="text-elegance-500 hover:text-elegance-400 p-0"
              @click="navigateToClub('elegance')">
              Explore Fashion
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" class="ml-2" />
            </Button>
          </CardContent>
        </Card>

        <!-- NextStop Club -->
        <Card class="group relative overflow-hidden border-border hover:border-nextstop-500/50 transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-nextstop-500/10 rounded-bl-full" />
          <CardContent class="p-8">
            <div
              class="w-14 h-14 bg-nextstop-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <HugeiconsIcon :icon="Airplane01Icon" :size="28" class="text-nextstop-500" />
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-2">NextStop Club</h3>
            <p class="text-sm text-nextstop-500 font-medium mb-4 uppercase tracking-wide">
              Travel & Visa Services
            </p>
            <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
              Comprehensive global travel, logistics, and visa/immigration consultation.
            </p>
            <Button variant="ghost" class="text-nextstop-500 hover:text-nextstop-400 p-0"
              @click="navigateToClub('nextstop')">
              Get Consultation
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" class="ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  CpuIcon,
  DiamondIcon,
  Airplane01Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons'

const router = useRouter()

const navigateToClub = (club: string) => {
  router.push(`/products?club=${club}`)
}
</script>