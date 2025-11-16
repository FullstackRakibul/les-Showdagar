<template>
  <section id="clubs" class="py-24 bg-gradient-to-b from-white to-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-bold mb-6 text-balance">
          Our Specialized <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Business Clubs</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
          Three distinct subsidiaries, one unified platform. Each club focuses on excellence in its niche while
          sharing our commitment to quality.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          class="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-200 hover:border-blue-500 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2">
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 rounded-bl-full">
          </div>
          <div class="p-8">
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <LucideCpu class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Quantum Club</h3>
            <p class="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-wide">Tech-Inspired Quality Products
            </p>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Latest high-quality and innovative technology goods, gadgets, and smart solutions from global markets.
            </p>
            <button @click="navigateToCategory('electronics')"
              class="text-blue-600 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
              <span>Explore Tech</span>
              <LucideArrowRight class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          class="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-200 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2">
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 rounded-bl-full">
          </div>
          <div class="p-8">
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <LucideSparkles class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Elegance Club</h3>
            <p class="text-sm text-purple-600 font-semibold mb-4 uppercase tracking-wide">Premium Fashion & Lifestyle
            </p>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Curated premium and designer fashion, accessories, and luxury lifestyle items for discerning clientele.
            </p>
            <button @click="navigateToCategory('fashion')"
              class="text-purple-600 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
              <span>Explore Fashion</span>
              <LucideArrowRight class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          class="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-200 hover:border-green-500 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2">
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 opacity-10 rounded-bl-full">
          </div>
          <div class="p-8">
            <div
              class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <LucidePlane class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">NextStop Club</h3>
            <p class="text-sm text-green-600 font-semibold mb-4 uppercase tracking-wide">Travel & Visa Services</p>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Comprehensive global travel, logistics, and visa/immigration consultation for international movement.
            </p>
            <button @click="openRequestModal"
              class="text-green-600 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
              <span>Get Consultation</span>
              <LucideArrowRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const showRequestModal = ref(false)

const openRequestModal = () => {
  showRequestModal.value = true
}


const navigateToCategory = (slug) => {
  router.push(`/products`)
}


</script>