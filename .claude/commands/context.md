---
description: Load full RH Business Club project context — stack, file map, design system, conventions, and current task state
---

You are working on **RH Business Club** — a Nuxt 3 / Vue 3 premium e-commerce platform.

## Quick Reference

**Run dev server:** `npm run dev` → http://localhost:3000  
**Source root:** `app/` (not `src/`)  
**CSS file:** `app/assets/css/tailwind.css` (Tailwind CSS 4, `@import "tailwindcss"`)  
**Utilities:** `cn()` from `@/lib/utils`

## Active Files Map

| What | Where |
|---|---|
| Root layout | `app/app.vue` |
| Theme composable | `app/composables/useTheme.ts` |
| Theme floating button | `app/components/ThemeToggleButton.vue` |
| Theme config spec | `app/theme.config.json` |
| Layout store | `app/stores/layout.ts` |
| Tailwind tokens | `app/assets/css/tailwind.css` |
| Nuxt config | `nuxt.config.ts` |
| shadcn config | `components.json` |

## Design Tokens Quick Reference

```
bg-background / text-foreground       ← page background/text
bg-card / text-card-foreground        ← card surfaces
bg-muted / text-muted-foreground      ← subtle surfaces/text
border-border                          ← all borders
bg-primary / text-primary-foreground  ← primary actions
text-quantum-500                       ← tech blue (hue 220)
text-elegance-500                      ← fashion purple (hue 300)
text-nextstop-500                      ← travel green (hue 160)
```

## Theme System

- Default: **light** (white background, dark text)
- Toggle: `useTheme().toggleDark()` adds/removes `.dark` on `<html>`
- Accent: `useTheme().setAccent(hue)` — 220 | 300 | 160
- Persist key: `rh-theme` in localStorage

## Store Usage

```typescript
const layout = useLayoutStore()
layout.toggleLeftSidebar()   // nav sidebar
layout.toggleRightSidebar()  // cart/notifications
layout.isMobile              // < 1024px

const cart = useCartStore()
const auth = useAuthStore()
const products = useProductsStore()
```

## Component Conventions

- `<script setup lang="ts">` always
- No manual imports for components in `app/components/`
- SSR guard: `import.meta.client` or `onMounted()`
- Icons: `lucide-vue-next` for UI, HugeIcons for product icons
- Emit `close` from modal components
- Use `cn()` for conditional class merging

## Current Branch State

Check `git status` and `git log --oneline -10` for current work in progress.
