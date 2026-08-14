# Club Content

Everything the `/clubs` hub and the `/club/*` pages render. All copy is JSON —
editing a file here changes the site with no component changes.

## Files

| File | Shape | Renders on |
|---|---|---|
| `quantum.json` / `elegance.json` / `nextstop.json` | `ClubContent` | Club cards everywhere, `/club/[id]` |
| `index.json` | `{ hero, valueProps, cta }` | `/clubs` hero, "Why Join", closing CTA |
| `benefits.json` | `BenefitContent[]` | `/clubs`, `/club/benefits`, `/club/membership` |
| `events.json` | `EventContent[]` | `/clubs`, `/club/events`, `/club/[id]` |
| `tiers.json` | `TierContent[]` | `/clubs`, `/club/membership` |
| `testimonials.json` | `TestimonialContent[]` | `/clubs` |
| `faqs.json` | `FaqContent[]` | `/clubs`, `/club/membership` |

Types live in [`app/types/content.ts`](../../types/content.ts).

## ⚠️ Placeholder content — replace before launch

Two files hold invented data, flagged with `"placeholder": true`:

- **`tiers.json`** — Premium and Business prices read "Coming soon". Real pricing
  has never been set.
- **`testimonials.json`** — all three quotes are illustrative. **No real member
  said these.** Authors are non-identifying ("Member, Dhaka") on purpose.

Any item with `"placeholder": true` makes the page render a visible notice to
the user. Remove the flag once the data is real and the notice disappears —
`ClubMembershipTiers` and `ClubTestimonials` both key off it, so there is no
separate switch to remember.

Check for remaining placeholders at any time:

```bash
grep -rl '"placeholder": true' app/content/clubs/
```

## Adding an event

`events.json` starts empty, which is why every events view shows "Stay tuned".
Add an object to the array:

```json
{
  "id": "launch-night-2026",
  "title": "Quantum Launch Night",
  "description": "First look at the new smart-home range.",
  "date": "2026-09-12",
  "time": "6:00 PM",
  "location": "Dhaka",
  "club": "quantum",
  "category": "Launch",
  "cta": { "label": "Register", "link": "/messages" }
}
```

`date` must be `YYYY-MM-DD` — the store splits upcoming from past by string
comparison against today, and the date badge parses it as UTC so the day never
drifts by timezone. `club` and `category` are optional; omitting `club` shows
the event under every club.

## Adding a benefit

```json
{
  "id": "benefit-something",
  "title": "Short title",
  "description": "One line shown in the collapsed card.",
  "detail": "Longer copy revealed when expanded. Optional.",
  "icon": "Compass01Icon"
}
```

Set `club` to scope a benefit to one club; without it the benefit appears
everywhere including each `/club/[id]` page.

## Adding a club

1. Create `app/content/clubs/<id>.json` following an existing file.
2. Add the id to `ClubId` in `app/types/content.ts`.
3. Add the hue to `CLUB_HUES` **and** the full Tailwind class literals to
   `CLUB_CLASSES` in `app/composables/useTheme.ts`.
4. Add the same literals to `HOVER_BORDER` / `ACTIVE_RING` in
   `ContentCard.vue` and `ClubCardLarge.vue`.
5. Import it into `CLUB_SOURCES` in `app/stores/contentStore.ts`.
6. Add colour tokens (`--color-<id>-50` … `-700`) to `app/assets/css/tailwind.css`.
7. Map its categories in `CATEGORY_TO_CLUB` in
   [`useClubProducts.ts`](../../composables/useClubProducts.ts).

Step 3–4 must be **complete class strings**. Tailwind scans source as text, so
`` `hover:border-${id}-500/50` `` generates no CSS at all.

## How products reach a club page

No catalogue product currently sets `Product.club`, so
[`useClubProducts.ts`](../../composables/useClubProducts.ts) falls back to
mapping `categoryId` → club. An explicit `product.club` always wins, so setting
that field on a product overrides the map without touching it.

Current split is uneven (Quantum 17, Elegance 2, NextStop 1) because the seed
catalogue is mostly electronics — expected, not a bug.

## Components

All in [`app/components/club/`](../../components/club/):

| Component | Notes |
|---|---|
| `ClubHero` | Animated orb background, gradient headline. |
| `ClubCardLarge` | 3D tilt via `useCardTilt` (desktop + fine pointer only). |
| `ClubBenefitsGrid` | `expandable` renders each card as `<details>`. |
| `ClubEventsList` | `past` dims and hides CTAs. Empty state built in. |
| `ClubMembershipTiers` | Shows placeholder notice while any tier is flagged. |
| `ClubTestimonials` | Same, for quotes. |
| `ClubFAQ` | Native `<details>`; `exclusive` allows one open at a time. |
| `ClubCTA` | Full-width tri-club gradient band. |

### Why the FAQ is not a shadcn Accordion

Only `button`, `input`, and `label` are installed from shadcn-vue. Adding
Accordion pulls in reka-ui, which conflicts with the no-new-dependencies
constraint. Native `<details>`/`<summary>` gives keyboard operation, screen
reader semantics, and browser find-in-page for free, and `name` makes the group
mutually exclusive where supported.
