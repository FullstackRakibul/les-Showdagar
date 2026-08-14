/**
 * Content model definitions for RH Business Club.
 *
 * These types describe the shape of everything under `app/content/`. They are
 * intentionally CMS-shaped: each model is a plain serialisable object so the
 * loader in `stores/contentStore.ts` can be swapped from static JSON imports to
 * a remote fetch without any component changes.
 */

/** The three business club identities. */
export type ClubId = 'quantum' | 'elegance' | 'nextstop'

/** Accent hues that map 1:1 onto the club identities (see `useTheme`). */
export const CLUB_HUE: Record<ClubId, number> = {
  quantum: 220,
  elegance: 300,
  nextstop: 160,
}

/** A link rendered as a button or anchor. */
export interface CtaContent {
  label: string
  link: string
  /** Visual weight. Defaults to `primary` for the first CTA in a pair. */
  variant?: 'primary' | 'secondary'
  /** Set for links leaving the site — renders target/rel and an icon. */
  external?: boolean
}

/**
 * A single card in a grid, list, or carousel.
 *
 * `icon` holds a HugeIcons export name (e.g. `"CpuIcon"`) resolved at render
 * time by `resolveIcon()` in `composables/useContentIcons.ts`. Storing the name
 * rather than the icon object keeps content JSON-serialisable.
 */
export interface CardContent {
  id: string
  title: string
  description: string
  icon?: string
  image?: string
  link?: string
  badge?: string
  /** Scopes the card to a club so it can inherit that club's accent colour. */
  club?: ClubId
  /** Bullet list rendered beneath the description. */
  items?: string[]
}

/** Layouts `ContentSection` knows how to render. */
export type SectionLayout = 'grid' | 'list' | 'carousel' | 'hero' | 'split'

export interface SectionContent {
  id: string
  title: string
  subtitle?: string
  description?: string
  /** Secondary paragraphs rendered after `description`. */
  body?: string[]
  cta?: CtaContent
  /** A second CTA rendered next to `cta`. */
  secondaryCta?: CtaContent
  cards?: CardContent[]
  layout?: SectionLayout
  /** Column count at the `lg` breakpoint. Grids always stack on mobile. */
  columns?: 2 | 3 | 4
  /** Renders the section against `bg-muted/30` instead of `bg-background`. */
  muted?: boolean
  /** Background image path for `hero` layout sections. */
  backgroundImage?: string
}

export interface ClubContent {
  id: ClubId
  name: string
  /** Short line under the name, e.g. "Think Forward." */
  tagline: string
  /** The club's domain, e.g. "Technology & Innovation". */
  category: string
  description: string
  /** Longer supporting copy shown on the club's own page. */
  body?: string[]
  icon: string
  /** Feature pills — short capability labels. */
  features: string[]
  /** Catalogue categories belonging to this club. */
  categories: string[]
  cta: CtaContent
  heroImage?: string
}

export interface PageContent {
  slug: string
  title: string
  metaDescription: string
  /** H1 for the page. Falls back to `title` when absent. */
  heading?: string
  sections: SectionContent[]
}

/** Root shape returned by the content loader. */
export interface ContentBundle {
  clubs: ClubContent[]
  pages: Record<string, PageContent>
  featured: CardContent[]
}

/* ────────────────────────────────────────────────────────────────────────────
   Club hub models
   ──────────────────────────────────────────────────────────────────────────── */

export interface BenefitContent {
  id: string
  title: string
  description: string
  icon: string
  /** Expanded copy revealed on the benefits page. */
  detail?: string
  club?: ClubId
}

export interface EventContent {
  id: string
  title: string
  description: string
  /** ISO 8601 date (`YYYY-MM-DD`) so it sorts and formats predictably. */
  date: string
  /** Optional display time, e.g. "6:00 PM". */
  time?: string
  location?: string
  club?: ClubId
  category?: string
  cta?: CtaContent
}

export interface TierFeature {
  label: string
  /** false renders the feature struck through as not-included. */
  included?: boolean
}

export interface TierContent {
  id: string
  name: string
  /** Display string, e.g. "৳0" or "Coming soon" — never a raw number. */
  price: string
  /** Billing qualifier, e.g. "per year". */
  period?: string
  description: string
  features: TierFeature[]
  recommended?: boolean
  cta: CtaContent
  /** Set while pricing is not final — surfaces a visible placeholder notice. */
  placeholder?: boolean
}

export interface TestimonialContent {
  id: string
  quote: string
  /** Attribution. Keep non-identifying until real consent is on file. */
  author: string
  role?: string
  avatar?: string
  club?: ClubId
  /** Set while the quote is illustrative rather than a real member's words. */
  placeholder?: boolean
}

export interface FaqContent {
  id: string
  question: string
  answer: string
}

/* ────────────────────────────────────────────────────────────────────────────
   Contact page models
   ──────────────────────────────────────────────────────────────────────────── */

export interface SupportCategoryContent {
  id: string
  title: string
  description: string
  icon: string
  cta: CtaContent
  /** Pre-fills the form's subject when the CTA is used. */
  subject?: string
}

export type ContactFieldType = 'text' | 'email' | 'tel' | 'textarea'

export interface ContactFieldContent {
  id: string
  type: ContactFieldType
  label: string
  placeholder: string
  required?: boolean
  /** Hint rendered under the input and wired via aria-describedby. */
  help?: string
  /** Rows for textarea fields. */
  rows?: number
  maxLength?: number
  autocomplete?: string
}

export interface ContactFormContent {
  title: string
  subtitle?: string
  description?: string
  fields: ContactFieldContent[]
  submitLabel: string
  submittingLabel?: string
  successTitle?: string
  successMessage: string
  /** Copy under the submit button, e.g. a privacy note. */
  footnote?: string
}

export interface CompanyInfoContent {
  supportHours: string
  email: string
  phone: string
  location: string
  /** Optional response-time promise shown alongside the channels. */
  responseTime?: string
}

/**
 * Keyword-triggered hint shown while the user types their message. Purely
 * client-side — nothing is sent anywhere.
 */
export interface MessageSuggestionContent {
  id: string
  /** Lowercase keywords matched against the message body. */
  keywords: string[]
  title: string
  description: string
  cta?: CtaContent
}

export interface ContactPageContent {
  slug: string
  title: string
  metaDescription: string
  hero: SectionContent
  supportCategories: SupportCategoryContent[]
  contactForm: ContactFormContent
  productRequest: SectionContent
  companyInfo: CompanyInfoContent
  suggestions: MessageSuggestionContent[]
  faqs: FaqContent[]
}

/** Everything the `/clubs` hub renders. */
export interface ClubHubContent {
  hero: SectionContent
  valueProps: CardContent[]
  benefits: BenefitContent[]
  events: EventContent[]
  tiers: TierContent[]
  testimonials: TestimonialContent[]
  faqs: FaqContent[]
  cta: SectionContent
}
