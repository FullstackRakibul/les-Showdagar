<template>
  <component
    :is="link ? 'NuxtLink' : 'span'"
    :to="link"
    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border transition-colors"
    :class="[
      pillClass,
      link ? 'hover:opacity-80 active:scale-[0.98]' : '',
    ]"
    :aria-current="active ? 'true' : undefined"
  >
    <HugeiconsIcon v-if="icon" :icon="resolveIcon(icon)" :size="12" class="shrink-0" />
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useTheme } from '@/composables/useTheme'
import { resolveIcon } from '@/composables/useContentIcons'
import { useResolvedClub } from '@/composables/useContentContext'
import type { ClubId } from '@/types/content'

const props = defineProps<{
  label?: string
  icon?: string
  club?: ClubId
  active?: boolean
  link?: string
}>()

const { getClubTextClass, getClubBgClass, getClubBorderClass } = useTheme()
const club = useResolvedClub(() => props.club)

const pillClass = computed(() => {
  if (props.active && club.value) {
    return [
      getClubBgClass(club.value, true),
      getClubTextClass(club.value),
      getClubBorderClass(club.value),
    ].join(' ')
  }
  if (props.active) {
    return 'bg-primary/10 text-primary border-primary/30'
  }
  return 'bg-muted text-muted-foreground border-transparent'
})
</script>
