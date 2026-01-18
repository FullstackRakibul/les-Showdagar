<template>
  <section class="hero-section relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
    <!-- Animated Gradient Mesh Background -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Gradient Orbs -->
      <div class="gradient-orb gradient-orb--1" />
      <div class="gradient-orb gradient-orb--2" />
      <div class="gradient-orb gradient-orb--3" />

      <!-- Noise Texture Overlay -->
      <div class="absolute inset-0 bg-background/80 backdrop-blur-3xl z-[1]" />

      <!-- Grid Pattern -->
      <div class="grid-pattern absolute inset-0 z-[2]" />
    </div>

    <!-- Floating Ecommerce Elements -->
    <div class="floating-elements absolute inset-0 z-[3] pointer-events-none">
      <!-- Shopping Bag -->
      <div class="floating-icon floating-icon--1">
        <div class="icon-glass">
          <HugeiconsIcon :icon="ShoppingBag01Icon" :size="24" class="text-quantum-500" />
        </div>
      </div>

      <!-- Delivery Box -->
      <div class="floating-icon floating-icon--2">
        <div class="icon-glass">
          <HugeiconsIcon :icon="PackageIcon" :size="24" class="text-elegance-500" />
        </div>
      </div>

      <!-- Delivery Truck -->
      <div class="floating-icon floating-icon--3">
        <div class="icon-glass">
          <HugeiconsIcon :icon="TruckIcon" :size="24" class="text-nextstop-500" />
        </div>
      </div>

      <!-- Star/Premium -->
      <div class="floating-icon floating-icon--4">
        <div class="icon-glass">
          <HugeiconsIcon :icon="StarIcon" :size="24" class="text-yellow-500" />
        </div>
      </div>

      <!-- Gift Box -->
      <div class="floating-icon floating-icon--5">
        <div class="icon-glass">
          <HugeiconsIcon :icon="GiftIcon" :size="24" class="text-pink-500" />
        </div>
      </div>

      <!-- Credit Card -->
      <div class="floating-icon floating-icon--6">
        <div class="icon-glass">
          <HugeiconsIcon :icon="CreditCardIcon" :size="24" class="text-quantum-400" />
        </div>
      </div>

      <!-- Diamond/Luxury -->
      <div class="floating-icon floating-icon--7">
        <div class="icon-glass">
          <HugeiconsIcon :icon="DiamondIcon" :size="24" class="text-elegance-400" />
        </div>
      </div>

      <!-- Headphones -->
      <div class="floating-icon floating-icon--8">
        <div class="icon-glass">
          <HugeiconsIcon :icon="HeadphonesIcon" :size="24" class="text-cyan-500" />
        </div>
      </div>
    </div>

    <!-- Floating Particles -->
    <div class="particles absolute inset-0 z-[4] pointer-events-none">
      <div v-for="n in 20" :key="n" class="particle" :style="getParticleStyle(n)" />
    </div>

    <!-- Main Content -->
    <div class="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6">
      <!-- Animated Logo Badge -->
      <div class="badge-wrapper mb-8">
        <div
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/60 backdrop-blur-md border border-border/50 shadow-lg shadow-quantum-500/5 hover:shadow-quantum-500/10 hover:border-quantum-500/30 transition-all duration-500 cursor-default group">
          <span class="relative flex h-2.5 w-2.5">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-nextstop-500 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-nextstop-500"></span>
          </span>
          <span
            class="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">Premium
            Commerce Platform</span>
        </div>
      </div>

      <!-- Animated Headline -->
      <h1 class="headline text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
        <span class="headline-line headline-line--1">Curated Excellence for</span>
        <br />
        <span
          class="headline-gradient text-transparent bg-clip-text bg-gradient-to-r from-quantum-500 via-elegance-500 to-nextstop-500 bg-[length:200%_auto] animate-gradient">
          Refined Taste
        </span>
      </h1>

      <!-- Animated Subheadline -->
      <p class="subheadline text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
        Your premier commercial hub for sourcing high-quality specialized products
        and services across exclusive sectors.
      </p>

      <!-- Animated Actions -->
      <div class="actions-wrapper flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg"
          class="btn-primary group relative overflow-hidden shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
          @click="scrollToClips">
          <span class="relative z-10 flex items-center">
            <HugeiconsIcon :icon="PlayIcon" :size="20" class="mr-2 group-hover:scale-110 transition-transform" />
            Explore Now
          </span>
          <div class="btn-shimmer" />
        </Button>

        <Button variant="outline" size="lg"
          class="btn-secondary group backdrop-blur-sm bg-card/30 hover:bg-card/50 border-border/50 hover:border-quantum-500/50 transition-all duration-300"
          @click="navigateToProducts">
          <span class="group-hover:tracking-wide transition-all duration-300">Browse Products</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16"
            class="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <!-- Animated Stats -->
      <div class="stats-wrapper grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
        <div v-for="(stat, index) in stats" :key="stat.label" class="stat-item text-center group cursor-default"
          :style="{ animationDelay: `${0.6 + index * 0.1}s` }">
          <div
            class="stat-value text-3xl sm:text-4xl font-bold text-foreground group-hover:text-quantum-500 transition-colors duration-300">
            <span class="counter" :data-target="stat.value">{{ stat.display }}</span>
          </div>
          <p
            class="text-xs sm:text-sm text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors duration-300">
            {{ stat.label }}</p>
          <div
            class="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-quantum-500 to-elegance-500 mx-auto mt-2 transition-all duration-500 rounded-full" />
        </div>
      </div>
    </div>

    <!-- Enhanced Scroll Indicator -->
    <div class="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
      <div
        class="w-7 h-12 border-2 border-muted-foreground/20 rounded-full flex items-start justify-center p-1.5 backdrop-blur-sm bg-card/20 hover:border-quantum-500/50 transition-colors duration-300 cursor-pointer group"
        @click="scrollToClips">
        <div
          class="w-1.5 h-3 bg-muted-foreground/40 group-hover:bg-quantum-500 rounded-full animate-scroll-bounce transition-colors duration-300" />
      </div>
      <p
        class="text-[10px] text-muted-foreground/50 mt-2 tracking-widest uppercase group-hover:text-muted-foreground transition-colors">
        Scroll</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'

