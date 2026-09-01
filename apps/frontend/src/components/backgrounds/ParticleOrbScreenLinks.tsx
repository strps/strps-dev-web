"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * ---------------------------------------------------------------------------
 * PREVIOUS VERSION — kept alongside `ParticleOrb` for look comparison.
 *
 * Identical geometry to `ParticleOrb`; the only difference is how links are
 * chosen. Here every projected point is tested against every other one each
 * frame in *screen space* (O(n^2), ~77k pairs at the defaults) and linked if
 * they fall within `linkDistance` CSS px.
 *
 * That means the far side of the sphere links to the near side wherever the two
 * overlap in projection, and perspective compression makes the back denser than
 * the front. `ParticleOrb` replaces this with a static 3D nearest-neighbour
 * mesh. Delete this file once the look is settled.
 * ---------------------------------------------------------------------------
 */

export interface ParticleOrbScreenLinksProps {
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
  /** Radius of the tube of beads around an arm's axis, as a fraction of the sphere radius. */
  tentacleThickness?: number
  /** Link any two particles closer than this on screen (CSS px). 0 disables. */
  linkDistance?: number
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
 */
export function ParticleOrbScreenLinks({
  className,
  shellCount = 190,
  sphereRadius = 0.26,
  spinSpeed = 0.1,
  tilt = -0.32,
  tentacles = 6,
  tentacleBeads = 34,
  tentacleLength = 4,
  tentacleSway = 0.1,
  flowSpeed = 0,
  scatter = 0.01,
  beadSpread = 0.0,
  tentacleThickness = 0.2,
  linkDistance = 30,
  pondRadius = 0.72,
  pointerTilt = 0.28,
  dotRadius = 1.5,
  dotOpacity = 0.72,
  linkOpacity = 0.9,
  pondOpacity = 0,
  dotColorVar = "--color-primary",
  linkColorVar = "--color-muted-foreground",
  pondColorVar = "--color-primary",
}: ParticleOrbScreenLinksProps) {
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
    tentacleThickness,
    linkDistance,
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

    // Pointer parallax, eased toward the raw pointer position each frame.
    const pointer = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }

    // Reused per-frame buffer of projected points, sorted back-to-front.
    type Projected = { sx: number; sy: number; scale: number; depth: number; r: number; shellIndex: number }
    let projected: Projected[] = []

    const sampleColors = () => {
      colors = {
        dot: readVar(canvas, opts.current.dotColorVar, "#888"),
        link: readVar(canvas, opts.current.linkColorVar, "#888"),
        pond: readVar(canvas, opts.current.pondColorVar, "#888"),
      }
    }

    const rebuild = () => {
      const { shellCount: n, tentacles: t, tentacleBeads: b } = opts.current
      if (shell.length !== n) shell = fibonacciSphere(n)
      if (arms.length !== t) arms = makeTentacles(t)
      // Bead placement is rolled once, so a changed spread has to force a
      // re-roll — otherwise tweaking it live would look like a no-op.
      const spreadChanged = seededSpread !== opts.current.beadSpread
      seededSpread = opts.current.beadSpread
      for (const arm of arms) {
        if (arm.beads.length === b && !spreadChanged) continue
        arm.beads = new Array(b)
        arm.beadJitter = new Array(b)
        // Blend an even walk along the arm with a fully random position, so
        // the beads clump and gap instead of reading as a ruler.
        const spreadAmount = opts.current.beadSpread
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
      const project = (x: number, y: number, z: number, out: Projected, shellIndex: number) => {
        const x1 = x * cosY + z * sinY
        const z1 = -x * sinY + z * cosY
        const y2 = y * cosX - z1 * sinX
        const z2 = y * sinX + z1 * cosX
        const scale = focal / (focal + z2)
        out.sx = cx + x1 * scale
        out.sy = cy + y2 * scale
        out.scale = scale
        out.depth = z2
        out.shellIndex = shellIndex
        return out
      }

      let count = 0
      const push = (x: number, y: number, z: number, r: number, shellIndex: number) => {
        const p = projected[count] ?? (projected[count] = {
          sx: 0, sy: 0, scale: 1, depth: 0, r: 0, shellIndex: -1,
        })
        project(x, y, z, p, shellIndex)
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
          o.dotRadius,
          i
        )
      }

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

      for (const arm of arms) {
        for (let i = 0; i < arm.beads.length; i++) {
          const t = arm.beads[i]
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
            o.dotRadius * (0.55 + t * 0.75),
            -1
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

      // --- links: every point, shell and tentacle alike ----------------
      if (o.linkDistance > 0 && o.linkOpacity > 0) {
        const link2 = o.linkDistance * o.linkDistance
        ctx.strokeStyle = colors.link
        ctx.lineWidth = 1
        for (let i = 0; i < total; i++) {
          const a = projected[i]
          for (let j = i + 1; j < total; j++) {
            const b = projected[j]
            const dx = a.sx - b.sx
            const dy = a.sy - b.sy
            const d2 = dx * dx + dy * dy
            if (d2 > link2) continue
            // Fade by both screen distance and depth, so the far side of the
            // sphere recedes instead of tangling with the near side.
            const depthFade = ((a.scale + b.scale) / 2 - 0.7) / 0.6
            ctx.globalAlpha =
              (1 - Math.sqrt(d2) / o.linkDistance) * o.linkOpacity * Math.max(0.15, Math.min(1, depthFade))
            ctx.beginPath()
            ctx.moveTo(a.sx, a.sy)
            ctx.lineTo(b.sx, b.sy)
            ctx.stroke()
          }
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

export default ParticleOrbScreenLinks
