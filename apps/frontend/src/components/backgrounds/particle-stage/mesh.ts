/**
 * Link meshes for clouds: which points are joined by a line.
 *
 * Lifted from ParticleOrb's `buildShellEdges`, generalised to any cloud and
 * memoised per shape. The build is O(n²) and runs once per shape — never per
 * frame, and never during a transition if `warmMesh` has been given a chance to
 * run first. See ./README.md § The mesh under a morph.
 */

import type { Cloud } from "./shapes"

export interface Mesh {
  a: Uint16Array
  b: Uint16Array
  /** Length at build time, in cloud units. */
  rest: Float32Array
  /** Interleaved [phase, rate] per edge, for the twinkle. */
  pulse: Float32Array
}

export interface MeshOptions {
  /** Neighbour radius in cloud units. */
  linkDistance: number
  /** Max edges kept per point. */
  linkNeighbors: number
}

const cache = new Map<string, Mesh>()

const EMPTY: Mesh = {
  a: new Uint16Array(0),
  b: new Uint16Array(0),
  rest: new Float32Array(0),
  pulse: new Float32Array(0),
}

/**
 * k-nearest-within-a-radius, not a plain radius cut.
 *
 * A plain cut gives uneven valence — some points catch four neighbours, some
 * ten — and reads as clumpy. Sorting the candidates and capping at
 * `linkNeighbors` gives a mesh of even density on any of these shapes,
 * including the ones (grid, disc) whose natural spacing differs by axis.
 */
export function getMesh(cloud: Cloud, opts: MeshOptions): Mesh {
  const key = `${cloud.id}|${opts.linkDistance}|${opts.linkNeighbors}`
  const hit = cache.get(key)
  if (hit) return hit

  const n = cloud.size.length
  if (n === 0 || opts.linkDistance <= 0 || opts.linkNeighbors <= 0) {
    cache.set(key, EMPTY)
    return EMPTY
  }

  const pos = cloud.pos
  // Search a little wider than the target so a breathing point cannot pop an
  // edge in and out at the threshold.
  const max = opts.linkDistance * 1.15
  const max2 = max * max
  const seen = new Set<number>()
  const a: number[] = []
  const b: number[] = []
  const rest: number[] = []
  const cand: { j: number; d2: number }[] = []

  for (let i = 0; i < n; i++) {
    cand.length = 0
    const xi = pos[i * 3]
    const yi = pos[i * 3 + 1]
    const zi = pos[i * 3 + 2]
    for (let j = 0; j < n; j++) {
      if (j === i) continue
      const dx = xi - pos[j * 3]
      const dy = yi - pos[j * 3 + 1]
      const dz = zi - pos[j * 3 + 2]
      const d2 = dx * dx + dy * dy + dz * dz
      if (d2 <= max2) cand.push({ j, d2 })
    }
    cand.sort((p, q) => p.d2 - q.d2)
    const take = Math.min(opts.linkNeighbors, cand.length)
    for (let c = 0; c < take; c++) {
      const j = cand[c].j
      const pair = i < j ? i * n + j : j * n + i
      if (seen.has(pair)) continue
      seen.add(pair)
      a.push(i)
      b.push(j)
      rest.push(Math.sqrt(cand[c].d2))
    }
  }

  const count = a.length
  const pulse = new Float32Array(count * 2)
  for (let i = 0; i < count; i++) {
    // Every edge keeps its own phase and rate, so the mesh twinkles rather
    // than beating as one.
    pulse[i * 2] = Math.random() * Math.PI * 2
    pulse[i * 2 + 1] = 0.35 + Math.random() * 0.9
  }

  const mesh: Mesh = {
    a: Uint16Array.from(a),
    b: Uint16Array.from(b),
    rest: Float32Array.from(rest),
    pulse,
  }
  cache.set(key, mesh)
  return mesh
}

/**
 * Build a mesh ahead of time, off the critical path.
 *
 * The O(n²) build is a few milliseconds at CLOUD_SIZE, which is invisible on
 * its own but lands as a dropped frame if it happens the instant a transition
 * starts — the worst possible moment. Warming the next shape while the page is
 * idle moves that cost somewhere nobody is looking.
 */
export function warmMesh(cloud: Cloud, opts: MeshOptions) {
  const run = () => getMesh(cloud, opts)
  if (typeof window === "undefined") return
  const ric = (window as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback
  if (ric) ric(run)
  else window.setTimeout(run, 0)
}
