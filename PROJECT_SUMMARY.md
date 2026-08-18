# RH Business Club — Project Summary

## Project Overview

**RH Business Club** is a premium e-commerce and business networking platform for professionals. It combines a curated product marketplace with three exclusive business club tiers — each targeting a distinct professional lifestyle sector. Members can browse and purchase products, join specialized clubs for sector-specific benefits and events, manage orders and wishlists, and communicate through an integrated messaging system.

The platform is built for SSR-first delivery via Nuxt 3 and deployed via Docker + Nitro.

---

## Mission

To create the most refined digital commerce experience for professionals — one that merges premium product discovery with the exclusivity of a business club. RH Business Club connects curated quality with a community of ambitious professionals who demand more than a standard marketplace.

---

## Vision

To become the definitive platform where professional identity and commercial intent intersect — a space where sourcing, networking, and growth happen in one seamless, beautifully crafted environment. RH Business Club aspires to be the commerce layer of the modern professional's life.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 3.17 (SSR enabled, `srcDir: app/`) |
| UI Layer | Vue 3.5 + shadcn-vue + Radix Vue |
| State | Pinia 3 (9 stores) |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`, `@theme` tokens, oklch colors) |
| Icons | Lucide Vue Next, HugeIcons, FontAwesome Free |
| Scroll | Lenis 1.3 (smooth scroll, client-only, scoped to main scroll container) |
| Utilities | VueUse 14 |
| Deploy | Docker + Nitro SSR server |
| Dev Tools | Nuxt DevTools, TypeScript |

---

## Club Tiers

Three specialized business clubs form the identity core of the platform. Each has its own color palette, route namespace, and dedicated content.

| Club | Sector | Color Identity | Hue |
|---|---|---|---|
| **Quantum** | Technology & Innovation | Blue / Cyan | oklch `220` |
| **Elegance** | Fashion & Lifestyle | Purple / Pink | oklch `300` |
| **NextStop** | Travel & Experiences | Green / Emerald | oklch `160` |

Club colors are baked into the design system as fixed `@theme` tokens (`--color-quantum-*`, `--color-elegance-*`, `--color-nextstop-*`) and do not shift with dark mode.

---

## Core Flows

### Commerce
- **Browse** — `pages/browse.vue`, `pages/products.vue`, `pages/shop.vue`, category pages (`pages/category/[slug].vue`)
- **Product Detail** — `pages/product/[slug].vue` + global `ProductModal` (mounted once in `app.vue`)
- **Cart** — `pages/cart.vue` + `CartDrawer`, `CartDropdown`, right sidebar panel
- **Checkout** — `pages/checkout.vue` with `CheckoutForm`, `PaymentModal`, `PaymentSuccessModal`
- **Orders** — `pages/orders.vue`, `pages/order-confirmation/[id].vue`
- **Wishlist** — `pages/wishlist.vue`
- **Deals** — `pages/DealsAndOffers.vue`

### Clip Cart
A secondary purchase flow where products are "clipped" (saved for quick re-order). Managed by `stores/clipCart.ts` and rendered via `ClipCartSection` on the homepage and `pages/clips.vue`.

### Club System
- `pages/clubs/index.vue` — clubs directory/listing
- `pages/club/[id].vue` — dynamic individual club detail (hero, benefits grid, events list, testimonials, FAQ, CTA)
- `pages/club/membership.vue` — join / manage tier
- `pages/club/benefits.vue` — tier-specific perks
- `pages/club/events.vue` — club events calendar

### Communication
- `pages/messages.vue` — user-to-user and club messaging
- `pages/notifications.vue` — order updates, deals, system alerts
- `NotificationDropdown` in the header for inline tray access

### Product Request
- `pages/product-request.vue` — standalone page for requesting products not yet in the catalog
- `ProductRequestSection` on the homepage also surfaces this flow

### Contact
- `pages/contact.vue` — contact page backed by a full `contact/` component suite (hero, form, FAQ, company info, support categories)

---

## Directory Structure

```
les-showdagar-ecommerce/
├── app/                        <- Nuxt srcDir (all application code)
│   ├── app.vue                 <- Root layout: header, main scroll area, ThemeToggleButton, ProductModal
│   ├── error.vue               <- Error boundary
│   ├── pages/
│   │   ├── index.vue           <- Homepage: HeroSearch, HeroBanner, ClipCartSection, FeaturedProducts, BusinessClubs, ProductRequest
│   │   ├── browse.vue          <- Product browsing
│   │   ├── products.vue        <- Full product listing
│   │   ├── shop.vue            <- Shop view
│   │   ├── cart.vue            <- Cart page
│   │   ├── checkout.vue        <- Checkout flow
│   │   ├── orders.vue          <- Order history
│   │   ├── wishlist.vue
│   │   ├── clips.vue           <- Clip cart page
│   │   ├── messages.vue
│   │   ├── notifications.vue
│   │   ├── settings.vue
│   │   ├── about.vue
│   │   ├── login.vue
│   │   ├── contact.vue         <- Contact page
│   │   ├── product-request.vue <- Product request submission
│   │   ├── DealsAndOffers.vue
│   │   ├── product/[slug].vue  <- Product detail (dynamic)
│   │   ├── category/[slug].vue <- Category listing (dynamic)
│   │   ├── order-confirmation/[id].vue
│   │   ├── clubs/
│   │   │   └── index.vue       <- Clubs directory listing
│   │   └── club/
│   │       ├── [id].vue        <- Individual club detail (dynamic)
│   │       ├── membership.vue
│   │       ├── benefits.vue
│   │       └── events.vue
│   ├── components/
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── LeftSidebar.vue     <- Nav sidebar (togglable, desktop + mobile)
│   │   ├── RightSidebar.vue    <- Cart/notifications sidebar (togglable)
│   │   ├── MobileNavigator.vue
│   │   ├── ErrorLayout.vue     <- Custom error page layout
│   │   ├── ThemeToggleButton.vue <- Fixed bottom-right floating toggle
│   │   ├── ThemeSettings.vue
│   │   ├── CartDrawer.vue
│   │   ├── CartDropdown.vue
│   │   ├── CartPage.vue
│   │   ├── CheckoutForm.vue
│   │   ├── PaymentModal.vue
│   │   ├── PaymentSuccessModal.vue
│   │   ├── NotificationDropdown.vue
│   │   ├── ClipToCartButton.vue
│   │   ├── CategoryCard.vue
│   │   ├── header/             <- Topbar.vue, HeaderMegamenu.vue
│   │   ├── index/              <- HeroSearch, HeroBanner, HeroSectionBanner, herosection/HeroSectionOne,
│   │   │                          FeaturedProducts, BusinessClubsSection, OurSpecializedBusinessClubs,
│   │   │                          ClubCard, ProductRequestSection
│   │   ├── clip/               <- ClipCartSection, ClipCard
│   │   ├── product/            <- ProductModal, ProductCard, ProductGrid
│   │   ├── club/               <- ClubHero, ClubCardLarge, ClubBenefitsGrid, ClubEventsList,
│   │   │                          ClubMembershipTiers, ClubFAQ, ClubCTA, ClubTestimonials
│   │   ├── contact/            <- ContactHero, ContactForm, ContactFAQ, ContactCompanyInfo,
│   │   │                          ContactSupportCategory
│   │   ├── content/            <- Generic content system: ContentCard, ContentCTA, ContentClubCard,
│   │   │                          ContentGrid, ContentHero, ContentSection, FeaturePill
│   │   ├── footer/             <- NewsletterSubscription
│   │   └── ui/                 <- shadcn-vue primitives: button, input, label
│   ├── stores/
│   │   ├── auth.ts             <- User auth state
│   │   ├── layout.ts           <- Sidebar state, isMobile detection
│   │   ├── cart.ts             <- Cart items, totals, localStorage persistence
│   │   ├── clipCart.ts         <- Clip cart
│   │   ├── checkout.ts         <- Checkout step state
│   │   ├── products.ts         <- Product catalog + filters
│   │   ├── categories.ts       <- Category data
│   │   ├── contentStore.ts     <- Content system state
│   │   └── settings.ts         <- User settings
│   ├── composables/
│   │   ├── useTheme.ts         <- Dark/light toggle + accent hue (singleton, localStorage)
│   │   ├── useProducts.ts      <- Product fetching/filtering
│   │   ├── useClubProducts.ts  <- Club-scoped product filtering
│   │   ├── useLayout.ts        <- Layout utilities
│   │   ├── useSmoothScroll.ts  <- Lenis integration
│   │   ├── useApi.ts           <- API fetch wrapper
│   │   ├── useCardTilt.ts      <- 3D tilt effect for cards
│   │   ├── useClipAnimation.ts <- Clip cart animation logic
│   │   ├── useContactForm.ts   <- Contact form state + submission
│   │   ├── useContentContext.ts <- Content system context
│   │   ├── useContentIcons.ts  <- Icon mapping for content components
│   │   ├── useMessageSuggestions.ts <- Message autocomplete suggestions
│   │   ├── useScrollReveal.ts  <- Scroll-triggered reveal animations
│   │   ├── useIcons.ts
│   │   └── useHugeIcons.ts
│   ├── plugins/
│   │   ├── pinia.ts
│   │   ├── lenis.client.ts     <- Client-only Lenis initialization
│   │   └── ssr-width.client.ts
│   ├── assets/css/
│   │   └── tailwind.css        <- Only active CSS file; @theme tokens, light/dark vars, base styles
│   └── lib/utils.ts            <- cn() helper (clsx + tailwind-merge)
├── nuxt.config.ts
├── components.json             <- shadcn-vue config
├── Dockerfile
└── docker-compose.yml
```

---

## Key Conventions

### Color Tokens
All colors use semantic Tailwind tokens (`bg-background`, `text-foreground`, `border-border`, `bg-primary`, etc.). Raw hex/hsl/rgb values are never used in class strings. Club palette classes (`text-quantum-500`, `text-elegance-500`, `text-nextstop-500`) are the only named-hue exceptions.

### Dark Mode
`.dark` class is applied to `<html>` by `useTheme()`. All semantic tokens resolve automatically. No `dark:bg-gray-*` overrides are used.

### Theme Composable
```typescript
const { isDark, accentHue, toggleDark, setAccent, load } = useTheme()
onMounted(load) // required in every modal/panel for SSR-safe restore
```

### Rounded Scale
- Modal/panel containers: `rounded-lg`
- Buttons, badges, inputs: `rounded-md`
- Avatars, icon buttons: `rounded-full`

### Layout
- Header is fixed/floating; `<main>` has `80px` top padding via `.main-offset`
- Hero pages can cancel header clearance with `.full-bleed` (`margin-top: -5rem`)

### Component Placement Rules
- `<ProductModal />` is mounted once in `app.vue` only — never on individual pages
- `<ThemeToggleButton />` is mounted in `app.vue`, hidden when any sidebar is open

### SSR Safety
All `window`/`document` access is guarded with `import.meta.client` or placed inside `onMounted()`. Client-only plugins use the `.client.ts` suffix.

### Cart Store
```typescript
const cartStore = useCartStore()
cartStore.addItem(product, quantity, selectedColor, selectedSize)
cartStore.updateQuantity(productId, qty)
cartStore.removeItem(productId)
cartStore.clearCart()
```
Cart state persists to `localStorage` under the key `rh-cart`.

### Lenis Smooth Scroll
Initialized in `app.vue` `onMounted()` via the `$lenis` plugin, scoped to the main scroll container. RAF loop drives animation (`duration: 1.0`, exponential easing, `smoothWheel: true`). Destroyed `onUnmounted()`.

### Per-Product Pastel Backgrounds
Dynamic hue derived from product ID via CSS variable:
```typescript
const hue = computed(() => ((props.product.id * 47) % 360).toString())
// :style="{ '--product-hue': hue }"
```

---

## Development Commands

```bash
npm run dev        # Dev server at localhost:3000
npm run build      # Production build
npm run preview    # Preview production build
docker compose up  # Run via Docker
npx shadcn-vue@latest add <name>  # Add shadcn-vue component to app/components/ui/
```
