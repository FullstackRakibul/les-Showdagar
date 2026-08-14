<template>
  <!--
    Thin wrapper over ClubFAQ so contact and club FAQs stay visually identical
    and there is only one accordion implementation to maintain.
  -->
  <ClubFAQ :faqs="faqs" :exclusive="exclusive" />
</template>

<script setup lang="ts">
import ClubFAQ from '@/components/club/ClubFAQ.vue'
import type { FaqContent } from '@/types/content'

withDefaults(defineProps<{
  faqs: FaqContent[]
  exclusive?: boolean
}>(), {
  exclusive: true,
})
</script>
