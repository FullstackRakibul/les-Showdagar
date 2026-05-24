<script setup lang="ts">
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ class?: string; modelValue?: string | number }>()
const emits = defineEmits<{ 'update:modelValue': [value: string | number] }>()
</script>

<template>
  <input
    v-bind="$attrs"
    :value="props.modelValue"
    :class="cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
      'ring-offset-background placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      props.class
    )"
    @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
