<template>
  <section class="clubs-section py-20 bg-card/50">
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
        <div class="club-card club-card--quantum group">
          <Card
            class="relative overflow-hidden border-border h-full transition-all duration-500 ease-out hover:border-quantum-500/60 hover:shadow-2xl hover:shadow-quantum-500/20">
            <!-- Animated Background Decorations -->
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-quantum-500/10 rounded-bl-full transition-all duration-500 group-hover:w-40 group-hover:h-40 group-hover:bg-quantum-500/20" />
            <div
              class="absolute -bottom-10 -left-10 w-24 h-24 bg-quantum-500/5 rounded-full transition-all duration-700 group-hover:w-32 group-hover:h-32 group-hover:bg-quantum-500/10" />

            <!-- Gradient Overlay on Hover -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-quantum-500/0 via-transparent to-quantum-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <CardContent class="p-8 relative z-10">
              <!-- Animated Icon Container -->
              <div
                class="icon-wrapper w-14 h-14 bg-quantum-500/20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-quantum-500/30 group-hover:shadow-lg group-hover:shadow-quantum-500/25">
                <HugeiconsIcon :icon="CpuIcon" :size="28"
                  class="text-quantum-500 transition-all duration-300 group-hover:scale-110" />
              </div>

              <!-- Title with Slide Effect -->
              <h3
                class="text-xl font-semibold text-foreground mb-2 transition-all duration-300 group-hover:translate-x-1">
                Quantum Club</h3>

              <!-- Subtitle with Color Pulse -->
              <p
                class="text-sm text-quantum-500 font-medium mb-4 uppercase tracking-wide transition-all duration-300 group-hover:tracking-wider">
                Tech-Inspired Quality Products
              </p>

              <!-- Description with Fade -->
              <p
                class="text-muted-foreground text-sm mb-6 leading-relaxed transition-all duration-300 group-hover:text-foreground/80">
                Latest high-quality and innovative technology goods, gadgets, and smart solutions.
              </p>

              <!-- Animated Button -->
              <Button variant="ghost"
                class="btn-explore text-quantum-500 hover:text-quantum-400 p-0 transition-all duration-300 group-hover:translate-x-2"
                @click="navigateToClub('quantum')">
                Explore Tech
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="16"
                  class="ml-2 transition-all duration-300 group-hover:translate-x-1" />
              </Button>
            </CardContent>

            <!-- Bottom Accent Line -->
            <div
              class="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-quantum-500 to-quantum-400 w-0 group-hover:w-full transition-all duration-500 ease-out" />
          </Card>
        </div>

        <!-- Elegance Club -->
        <div class="club-card club-card--elegance group">
          <Card
            class="relative overflow-hidden border-border h-full transition-all duration-500 ease-out hover:border-elegance-500/60 hover:shadow-2xl hover:shadow-elegance-500/20">
            <!-- Animated Background Decorations -->
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-elegance-500/10 rounded-bl-full transition-all duration-500 group-hover:w-40 group-hover:h-40 group-hover:bg-elegance-500/20" />
            <div
              class="absolute -bottom-10 -left-10 w-24 h-24 bg-elegance-500/5 rounded-full transition-all duration-700 group-hover:w-32 group-hover:h-32 group-hover:bg-elegance-500/10" />

            <!-- Gradient Overlay on Hover -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-elegance-500/0 via-transparent to-elegance-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <CardContent class="p-8 relative z-10">
              <!-- Animated Icon Container -->
              <div
                class="icon-wrapper w-14 h-14 bg-elegance-500/20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-elegance-500/30 group-hover:shadow-lg group-hover:shadow-elegance-500/25">
                <HugeiconsIcon :icon="DiamondIcon" :size="28"
                  class="text-elegance-500 transition-all duration-300 group-hover:scale-110" />
              </div>

              <!-- Title with Slide Effect -->
              <h3
                class="text-xl font-semibold text-foreground mb-2 transition-all duration-300 group-hover:translate-x-1">
                Elegance Club</h3>

              <!-- Subtitle with Color Pulse -->
              <p
                class="text-sm text-elegance-500 font-medium mb-4 uppercase tracking-wide transition-all duration-300 group-hover:tracking-wider">
                Premium Fashion & Lifestyle
              </p>

              <!-- Description with Fade -->
              <p
                class="text-muted-foreground text-sm mb-6 leading-relaxed transition-all duration-300 group-hover:text-foreground/80">
                Curated premium and designer fashion, accessories, and luxury lifestyle items.
              </p>

              <!-- Animated Button -->
              <Button variant="ghost"
                class="btn-explore text-elegance-500 hover:text-elegance-400 p-0 transition-all duration-300 group-hover:translate-x-2"
                @click="navigateToClub('elegance')">
                Explore Fashion
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="16"
                  class="ml-2 transition-all duration-300 group-hover:translate-x-1" />
              </Button>
            </CardContent>

            <!-- Bottom Accent Line -->
            <div
              class="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-elegance-500 to-elegance-400 w-0 group-hover:w-full transition-all duration-500 ease-out" />
          </Card>
        </div>

        <!-- NextStop Club -->
        <div class="club-card club-card--nextstop group">
          <Card
            class="relative overflow-hidden border-border h-full transition-all duration-500 ease-out hover:border-nextstop-500/60 hover:shadow-2xl hover:shadow-nextstop-500/20">
            <!-- Animated Background Decorations -->
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-nextstop-500/10 rounded-bl-full transition-all duration-500 group-hover:w-40 group-hover:h-40 group-hover:bg-nextstop-500/20" />
            <div
              class="absolute -bottom-10 -left-10 w-24 h-24 bg-nextstop-500/5 rounded-full transition-all duration-700 group-hover:w-32 group-hover:h-32 group-hover:bg-nextstop-500/10" />

            <!-- Gradient Overlay on Hover -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-nextstop-500/0 via-transparent to-nextstop-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <CardContent class="p-8 relative z-10">
              <!-- Animated Icon Container -->
              <div
                class="icon-wrapper w-14 h-14 bg-nextstop-500/20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-nextstop-500/30 group-hover:shadow-lg group-hover:shadow-nextstop-500/25">
                <HugeiconsIcon :icon="Airplane01Icon" :size="28"
                  class="text-nextstop-500 transition-all duration-300 group-hover:scale-110" />
              </div>

              <!-- Title with Slide Effect -->
              <h3
                class="text-xl font-semibold text-foreground mb-2 transition-all duration-300 group-hover:translate-x-1">
                NextStop Club</h3>

              <!-- Subtitle with Color Pulse -->
              <p
                class="text-sm text-nextstop-500 font-medium mb-4 uppercase tracking-wide transition-all duration-300 group-hover:tracking-wider">
                Travel & Visa Services
              </p>

              <!-- Description with Fade -->
              <p
                class="text-muted-foreground text-sm mb-6 leading-relaxed transition-all duration-300 group-hover:text-foreground/80">
                Comprehensive global travel, logistics, and visa/immigration consultation.
              </p>

              <!-- Animated Button -->
              <Button variant="ghost"
                class="btn-explore text-nextstop-500 hover:text-nextstop-400 p-0 transition-all duration-300 group-hover:translate-x-2"
                @click="navigateToClub('nextstop')">
                Get Consultation
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="16"
                  class="ml-2 transition-all duration-300 group-hover:translate-x-1" />
              </Button>
            </CardContent>

            <!-- Bottom Accent Line -->
            <div
              class="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-nextstop-500 to-nextstop-400 w-0 group-hover:w-full transition-all duration-500 ease-out" />
          </Card>
        </div>
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

