# Contact Page

Content lives in [`app/content/pages/contact.json`](../../content/pages/contact.json).
No copy is hardcoded in components — editing that file is enough to change the page.

## ⚠️ Submissions are not delivered anywhere yet

`server/api/contact.post.ts` validates, rate-limits, and **logs** enquiries. It
does not email anyone and does not write to a database. A user who submits the
form sees "We'll get back to you within one business day" — that promise is
currently not kept by any system.

Before launch, replace the `TODO` block in the handler with real delivery (mail
provider or DB write). Until then either wire it up or soften the success copy
in `contactForm.successMessage`.

## Shape

| Key | Type | Renders as |
|---|---|---|
| `hero` | `SectionContent` | `ContactHero` — animated orbs, jump CTAs |
| `supportCategories` | `SupportCategoryContent[]` | 4-up card grid; clicking one pre-fills the form subject |
| `contactForm` | `ContactFormContent` | `ContactForm` — fields are data-driven |
| `productRequest` | `SectionContent` | Sidebar card linking to `/product-request` |
| `companyInfo` | `CompanyInfoContent` | `ContactCompanyInfo` — email/phone become `mailto:`/`tel:` |
| `suggestions` | `MessageSuggestionContent[]` | Keyword hints under the message field |
| `faqs` | `FaqContent[]` | `ContactFAQ` (wraps `ClubFAQ`) |

## Adding a form field

Add an object to `contactForm.fields`:

```json
{
  "id": "company",
  "type": "text",
  "label": "Company",
  "placeholder": "Your company name",
  "required": false,
  "maxLength": 120,
  "autocomplete": "organization",
  "help": "Optional."
}
```

The field renders automatically — label, ARIA wiring, error slot, and character
counter all derive from this object. Supported `type` values are `text`,
`email`, `tel`, and `textarea` (textarea also honours `rows`).

**Validation is separate.** The field will render but never be validated until
you add a rule to [`shared/contact-validation.ts`](../../../shared/contact-validation.ts)
and extend the `ContactPayload` interface there. That module is imported by
both the client composable and the server handler, so one edit covers both and
they cannot drift.

## Validation model

- `shared/contact-validation.ts` is the single source of rules.
- The client shows errors only for fields the user has blurred (`touched`), so
  a pristine form is never covered in red.
- On failed submit, every field is marked touched, focus moves to the first
  invalid input, and a `role="status"` region announces the error count.
- The server re-validates independently. Client validation is convenience, not
  a control — a request crafted outside the browser still gets 422'd.

## Anti-spam

Two layers, both in the server handler:

1. **Honeypot** — a visually hidden `website` field. Bots fill it; the handler
   returns a normal-looking success with `reference: null` and discards the
   submission, so the bot gets no signal that it was caught.
2. **Rate limiting** — 3 submissions per IP per hour, returning 429 with a
   `Retry-After` header.

The rate limiter holds state in a `Map` in process memory. **It resets on every
server restart and is not shared across instances**, so a multi-instance
deployment gets N× the intended limit. Move it to Redis or a KV store before
relying on it.

## Smart suggestions

As the user types, `useMessageSuggestions` matches lowercase keywords from
`suggestions[]` against the message body and shows up to 2 hints. It runs
entirely in the browser — the draft message is never transmitted for matching
and no match is recorded anywhere.

Tune via the options argument: `minLength` (default 12 chars before matching
starts) and `limit` (default 2).

## `/product-request`

Reuses `ContactForm` with a different config object defined inline in
[`app/pages/product-request.vue`](../../pages/product-request.vue). Submissions
hit the same `/api/contact` endpoint; the subject line distinguishes them. If
requests need separate routing, give them their own endpoint rather than
branching inside the contact handler.

## Related fix

`nuxt.config.ts` now sets `serverDir: 'server/'`. Because `srcDir` is `app/`,
Nitro was looking for `app/server/` and **every** `/api/*` route was 404ing —
including the pre-existing products, categories, and orders endpoints. That
config line is load-bearing; removing it breaks the whole API surface.

## Not built

Live chat (6.1), analytics tracking (6.2), file attachments (6.6), and the test
suite (6.8) were left out. Chat and analytics need product decisions about
staffing and user consent; attachments need real storage; tests need a runner
(no vitest/@vue/test-utils in `package.json`).
