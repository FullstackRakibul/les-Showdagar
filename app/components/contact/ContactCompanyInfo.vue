<template>
  <div class="rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm p-6">
    <h3 class="font-semibold text-foreground mb-1">Reach us directly</h3>
    <p v-if="info.responseTime" class="text-xs text-muted-foreground mb-5">
      {{ info.responseTime }}
    </p>

    <ul class="space-y-4" role="list">
      <li v-for="channel in channels" :key="channel.label" class="flex items-start gap-3">
        <div
          class="w-9 h-9 rounded-md bg-muted flex items-center justify-center shrink-0 text-muted-foreground"
          aria-hidden="true"
        >
          <HugeiconsIcon :icon="resolveIcon(channel.icon)" :size="16" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {{ channel.label }}
          </p>
          <a
            v-if="channel.href"
            :href="channel.href"
            class="text-sm font-medium text-foreground hover:text-primary transition-colors break-words rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {{ channel.value }}
          </a>
          <p v-else class="text-sm font-medium text-foreground break-words">{{ channel.value }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { resolveIcon } from '@/composables/useContentIcons'
import type { CompanyInfoContent } from '@/types/content'

const props = defineProps<{ info: CompanyInfoContent }>()

const channels = computed(() => [
  {
    label: 'Email',
    value: props.info.email,
    href: `mailto:${props.info.email}`,
    icon: 'Mail01Icon',
  },
  {
    label: 'Phone',
    value: props.info.phone,
    // Strips formatting so the tel: link dials correctly.
    href: `tel:${props.info.phone.replace(/[^\d+]/g, '')}`,
    icon: 'Call02Icon',
  },
  {
    label: 'Support hours',
    value: props.info.supportHours,
    href: null,
    icon: 'Clock01Icon',
  },
  {
    label: 'Location',
    value: props.info.location,
    href: null,
    icon: 'Location01Icon',
  },
])
</script>
