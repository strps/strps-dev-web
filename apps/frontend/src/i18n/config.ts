/**
 * Locale configuration for the public site (Phase 3 — i18n routing & plumbing).
 *
 * Mirrors the Payload config (`apps/payload/src/payload.config.ts`):
 * `en` (default) + `es`, `fallback: true`. Keep this list in sync with the CMS.
 */

export const locales = ['en', 'es'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/** Human-readable labels, mirrored from the Payload `localization.locales` config. */
export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
}

export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

/** Prefixes an internal (relative) href with the locale segment; external/anchor/protocol hrefs pass through untouched. */
export function localizedHref(locale: Locale, href: string): string {
  return href.startsWith('/') ? `/${locale}${href}` : href
}
