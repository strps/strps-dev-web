'use client'

import { usePathname } from 'next/navigation'

import { ParticleField } from '@/components/backgrounds/ParticleField'
import type { ShapeId } from '@/components/backgrounds/particle-stage'

/**
 * The shape each hand-written index page opens with, keyed by route segment.
 *
 * Not a prop on `PageHeader`: which shape belongs to which page is a fact about
 * the site, and it reads as a set — `stack` is a deck of work, `ribbon` a page
 * of prose, `atom` an experiment. Spread across three call sites that would be
 * three unrelated arguments nobody ever sees together.
 */
const PAGE_SHAPES: Record<string, ShapeId> = {
  projects: 'stack',
  blog: 'ribbon',
  lab: 'atom',
}

/** What a `PageHeader` on a page the table does not name falls back to. */
const FALLBACK: ShapeId = 'orb'

/**
 * The particle cloud behind a `PageHeader`.
 *
 * Two things are going on in the wrapper, and they pull against each other:
 *
 * - **Full-bleed.** `PageHeader` sits inside the page's `max-w-wrap` column,
 *   and the cloud should not. `left-1/2 w-screen -translate-x-1/2` breaks it
 *   back out to the width of the viewport.
 * - **Clipped to the header.** `inset-y-0` plus `overflow-hidden` on this
 *   element — never on the header, whose box is the narrow column and would
 *   clip away the full-bleed the line above just bought.
 *
 * So the clip is vertical only: the band is as wide as the page and exactly as
 * tall as the header, and the cloud is cut off cleanly where the listing below
 * begins. `-z-10` puts it under the header's own text, which needs no z-index
 * of its own to win.
 *
 * The shape comes from the route rather than a prop, so the three index pages
 * carry no background wiring at all.
 */
export function PageHeaderBackground() {
  const pathname = usePathname()
  // Paths are `/{locale}/{page}`, so the page is whichever segment the table
  // names. `in` would also match inherited keys like `toString`.
  const segment = pathname.split('/').find((part) => PAGE_SHAPES[part] !== undefined)

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden"
    >
      <ParticleField spinSpeed={0} shape={segment ? PAGE_SHAPES[segment] : FALLBACK} offset={{ x: 0.3 }} />
    </div>
  )
}

export default PageHeaderBackground
