import type { Locale } from './config'
import { en, type Dictionary } from './dictionaries/en'
import { es } from './dictionaries/es'

export type { Dictionary }

const dictionaries: Record<Locale, Dictionary> = { en, es }

/**
 * Static-UI-string lookup (§2.3). Plain sync object access, not async I/O — deliberately
 * usable from both server components and 'use client' components (e.g. form validation,
 * the lab back-links) that read `locale` via `useParams()`, not just RSC data fetches.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
