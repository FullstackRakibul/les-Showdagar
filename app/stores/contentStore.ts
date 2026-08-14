import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  ClubContent,
  PageContent,
  CardContent,
  ClubId,
  SectionContent,
  BenefitContent,
  EventContent,
  TierContent,
  TestimonialContent,
  FaqContent,
  ContactPageContent,
} from '@/types/content'

import quantum from '@/content/clubs/quantum.json'
import elegance from '@/content/clubs/elegance.json'
import nextstop from '@/content/clubs/nextstop.json'
import homePage from '@/content/pages/home.json'
import productsPage from '@/content/pages/products.json'
import contactPage from '@/content/pages/contact.json'
import clubsPage from '@/content/pages/clubs.json'
import featuredJson from '@/content/featured.json'
import clubHubJson from '@/content/clubs/index.json'
import benefitsJson from '@/content/clubs/benefits.json'
import eventsJson from '@/content/clubs/events.json'
import tiersJson from '@/content/clubs/tiers.json'
import testimonialsJson from '@/content/clubs/testimonials.json'
import faqsJson from '@/content/clubs/faqs.json'

/**
 * Content is imported statically so it is bundled and available during SSR with
 * no request waterfall. `fetchAllContent()` exists as the seam where a remote
 * CMS call would go — components already await it, so swapping the body for a
 * `$fetch` requires no changes upstream.
 */

const CLUB_SOURCES = [quantum, elegance, nextstop] as ClubContent[]

// `contactPage` is deliberately absent: the contact page has its own richer
// shape (form fields, support categories, company info) rather than a generic
// `sections[]` array, so it is exposed via `contact` instead of `getPage()`.
const PAGE_SOURCES = [homePage, productsPage, clubsPage] as PageContent[]

export const useContentStore = defineStore('content', () => {
  const clubs = ref<ClubContent[]>([])
  const pages = ref<Record<string, PageContent>>({})
  const featured = ref<CardContent[]>([])
  const isLoading = ref(false)
  const isLoaded = ref(false)
  const error = ref<string | null>(null)

  // Club hub content
  const clubHero = ref<SectionContent | null>(null)
  const clubCta = ref<SectionContent | null>(null)
  const valueProps = ref<CardContent[]>([])
  const benefits = ref<BenefitContent[]>([])
  const events = ref<EventContent[]>([])
  const tiers = ref<TierContent[]>([])
  const testimonials = ref<TestimonialContent[]>([])
  const faqs = ref<FaqContent[]>([])

  // Contact page
  const contact = ref<ContactPageContent | null>(null)

  const clubIds = computed(() => clubs.value.map(c => c.id))

  /** Cards derived from club content — lets clubs render through ContentGrid. */
  const clubCards = computed<CardContent[]>(() =>
    clubs.value.map(club => ({
      id: club.id,
      title: club.name,
      description: club.description,
      icon: club.icon,
      image: club.heroImage,
      link: club.cta.link,
      badge: club.category,
      club: club.id,
      items: club.features,
    }))
  )

  /** Events dated today or later, soonest first. */
  const upcomingEvents = computed(() => {
    const today = new Date().toISOString().slice(0, 10)
    return events.value
      .filter(e => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
  })

  /** Events already past, most recent first. */
  const pastEvents = computed(() => {
    const today = new Date().toISOString().slice(0, 10)
    return events.value
      .filter(e => e.date < today)
      .sort((a, b) => b.date.localeCompare(a.date))
  })

  const recommendedTier = computed(() => tiers.value.find(t => t.recommended) ?? null)

  /** True while any tier or testimonial is still illustrative placeholder data. */
  const hasPlaceholderContent = computed(() =>
    tiers.value.some(t => t.placeholder) || testimonials.value.some(t => t.placeholder)
  )

  function load() {
    clubs.value = CLUB_SOURCES
    pages.value = Object.fromEntries(PAGE_SOURCES.map(p => [p.slug, p]))
    featured.value = featuredJson as CardContent[]

    clubHero.value = clubHubJson.hero as SectionContent
    clubCta.value = clubHubJson.cta as SectionContent
    valueProps.value = clubHubJson.valueProps as CardContent[]
    benefits.value = benefitsJson as BenefitContent[]
    events.value = eventsJson as EventContent[]
    tiers.value = tiersJson as TierContent[]
    testimonials.value = testimonialsJson as TestimonialContent[]
    faqs.value = faqsJson as FaqContent[]
    contact.value = contactPage as unknown as ContactPageContent

    isLoaded.value = true
  }

  async function fetchAllContent() {
    if (isLoaded.value) return
    isLoading.value = true
    error.value = null
    try {
      load()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load content'
    } finally {
      isLoading.value = false
    }
  }

  function getPage(slug: string): PageContent | undefined {
    return pages.value[slug]
  }

  function getClubById(id: string): ClubContent | undefined {
    return clubs.value.find(c => c.id === id)
  }

  function getSection(slug: string, sectionId: string) {
    return getPage(slug)?.sections.find(s => s.id === sectionId)
  }

  function isClubId(id: string): id is ClubId {
    return clubs.value.some(c => c.id === id)
  }

  // Populate immediately — the source is a static import, so there is no cost to
  // doing this eagerly and it keeps SSR renders from flashing empty sections.
  load()

  function getBenefitsForClub(id: ClubId) {
    return benefits.value.filter(b => !b.club || b.club === id)
  }

  function getEventsForClub(id: ClubId) {
    return upcomingEvents.value.filter(e => !e.club || e.club === id)
  }

  function getContactContent(): ContactPageContent | null {
    return contact.value
  }

  return {
    clubs,
    pages,
    featured,
    isLoading,
    isLoaded,
    error,
    clubIds,
    clubCards,
    fetchAllContent,
    getPage,
    getClubById,
    getSection,
    isClubId,

    // Club hub
    clubHero,
    clubCta,
    valueProps,
    benefits,
    events,
    tiers,
    testimonials,
    faqs,
    upcomingEvents,
    pastEvents,
    recommendedTier,
    hasPlaceholderContent,
    getBenefitsForClub,
    getEventsForClub,

    // Contact
    contact,
    getContactContent,
  }
})
