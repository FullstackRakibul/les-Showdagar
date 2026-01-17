<template>
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
            Discover
          </h2>
          <p class="text-muted-foreground">
            Curated products in motion
          </p>
        </div>
        <Button variant="ghost" size="sm" class="hidden sm:flex">
          View All
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" class="ml-1" />
        </Button>
      </div>

      <!-- Clips Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <ClipCard v-for="clip in featuredClips" :key="clip.id" :clip="clip" orientation="vertical" />
      </div>

      <!-- Mobile View All -->
      <div class="mt-6 text-center sm:hidden">
        <Button variant="outline" size="sm">
          View All Clips
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" class="ml-1" />
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useClipCartStore } from '@/stores/clipCart'
import { Button } from '@/components/ui/button'
import ClipCard from '@/components/clip/ClipCard.vue'

import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'

const clipCartStore = useClipCartStore()

const featuredClips = computed(() => clipCartStore.featuredClips)
</script>