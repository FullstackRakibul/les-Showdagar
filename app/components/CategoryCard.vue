<template>
  <NuxtLink :to="`/category/${category.slug}`"
    class="group block overflow-hidden rounded-2xl bg-card border border-border hover:border-muted-foreground/30 transition-all hover:shadow-md">
    <div class="relative h-36 overflow-hidden">
      <img :src="category.image" :alt="category.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div class="absolute bottom-3 left-3">
        <span :class="['text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full', clubClass]">
          {{ clubLabel }}
        </span>
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-foreground text-sm">{{ category.name }}</h3>
      <p class="text-xs text-muted-foreground mt-0.5 line-clamp-1">{{ category.description }}</p>
      <div class="flex items-center justify-between mt-3">
        <span class="text-xs text-muted-foreground">{{ category.productCount ?? 0 }} items</span>
        <span class="text-xs font-medium text-foreground group-hover:translate-x-0.5 transition-transform">→</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Category } from '@/types/index'

const props = defineProps<{ category: Category }>()

const clubMap: Record<string, { label: string; class: string }> = {
  quantum:  { label: 'Quantum',  class: 'bg-quantum-500/20 text-quantum-500' },
  elegance: { label: 'Elegance', class: 'bg-elegance-500/20 text-elegance-500' },
  nextstop: { label: 'NextStop', class: 'bg-nextstop-500/20 text-nextstop-500' },
}

const clubInfo = computed(() => clubMap[props.category.club ?? 'quantum'] ?? clubMap.quantum)
const clubLabel = computed(() => clubInfo.value.label)
const clubClass = computed(() => clubInfo.value.class)
</script>
