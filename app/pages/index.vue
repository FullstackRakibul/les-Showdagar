<template>
  <div class="min-h-screen bg-background">
    <!-- 1. HERO SECTION - Immersive Intro -->
    <section class="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <!-- Background Gradient -->
      <div class="absolute inset-0 opacity-30 pointer-events-none">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div class="relative z-10 text-center max-w-4xl mx-auto">
        <div class="mb-8 opacity-0 animate-fade-in-down">
          <h1 class="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-6 text-balance">
            {{ product.name }}
          </h1>
          <p class="text-xl sm:text-2xl text-muted-foreground font-light mb-8">
            {{ product.tagline }}
          </p>
          <p class="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <!-- Hero CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up" style="animation-delay: 0.2s">
          <Button size="lg" @click="scrollToSection('preorder-section')" class="px-8">
            Explore Now
          </Button>
          <Button size="lg" variant="outline" @click="scrollToSection('features')" class="px-8">
            See Features
          </Button>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div class="text-xs text-muted-foreground uppercase tracking-widest">Scroll</div>
          <div class="mt-2">
            <HugeiconsIcon :icon="ChevronDownIcon" :size="20" class="text-muted-foreground animate-pulse" />
          </div>
        </div>
      </div>
    </section>

    <!-- 2. HERO IMAGE SECTION -->
    <section class="relative py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <img 
          :src="product.heroImage" 
          :alt="product.name" 
          class="w-full h-96 sm:h-[500px] object-cover rounded-2xl shadow-2xl"
        />
      </div>
    </section>

    <!-- 3. FEATURES SCROLLYTELLING SECTION -->
    <section id="features" class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-5xl sm:text-6xl font-bold mb-4 text-balance">Why Calcifer</h2>
        <p class="text-lg text-muted-foreground mb-20 max-w-2xl">
          Every feature, meticulously designed. Every detail, obsessively refined.
        </p>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div 
            v-for="(feature, idx) in product.features" 
            :key="idx"
            class="group"
          >
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {{ feature.icon }}
            </div>
            <h3 class="text-2xl font-semibold mb-3">{{ feature.title }}</h3>
            <p class="text-muted-foreground leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. TECH SPECS SECTION -->
    <section id="specs" class="py-32 px-6 bg-muted/30">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-5xl sm:text-6xl font-bold mb-4 text-balance">Technical Excellence</h2>
        <p class="text-lg text-muted-foreground mb-20 max-w-2xl">
          Engineered precision. Built for perfection.
        </p>

        <!-- Specs Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(value, key) in product.specs" 
            :key="key"
            class="bg-background rounded-xl p-6 border border-border"
          >
            <p class="text-sm text-muted-foreground uppercase tracking-widest mb-2">{{ key }}</p>
            <p class="text-xl font-semibold text-foreground">{{ value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. GALLERY SECTION -->
    <section class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-5xl sm:text-6xl font-bold mb-4 text-balance">Designed for You</h2>
        <p class="text-lg text-muted-foreground mb-20 max-w-2xl">
          Crafted with precision. Refined through obsession.
        </p>

        <!-- Image Gallery -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(img, idx) in product.galleryImages" 
            :key="idx"
            class="aspect-square overflow-hidden rounded-xl group cursor-pointer"
          >
            <img 
              :src="img" 
              :alt="`Gallery ${idx + 1}`" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 6. ECOSYSTEM SECTION -->
    <section id="ecosystem" class="py-32 px-6 bg-muted/30">
      <div class="max-w-7xl mx-auto">
        <div class="max-w-3xl">
          <h2 class="text-5xl sm:text-6xl font-bold mb-4">{{ product.ecosystem.name }}</h2>
          <p class="text-xl text-muted-foreground mb-12">{{ product.ecosystem.tagline }}</p>
          
          <div class="space-y-4">
            <div 
              v-for="(feature, idx) in product.ecosystem.features" 
              :key="idx"
              class="flex items-start gap-4 p-4 rounded-lg hover:bg-background/50 transition-colors"
            >
              <div class="flex-shrink-0 mt-1">
                <HugeiconsIcon :icon="CheckIcon" :size="20" class="text-accent" />
              </div>
              <p class="text-lg text-foreground">{{ feature }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. TESTIMONIALS SECTION -->
    <section v-if="product.testimonials" class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-5xl sm:text-6xl font-bold mb-4 text-balance">From Those Who Know</h2>
        <p class="text-lg text-muted-foreground mb-20 max-w-2xl">
          Industry leaders and audio experts celebrate Calcifer.
        </p>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(testimonial, idx) in product.testimonials" 
            :key="idx"
            class="bg-muted/50 rounded-xl p-8 border border-border"
          >
            <p class="text-lg font-serif text-foreground mb-6 italic">
              "{{ testimonial.quote }}"
            </p>
            <div>
              <p class="font-semibold text-foreground">{{ testimonial.author }}</p>
              <p v-if="testimonial.role" class="text-sm text-muted-foreground">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. PRE-ORDER CTA SECTION -->
    <section id="preorder-section" class="py-32 px-6 bg-gradient-to-b from-background to-muted/30">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-6xl sm:text-7xl font-bold mb-6 text-balance">
          Join the Revolution
        </h2>
        <p class="text-xl text-muted-foreground mb-4">
          Pre-order Calcifer today
        </p>
        <p class="text-lg text-muted-foreground mb-12 font-light">
          Estimated delivery: {{ product.estimatedDelivery }}
        </p>

        <div class="bg-card border border-border rounded-2xl p-12 mb-8">
          <p class="text-5xl font-bold mb-8">${{ product.price }}</p>
          
          <Button size="lg" class="w-full md:w-auto px-12" @click="addToCartAndScroll">
            <HugeiconsIcon :icon="ShoppingCart01Icon" :size="20" class="mr-2" />
            Add to Cart & Checkout
          </Button>
        </div>

        <p class="text-sm text-muted-foreground">
          Free shipping on all pre-orders
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '@/stores/products'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ChevronDownIcon, CheckIcon, ShoppingCart01Icon } from '@hugeicons/core-free-icons'

const productStore = useProductStore()
const router = useRouter()

const product = computed(() => productStore.product)

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const addToCartAndScroll = () => {
  productStore.addToCart(1)
  router.push('/checkout')
}

// Page meta
useHead({
  title: 'Calcifer - Where Sound Meets Soul',
  meta: [
    { 
      name: 'description', 
      content: 'An exceptional audio system designed for the discerning listener. Sonic perfection, engineered with precision.' 
    }
  ]
})
</script>

<style scoped>
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
