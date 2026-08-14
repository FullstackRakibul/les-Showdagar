# Content Layer

All page copy lives in this directory as JSON. Components never hardcode copy —
they read it from `useContentStore()`. Editing a `.json` file here is enough to
change what renders; no component changes required.

## Layout

```
app/content/
├── clubs/           ClubContent — one file per club identity
│   ├── quantum.json
│   ├── elegance.json
│   └── nextstop.json
├── pages/           PageContent — one file per page
│   ├── home.json
│   ├── products.json
│   ├── contact.json
│   └── clubs.json
└── featured.json    CardContent[] — cross-page promo cards
```

Types for every model are in [`app/types/content.ts`](../types/content.ts).

## Adding a page

1. Create `pages/<slug>.json`:

```json
{
  "slug": "my-page",
  "title": "My Page | RH Business Club",
  "metaDescription": "Shown in search results and link previews.",
  "sections": [
    {
      "id": "my-hero",
      "layout": "hero",
      "title": "Headline",
      "subtitle": "Eyebrow above the headline",
      "description": "Lead paragraph.",
      "body": ["Follow-up paragraph.", "Another one."],
      "cta": { "label": "Primary action", "link": "/products" },
      "secondaryCta": { "label": "Secondary", "link": "/about" }
    }
  ]
}
```

2. Register it in [`app/stores/contentStore.ts`](../stores/contentStore.ts) —
   import the file and add it to `PAGE_SOURCES`.

3. Render it:

```vue
<script setup lang="ts">
const content = useContentStore()
const page = computed(() => content.getPage('my-page'))

useHead({
  title: page.value?.title,
  meta: [{ name: 'description', content: page.value?.metaDescription }],
})
</script>

<template>
  <div v-if="page">
    <template v-for="section in page.sections" :key="section.id">
      <ContentHero v-if="section.layout === 'hero'" :section="section" centered />
      <ContentSection v-else :section="section" />
    </template>
  </div>
</template>
```

## Section fields

| Field | Type | Effect |
|---|---|---|
| `id` | `string` | Anchor target and `aria-labelledby` root. Must be unique per page. |
| `layout` | `grid` \| `list` \| `carousel` \| `hero` \| `split` | Picks the renderer. |
| `columns` | `2` \| `3` \| `4` | Column count at `lg`. Always stacks on mobile. |
| `muted` | `boolean` | Renders on `bg-muted/30` with top/bottom borders — use to alternate bands. |
| `cards` | `CardContent[]` | Rendered by `ContentGrid` unless the default slot is overridden. |
| `cta` / `secondaryCta` | `CtaContent` | Buttons below the section body. |
| `body` | `string[]` | Extra paragraphs after `description`. |

## Icons

`icon` fields hold a **HugeIcons export name** as a string, not an imported
object — that keeps the JSON serialisable for a future CMS.

```json
{ "icon": "CpuIcon" }
```

`resolveIcon()` in [`useContentIcons.ts`](../composables/useContentIcons.ts) maps
the name back to the icon at render time. An unknown name falls back to
`CircleIcon` and warns in dev rather than throwing.

To confirm a name exists before using it:

```bash
node --input-type=module -e "import * as i from '@hugeicons/core-free-icons'; console.log('CpuIcon' in i)"
```

## Club theming

Set `club` on a section or card and every nested component inherits that
accent — `ContentSection` and `ContentHero` provide it via
[`useContentContext`](../composables/useContentContext.ts), so cards, pills, and
CTAs pick it up without prop drilling.

```vue
<ContentSection :section="section" club="quantum" />
```

Resolution order for any component: its own `card.club` → explicit `club` prop →
injected section context → no accent (falls back to `primary`).

### A constraint worth knowing

Tailwind scans source files as **text**. A class assembled at runtime is never
generated:

```ts
// Broken — this CSS will not exist.
const cls = `hover:border-${club}-500/40`
```

Every club class is therefore written as a complete literal in a lookup map
(see `HOVER_BORDER` in `ContentCard.vue` and `useTheme.ts`). When adding a new
club variant, add the full class string to those maps — don't build it.

## Components

| Component | Use |
|---|---|
| `ContentHero` | Page opener. Supports `backgroundImage`, `split` (exposes an `aside` slot), `compact`, `centered`. |
| `ContentSection` | Wrapper for everything else. Header + body + CTA. Default slot overrides the card grid. |
| `ContentGrid` | Card layout — `grid`, `list`, or `carousel`. |
| `ContentCard` | One card. `featured` gives the wider image-beside-copy variant. |
| `ContentClubCard` | Club identity card. `expanded` adds the category list; `selectable` adds a "Use this theme" control. |
| `FeaturePill` | Small tag. `active` applies the club accent. |
| `ContentCTA` | Primary + secondary button pair. Full-width on mobile, inline from `sm`. |

Named `ContentClubCard`, not `ClubCard` — `app/components/index/ClubCard.vue`
already owns that name, and Nuxt auto-import resolves components by bare
filename regardless of directory.

## Extending to a CMS

`fetchAllContent()` in the store is the seam. It currently calls `load()`, which
reads the static imports. Replacing that body with a `$fetch` is the only change
needed — components already await the action and read through getters.
