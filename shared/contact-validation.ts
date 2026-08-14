/**
 * Contact form validation shared by the client composable and the server
 * handler. Keeping one copy means client-side hints and server-side rejection
 * can never disagree — the server still validates independently, because
 * client checks are a convenience, not a control.
 */

export interface ContactPayload {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  /** Honeypot — must stay empty. Real users never see this field. */
  website?: string
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { max: 20 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 2000 },
} as const

// Deliberately permissive: over-strict email regexes reject valid addresses.
// Real verification is sending mail to it, which the server does.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Digits, spaces, and the usual separators. Optional field.
const PHONE_RE = /^[+\d][\d\s\-()]{5,}$/

export function validateContact(input: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {}
  const name = (input.name ?? '').trim()
  const email = (input.email ?? '').trim()
  const phone = (input.phone ?? '').trim()
  const subject = (input.subject ?? '').trim()
  const message = (input.message ?? '').trim()

  if (!name) {
    errors.name = 'Please enter your name.'
  } else if (name.length < CONTACT_LIMITS.name.min) {
    errors.name = 'Please enter at least 2 characters.'
  } else if (name.length > CONTACT_LIMITS.name.max) {
    errors.name = `Please keep this under ${CONTACT_LIMITS.name.max} characters.`
  }

  if (!email) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.'
  } else if (email.length > CONTACT_LIMITS.email.max) {
    errors.email = 'That email address is too long.'
  }

  // Optional — only validated when something was typed.
  if (phone && !PHONE_RE.test(phone)) {
    errors.phone = 'Please enter a valid phone number, or leave this blank.'
  }

  if (!subject) {
    errors.subject = 'Please enter a subject.'
  } else if (subject.length < CONTACT_LIMITS.subject.min) {
    errors.subject = 'Please enter at least 3 characters.'
  } else if (subject.length > CONTACT_LIMITS.subject.max) {
    errors.subject = `Please keep this under ${CONTACT_LIMITS.subject.max} characters.`
  }

  if (!message) {
    errors.message = 'Please enter your message.'
  } else if (message.length < CONTACT_LIMITS.message.min) {
    errors.message = 'Please tell us a little more — at least 10 characters.'
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = `Please keep this under ${CONTACT_LIMITS.message.max} characters.`
  }

  return errors
}

export function isValidContact(input: Partial<ContactPayload>): boolean {
  return Object.keys(validateContact(input)).length === 0
}

export const EMPTY_CONTACT: ContactPayload = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  website: '',
}
