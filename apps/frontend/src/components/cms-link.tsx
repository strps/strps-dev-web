import { Button } from '@/components/ui/button'
import SVGButton, { type SVGButtonVariant } from '@/components/SVGButton'
import { cn } from '@/lib/utils'
import { resolveLinkHref } from '@/lib/resolveLinkHref'
import Link from 'next/link'
import React from 'react'

import type { Doc, Page, Post } from '@strps-website/types'
import type { Locale } from '@/i18n/config'

export type CMSLinkType = {
  /**
   * Which component renders the link, matching the CMS `link.appearance` field
   * (apps/payload/src/fields/link.ts). `inline` is the extra frontend-only case for
   * links inside rich text. Each appearance reads its own variant prop.
   */
  appearance?: 'inline' | 'default' | 'svgButton'
  /** Button variant, used when `appearance` is `default`. */
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'solid'
    | 'outlineGhost'
    | null //TODO: Add variant types from button variants directly
  /** SVGButton variant, used when `appearance` is `svgButton`. */
  svgVariant?: SVGButtonVariant | null
  children?: React.ReactNode
  className?: string
  label?: string | null
  /** Locale to prefix internal (reference/relative) hrefs with; omit for links that are always external (e.g. proofUrl). */
  locale?: Locale
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'projects' | 'docs'
    value: Page | Post | Doc | string | number
  } | null
  size?: 'default' | 'xs' | 'sm' | 'lg' | 'icon' | null //TODO: Add size and variants types form button variants directly
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    variant = 'default',
    svgVariant,
    children,
    className,
    label,
    locale,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href = resolveLinkHref({ type, url, reference }, locale)

  if (!href) return null

  const size = variant === 'link' ? null : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  if (appearance === 'svgButton') {
    return (
      <SVGButton className={className} href={href} variant={svgVariant ?? 'default'}>
        {label && label}
        {children && children}
      </SVGButton>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={variant ?? 'default'}>
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
