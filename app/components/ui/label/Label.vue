<script setup lang="ts">
import { Label as LabelPrimitive, type LabelProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<LabelProps & { class?: string }>()
</script>

<template>
  <LabelPrimitive
    v-bind="props"
    :class="cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      props.class
    )"
  >
    <slot />
  </LabelPrimitive>
</template>
