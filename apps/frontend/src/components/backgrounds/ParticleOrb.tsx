"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface ParticleOrbProps {
  className?: string
  /** Particles forming the sphere shell. */
  shellCount?: number
  /** Sphere radius as a fraction of the canvas' smaller side. */
  sphereRadius?: number
  /** Full turns per minute around the Y axis. */
  spinSpeed?: number
  /** Fixed tilt of the sphere in radians. */
  tilt?: number
  /** Number of tentacles reaching out of the sphere. */
  tentacles?: number
  /** Beads streaming along each tentacle. */
  tentacleBeads?: number
  /** Tentacle reach, as a multiple of the sphere radius. */
  tentacleLength?: number
  /** How far a tentacle tip sways off its base axis, as a multiple of the radius. */
  tentacleSway?: number
  /** Beads travelled per second along a tentacle (1 = tip to base in one second). 0 freezes them. */
  flowSpeed?: number
  /** Random per-particle offset off the ideal lattice / arm axis, as a fraction of the radius. */
  scatter?: number
  /** How irregularly beads sit along an arm: 0 evenly spaced, 1 fully random. */
  beadSpread?: number
  /**
   * How strongly beads bunch toward the base of an arm. 1 spreads them evenly
   * over the reach; higher values crowd them around the sphere and thin the tip.
   */
  beadRootBias?: number
  /** Radius of the tube of beads around an arm's axis, as a fraction of the sphere radius. */
  tentacleThickness?: number
  /**
   * Neighbour search radius in **3D world space**, as a fraction of the sphere
   * radius. The natural lattice spacing is about sqrt(4*PI / shellCount), so
   * ~0.3 at the default count. 0 disables all links.
   */
  linkDistance?: number
  /** Max edges kept per shell particle. ~6 matches the valence of a triangulated sphere. */
  linkNeighbors?: number
  /** Link the innermost beads of each arm into the shell they emerge from. */
  linkArmsToShell?: boolean
  /**
   * How many beads ahead each bead links to along its arm. 1 is a bare chain
   * (each bead tied only to its predecessor and successor); 3 webs the tube.
   */
  armLinkSpan?: number
  /** Depth of the per-link pulse, 0 steady, 1 fading fully out at the trough. */
  linkPulse?: number
  /** Pulses per second for the fastest links; each link picks its own rate below it. */
  linkPulseSpeed?: number
  /** Radius of the glowing pond at the centre, as a multiple of the sphere radius. */
  pondRadius?: number
  /** How far the pointer tips the sphere, in radians. */
  pointerTilt?: number
  /** Base dot radius in CSS px, before perspective scaling. */
  dotRadius?: number
  dotOpacity?: number
  linkOpacity?: number
  pondOpacity?: number
  /** CSS custom property names sampled for colours. */
  dotColorVar?: string
  linkColorVar?: string
  pondColorVar?: string
}

const TWO_PI = Math.PI * 2
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
/** Alpha quantisation for link batching: one Path2D + one stroke() per bucket. */
const LINK_BUCKETS = 8

/** Deterministic [0, 1) noise from a pair of indices, for pulses on dynamic links. */
function hash2(a: number, b: number) {
  const h = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453
  return h - Math.floor(h)
}

interface Vec3 {
  x: number
  y: number
  z: number
}

interface ShellPoint extends Vec3 {
  /** Per-particle breathing phase, so the shell shimmers rather than pulsing as one. */
  phase: number
  /** Breathing amplitude as a fraction of the radius. */
  amp: number
  /** Fixed offset off the lattice point, in units of the scatter radius. */
  jx: number
  jy: number
  jz: number
}

interface Tentacle {
  /** Unit direction the arm leaves the sphere along. */
  dir: Vec3
  /** Orthonormal basis spanning the plane the arm sways in. */
  u: Vec3
  v: Vec3
  phase: number
  /** Sway frequency multiplier. */
  freq: number
  /** Twist of the sway plane along the arm's length. */
  twist: number
  /** Bead positions along the arm, 0 at the sphere surface, 1 at the tip. */
  beads: number[]
  /** Fixed per-bead placement in the arm's cross-section: angle, disc radius, axial nudge. */
  beadJitter: { a: number; r: number; z: number }[]
}

