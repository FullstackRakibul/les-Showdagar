<template>
  <PopoverTriggerPrimitive v-bind="$attrs" as-child>
    <slot />
  </PopoverTriggerPrimitive>
</template>

<script setup lang="ts">
import { PopoverTrigger as PopoverTriggerPrimitive } from 'radix-vue'
</script>
