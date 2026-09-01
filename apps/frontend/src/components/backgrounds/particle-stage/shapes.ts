/**
 * The shape library: every entry produces the *same* number of points, in a
 * canonical order, so any two of them can be morphed into one another with a
 * plain index pairing. See ./README.md § Shapes.
 */

const TWO_PI = Math.PI * 2
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

/**
 * Points per cloud, fixed for the life of the page.
 *
 * Every shape must fill exactly this many, because the morph pairs point `i` in
 * one cloud with point `i` in the next — there is nothing to interpolate
 * between clouds of different sizes. Shapes that would rather have fewer send
 * the surplus to the origin, where they read as the core rather than as debris.
 */
export const CLOUD_SIZE = 520

export type ShapeId = "orb" | "disc" | "torus" | "helix" | "grid" | "scatter"

export interface Cloud {
  id: ShapeId
  /** Interleaved xyz in unit space; radius 1 is the nominal sphere surface. */
  pos: Float32Array
  /** Per-point dot radius multiplier, around 1. */
  size: Float32Array
}

/**
 * Seeded PRNG. Shapes are generated on demand and cached, but a cache can be
 * dropped (a resize, a fast refresh) and regenerated mid-session — with
 * `Math.random()` the cloud would silently reshuffle under a live morph.
 */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Sort a cloud into the canonical order shared by every shape: azimuth around
 * Y first (quantised into rings, so the bands stay coherent), height second.
 *
 * This is the whole correspondence strategy. Generators emit points in whatever
 * order is natural for their own geometry — a Fibonacci spiral, a row-major
 * grid, a helical walk — and those orders have nothing to do with each other,
 * so pairing by raw index sends every point on an unrelated journey and the
 * transition reads as noise. Sorting both ends by a shared *spatial* key means
 * index `i` sits at a similar azimuth and relative height in both clouds, and
 * the morph reads as the shape deforming rather than dissolving.
 *
 * Radius is deliberately not part of the key: the morph interpolates direction
 * and radius separately, so a point moving from the shell to the tip of an arm
 * reads as an extension, not as a stray.
 */
const AZIMUTH_RINGS = 28

function canonicalOrder(pos: Float32Array, size: Float32Array) {
  const n = size.length
  const order = new Int32Array(n)
  const key = new Float64Array(n)
  for (let i = 0; i < n; i++) {
    order[i] = i
    const x = pos[i * 3]
    const y = pos[i * 3 + 1]
    const z = pos[i * 3 + 2]
    // atan2 in [0, 1), binned so points at a similar bearing stay together.
    const az = (Math.atan2(z, x) / TWO_PI + 1) % 1
    const ring = Math.floor(az * AZIMUTH_RINGS)
    key[i] = ring * 1000 + y
  }
  const sorted = Array.from(order).sort((a, b) => key[a] - key[b])

  const outPos = new Float32Array(n * 3)
  const outSize = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const s = sorted[i]
    outPos[i * 3] = pos[s * 3]
    outPos[i * 3 + 1] = pos[s * 3 + 1]
    outPos[i * 3 + 2] = pos[s * 3 + 2]
    outSize[i] = size[s]
  }
  return { pos: outPos, size: outSize }
}

type Filler = (pos: Float32Array, size: Float32Array, n: number, rnd: () => number) => void

