import type { Page, Post } from '@strps-website/types'

export type ResolvableLink = {
  type?: 'custom' | 'reference' | null
  url?: string | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'projects'
    value: Page | Post | string | number
  } | null
}

/** Resolves a Payload `link()` group to an href, matching CMSLink's own resolution (§5/§6). */
export function resolveLinkHref(link: ResolvableLink | null | undefined): string | null {
  if (!link) return null

  if (link.type === 'reference' && typeof link.reference?.value === 'object' && link.reference.value.slug) {
    const prefix = link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
    return `${prefix}/${link.reference.value.slug}`
  }

  return link.url || null
}
