# RH Business Club — Claude Brain

## Project Overview

**RH Business Club** is a premium e-commerce and business networking platform built with Nuxt 3 / Vue 3. It combines a curated product marketplace with three specialized business club tiers (Quantum, Elegance, NextStop), each with their own color identity.

**Core flows:** Browse → Cart → Checkout → Orders | Club membership → Benefits → Events | Messaging & Notifications

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Nuxt 3.17 (SSR, `srcDir: app/`) |
| UI | Vue 3.5 + shadcn-vue + Radix Vue |
| State | Pinia 3 (6 stores) |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Icons | Lucide Vue Next, HugeIcons, FontAwesome |
| Scroll | Lenis 1.3 (smooth scroll, client-only) |
| Utils | VueUse 14 |
| Deploy | Docker + Nitro (SSR server) |

---

## Directory Map

```
les-showdagar-ecommerce/
├── app/                        ← Nuxt srcDir (all app code here)
│   ├── app.vue                 ← Root layout: sidebars + header + NuxtPage
│   ├── error.vue               ← Error boundary
│   ├── pages/                  ← File-based routing
│   │   ├── index.vue           ← Homepage
│   │   ├── products.vue        ← Product listing
│   │   ├── shop.vue            ← Shop
│   │   ├── cart.vue            ← Cart
│   │   ├── checkout.vue        ← Checkout
│   │   ├── orders.vue          ← Order history
│   │   ├── wishlist.vue
│   │   ├── notifications.vue
│   │   ├── messages.vue
│   │   ├── settings.vue
│   │   ├── about.vue
│   │   ├── DealsAndOffers.vue
│   │   └── club/
│   │       ├── benefits.vue
│   │       ├── events.vue
│   │       └── membership.vue
│   ├── components/
│   │   ├── AppHeader.vue       ← Main header (always rendered)
│   │   ├── AppFooter.vue
│   │   ├── LeftSidebar.vue     ← Nav sidebar (togglable)
│   │   ├── RightSidebar.vue    ← Cart/notifications (togglable)
│   │   ├── MobileNavigator.vue
│   │   ├── ProductCard.vue     ← Reusable product tile
│   │   ├── ProductModal.vue    ← Product detail modal
│   │   ├── ThemeSettings.vue   ← Theme modal panel
│   │   ├── ThemeToggleButton.vue ← Compact floating theme toggle
│   │   ├── header/             ← Topbar.vue, HeaderMegamenu.vue
│   │   ├── index/              ← Hero, FeaturedProducts, BusinessClubs, etc.
│   │   └── ui/                 ← shadcn-vue primitives (badge, button, card, dialog, input, sheet, skeleton)
│   ├── stores/
│   │   ├── auth.ts             ← User auth state
│   │   ├── layout.ts           ← Sidebar open/close, isMobile detection
│   │   ├── cart.ts             ← Cart items, totals
│   │   ├── clipCart.ts         ← Clip cart
│   │   ├── checkout.ts         ← Checkout step state
│   │   └── products.ts         ← Product catalog + filters
│   ├── composables/
│   │   ├── useTheme.ts         ← Light/dark toggle + accent color (singleton)
│   │   ├── useProducts.ts      ← Product fetching/filtering
│   │   ├── useLayout.ts        ← Layout utilities
│   │   ├── useSmoothScroll.ts  ← Lenis integration
│   │   └── useIcons.ts / useHugeIcons.ts
│   ├── plugins/
│   │   ├── pinia.ts
│   │   ├── lenis.client.ts     ← Client-only smooth scroll init
│   │   └── ssr-width.client.ts
│   ├── assets/css/
│   │   └── tailwind.css        ← ONLY CSS file in use (main.css is unused)
│   ├── lib/utils.ts            ← cn() helper (clsx + tailwind-merge)
│   └── theme.config.json       ← Theme token spec (light + dark + clubs)
├── nuxt.config.ts              ← Nuxt config (modules, css, ssr, head)
├── components.json             ← shadcn-vue config
└── .claude/
    ├── settings.json           ← Claude Code project settings
    ├── agents/coworker.md      ← Vue/Nuxt co-worker sub-agent
    └── commands/context.md     ← /context slash command
```

---

## Design System

