/**
 * The morph: given two clouds and a progress value, where is every point?
 *
 * The one rule this file obeys is that `morph()` is a **pure function of `t`**.
 * No integration, no velocity, no state carried between frames. Progress is
 * integrated in exactly one place — `advance()` in ParticleStage, which runs the
 * timed morph a seam triggers — so everything here is cacheable per shape pair
 * and there is only one clock to reason about. See ./README.md § Morphing.
 */

import type { Cloud } from "./shapes"

/**
 * Fraction of the timeline given over to the per-point stagger. At 0.45 the
 * longest journey occupies the whole of `t`, the shortest only the last 55%.
 */
const STAGGER = 0.45

/** Mid-flight displacement, as a fraction of each point's travel distance. */
const BUMP_AMOUNT = 0.35

export interface MorphPlan {
  key: string
  from: Cloud
  to: Cloud
  /** Per-point timeline start in [0, STAGGER]. */
  start: Float32Array
  /** 1 / duration, so the inner loop multiplies instead of dividing. */
  invDur: Float32Array
  /** Per-point mid-flight displacement vector, interleaved xyz. */
  bump: Float32Array
  /** Rotation axis per point for the directional slerp, interleaved xyz. */
  axis: Float32Array
  /** Angle between the two directions, in radians. */
  angle: Float32Array
}

/** Smootherstep: C2 continuous, so the staggered arrival has no visible kink. */
function ease(x: number) {
  return x * x * x * (x * (x * 6 - 15) + 10)
}

function hash3(i: number, salt: number) {
  const h = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return h - Math.floor(h)
}

const planCache = new Map<string, MorphPlan>()

/**
 * Precompute everything about a transition that does not depend on `t`.
 *
 * This runs once per shape *pair*, not per frame: the rotation axis and angle
 * between each point's two directions, its slot in the staggered timeline, and
 * the direction it bulges mid-flight.
 */
export function planMorph(from: Cloud, to: Cloud): MorphPlan {
  const key = `${from.id}->${to.id}`
  const hit = planCache.get(key)
  if (hit) return hit

  const n = from.size.length
  const start = new Float32Array(n)
  const invDur = new Float32Array(n)
  const bump = new Float32Array(n * 3)
  const axis = new Float32Array(n * 3)
  const angle = new Float32Array(n)

  const dist = new Float32Array(n)
  let maxDist = 1e-6

  for (let i = 0; i < n; i++) {
    const ax = from.pos[i * 3]
    const ay = from.pos[i * 3 + 1]
    const az = from.pos[i * 3 + 2]
    const bx = to.pos[i * 3]
    const by = to.pos[i * 3 + 1]
    const bz = to.pos[i * 3 + 2]

    const d = Math.hypot(bx - ax, by - ay, bz - az)
    dist[i] = d
    if (d > maxDist) maxDist = d

    const ra = Math.hypot(ax, ay, az) || 1e-6
    const rb = Math.hypot(bx, by, bz) || 1e-6
    const uax = ax / ra
    const uay = ay / ra
    const uaz = az / ra
    const ubx = bx / rb
    const uby = by / rb
    const ubz = bz / rb

    const dot = Math.max(-1, Math.min(1, uax * ubx + uay * uby + uaz * ubz))
    angle[i] = Math.acos(dot)

    // Rotation axis = a x b. It vanishes when the two directions are parallel
    // *or* antipodal; in both cases any perpendicular will do, so derive one
    // deterministically rather than leaving a zero axis to produce NaNs.
    let kx = uay * ubz - uaz * uby
    let ky = uaz * ubx - uax * ubz
    let kz = uax * uby - uay * ubx
    let kl = Math.hypot(kx, ky, kz)
    if (kl < 1e-6) {
      // Cross the start direction with whichever cardinal axis it is least
      // aligned with, which is guaranteed to give a non-degenerate result.
      if (Math.abs(uax) > 0.9) {
        kx = -uaz
        ky = 0
        kz = uax
      } else {
        kx = 0
        ky = uaz
        kz = -uay
      }
      kl = Math.hypot(kx, ky, kz) || 1
    }
    axis[i * 3] = kx / kl
    axis[i * 3 + 1] = ky / kl
    axis[i * 3 + 2] = kz / kl

    // Bump direction: perpendicular-ish to the travel, deterministic per point
    // and per pair, so the cloud bulges in every direction at once rather than
    // drifting as a body.
    const t1 = hash3(i, 1) * Math.PI * 2
    const t2 = hash3(i, 2) * 2 - 1
    const s = Math.sqrt(Math.max(0, 1 - t2 * t2))
    bump[i * 3] = Math.cos(t1) * s
    bump[i * 3 + 1] = t2
    bump[i * 3 + 2] = Math.sin(t1) * s
  }

  // Long journeys start first and take longer, so every point lands together
  // at t = 1 and none of them has to sprint. The alternative — equal durations
  // with staggered starts — makes the far points arrive early and sit waiting.
  for (let i = 0; i < n; i++) {
    const norm = dist[i] / maxDist
    const dur = 1 - STAGGER * (1 - norm)
    start[i] = 1 - dur
    invDur[i] = 1 / dur
    // Scale the bulge by travel distance: points that barely move should not
    // take an excursion to get there.
    const amp = dist[i] * BUMP_AMOUNT
    bump[i * 3] *= amp
    bump[i * 3 + 1] *= amp
    bump[i * 3 + 2] *= amp
  }

  const plan: MorphPlan = { key, from, to, start, invDur, bump, axis, angle }
  planCache.set(key, plan)
  return plan
}