function readVar(el: Element, name: string, fallback: string) {
  const value = getComputedStyle(el).getPropertyValue(name).trim()
  return value || fallback
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v.x, v.y, v.z) || 1
  return { x: v.x / len, y: v.y / len, z: v.z / len }
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  }
}

/** Points spread evenly over a unit sphere (Fibonacci lattice). */
function fibonacciSphere(count: number): ShellPoint[] {
  const points: ShellPoint[] = []
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = i * GOLDEN_ANGLE
    points.push({
      x: Math.cos(theta) * r,
      y,
      z: Math.sin(theta) * r,
      phase: Math.random() * TWO_PI,
      amp: 0.015 + Math.random() * 0.05,
      jx: Math.random() * 2 - 1,
      jy: Math.random() * 2 - 1,
      jz: Math.random() * 2 - 1,
    })
  }
  return points
}

function makeTentacles(count: number): Tentacle[] {
  const arms: Tentacle[] = []
  for (let i = 0; i < count; i++) {
    // Spread the bases over the sphere, biased away from the poles so the arms
    // read as reaching outward rather than straight up and down.
    const y = Math.sin(((i / count) * 2 - 1) * 1.05) * 0.75
    const r = Math.sqrt(Math.max(0.05, 1 - y * y))
    const theta = i * GOLDEN_ANGLE * 2 + Math.random() * 0.4
    const dir = normalize({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r })

    // Any vector not parallel to `dir` works as the seed for the basis.
    const seed: Vec3 = Math.abs(dir.y) > 0.9 ? { x: 1, y: 0, z: 0 } : { x: 0, y: 1, z: 0 }
    const u = normalize(cross(dir, seed))
    const v = cross(dir, u)

    arms.push({
      dir,
      u,
      v,
      phase: Math.random() * TWO_PI,
      freq: 0.6 + Math.random() * 0.8,
      twist: (Math.random() * 2 - 1) * 2.2,
      beads: [],
      beadJitter: [],
    })
  }
  return arms
}

/**
 * A sphere of particles with tentacles streaming into the glowing pond at its
 * centre. Perspective-projected onto a 2D canvas, theme-aware, and idle when
 * off-screen; renders a single static frame under `prefers-reduced-motion`.
 *
 * Links are a fixed mesh: neighbours are picked once in 3D on the unit sphere
 * (see `rebuild`), so spinning never rewires the shell. See ./README.md.
 */
