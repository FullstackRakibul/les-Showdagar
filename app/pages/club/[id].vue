<template>
  <div v-if="club" class="bg-background">

    <!-- Club hero -->
    <header class="relative overflow-hidden border-b border-border">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute -top-32 -left-24 w-96 h-96 rounded-full blur-3xl opacity-[0.10]" :class="bgClass" />
        <div class="absolute -bottom-32 -right-24 w-80 h-80 rounded-full blur-3xl opacity-[0.08]" :class="bgClass" />
      </div>

      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <NuxtLink
          to="/clubs"
          class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <HugeiconsIcon :icon="resolveIcon('ArrowLeft01Icon')" :size="14" />
          All clubs
        </NuxtLink>

        <div class="flex items-start gap-5">
          <div
            class="w-16 h-16 rounded-lg flex items-center justify-center shrink-0"
            :class="[softBgClass, textClass]"
          >
            <HugeiconsIcon :icon="resolveIcon(club.icon)" :size="30" />
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {{ club.category }}
            </p>
            <h1 class="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mt-1">
              {{ club.name }}
            </h1>
            <p class="text-lg font-semibold mt-2" :class="textClass">{{ club.tagline }}</p>
          </div>

          <button
            v-if="!isActive"
            type="button"
            class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-background text-foreground text-xs font-medium hover:bg-secondary active:scale-[0.98] transition-all shrink-0"
            @click="setAccentByClub(club.id)"
          >
            Use this theme
          </button>
          <span
            v-else
            class="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md border text-xs font-semibold shrink-0"
            :class="[softBgClass, textClass, borderClass]"
          >
            Active theme
          </span>
        </div>

        <p class="text-muted-foreground leading-relaxed mt-6 max-w-2xl">{{ club.description }}</p>
        <p v-for="(para, i) in club.body" :key="i" class="text-muted-foreground leading-relaxed mt-3 max-w-2xl">
          {{ para }}
        </p>

        <ul v-if="club.features.length" class="flex flex-wrap gap-2 mt-6" role="list">
          <li v-for="feature in club.features" :key="feature">
            <FeaturePill :label="feature" :club="club.id" active />
          </li>
        </ul>
      </div>
    </header>

    <!-- Categories -->
    <section class="bg-muted/30 border-b border-border">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 class="text-xl font-bold text-foreground tracking-tight mb-5">Categories</h2>
        <ul class="flex flex-wrap gap-2" role="list">
          <li v-for="category in club.categories" :key="category">
            <NuxtLink
              :to="`/products?search=${encodeURIComponent(category)}`"
              class="inline-flex items-center px-3 py-1.5 rounded-md border border-border bg-card text-sm text-foreground hover:bg-secondary active:scale-[0.98] transition-all"
            >
              {{ category }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- Products from this club -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <header class="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 class="text-xl font-bold text-foreground tracking-tight">From {{ club.name }}</h2>
          <p class="text-sm text-muted-foreground mt-1">
            {{ clubProducts.length }} product{{ clubProducts.length === 1 ? '' : 's' }} in this club
          </p>
        </div>
        <NuxtLink
          to="/products"
          class="text-sm font-medium shrink-0 transition-colors hover:opacity-80"
          :class="textClass"
        >
          View all
        </NuxtLink>
      </header>

      <div v-if="clubProducts.length" class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ProductCard v-for="product in clubProducts" :key="product.id" :product="product" />
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center gap-3 py-16 rounded-lg border border-dashed border-border bg-card/50 text-center"
      >
        <HugeiconsIcon :icon="resolveIcon('PackageIcon')" :size="30" class="text-muted-foreground/40" />
        <p class="text-sm text-muted-foreground">No products in this club yet.</p>
        <NuxtLink
          to="/products"
          class="text-sm font-medium underline underline-offset-2"
          :class="textClass"
        >
          Browse the full collection
        </NuxtLink>
      </div>
    </section>

    <!-- Club events -->
    <section v-if="clubEvents.length" class="bg-muted/30 border-y border-border">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <h2 class="text-xl font-bold text-foreground tracking-tight mb-6">{{ club.name }} events</h2>
        <ClubEventsList :events="clubEvents" />
      </div>
    </section>

    <!-- Benefits -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <h2 class="text-xl font-bold text-foreground tracking-tight mb-6">What you get</h2>
      <ClubBenefitsGrid :benefits="clubBenefits" />
    </section>

    <ClubCTA :section="ctaSection" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useContentStore } from '@/stores/contentStore'
import { useProductStore } from '@/stores/products'
import { useTheme } from '@/composables/useTheme'
import { resolveIcon } from '@/composables/useContentIcons'
import { useClubProducts } from '@/composables/useClubProducts'
import FeaturePill from '@/components/content/FeaturePill.vue'
import ProductCard from '@/components/product/ProductCard.vue'
import type { SectionContent, ClubId } from '@/types/content'

const route = useRoute()
const content = useContentStore()
const productStore = useProductStore()
const { load, getClubTextClass, getClubBgClass, getClubBorderClass, isClubActive, setAccentByClub } = useTheme()

const clubId = computed(() => String(route.params.id))
const club = computed(() => content.getClubById(clubId.value))

// An unknown /club/<something> is a 404, not a blank page.
if (!club.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Club "${clubId.value}" not found`,
    fatal: true,
  })
}

const isActive = computed(() => club.value ? isClubActive(club.value.id) : false)
const textClass = computed(() => club.value ? getClubTextClass(club.value.id) : '')
const bgClass = computed(() => club.value ? getClubBgClass(club.value.id) : '')
const softBgClass = computed(() => club.value ? getClubBgClass(club.value.id, true) : '')
const borderClass = computed(() => club.value ? getClubBorderClass(club.value.id) : '')

const { products: clubProducts } = useClubProducts(
  computed<ClubId | null>(() => club.value?.id ?? null)
)

const clubEvents = computed(() =>
  club.value ? content.getEventsForClub(club.value.id) : []
)

const clubBenefits = computed(() =>
  club.value ? content.getBenefitsForClub(club.value.id) : []
)

const ctaSection = computed<SectionContent>(() => ({
  id: 'club-page-cta',
  title: `Explore what ${club.value?.name ?? 'the Club'} has to offer.`,
  subtitle: club.value?.category ?? '',
  description: club.value?.description ?? '',
  cta: { label: 'Browse Products', link: '/products' },
  secondaryCta: { label: 'All Clubs', link: '/clubs' },
}))

onMounted(() => {
  load()
  productStore.fetchProducts()
})

// `productStore` is referenced above for its fetch; products themselves come
// through `useClubProducts`.

useHead(() => ({
  title: club.value ? `${club.value.name} — ${club.value.category} | RH Business Club` : 'Club',
  meta: [
    { name: 'description', content: club.value?.description ?? '' },
    { property: 'og:title', content: club.value ? `${club.value.name} | RH Business Club` : 'Club' },
    { property: 'og:description', content: club.value?.description ?? '' },
    { property: 'og:type', content: 'website' },
  ],
}))
</script>