/**
 * Write the cloud's position at progress `t` into `out` (interleaved xyz).
 *
 * Each point follows a **polar path**: its direction rotates about the origin
 * while its radius interpolates separately. A straight lerp would drag points
 * through the middle of the cloud and make a sphere visibly collapse inward
 * before re-expanding; rotating keeps the cloud inflated the whole way.
 *
 * On top of that sits a mid-flight bulge weighted by `4e(1-e)`, which is
 * exactly zero at both ends — so however far a point wanders, it lands on its
 * target precisely.
 */
export function morph(plan: MorphPlan, t: number, out: Float32Array) {
  const { from, to, start, invDur, bump, axis, angle } = plan
  const n = from.size.length

  for (let i = 0; i < n; i++) {
    let e = (t - start[i]) * invDur[i]
    e = e <= 0 ? 0 : e >= 1 ? 1 : ease(e)

    const ax = from.pos[i * 3]
    const ay = from.pos[i * 3 + 1]
    const az = from.pos[i * 3 + 2]

    if (e <= 0) {
      out[i * 3] = ax
      out[i * 3 + 1] = ay
      out[i * 3 + 2] = az
      continue
    }

    const bx = to.pos[i * 3]
    const by = to.pos[i * 3 + 1]
    const bz = to.pos[i * 3 + 2]

    if (e >= 1) {
      out[i * 3] = bx
      out[i * 3 + 1] = by
      out[i * 3 + 2] = bz
      continue
    }

    const ra = Math.hypot(ax, ay, az)
    const rb = Math.hypot(bx, by, bz)
    const r = ra + (rb - ra) * e

    let dx: number
    let dy: number
    let dz: number
    if (ra < 1e-5) {
      // No direction to rotate from — fall back to a straight lerp out of the
      // origin, which is what a point emerging from the core should do anyway.
      const rbb = rb || 1e-6
      dx = bx / rbb
      dy = by / rbb
      dz = bz / rbb
    } else {
      // Rodrigues about `axis`, which is perpendicular to the start direction,
      // so the k(k·v) term drops out and this is two terms instead of three.
      const ang = angle[i] * e
      const c = Math.cos(ang)
      const s = Math.sin(ang)
      const ux = ax / ra
      const uy = ay / ra
      const uz = az / ra
      const kx = axis[i * 3]
      const ky = axis[i * 3 + 1]
      const kz = axis[i * 3 + 2]
      dx = ux * c + (ky * uz - kz * uy) * s
      dy = uy * c + (kz * ux - kx * uz) * s
      dz = uz * c + (kx * uy - ky * ux) * s
    }

    const w = 4 * e * (1 - e)
    out[i * 3] = dx * r + bump[i * 3] * w
    out[i * 3 + 1] = dy * r + bump[i * 3 + 1] * w
    out[i * 3 + 2] = dz * r + bump[i * 3 + 2] * w
  }
}

/** Per-point dot size at progress `t`. Cheap linear blend; no stagger needed. */
export function morphSize(plan: MorphPlan, t: number, out: Float32Array) {
  const { from, to, start, invDur } = plan
  const n = from.size.length
  for (let i = 0; i < n; i++) {
    let e = (t - start[i]) * invDur[i]
    e = e <= 0 ? 0 : e >= 1 ? 1 : ease(e)
    out[i] = from.size[i] + (to.size[i] - from.size[i]) * e
  }
}
