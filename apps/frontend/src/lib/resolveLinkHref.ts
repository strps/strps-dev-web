import type { Page, Post } from '@strps-website/types'
import { localizedHref, type Locale } from '@/i18n/config'

export type ResolvableLink = {
  type?: 'custom' | 'reference' | null
  url?: string | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'projects'
    value: Page | Post | string | number
  } | null
}

/** Resolves a Payload `link()` group to an href, matching CMSLink's own resolution (§5/§6). */
export function resolveLinkHref(link: ResolvableLink | null | undefined, locale?: Locale): string | null {
  if (!link) return null

  let href: string | null

  if (link.type === 'reference' && typeof link.reference?.value === 'object' && link.reference.value.slug) {
    const prefix = link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
    href = `${prefix}/${link.reference.value.slug}`
  } else {
    href = link.url || null
  }

  if (!href) return null

  return locale ? localizedHref(locale, href) : href
}
