/**
 * Which shape the stage should be showing, and how far between two of them.
 *
 * Sections register themselves here on mount. The stage reads the registry
 * every frame and resolves scroll position into a `{ from, to, t }` triple.
 * Deliberately outside React: a re-render per scroll frame would be far more
 * expensive than the canvas work it is feeding. See ./README.md § Wiring.
 */

import { scrollState } from "@/lib/scroll"
import type { ShapeId } from "./shapes"

export interface StageSectionConfig {
  shape: ShapeId
  /**
   * Where the cloud sits while this section owns the stage, in fractions of the
   * viewport measured from its centre. `{ x: 0.25 }` parks it right of centre.
   */
  offset?: { x?: number; y?: number }
  /** Cloud scale while this section owns the stage. 1 is the stage default. */
  scale?: number
  /** Opacity multiplier while this section owns the stage. */
  opacity?: number
}

export interface StageSection extends StageSectionConfig {
  el: HTMLElement
}

const sections: StageSection[] = []
let listeners: (() => void)[] = []

/** Cached in document space; recomputed on layout changes, not per frame. */
let ordered: StageSection[] = []
let seams: number[] = []
/** Document-space centre of each section, for the parallax anchor. */
let centres: number[] = []
/** Document-space extent of the registered run, to bound the outer bands. */
let firstTop = 0
let lastBottom = 0
let boundsStale = true

export function registerSection(section: StageSection) {
  sections.push(section)
  invalidate()
  return () => {
    const i = sections.indexOf(section)
    if (i >= 0) sections.splice(i, 1)
    invalidate()
  }
}

export function onRegistryChange(fn: () => void) {
  listeners.push(fn)
  return () => {
    listeners = listeners.filter((l) => l !== fn)
  }
}

/** Mark the cached bounds stale. Call after any layout change. */
export function invalidate() {
  boundsStale = true
  for (const l of listeners) l()
}

function measure() {
  const pageY = scrollState.y
  // Measure once, then sort on the numbers. Sorting on live
  // getBoundingClientRect() calls would re-measure O(n log n) times and, worse,
  // read a moving value while the comparator runs.
  const measured = sections.map((s) => {
    const rect = s.el.getBoundingClientRect()
    return { section: s, top: rect.top + pageY, bottom: rect.bottom + pageY }
  })
  // Document order, not registration order: React mounts in tree order, but a
  // section can appear later (a CMS block that streams in) and would otherwise
  // land at the end of the sequence.
  measured.sort((a, b) => a.top - b.top)

  ordered = measured.map((m) => m.section)
  centres = measured.map((m) => (m.top + m.bottom) / 2)
  firstTop = measured.length ? measured[0].top : 0
  lastBottom = measured.length ? measured[measured.length - 1].bottom : 0
  // A seam is the join between two consecutive sections; the transition is
  // centred on it.
  seams = []
  for (let i = 0; i < measured.length - 1; i++) {
    seams.push((measured[i].bottom + measured[i + 1].top) / 2)
  }
  boundsStale = false
}

export interface StageResolution {
  from: StageSection
  to: StageSection
  /** Progress from `from` to `to`, in [0, 1]. */
  t: number
  /**
   * Document-space Y the cloud is anchored to: the centre of the owning
   * section, blended across a transition the same way the shape is. The stage
   * turns the distance between this and the viewport centre into parallax.
   */
  anchor: number
}

/**
 * Resolve the current scroll offset into a transition.
 *
 * The reference is the **viewport centre line**: whichever section contains it
 * owns the stage. A *seam* is the join between two consecutive sections, and
 * `t` ramps 0 -> 1 across a band centred on that seam.
 *
 * The band is not simply `blend * vh`. It is clamped to the room actually
 * available between neighbouring seams, because a section shorter than the band
 * makes two bands overlap — and an overlap means the pair changes while the
 * previous morph is still running, which the cloud shows as a snap. Clamping
 * guarantees bands never touch, so every transition finishes before the next
 * one starts, at any section height.
 *
 * `hold` then reserves a fraction of each run as settled time, so a short
 * section still gets a moment where its shape simply *is* rather than being
 * permanently mid-morph.
 *
 * Pure in scroll position — no hysteresis, no "current section" state — which
 * is what makes scrolling back up retrace the transition exactly.
 */
export function resolveStage(blend = 0.55, hold = 0.5): StageResolution | null {
  if (boundsStale) measure()
  if (ordered.length === 0) return null
  if (ordered.length === 1) {
    return { from: ordered[0], to: ordered[0], t: 0, anchor: centres[0] }
  }

  const line = scrollState.y + scrollState.vh / 2
  const maxBand = Math.max(1, scrollState.vh * blend)
  const keep = Math.max(0, Math.min(0.9, hold))

  /** Half-width of the transition band around seam `k`. */
  const halfBandAt = (k: number) => {
    // The outer seams have no neighbouring seam on one side, so the top and
    // bottom of the registered run stand in — otherwise a two-section page gets
    // an unbounded band and never settles at all.
    const prev = k > 0 ? seams[k] - seams[k - 1] : seams[k] - firstTop
    const next = k < seams.length - 1 ? seams[k + 1] - seams[k] : lastBottom - seams[k]
    // Two adjacent bands share the gap between their seams, so capping each at
    // the gap (less the hold) leaves them exactly touching at worst.
    const room = Math.min(prev, next) * (1 - keep)
    return Math.max(0.5, Math.min(maxBand, room)) / 2
  }

  // Sections fully passed: the index of the section the line currently sits in.
  let k = 0
  while (k < seams.length && seams[k] <= line) k++

  // Entering the seam ahead.
  if (k < seams.length) {
    const half = halfBandAt(k)
    if (line > seams[k] - half) {
      const t = (line - seams[k] + half) / (half * 2)
      return {
        from: ordered[k],
        to: ordered[k + 1],
        t,
        anchor: centres[k] + (centres[k + 1] - centres[k]) * t,
      }
    }
  }
  // Still leaving the seam behind.
  if (k > 0) {
    const half = halfBandAt(k - 1)
    if (line < seams[k - 1] + half) {
      const t = (line - seams[k - 1] + half) / (half * 2)
      return {
        from: ordered[k - 1],
        to: ordered[k],
        t,
        anchor: centres[k - 1] + (centres[k] - centres[k - 1]) * t,
      }
    }
  }
  return { from: ordered[k], to: ordered[k], t: 0, anchor: centres[k] }
}

/** Every registered shape, in document order. For mesh warming. */
export function registeredShapes(): ShapeId[] {
  if (boundsStale) measure()
  return ordered.map((s) => s.shape)
}
