import type { RequiredDataFromCollectionSlug } from 'payload'

/* -------------------------------------------------------------------------- */
/*  Facts every legal document quotes. Change them here, then bump the         */
/*  `version` of each affected document so the seed rewrites it (route.ts).   */
/*  Tracking doc: docs/dev/legal/compliance-tracker.md                         */
/*                                                                             */
/*  ⚠️  Not reviewed by a lawyer. The owner accepted that risk for a portfolio  */
/*  site with one contact form — see the tracker's "Risk acceptance" section.  */
/* -------------------------------------------------------------------------- */

export type DocSeed = Omit<RequiredDataFromCollectionSlug<'docs'>, 'createdAt' | 'updatedAt' | 'id'>

/** Localized fields only — written onto the same doc at `locale: 'es'`. */
export type DocSeedES = Pick<DocSeed, 'title' | 'content' | 'meta'>

export type LegalDocSeed = { en: DocSeed; es: DocSeedES }

export const EFFECTIVE_DATE = '2026-10-01T00:00:00.000Z'

export const OWNER = 'César Jerez'
export const CONTACT_EMAIL = 'csrstrps@gmail.com'
export const SITE = 'strps.dev'

/** Locale-prefixed path to another legal document, for `link(...)`. */
export const docHref = (locale: 'en' | 'es', slug: string) => `/${locale}/docs/${slug}`