export function ParticleOrb({
  className,
  shellCount = 190,
  sphereRadius = 0.26,
  spinSpeed = 0.1,
  tilt = -0.32,
  tentacles = 6,
  tentacleBeads = 46,
  tentacleLength = 4,
  tentacleSway = 0.1,
  flowSpeed = 0,
  scatter = 0.15,
  beadSpread = 0.1,
  beadRootBias = 1.5,
  tentacleThickness = 0.2,
  linkDistance = 0.32,
  linkNeighbors = 3,
  linkArmsToShell = true,
  armLinkSpan = 2,
  linkPulse = 0.7,
  linkPulseSpeed = 0.5,
  pondRadius = 0.72,
  pointerTilt = 0.28,
  dotRadius = 1.5,
  dotOpacity = 0.72,
  linkOpacity = 0.1,
  pondOpacity = 0.05,
  dotColorVar = "--color-primary",
  linkColorVar = "--color-muted-foreground",
  pondColorVar = "--color-primary",
}: ParticleOrbProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  // Live prop mirror: the loop starts once and reads the newest values from
  // here, so tweaking props never restarts the simulation.
  const props = {
    shellCount,
    sphereRadius,
    spinSpeed,
    tilt,
    tentacles,
    tentacleBeads,
    tentacleLength,
    tentacleSway,
    flowSpeed,
    scatter,
    beadSpread,
    beadRootBias,
    tentacleThickness,
    linkDistance,
    linkNeighbors,
    linkArmsToShell,
    armLinkSpan,
    linkPulse,
    linkPulseSpeed,
    pondRadius,
    pointerTilt,
    dotRadius,
    dotOpacity,
    linkOpacity,
    pondOpacity,
    dotColorVar,
    linkColorVar,
    pondColorVar,
  }
  const opts = React.useRef(props)
  opts.current = props

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")

    let width = 0
    let height = 0
    let frame = 0
    let last = 0
    let time = 0
    let visible = true

    let shell: ShellPoint[] = []
    let arms: Tentacle[] = []
    let spin = 0
    let seededSpread = Number.NaN
    let colors = { dot: "#888", link: "#888", pond: "#888" }

    // --- static link mesh ------------------------------------------------
    // Rotation is rigid, so 3D distances between shell particles never change.
    // Neighbours are therefore chosen once and stored as a flat edge list;
    // the draw loop walks E edges (~500) instead of testing N^2 pairs (~18k).
    let shellEdgeA = new Uint16Array(0)
    let shellEdgeB = new Uint16Array(0)
    /** Distance at build time, in unit-sphere units. Multiply by R for px. */
    let shellEdgeRest = new Float32Array(0)
    /** Per-edge pulse phase and rate, rolled once with the mesh. */
    let shellEdgePulse = new Float32Array(0)
    // Beads along one arm, each tied to the next few rather than only its
    // immediate neighbour, so an arm reads as a woven tube instead of a chain.
    // The pair indices are static; the edge itself is distance-culled at draw
    // time so the wrap-around bead (the one that just respawned at the tip)
    // does not draw a line across the whole arm.
    let armEdgeA = new Uint16Array(0)
    let armEdgeB = new Uint16Array(0)
    /** Index gap of each arm edge, so the cull scales with how far apart the pair sits. */
    let armEdgeGap = new Uint8Array(0)
    let armEdgePulse = new Float32Array(0)
    /** Signature of the inputs the mesh was built from, to know when to rebuild. */
    let meshKey = ""

    // Pointer parallax, eased toward the raw pointer position each frame.
    const pointer = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }

    // Reused per-frame buffer of projected points, sorted back-to-front.
    // `wx/wy/wz` is the pre-rotation world position, kept so links can measure
    // true 3D distance rather than the projected (and therefore lying) 2D one.
    type Projected = {
      sx: number
      sy: number
      scale: number
      depth: number
      r: number
      wx: number
      wy: number
      wz: number
    }
    let projected: Projected[] = []

    const sampleColors = () => {
      colors = {
        dot: readVar(canvas, opts.current.dotColorVar, "#888"),
        link: readVar(canvas, opts.current.linkColorVar, "#888"),
        pond: readVar(canvas, opts.current.pondColorVar, "#888"),
      }
    }

    /**
     * Pick each shell particle's k nearest neighbours within `maxDist`, on the
     * unit sphere including its fixed scatter offset. A plain radius cut gives
     * uneven valence on a Fibonacci lattice — some vertices catch 4 neighbours,
     * some 8, and it reads as clumpy — so the candidates are sorted and capped.
     */
    const buildShellEdges = (maxDist: number, k: number, scatterAmount: number) => {
      const n = shell.length
      if (n === 0 || maxDist <= 0 || k <= 0) {
        shellEdgeA = new Uint16Array(0)
        shellEdgeB = new Uint16Array(0)
        shellEdgeRest = new Float32Array(0)
        shellEdgePulse = new Float32Array(0)
        return
      }
      // Positions as the draw loop will actually place them (minus breathing,
      // which only stretches an edge a few percent and is handled at draw time).
      const px = new Float64Array(n)
      const py = new Float64Array(n)
      const pz = new Float64Array(n)
      for (let i = 0; i < n; i++) {
        px[i] = shell[i].x + shell[i].jx * scatterAmount
        py[i] = shell[i].y + shell[i].jy * scatterAmount
        pz[i] = shell[i].z + shell[i].jz * scatterAmount
      }

      // Search a little wider than the target so breathing cannot pop an edge
      // in and out at the threshold.
      const max2 = (maxDist * 1.15) * (maxDist * 1.15)
      const seen = new Set<number>()
      const a: number[] = []
      const b: number[] = []
      const rest: number[] = []
      const cand: { j: number; d2: number }[] = []

      for (let i = 0; i < n; i++) {
        cand.length = 0
        for (let j = 0; j < n; j++) {
          if (j === i) continue
          const dx = px[i] - px[j]
          const dy = py[i] - py[j]
          const dz = pz[i] - pz[j]
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 <= max2) cand.push({ j, d2 })
        }
        cand.sort((p, q) => p.d2 - q.d2)
        const take = Math.min(k, cand.length)
        for (let c = 0; c < take; c++) {
          const j = cand[c].j
          const key = i < j ? i * n + j : j * n + i
          if (seen.has(key)) continue
          seen.add(key)
          a.push(i)
          b.push(j)
          rest.push(Math.sqrt(cand[c].d2))
        }
      }

      shellEdgeA = Uint16Array.from(a)
      shellEdgeB = Uint16Array.from(b)
      shellEdgeRest = Float32Array.from(rest)
      shellEdgePulse = rollPulses(a.length)
    }

    /**
     * Phase and rate for `n` links, interleaved as [phase, rate, phase, ...].
     * Every link keeps its own pair, so the mesh flickers in no order at all
     * rather than beating as one.
     */
    const rollPulses = (n: number) => {
      const out = new Float32Array(n * 2)
      for (let i = 0; i < n; i++) {
        out[i * 2] = Math.random() * TWO_PI
        out[i * 2 + 1] = 0.35 + Math.random() * 0.9
      }
      return out
    }

    /**
     * Bead pairs within an arm, indexed into the same `projected` buffer. Each
     * bead reaches `span` beads ahead, not just to the next one: the beads sit
     * scattered around the arm's axis, so the longer hops cross the tube and
     * web it together instead of tracing a single spine down it.
     */
    const buildArmEdges = (span: number) => {
      const base = shell.length
      const reach = Math.max(1, Math.round(span))
      const a: number[] = []
      const b: number[] = []
      const gap: number[] = []
      for (let t = 0; t < arms.length; t++) {
        const beads = arms[t].beads.length
        const off = base + t * beads
        for (let i = 0; i < beads; i++) {
          for (let g = 1; g <= reach && i + g < beads; g++) {
            a.push(off + i)
            b.push(off + i + g)
            gap.push(g)
          }
        }
      }
      armEdgeA = Uint16Array.from(a)
      armEdgeB = Uint16Array.from(b)
      armEdgeGap = Uint8Array.from(gap)
      armEdgePulse = rollPulses(a.length)
    }

    const rebuild = () => {
      const o = opts.current
      const { shellCount: n, tentacles: t, tentacleBeads: b } = o
      if (shell.length !== n) shell = fibonacciSphere(n)
      if (arms.length !== t) arms = makeTentacles(t)
      // Bead placement is rolled once, so a changed spread has to force a
      // re-roll — otherwise tweaking it live would look like a no-op.
      const spreadChanged = seededSpread !== o.beadSpread
      seededSpread = o.beadSpread
      for (const arm of arms) {
        if (arm.beads.length === b && !spreadChanged) continue
        arm.beads = new Array(b)
        arm.beadJitter = new Array(b)
        // Blend an even walk along the arm with a fully random position, so
        // the beads clump and gap instead of reading as a ruler.
        const spreadAmount = o.beadSpread
        for (let i = 0; i < b; i++) {
          const even = (i + 0.5) / b
          arm.beads[i] = even + (Math.random() - even) * spreadAmount
          arm.beadJitter[i] = {
            a: Math.random() * TWO_PI,
            // sqrt keeps the beads spread evenly over the disc rather than
            // bunching at its centre.
            r: Math.sqrt(Math.random()),
            z: Math.random() * 2 - 1,
          }
        }
      }

      // The mesh only depends on the lattice and the neighbourhood settings —
      // none of which change per frame — so rebuild it on signature change only.
      const key = [n, t, b, o.linkDistance, o.linkNeighbors, o.scatter, o.armLinkSpan].join("|")
      if (key !== meshKey) {
        meshKey = key
        buildShellEdges(o.linkDistance, o.linkNeighbors, o.scatter)
        buildArmEdges(o.armLinkSpan)
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const step = (dt: number) => {
      const o = opts.current
      time += dt
      spin += (o.spinSpeed * TWO_PI * dt) / 60

      // Beads travel from the tip toward the sphere, then respawn at the tip.
      const advance = o.flowSpeed * dt
      for (const arm of arms) {
        for (let i = 0; i < arm.beads.length; i++) {
          let s = arm.beads[i] - advance
          if (s < 0) s += 1
          arm.beads[i] = s
        }
      }

      eased.x += (pointer.x - eased.x) * Math.min(1, dt * 2.5)
      eased.y += (pointer.y - eased.y) * Math.min(1, dt * 2.5)
    }

    const draw = () => {
      const o = opts.current
      ctx.clearRect(0, 0, width, height)
      if (width === 0 || height === 0) return

      const cx = width / 2
      const cy = height / 2
      const R = Math.min(width, height) * o.sphereRadius
      const focal = R * 3.2

      const rotY = spin + eased.x * o.pointerTilt
      const rotX = o.tilt + eased.y * o.pointerTilt
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      // World space (already scaled to px) -> rotated -> perspective screen.
      const project = (x: number, y: number, z: number, out: Projected) => {
        const x1 = x * cosY + z * sinY
        const z1 = -x * sinY + z * cosY
        const y2 = y * cosX - z1 * sinX
        const z2 = y * sinX + z1 * cosX
        const scale = focal / (focal + z2)
        out.sx = cx + x1 * scale
        out.sy = cy + y2 * scale
        out.scale = scale
        out.depth = z2
        out.wx = x
        out.wy = y
        out.wz = z
        return out
      }

      let count = 0
      const push = (x: number, y: number, z: number, r: number) => {
        const p =
          projected[count] ??
          (projected[count] = {
            sx: 0, sy: 0, scale: 1, depth: 0, r: 0, wx: 0, wy: 0, wz: 0,
          })
        project(x, y, z, p)
        p.r = r
        count++
      }

      // --- shell -------------------------------------------------------
      const jitter = R * o.scatter
      const tube = R * o.tentacleThickness
      for (let i = 0; i < shell.length; i++) {
        const s = shell[i]
        const breath = 1 + Math.sin(time * 0.9 + s.phase) * s.amp
        push(
          s.x * R * breath + s.jx * jitter,
          s.y * R * breath + s.jy * jitter,
          s.z * R * breath + s.jz * jitter,
          o.dotRadius
        )
      }
      // The shell is pushed first, so `projected[i]` lines up with `shell[i]`
      // and the edge list can index straight into it.
      const shellEnd = count

      // --- tentacles ---------------------------------------------------
      // A point at arc position `t` (0 at the surface, 1 at the tip): the base
      // axis carries it outward while a twisting sway pushes it off-axis, with
      // the offset growing toward the tip so the arm hangs like a tendril.
      const armPoint = (arm: Tentacle, t: number) => {
        const reach = R * (1 + o.tentacleLength * t)
        const angle = time * arm.freq + arm.phase + t * arm.twist
        const swayAmp = R * o.tentacleSway * t * t
        const cs = Math.cos(angle)
        const sn = Math.sin(angle)
        return {
          x: arm.dir.x * reach + (arm.u.x * cs + arm.v.x * sn) * swayAmp,
          y: arm.dir.y * reach + (arm.u.y * cs + arm.v.y * sn) * swayAmp,
          z: arm.dir.z * reach + (arm.u.z * cs + arm.v.z * sn) * swayAmp,
        }
      }

      // `beads` holds an evenly-flowing parameter in [0, 1]; the arc position
      // is warped off it so the density profile stays put on the arm while the
      // beads flow through it. Higher bias packs more of them near the base.
      const armBias = Math.max(0.1, o.beadRootBias)
      const armT = (u: number) => (armBias === 1 ? u : Math.pow(u, armBias))

      for (const arm of arms) {
        for (let i = 0; i < arm.beads.length; i++) {
          const t = armT(arm.beads[i])
          const w = armPoint(arm, t)
          const j = arm.beadJitter[i]
          // Offset the bead inside a disc perpendicular to the arm, so the
          // stream has a body instead of collapsing onto its spine. The tube
          // is fattest partway along and tapers to a point at the tip.
          const taper = Math.sin(Math.min(1, 0.25 + t * 0.9) * Math.PI) * 0.9 + 0.25
          const radius = tube * taper * j.r
          const ca = Math.cos(j.a)
          const sa = Math.sin(j.a)
          const ax = jitter * j.z
          push(
            w.x + (arm.u.x * ca + arm.v.x * sa) * radius + arm.dir.x * ax,
            w.y + (arm.u.y * ca + arm.v.y * sa) * radius + arm.dir.y * ax,
            w.z + (arm.u.z * ca + arm.v.z * sa) * radius + arm.dir.z * ax,
            o.dotRadius * (0.55 + t * 0.75)
          )
        }
      }
      const total = count

      // --- pond --------------------------------------------------------
      if (o.pondOpacity > 0 && o.pondRadius > 0) {
        const pr = R * o.pondRadius
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pr)
        grad.addColorStop(0, colors.pond)
        grad.addColorStop(0.45, colors.pond)
        grad.addColorStop(1, "transparent")
        ctx.globalAlpha = o.pondOpacity
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, pr, 0, TWO_PI)
        ctx.fill()
      }

      // --- links -------------------------------------------------------
      if (o.linkOpacity > 0 && o.linkDistance > 0) {
        // Alpha varies per edge, and a stroke() per edge would mean ~600 canvas
        // calls a frame. Quantise the alpha into a handful of buckets instead
        // and stroke one batched path per bucket.
        const paths: Path2D[] = new Array(LINK_BUCKETS)
        const used = new Uint8Array(LINK_BUCKETS)
        for (let i = 0; i < LINK_BUCKETS; i++) paths[i] = new Path2D()

        const addLink = (a: Projected, b: Projected, weight: number) => {
          if (weight <= 0.02) return
          let bucket = (weight * LINK_BUCKETS) | 0
          if (bucket >= LINK_BUCKETS) bucket = LINK_BUCKETS - 1
          if (bucket < 0) bucket = 0
          paths[bucket].moveTo(a.sx, a.sy)
          paths[bucket].lineTo(b.sx, b.sy)
          used[bucket] = 1
        }

        // Fade by depth so the far side of the sphere recedes instead of
        // tangling with the near side. Perspective `scale` already encodes it.
        // Each link fades in and out on its own phase and rate, so the mesh
        // twinkles instead of pulsing in lockstep. `pulses` is the interleaved
        // [phase, rate] buffer built with the mesh; dynamic links (arm roots)
        // have no slot and hash their indices into one instead.
        const pulseAmount = Math.max(0, Math.min(1, o.linkPulse))
        const pulseRate = o.linkPulseSpeed * TWO_PI
        const pulseOf = (phase: number, rate: number) => {
          if (pulseAmount <= 0) return 1
          return 1 - pulseAmount * (0.5 + 0.5 * Math.sin(time * pulseRate * rate + phase))
        }
        const edgePulse = (pulses: Float32Array, e: number) =>
          pulseOf(pulses[e * 2], pulses[e * 2 + 1])

        const depthFade = (a: Projected, b: Projected) => {
          const f = ((a.scale + b.scale) / 2 - 0.7) / 0.6
          return f < 0.15 ? 0.15 : f > 1 ? 1 : f
        }

        const dist3 = (a: Projected, b: Projected) => {
          const dx = a.wx - b.wx
          const dy = a.wy - b.wy
          const dz = a.wz - b.wz
          return Math.sqrt(dx * dx + dy * dy + dz * dz)
        }

        // Shell: the pairs are fixed, so the only per-frame question is how far
        // breathing has stretched each edge off its rest length. Compressed
        // edges brighten, stretched ones dim — the mesh breathes visibly.
        for (let e = 0; e < shellEdgeA.length; e++) {
          const a = projected[shellEdgeA[e]]
          const b = projected[shellEdgeB[e]]
          const rest = shellEdgeRest[e] * R
          if (rest <= 0) continue
          const stretch = dist3(a, b) / rest
          let s = 1 - (stretch - 1) * 3
          if (s < 0.3) s = 0.3
          else if (s > 1) s = 1
          addLink(a, b, s * depthFade(a, b) * edgePulse(shellEdgePulse, e))
        }

        // Arms: pairs are fixed but the spacing is not (flow + spread), so
        // cull by live distance. That also drops the wrap-around edge, where a
        // bead has just respawned at the tip behind its array neighbour.
        // The cull scales with the index gap: a bead three along the arm sits
        // about three spacings away, and a flat cut would drop every long hop.
        const armCut = o.linkDistance * R * 1.5
        for (let e = 0; e < armEdgeA.length; e++) {
          const a = projected[armEdgeA[e]]
          const b = projected[armEdgeB[e]]
          const cut = armCut * (armEdgeGap[e] || 1)
          const d = dist3(a, b)
          if (d > cut) continue
          addLink(a, b, (1 - d / cut) * depthFade(a, b) * edgePulse(armEdgePulse, e))
        }

        // Arm roots into the shell: the only genuinely dynamic pass, and it is
        // limited to the innermost beads, so it stays a few thousand tests.
        if (o.linkArmsToShell && arms.length > 0) {
          const cut = o.linkDistance * R
          const cut2 = cut * cut
          const beadsPer = arms[0].beads.length
          for (let t = 0; t < arms.length; t++) {
            const arm = arms[t]
            const off = shellEnd + t * beadsPer
            for (let i = 0; i < arm.beads.length; i++) {
              if (armT(arm.beads[i]) > 0.15) continue
              const a = projected[off + i]
              for (let j = 0; j < shellEnd; j++) {
                const b = projected[j]
                const dx = a.wx - b.wx
                const dy = a.wy - b.wy
                const dz = a.wz - b.wz
                const d2 = dx * dx + dy * dy + dz * dz
                if (d2 > cut2) continue
                const pulse = pulseOf(hash2(off + i, j) * TWO_PI, 0.35 + hash2(j, off + i))
                addLink(a, b, (1 - Math.sqrt(d2) / cut) * depthFade(a, b) * pulse)
              }
            }
          }
        }

        ctx.strokeStyle = colors.link
        ctx.lineWidth = 1
        for (let i = 0; i < LINK_BUCKETS; i++) {
          if (!used[i]) continue
          ctx.globalAlpha = ((i + 0.5) / LINK_BUCKETS) * o.linkOpacity
          ctx.stroke(paths[i])
        }
      }

      // --- dots, painted back to front ---------------------------------
      const order = Array.from({ length: total }, (_, i) => i)
      order.sort((a, b) => projected[b].depth - projected[a].depth)

      ctx.fillStyle = colors.dot
      for (const i of order) {
        const p = projected[i]
        const fade = Math.max(0.12, Math.min(1, (p.scale - 0.68) / 0.55))
        ctx.globalAlpha = o.dotOpacity * fade
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, Math.max(0.3, p.r * p.scale), 0, TWO_PI)
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      if (!visible) {
        last = now
        return
      }
      // Clamp dt so a backgrounded tab doesn't jump the whole animation.
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      rebuild()
      step(dt)
      draw()
    }

    const start = () => {
      if (frame) return
      last = performance.now()
      frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      if (!frame) return
      cancelAnimationFrame(frame)
      frame = 0
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      // Normalised to [-1, 1] across the canvas box.
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    }
    const onPointerLeave = () => {
      pointer.x = 0
      pointer.y = 0
    }
    const onVisibility = () => {
      visible = !document.hidden
    }
    const onMotionChange = () => {
      if (reduced.matches) {
        stop()
        rebuild()
        draw()
      } else {
        start()
      }
    }

    sampleColors()
    rebuild()
    resize()
    draw()

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced.matches) draw()
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && !document.hidden
      },
      { rootMargin: "100px" }
    )
    io.observe(canvas)

    const themeObserver = new MutationObserver(() => {
      sampleColors()
      if (reduced.matches) draw()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    })

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave)
    document.addEventListener("visibilitychange", onVisibility)
    reduced.addEventListener("change", onMotionChange)

    if (!reduced.matches) start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      themeObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
      document.removeEventListener("visibilitychange", onVisibility)
      reduced.removeEventListener("change", onMotionChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("block h-full w-full", className)}
    />
  )
}

export default ParticleOrb