import { HugeiconsIcon } from '@hugeicons/vue'
import {
  PlayIcon,
  ArrowRight01Icon,
  ShoppingBag01Icon,
  PackageIcon,
  TruckIcon,
  StarIcon,
  GiftIcon,
  CreditCardIcon,
  DiamondIcon,
  HeadphonesIcon,
} from '@hugeicons/core-free-icons'

const router = useRouter()

// Stats data
const stats = [
  { value: 500, display: '500+', label: 'Products' },
  { value: 3, display: '3', label: 'Business Clubs' },
  { value: 24, display: '24/7', label: 'Support' },
]

// Generate random particle styles
const getParticleStyle = (index: number) => {
  const size = Math.random() * 4 + 2
  const left = Math.random() * 100
  const delay = Math.random() * 5
  const duration = Math.random() * 10 + 10

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  }
}

const scrollToClips = () => {
  const clipSection = document.querySelector('#clip-section')
  clipSection?.scrollIntoView({ behavior: 'smooth' })
}

const navigateToProducts = () => {
  router.push('/products')
}
</script>

<style scoped>
/* Animated Gradient Background Orbs */
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: orbFloat 20s ease-in-out infinite;
}

.gradient-orb--1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.2));
  top: -200px;
  left: -100px;
  animation-delay: 0s;
}

.gradient-orb--2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(236, 72, 153, 0.2));
  top: 50%;
  right: -150px;
  animation-delay: -7s;
}

.gradient-orb--3 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.15));
  bottom: -100px;
  left: 30%;
  animation-delay: -14s;
}

@keyframes orbFloat {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  25% {
    transform: translate(30px, -40px) scale(1.05);
  }

  50% {
    transform: translate(-20px, 30px) scale(0.95);
  }

  75% {
    transform: translate(40px, 20px) scale(1.02);
  }
}

/* Grid Pattern */
.grid-pattern {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
}

/* Floating Icon Glass Effect */
.icon-glass {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.floating-icon:hover .icon-glass {
  transform: scale(1.1);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

/* Floating Icons Positioning & Animation */
.floating-icon {
  position: absolute;
  animation: float 6s ease-in-out infinite;
  pointer-events: auto;
  cursor: pointer;
}

.floating-icon--1 {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.floating-icon--2 {
  top: 25%;
  right: 12%;
  animation-delay: -1s;
}

.floating-icon--3 {
  bottom: 30%;
  left: 8%;
  animation-delay: -2s;
}

.floating-icon--4 {
  top: 40%;
  right: 8%;
  animation-delay: -3s;
}

.floating-icon--5 {
  bottom: 20%;
  right: 15%;
  animation-delay: -4s;
}

.floating-icon--6 {
  top: 60%;
  left: 15%;
  animation-delay: -1.5s;
}

.floating-icon--7 {
  top: 10%;
  right: 25%;
  animation-delay: -2.5s;
}

.floating-icon--8 {
  bottom: 15%;
  left: 25%;
  animation-delay: -3.5s;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* Particles */
.particle {
  position: absolute;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(168, 85, 247, 0.6));
  border-radius: 50%;
  bottom: -20px;
  animation: rise linear infinite;
  opacity: 0;
}

@keyframes rise {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }

  10% {
    opacity: 0.6;
  }

  90% {
    opacity: 0.6;
  }

  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
}

/* Badge Animation */
.badge-wrapper {
  animation: fadeInDown 0.8s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Headline Animations */
.headline {
  overflow: hidden;
}

.headline-line--1 {
  display: inline-block;
  animation: slideInUp 0.8s ease-out 0.2s forwards;
  opacity: 0;
  transform: translateY(40px);
}

.headline-gradient {
  display: inline-block;
  animation: slideInUp 0.8s ease-out 0.4s forwards, gradient 4s ease infinite;
  opacity: 0;
  transform: translateY(40px);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradient {

  0%,
  100% {
    background-position: 0% center;
  }

  50% {
    background-position: 100% center;
  }
}

.animate-gradient {
  animation: gradient 4s ease infinite;
}

/* Subheadline Animation */
.subheadline {
  animation: fadeIn 0.8s ease-out 0.5s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Actions Animation */
.actions-wrapper {
  animation: fadeInUp 0.8s ease-out 0.6s forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button Shimmer Effect */
.btn-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

/* Stats Animation */
.stat-item {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Scroll Indicator Animation */
.scroll-indicator {
  animation: fadeIn 1s ease-out 1s forwards;
  opacity: 0;
}

@keyframes scroll-bounce {

  0%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }

  50% {
    transform: translateY(8px);
    opacity: 1;
  }
}

.animate-scroll-bounce {
  animation: scroll-bounce 2s ease-in-out infinite;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .floating-icon {
    display: none;
  }

  .gradient-orb {
    opacity: 0.3;
  }

  .gradient-orb--1 {
    width: 300px;
    height: 300px;
  }

  .gradient-orb--2 {
    width: 250px;
    height: 250px;
  }

  .gradient-orb--3 {
    width: 200px;
    height: 200px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {

  .gradient-orb,
  .floating-icon,
  .particle,
  .badge-wrapper,
  .headline-line--1,
  .headline-gradient,
  .subheadline,
  .actions-wrapper,
  .stat-item,
  .scroll-indicator,
  .btn-shimmer {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>