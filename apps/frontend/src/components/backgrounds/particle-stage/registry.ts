/**
 * Which section owns the stage right now.
 *
 * Sections register themselves here on mount. The stage asks, every frame,
 * which one holds the trigger line, and animates towards that section's shape
 * on its own clock — the registry answers *who*, never *how far along*.
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
/** Document-space box of each section, so the cloud can be kept inside it. */
let tops: number[] = []
let bottoms: number[] = []
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
  tops = measured.map((m) => m.top)
  bottoms = measured.map((m) => m.bottom)
  // A seam is the join between two consecutive sections: the point where the
  // stage is handed over and a new morph is triggered.
  seams = []
  for (let i = 0; i < measured.length - 1; i++) {
    seams.push((measured[i].bottom + measured[i + 1].top) / 2)
  }
  boundsStale = false
}

export interface StageOwner {
  section: StageSection
  /**
   * Document-space Y the cloud is anchored to: the centre of the section. The
   * stage turns the distance between this and the viewport centre into
   * parallax.
   */
  anchor: number
  /**
   * Document-space box of the section. The stage keeps the cloud inside it, so
   * the cloud travels with the section rather than sitting on the glass.
   */
  top: number
  bottom: number
}

function ownerAt(i: number): StageOwner {
  return { section: ordered[i], anchor: centres[i], top: tops[i], bottom: bottoms[i] }
}

/**
 * Which section owns the stage at the current scroll offset.
 *
 * The reference is a horizontal line across the viewport, at `trigger` of its
 * height. Whichever section that line sits in owns the stage; the handover
 * happens at the *seam*, the midpoint between two consecutive sections. Before
 * the first section and after the last, the nearest one owns it.
 *
 * This is a pure lookup — it says who, not how far along. The morph itself is
 * a timed animation the stage starts when this answer changes, so a transition
 * always runs at the same speed and always finishes, whether the reader crept
 * over the seam or flung the page past it.
 */
export function resolveOwner(trigger = 0.5): StageOwner | null {
  if (boundsStale) measure()
  if (ordered.length === 0) return null

  const line = scrollState.y + scrollState.vh * trigger
  let k = 0
  while (k < seams.length && seams[k] <= line) k++
  return ownerAt(k)
}

/**
 * Live measurements for a section the stage is still drawing — the one it is
 * morphing *from*, which may no longer own the stage. Null once that section
 * has unregistered, which is the stage's cue to drop it.
 */
export function ownerOf(section: StageSection): StageOwner | null {
  if (boundsStale) measure()
  const i = ordered.indexOf(section)
  return i < 0 ? null : ownerAt(i)
}

/** Every registered shape, in document order. For mesh warming. */
export function registeredShapes(): ShapeId[] {
  if (boundsStale) measure()
  return ordered.map((s) => s.shape)
}
