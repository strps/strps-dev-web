import type { ISitemapField } from 'next-sitemap'
import { locales, defaultLocale } from '@/i18n/config'
import { SITE_URL } from './seo'

/**
 * Expands one locale-less path into one `ISitemapField` per locale (§Phase 5), each carrying
 * `alternateRefs` to every locale (+ `x-default`) so crawlers treat `/en/x` and `/es/x` as
 * translations of the same document rather than duplicate content.
 */
export function localizeSitemapEntries(
  entries: Array<{ path: string; lastmod: string }>,
): ISitemapField[] {
  const urlFor = (locale: string, path: string) => `${SITE_URL}/${locale}${path === '/' ? '' : path}`

  return entries.flatMap(({ path, lastmod }) => {
    const alternateRefs = [
      ...locales.map((locale) => ({
        href: urlFor(locale, path),
        hreflang: locale,
        hrefIsAbsolute: true,
      })),
      { href: urlFor(defaultLocale, path), hreflang: 'x-default', hrefIsAbsolute: true },
    ]

    return locales.map((locale) => ({
      loc: urlFor(locale, path),
      lastmod,
      alternateRefs,
    }))
  })
}
