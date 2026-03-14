<template>
  <PopoverPortal>
    <PopoverContentPrimitive
      :align="align"
      :side-offset="sideOffset"
      class="z-50 w-72 rounded-md border border-border bg-card p-4 text-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      v-bind="$attrs"
    >
      <slot />
    </PopoverContentPrimitive>
  </PopoverPortal>
</template>

<script setup lang="ts">
import { PopoverContent as PopoverContentPrimitive, PopoverPortal } from 'radix-vue'

interface Props {
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

withDefaults(defineProps<Props>(), {
  align: 'center',
  sideOffset: 4,
})
</script>