/** Sphere shell with static arms reaching out of it — the ParticleOrb silhouette. */
const orb: Filler = (pos, size, n, rnd) => {
  const arms = 6
  const shellCount = Math.round(n * 0.62)
  const beads = Math.floor((n - shellCount) / arms)
  const used = shellCount + beads * arms

  for (let i = 0; i < shellCount; i++) {
    const y = shellCount === 1 ? 0 : 1 - (i / (shellCount - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = i * GOLDEN_ANGLE
    pos[i * 3] = Math.cos(theta) * r
    pos[i * 3 + 1] = y
    pos[i * 3 + 2] = Math.sin(theta) * r
    size[i] = 1
  }

  let k = shellCount
  for (let a = 0; a < arms; a++) {
    // Bases biased away from the poles, so the arms read as reaching outward.
    const ay = Math.sin(((a / arms) * 2 - 1) * 1.05) * 0.75
    const ar = Math.sqrt(Math.max(0.05, 1 - ay * ay))
    const theta = a * GOLDEN_ANGLE * 2
    const dx = Math.cos(theta) * ar
    const dz = Math.sin(theta) * ar
    // Any vector not parallel to the arm works as the seed for its basis.
    const sx = Math.abs(ay) > 0.9 ? 1 : 0
    const sy = Math.abs(ay) > 0.9 ? 0 : 1
    const ux = ay * 0 - dz * sy
    const uy = dz * sx - dx * 0
    const uz = dx * sy - ay * sx
    const ul = Math.hypot(ux, uy, uz) || 1
    const vx = ay * (uz / ul) - dz * (uy / ul)
    const vy = dz * (ux / ul) - dx * (uz / ul)
    const vz = dx * (uy / ul) - ay * (ux / ul)

    for (let b = 0; b < beads; b++) {
      // Crowd the beads toward the base, the way beadRootBias does.
      const t = Math.pow((b + 0.5) / beads, 1.6)
      const reach = 1 + 2.6 * t
      const tube = 0.16 * Math.sin(Math.min(1, 0.25 + t * 0.9) * Math.PI) + 0.04
      const ang = rnd() * TWO_PI
      const rad = Math.sqrt(rnd()) * tube
      const ca = Math.cos(ang) * rad
      const sa = Math.sin(ang) * rad
      pos[k * 3] = dx * reach + (ux / ul) * ca + vx * sa
      pos[k * 3 + 1] = ay * reach + (uy / ul) * ca + vy * sa
      pos[k * 3 + 2] = dz * reach + (uz / ul) * ca + vz * sa
      size[k] = 0.55 + t * 0.6
      k++
    }
  }
  // Any remainder from the integer split sinks into the core.
  for (let i = used; i < n; i++) {
    pos[i * 3] = pos[i * 3 + 1] = pos[i * 3 + 2] = 0
    size[i] = 0.6
  }
}

/** A flat annulus in the XZ plane — the cloud settling into a pond. */
const disc: Filler = (pos, size, n, rnd) => {
  for (let i = 0; i < n; i++) {
    const theta = i * GOLDEN_ANGLE
    // sqrt keeps the density even across the annulus instead of bunching in.
    const r = Math.sqrt(0.09 + rnd() * 0.91) * 1.45
    pos[i * 3] = Math.cos(theta) * r
    pos[i * 3 + 1] = (rnd() - 0.5) * 0.08
    pos[i * 3 + 2] = Math.sin(theta) * r
    size[i] = 0.7 + rnd() * 0.5
  }
}

const torus: Filler = (pos, size, n, rnd) => {
  const R = 0.95
  const r = 0.34
  for (let i = 0; i < n; i++) {
    const u = i * GOLDEN_ANGLE
    const v = rnd() * TWO_PI
    const cu = Math.cos(u)
    const su = Math.sin(u)
    const ring = R + r * Math.cos(v)
    pos[i * 3] = cu * ring
    pos[i * 3 + 1] = r * Math.sin(v)
    pos[i * 3 + 2] = su * ring
    size[i] = 0.8 + rnd() * 0.4
  }
}

/** Two intertwined strands running up Y. */
const helix: Filler = (pos, size, n, rnd) => {
  const turns = 3
  const radius = 0.6
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1)
    const strand = i % 2
    const ang = t * turns * TWO_PI + strand * Math.PI
    const jitter = 0.05
    pos[i * 3] = Math.cos(ang) * radius + (rnd() - 0.5) * jitter
    pos[i * 3 + 1] = (t * 2 - 1) * 1.35 + (rnd() - 0.5) * jitter
    pos[i * 3 + 2] = Math.sin(ang) * radius + (rnd() - 0.5) * jitter
    size[i] = 0.75 + rnd() * 0.4
  }
}

/** A lattice sheet facing the camera, tilted slightly out of plane. */
const grid: Filler = (pos, size, n, rnd) => {
  const cols = Math.ceil(Math.sqrt(n))
  const rows = Math.ceil(n / cols)
  const spanX = 1.6
  const spanY = 1.15
  for (let i = 0; i < n; i++) {
    const cx = i % cols
    const cy = Math.floor(i / cols)
    const u = cols === 1 ? 0.5 : cx / (cols - 1)
    const v = rows === 1 ? 0.5 : cy / (rows - 1)
    const x = (u * 2 - 1) * spanX
    const y = (v * 2 - 1) * spanY
    pos[i * 3] = x
    pos[i * 3 + 1] = y
    // A gentle saddle keeps the sheet from projecting as a dead flat rectangle.
    pos[i * 3 + 2] = (x * x - y * y) * 0.18 + (rnd() - 0.5) * 0.05
    size[i] = 0.8
  }
}

/** Uniform noise inside a ball — the neutral state to dissolve through. */
const scatter: Filler = (pos, size, n, rnd) => {
  for (let i = 0; i < n; i++) {
    // Rejection-free uniform point in a ball: random direction, cube-root radius.
    const u = rnd() * 2 - 1
    const theta = rnd() * TWO_PI
    const s = Math.sqrt(Math.max(0, 1 - u * u))
    const r = Math.cbrt(rnd()) * 1.5
    pos[i * 3] = Math.cos(theta) * s * r
    pos[i * 3 + 1] = u * r
    pos[i * 3 + 2] = Math.sin(theta) * s * r
    size[i] = 0.6 + rnd() * 0.6
  }
}

const FILLERS: Record<ShapeId, { fill: Filler; seed: number }> = {
  orb: { fill: orb, seed: 0x51ede5 },
  disc: { fill: disc, seed: 0x0d15c0 },
  torus: { fill: torus, seed: 0x70a05e },
  helix: { fill: helix, seed: 0x4e11c3 },
  grid: { fill: grid, seed: 0x62d1d5 },
  scatter: { fill: scatter, seed: 0x5ca77e },
}

const cache = new Map<ShapeId, Cloud>()

/** Build (or return the cached) canonically ordered cloud for a shape. */
export function getCloud(id: ShapeId): Cloud {
  const hit = cache.get(id)
  if (hit) return hit

  const n = CLOUD_SIZE
  const rawPos = new Float32Array(n * 3)
  const rawSize = new Float32Array(n)
  const entry = FILLERS[id] ?? FILLERS.orb
  entry.fill(rawPos, rawSize, n, mulberry32(entry.seed))

  const { pos, size } = canonicalOrder(rawPos, rawSize)
  const cloud: Cloud = { id, pos, size }
  cache.set(id, cloud)
  return cloud
}

export const SHAPE_IDS = Object.keys(FILLERS) as ShapeId[]
