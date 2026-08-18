<template>
  <span>{{ store.formatPrice(amount) }}</span>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency'

defineProps<{ amount: number }>()

const store = useCurrencyStore()
</script>
