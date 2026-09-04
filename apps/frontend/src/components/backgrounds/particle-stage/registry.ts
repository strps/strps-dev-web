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

/**
 * How the cloud is placed vertically while a section owns the stage.
 *
 * - `follow` — the default. The cloud is anchored to the section's centre and
 *   travels with it, held back by `drift`, and clamped into the on-screen part
 *   of the section's box so a tall section does not carry it off the top.
 * - `fixed` — pinned to the viewport, ignoring the section box entirely. The
 *   cloud does not respond to scroll at all while this section owns it.
 * - `scrub` — position driven by the section's progress through the viewport:
 *   the cloud sweeps from the bottom of the screen to the top as the section
 *   passes. Unlike the morph, this one *is* scrubbed, and stops when you stop.
 */
export type StageMotion = "follow" | "fixed" | "scrub"

/**
 * Where the cloud's radius is measured from.
 *
 * The plain modes take the smaller side of the box, so the cloud fits it in
 * both directions. The `-height` variants ignore width and measure the height
 * alone — what you want when a box is wide and short and the cloud should be
 * sized by how tall it is, not squeezed by it.
 */
export type StageSize = "viewport" | "section" | "viewport-height" | "section-height"

/** Everything a placement decides, in CSS px on the viewport-sized canvas. */
export interface StagePlacement {
  /** Cloud centre from the left edge. */
  cx: number
  /** Cloud centre from the top edge. */
  cy: number
  /** Cloud radius. */
  R: number
}

/** What a section's `place` callback is handed. */
export interface StagePlaceContext {
  /** Canvas size in CSS px — one viewport. */
  width: number
  height: number
  /**
   * The section's own box. `top`/`bottom` are viewport-space and move as you
   * scroll; `height`/`width` are the element's own measurements and do not.
   */
  box: { top: number; bottom: number; height: number; width: number }
  /**
   * How far the section has travelled through the viewport, clamped to 0–1: 0
   * as its top edge reaches the bottom of the screen, 1 as its bottom edge
   * leaves the top.
   */
  progress: number
  /** This section's resolved `offset` and `scale`. */
  offset: { x: number; y: number }
  scale: number
  /** What the section's `motion` mode worked out, so a callback can nudge it. */
  default: StagePlacement
}

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
  /** How the cloud responds to scroll here. Defaults to `follow`. */
  motion?: StageMotion
  /**
   * `viewport` (the default) sizes the cloud off the viewport's smaller side;
   * `section` sizes it off the owning element's smaller side, so the cloud fits
   * its host rather than the screen. `viewport-height` and `section-height`
   * measure the height alone, ignoring how wide the box is.
   */
  size?: StageSize
  /**
   * How far the cloud lags its section under `motion="follow"`, overriding the
   * stage's own drift. 0 glues it to the section, 1 pins it to the glass.
   */
  drift?: number
  /** Spin rate multiplier. 0 stops the cloud turning over this section. */
  spin?: number
  /**
   * Pins the cloud's yaw to a specific angle, in turns — `0.25` is a quarter
   * turn. Without it a section inherits whatever angle the spin accumulator
   * happened to be at when it took the stage, which for a still section
   * (`spin: 0`) means its resting pose depends on how the reader got there.
   * Naming an angle makes that pose deterministic; the seam turns into it by
   * the shorter way round. `spin` no longer moves the cloud on a side that
   * sets one.
   */
  angle?: number
  /** Per-point breathing multiplier. 0 holds the cloud perfectly still. */
  breath?: number
  /** Pointer-parallax multiplier. 0 ignores the pointer here. */
  pointerTilt?: number
  /**
   * Escape hatch: replace any part of the placement the modes above worked out.
   * Runs every frame, so keep it arithmetic — no layout reads, no allocation.
   *
   * ```tsx
   * <StageSection shape="torus" place={({ box }) => ({ cy: box.top + box.height * 0.25 })} />
   * ```
   */
  place?: (ctx: StagePlaceContext) => Partial<StagePlacement> | void
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
/** Border-box width of each section, for `size: "section"`. */
let widths: number[] = []
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
    return { section: s, top: rect.top + pageY, bottom: rect.bottom + pageY, width: rect.width }
  })
  // Document order, not registration order: React mounts in tree order, but a
  // section can appear later (a CMS block that streams in) and would otherwise
  // land at the end of the sequence.
  measured.sort((a, b) => a.top - b.top)

  ordered = measured.map((m) => m.section)
  centres = measured.map((m) => (m.top + m.bottom) / 2)
  tops = measured.map((m) => m.top)
  bottoms = measured.map((m) => m.bottom)
  widths = measured.map((m) => m.width)
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
  /** Border-box width of the section, so a cloud can be sized off its host. */
  width: number
}

function ownerAt(i: number): StageOwner {
  return {
    section: ordered[i],
    anchor: centres[i],
    top: tops[i],
    bottom: bottoms[i],
    width: widths[i],
  }
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
