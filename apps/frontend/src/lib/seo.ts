import type { Metadata } from 'next'
import { locales, defaultLocale, type Locale } from '@/i18n/config'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || 'https://example.com'

/**
 * hreflang + canonical for a route (§Phase 5). `path` is locale-less and always starts with
 * `/` (use `/` itself for a locale's home page) — every locale shares the same path per §Phase 1's
 * shared-slug decision, so this is a pure prefix operation, no per-locale slug lookup needed.
 */
export function buildAlternates(locale: Locale, path: string): Metadata['alternates'] {
  const suffix = path === '/' ? '' : path
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${suffix}`])) as Record<Locale, string>

  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      ...languages,
      'x-default': languages[defaultLocale],
    },
  }
}
