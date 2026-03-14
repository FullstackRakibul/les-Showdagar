<template>
  <PopoverRoot :open="open" @update:open="open = $event">
    <slot />
  </PopoverRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PopoverRoot } from 'radix-vue'

const open = ref(false)
</script>