<style scoped>
/* Card Container with 3D Transform */
.club-card {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.club-card :deep(.card) {
  transform: translateY(0) rotateX(0);
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.club-card:hover :deep(.card) {
  transform: translateY(-8px) rotateX(2deg);
}

/* Icon Pulse Animation */
.club-card:hover .icon-wrapper {
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {

  0%,
  100% {
    box-shadow: 0 0 0 0 currentColor;
  }

  50% {
    box-shadow: 0 0 20px 4px currentColor;
  }
}

/* Quantum specific pulse color */
.club-card--quantum:hover .icon-wrapper {
  animation: quantumPulse 2s ease-in-out infinite;
}

@keyframes quantumPulse {

  0%,
  100% {
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.25);
  }

  50% {
    box-shadow: 0 4px 25px rgba(59, 130, 246, 0.5);
  }
}

/* Elegance specific pulse color */
.club-card--elegance:hover .icon-wrapper {
  animation: elegancePulse 2s ease-in-out infinite;
}

@keyframes elegancePulse {

  0%,
  100% {
    box-shadow: 0 4px 15px rgba(168, 85, 247, 0.25);
  }

  50% {
    box-shadow: 0 4px 25px rgba(168, 85, 247, 0.5);
  }
}

/* NextStop specific pulse color */
.club-card--nextstop:hover .icon-wrapper {
  animation: nextstopPulse 2s ease-in-out infinite;
}

@keyframes nextstopPulse {

  0%,
  100% {
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
  }

  50% {
    box-shadow: 0 4px 25px rgba(16, 185, 129, 0.5);
  }
}

/* Staggered entrance animation */
.club-card {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.club-card:nth-child(1) {
  animation-delay: 0.1s;
}

.club-card:nth-child(2) {
  animation-delay: 0.2s;
}

.club-card:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button arrow bounce on hover */
.club-card:hover .btn-explore :deep(svg:last-child) {
  animation: arrowBounce 1s ease-in-out infinite;
}

@keyframes arrowBounce {

  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(4px);
  }
}

/* Smooth scroll reveal for section */
.clubs-section {
  overflow: hidden;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {

  .club-card,
  .club-card:hover :deep(.card),
  .icon-wrapper,
  .btn-explore {
    animation: none !important;
    transition: none !important;
  }
}
</style>