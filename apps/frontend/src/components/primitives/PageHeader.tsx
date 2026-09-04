import * as React from 'react'

import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'
import { PageHeaderBackground } from './PageHeaderBackground'

interface PageHeaderProps {
  eyebrow: string
  title: React.ReactNode
  /** One-paragraph lead under the title. */
  lead?: React.ReactNode
  /** Mono line on the left of the closing rule — typically a count ("6 projects"). */
  meta?: React.ReactNode
  /** Typically a <LinkArrow>, right-aligned on the closing rule. */
  action?: React.ReactNode
  className?: string
}

/**
 * The standalone-page counterpart to `SectionHeader`: same eyebrow/title/hairline
 * anatomy, sized for a page's own `<h1>` rather than a section heading, and with
 * the rule at the *bottom* carrying the meta/action row.
 *
 * Used by the `/projects` and `/blog` indexes so a listing page opens with the
 * same cadence a home section does, instead of the old centered `bg-muted/30`
 * banner.
 *
 * It also carries the hero's particle cloud. Those pages have no CMS blocks, so
 * nothing claims the site-wide `ParticleStage` on them; the header brings its
 * own `ParticleField` instead — page-wide, clipped to the header, and gone the
 * moment the listing starts. See `PageHeaderBackground`.
 */
export function PageHeader({ eyebrow, title, lead, meta, action, className }: PageHeaderProps) {
  return (
    // `relative` is load-bearing: the background is absolutely positioned
    // against this box, and takes both its height and its centre from it.
    <header className={className}>
      <div className="relative overflow-hidden flex min-h-100 flex-col justify-end border-b pb-2">
        <PageHeaderBackground />

        <div className="w-full max-w-wrap px-6 mx-auto">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.02em] md:text-5xl">{title}</h1>
          {lead && (
            <p className="mt-4.5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{lead}</p>
          )}
        </div>

      </div>
      <div className="mt-8 max-w-wrap mx-auto flex flex-wrap items-baseline justify-between gap-4 pt-4 px-6">
        {meta ? <Eyebrow>{meta}</Eyebrow> : <span />}
        {action}
      </div>
    </header>
  )
}
