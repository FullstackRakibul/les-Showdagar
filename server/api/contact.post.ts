import { validateContact, type ContactPayload } from '~~/shared/contact-validation'

/**
 * Contact form endpoint.
 *
 * This does NOT send email yet — there is no mail provider configured. It
 * validates, rate-limits, and logs the enquiry so the shape is correct for
 * whoever wires up delivery. See the TODO at the send step.
 */

interface RateEntry {
  count: number
  windowStart: number
}

// In-memory rate limiting. Resets when the server restarts and is per-instance,
// so it will not hold across a multi-instance deployment — replace with Redis
// or a KV store before relying on it in production.
const rateLimits = new Map<string, RateEntry>()

const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_PER_WINDOW = 3

function clientKey(event: any): string {
  const forwarded = getRequestHeader(event, 'x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim()
    || getRequestHeader(event, 'x-real-ip')
    || event.node?.req?.socket?.remoteAddress
    || 'unknown'
  return ip
}

function checkRate(key: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now()
  const entry = rateLimits.get(key)

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimits.set(key, { count: 1, windowStart: now })
    return { allowed: true, retryAfterMs: 0 }
  }

  if (entry.count >= MAX_PER_WINDOW) {
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - entry.windowStart) }
  }

  entry.count += 1
  return { allowed: true, retryAfterMs: 0 }
}

/** Drops stale entries so the map cannot grow without bound. */
function sweep() {
  const now = Date.now()
  for (const [key, entry] of rateLimits) {
    if (now - entry.windowStart > WINDOW_MS) rateLimits.delete(key)
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ContactPayload>>(event)

  // Honeypot: a filled `website` field means a bot. Return success so the bot
  // learns nothing, but do not process the submission.
  if (body?.website) {
    return {
      success: true,
      message: 'Thank you for your message.',
      reference: null,
    }
  }

  if (Math.random() < 0.05) sweep()

  const key = clientKey(event)
  const { allowed, retryAfterMs } = checkRate(key)

  if (!allowed) {
    const minutes = Math.ceil(retryAfterMs / 60000)
    setResponseHeader(event, 'Retry-After', String(Math.ceil(retryAfterMs / 1000)))
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests',
      data: {
        message: `You've sent several messages recently. Please try again in about ${minutes} minute${minutes === 1 ? '' : 's'}, or email us directly.`,
      },
    })
  }

  const errors = validateContact(body ?? {})
  if (Object.keys(errors).length > 0) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: { errors, message: 'Please check the highlighted fields and try again.' },
    })
  }

  const enquiry = {
    reference: `MSG-${Date.now().toString(36).toUpperCase()}`,
    name: body!.name!.trim(),
    email: body!.email!.trim(),
    phone: body!.phone?.trim() || null,
    subject: body!.subject!.trim(),
    message: body!.message!.trim(),
    receivedAt: new Date().toISOString(),
    userAgent: getRequestHeader(event, 'user-agent') ?? null,
  }

  // TODO: deliver the enquiry. Nothing is emailed or persisted yet — wire up a
  // mail provider (or write to the DB) here. Until then, submissions only
  // appear in server logs and are lost on restart.
  console.info('[contact] enquiry received', {
    reference: enquiry.reference,
    subject: enquiry.subject,
    email: enquiry.email,
  })

  return {
    success: true,
    message: "Thank you for your message. We'll get back to you within one business day.",
    reference: enquiry.reference,
  }
})
