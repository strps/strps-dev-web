/**
 * Locale configuration for the public site (Phase 3 — i18n routing & plumbing).
 *
 * Mirrors the Payload config (`apps/payload/src/payload.config.ts`):
 * `en` (default) + `es`, `fallback: true`. Keep this list in sync with the CMS.
 */

export const locales = ['en', 'es'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}