### Tailwind CSS 4 Setup
- Entry: `app/assets/css/tailwind.css` — uses `@import "tailwindcss"` (v4 syntax)
- Token block: `@theme { ... }` — generates utility classes from fixed values
- Dynamic semantic tokens: `@theme inline { --color-X: var(--X) }` — runtime CSS var references
- Light/dark: `:root { }` (default light) and `.dark { }` (toggled via JS class on `<html>`)

### Color Palettes

**Club Colors (fixed, in `@theme`):**
| Club | Category | Hue | Example |
|---|---|---|---|
| `quantum-*` | Tech | 220 (Blue/Cyan) | `oklch(0.55 0.18 220)` |
| `elegance-*` | Fashion | 300 (Purple/Pink) | `oklch(0.55 0.22 300)` |
| `nextstop-*` | Travel | 160 (Green/Emerald) | `oklch(0.55 0.20 160)` |

**Semantic Colors (dynamic, light/dark overridable):**
`background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`,
`primary`, `primary-foreground`, `secondary`, `secondary-foreground`,
`muted`, `muted-foreground`, `accent`, `accent-foreground`,
`destructive`, `destructive-foreground`, `border`, `input`, `ring`

Use Tailwind classes: `bg-background`, `text-foreground`, `bg-card`, `border-border`, etc.

### Radii Tokens
`rounded-sm` → `0.25rem` | `rounded-md` → `0.5rem` | `rounded-lg` → `0.75rem` | `rounded-xl` → `1rem` | `rounded-2xl` → `1.5rem`

---

## Theme System

**Composable:** `useTheme()` in `app/composables/useTheme.ts`
- Singleton state: `isDark` (ref), `accentHue` (ref: 220 | 300 | 160)
- `toggleDark()` — toggles `.dark` class on `<html>`, persists to `localStorage`
- `setAccent(hue)` — updates `--ring` and selection color, persists
- `load()` — call in `onMounted()` to restore persisted preference
- Default: light mode, quantum accent (hue 220)

**Components:**
- `ThemeToggleButton.vue` — compact floating button (fixed bottom-right), opens mini panel
- `ThemeSettings.vue` — full settings modal panel (used in settings page or modal)

**Persistence key:** `rh-theme` in `localStorage` → `{ dark: boolean, accentHue: number }`

---

## Component Conventions

- All components use `<script setup>` with TypeScript where imports are typed
- Composables are called at the top of `<script setup>`
- Use `useLayoutStore()` from `@/stores/layout` for sidebar state
- Icons: prefer `lucide-vue-next` for UI icons, `HugeIcons` for product/feature icons
- Use `cn()` from `@/lib/utils` for conditional class merging
- shadcn-vue components live in `components/ui/` — don't edit, extend via wrappers
- SSR-safe guards: `if (typeof window !== 'undefined')` or use `onMounted()`
- Client-only code: use `import.meta.client` check or `.client.ts` plugin suffix

---

## Store Patterns

```typescript
// Pinia stores use setup() syntax
export const useXxxStore = defineStore('xxx', () => {
  const state = ref(initialValue)
  function action() { ... }
  return { state, action }
})
```

Layout store key methods: `init()` (call onMounted), `destroy()` (call onUnmounted),
`toggleLeftSidebar()`, `toggleRightSidebar()`, `isMobile` (< 1024px breakpoint)

---

## Development Workflow

```bash
npm run dev          # Start dev server (Nuxt on localhost:3000)
npm run build        # Build for production
npm run preview      # Preview production build
npx nuxi add page    # Scaffold new page
npx nuxi add component  # Scaffold new component
```

**Docker:**
```bash
docker compose up    # Run with Docker
```

**Adding shadcn-vue components:**
```bash
npx shadcn-vue@latest add <component>
# Output goes to app/components/ui/
```

---

## Key Invariants

- `main.css` is **not** imported — only `tailwind.css` is active
- Lenis smooth scroll is initialized in `app.vue` `onMounted()`, client-only
- The layout store `init()` must be called in `app.vue` (already done)
- SSR is enabled — avoid `document`/`window` access outside `onMounted` or `import.meta.client`
- All pages auto-import components — no manual imports needed for components in `app/components/`
- Page transitions use `fade` (opacity 0.15s) configured in `nuxt.config.ts`
