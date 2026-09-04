"use client"

import * as React from "react"
import gsap from "gsap"

import { cn } from "@/lib/utils"
import { cssColor, readColorVar, type RGB } from "./particle-stage/color"
import { getMesh, warmMesh, type Mesh } from "./particle-stage/mesh"
import { CLOUD_SIZE, getCloud, type Cloud, type ShapeId } from "./particle-stage/shapes"

export interface ParticleFieldProps {
  /** Which cloud to draw. The shape library is shared with `ParticleStage`. */
  shape?: ShapeId
  className?: string
  /** Cloud radius as a fraction of whichever side `sizeFrom` measures. */
  radius?: number
  /**
   * Which side of the host box sets the scale. `height` is the useful default
   * for a background band, which is as wide as the page and only as tall as the
   * thing it sits behind — measuring the smaller side there would be measuring
   * the height anyway, and measuring `min` on a narrow phone would shrink the
   * cloud for no reason.
   */
  sizeFrom?: "min" | "height" | "width"
  /** Where the cloud sits, in fractions of the host box measured from centre. */
  offset?: { x?: number; y?: number }
  /** Full turns per minute around Y. */
  spinSpeed?: number
  /** Fixed tilt in radians. */
  tilt?: number
  /** How far the pointer tips the cloud, in radians. */
  pointerTilt?: number
  /** How fast the cloud chases the pointer, in units per second. */
  pointerEase?: number
  /** Neighbour radius in cloud units. 0 disables links. */
  linkDistance?: number
  /** Max edges kept per point. */
  linkNeighbors?: number
  /** Depth of the per-link pulse. 0 steady, 1 fades a link out at its trough. */
  linkPulse?: number
  /** Pulses per second for the fastest links. */
  linkPulseSpeed?: number
  /** Base dot radius in CSS px, before perspective scaling. */
  dotRadius?: number
  dotOpacity?: number
  linkOpacity?: number
  /** CSS custom properties sampled off the canvas. */
  dotColorVar?: string
  linkColorVar?: string
}

const TWO_PI = Math.PI * 2
/** Alpha quantisation for link batching: one Path2D + one stroke() per bucket. */
const LINK_BUCKETS = 8

interface Projected {
  sx: number
  sy: number
  scale: number
  depth: number
  wx: number
  wy: number
  wz: number
  /** 0 once a point has reached the near plane, 1 once it is safely past it. */
  nearFade: number
}

/**
 * One particle cloud on its own canvas, filling whatever box it is given.
 *
 * The standalone counterpart to `ParticleStage`: same shape library, same
 * projection and link mesh, but it holds a single shape and answers to nothing
 * outside itself. No registry, no scroll coupling, no morph — you hand it a
 * `shape` and it draws that shape until it unmounts. Reach for it when one
 * component wants a particle background of its own; reach for `ParticleStage`
 * when the background should carry the reader *between* sections.
 *
 * It is `aria-hidden`, `pointer-events-none` and absolutely fills its nearest
 * positioned ancestor, so the host needs `relative` (and `overflow-hidden` if
 * the cloud should be clipped to it):
 *
 * ```tsx
 * <header className="relative overflow-hidden">
 *   <ParticleField shape="stack" />
 *   …
 * </header>
 * ```
 */
export function ParticleField({
  shape = "orb",
  className,
  radius = 0.62,
  sizeFrom = "height",
  offset,
  spinSpeed = 0.3,
  tilt = -0.32,
  pointerTilt = 0.02,
  pointerEase = 2.5,
  linkDistance = 0.34,
  linkNeighbors = 3,
  linkPulse = 0.9,
  linkPulseSpeed = 0.5,
  dotRadius = 1.5,
  dotOpacity = 0.72,
  linkOpacity = 0.5,
  dotColorVar = "--color-primary",
  linkColorVar = "--color-muted-foreground",
}: ParticleFieldProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  // Live prop mirror: the loop starts once and reads the newest values from
  // here, so tweaking a prop retunes the running field instead of restarting
  // it — the same arrangement `ParticleStage` uses.
  const props = {
    shape, radius, sizeFrom, offset,
    spinSpeed, tilt, pointerTilt, pointerEase,
    linkDistance, linkNeighbors, linkPulse, linkPulseSpeed,
    dotRadius, dotOpacity, linkOpacity,
    dotColorVar, linkColorVar,
  }
  const opts = React.useRef(props)
  // Synced in an effect rather than during render: the loop reads `opts` on the
  // next frame, which is always after commit.
  React.useEffect(() => {
    opts.current = props
  })

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")

    let width = 0
    let height = 0
    let time = 0
    let lastTick = 0
    // Off-screen and hidden-tab frames are skipped outright: this is decoration
    // behind one component, and it is often scrolled past for the whole visit.
    let visible = true

    // Working buffer, allocated once and rewritten every frame.
    const projected: Projected[] = Array.from({ length: CLOUD_SIZE }, () => ({
      sx: 0, sy: 0, scale: 1, depth: 0, wx: 0, wy: 0, wz: 0, nearFade: 1,
    }))

    // Per-point breathing, rolled once. Nothing here is a function of scroll,
    // so this is the only thing keeping the cloud alive while the page is
    // still — without it the field is a still image.
    const breathPhase = new Float32Array(CLOUD_SIZE)
    const breathAmp = new Float32Array(CLOUD_SIZE)
    for (let i = 0; i < CLOUD_SIZE; i++) {
      breathPhase[i] = Math.random() * TWO_PI
      breathAmp[i] = 0.015 + Math.random() * 0.05
    }

    const pointer = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }
    let spin = 0

    const fallback: RGB = [136, 136, 136]
    let colorKey = ""
    let dot = fallback
    let link = fallback

    // getComputedStyle forces style resolution, far too expensive per frame.
    // Nothing here changes the sampled element, so this re-reads only when the
    // vars change or the theme observer drops the key.
    const sampleColors = () => {
      const o = opts.current
      const key = `${o.dotColorVar}|${o.linkColorVar}`
      if (key === colorKey) return
      colorKey = key
      dot = readColorVar(canvas, o.dotColorVar, fallback)
      link = readColorVar(canvas, o.linkColorVar, fallback)
    }
    const dropColors = () => {
      colorKey = ""
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

    const draw = (dt: number) => {
      const o = opts.current
      time += dt
      spin += (o.spinSpeed * TWO_PI * dt) / 60

      const chase = Math.max(0, Math.min(1, dt * o.pointerEase))
      eased.x += (pointer.x - eased.x) * chase
      eased.y += (pointer.y - eased.y) * chase

      ctx.clearRect(0, 0, width, height)
      if (width === 0 || height === 0) return

      const cloud = getCloud(o.shape)
      const base =
        o.sizeFrom === "width" ? width : o.sizeFrom === "min" ? Math.min(width, height) : height
      const R = base * o.radius
      const cx = width / 2 + width * (o.offset?.x ?? 0)
      const cy = height / 2 + height * (o.offset?.y ?? 0)

      const focal = R * 3.2
      const nearPlane = focal * 0.25
      const rotY = spin + eased.x * o.pointerTilt
      const rotX = o.tilt + eased.y * o.pointerTilt
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      for (let i = 0; i < CLOUD_SIZE; i++) {
        const breath = 1 + Math.sin(time * 0.9 + breathPhase[i]) * breathAmp[i]
        const x = cloud.pos[i * 3] * R * breath
        const y = cloud.pos[i * 3 + 1] * R * breath
        const z = cloud.pos[i * 3 + 2] * R * breath

        const x1 = x * cosY + z * sinY
        const z1 = -x * sinY + z * cosY
        const y2 = y * cosX - z1 * sinX
        const z2 = y * sinX + z1 * cosX

        // A point can land on or behind the camera, where focal / (focal + z)
        // blows up or flips sign and throws it across the canvas. Clamp the
        // denominator at a near plane and fade the point as it approaches, so
        // it leaves instead of streaking.
        const denom = focal + z2
        const p = projected[i]
        const s = focal / (denom > nearPlane ? denom : nearPlane)
        p.nearFade =
          denom <= nearPlane ? 0 : denom >= nearPlane * 2 ? 1 : (denom - nearPlane) / nearPlane
        p.sx = cx + x1 * s
        p.sy = cy + y2 * s
        p.scale = s
        p.depth = z2
        p.wx = x
        p.wy = y
        p.wz = z
      }

      sampleColors()
      drawLinks(cloud.id, R, cssColor(link))
      drawDots(cloud, cssColor(dot))
      ctx.globalAlpha = 1
    }

    /**
     * The shape's own mesh, culled by live distance.
     *
     * Only one mesh is ever live — there is no morph here — so the crossfade
     * and stretch-cull `ParticleStage` needs at a seam reduce to a single pass.
     * The stretch test still earns its place: breathing moves the points.
     */
    const drawLinks = (id: ShapeId, R: number, color: string) => {
      const o = opts.current
      if (o.linkOpacity <= 0 || o.linkDistance <= 0) return

      const mesh: Mesh = getMesh(getCloud(id), {
        linkDistance: o.linkDistance,
        linkNeighbors: o.linkNeighbors,
      })
      const paths: Path2D[] = new Array(LINK_BUCKETS)
      const used = new Uint8Array(LINK_BUCKETS)
      for (let i = 0; i < LINK_BUCKETS; i++) paths[i] = new Path2D()

      const pulseAmount = Math.max(0, Math.min(1, o.linkPulse))
      const pulseRate = o.linkPulseSpeed * TWO_PI

      for (let e = 0; e < mesh.a.length; e++) {
        const a = projected[mesh.a[e]]
        const b = projected[mesh.b[e]]
        const rest = mesh.rest[e] * R
        if (rest <= 0) continue

        const dx = a.wx - b.wx
        const dy = a.wy - b.wy
        const dz = a.wz - b.wz
        const stretch = Math.sqrt(dx * dx + dy * dy + dz * dz) / rest
        // Compressed edges brighten, stretched ones dim.
        let s = 1 - (stretch - 1) * 1.1
        if (s <= 0) continue
        if (s > 1) s = 1

        // Fade by depth so the far side recedes instead of tangling with the
        // near side. Perspective `scale` already encodes it.
        let fade = ((a.scale + b.scale) / 2 - 0.7) / 0.6
        fade = fade < 0.15 ? 0.15 : fade > 1 ? 1 : fade

        const pulse =
          pulseAmount <= 0
            ? 1
            : 1 -
              pulseAmount *
                (0.5 + 0.5 * Math.sin(time * pulseRate * mesh.pulse[e * 2 + 1] + mesh.pulse[e * 2]))

        // A link is only as visible as its dimmest end.
        const w = s * fade * pulse * a.nearFade * b.nearFade
        if (w <= 0.02) continue
        let bucket = (w * LINK_BUCKETS) | 0
        if (bucket >= LINK_BUCKETS) bucket = LINK_BUCKETS - 1
        paths[bucket].moveTo(a.sx, a.sy)
        paths[bucket].lineTo(b.sx, b.sy)
        used[bucket] = 1
      }

      ctx.strokeStyle = color
      ctx.lineWidth = 1
      for (let i = 0; i < LINK_BUCKETS; i++) {
        if (!used[i]) continue
        ctx.globalAlpha = ((i + 0.5) / LINK_BUCKETS) * o.linkOpacity
        ctx.stroke(paths[i])
      }
    }

    // Painter's algorithm needs back-to-front order. The index array is
    // allocated once; only the sort runs per frame.
    const order = new Array<number>(CLOUD_SIZE)
    for (let i = 0; i < CLOUD_SIZE; i++) order[i] = i

    const drawDots = (cloud: Cloud, color: string) => {
      const o = opts.current
      order.sort((a, b) => projected[b].depth - projected[a].depth)
      ctx.fillStyle = color
      for (const i of order) {
        const p = projected[i]
        const fade = Math.max(0.12, Math.min(1, (p.scale - 0.68) / 0.55)) * p.nearFade
        if (fade <= 0) continue
        ctx.globalAlpha = o.dotOpacity * fade
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, Math.max(0.3, o.dotRadius * cloud.size[i] * p.scale), 0, TWO_PI)
        ctx.fill()
      }
    }

    // One clock for every canvas on the page: gsap.ticker is already running
    // for the stage and for SmoothScrollProvider, and a second requestAnimation
    // Frame loop beside it would just interleave.
    const tick = (now: number) => {
      // gsap.ticker reports seconds, not milliseconds.
      if (!visible || document.hidden) {
        lastTick = now
        return
      }
      // Clamp dt so a backgrounded tab does not jump the animation on return,
      // and freeze the motion entirely under reduced motion — the cloud is
      // still drawn, it just stops breathing and turning.
      const dt = reduced.matches ? 0 : Math.min(now - lastTick, 0.05)
      lastTick = now
      draw(dt)
    }

    // The pointer is normalised against the viewport rather than this canvas:
    // the tilt is a couple of hundredths of a radian, and reading the canvas'
    // box per pointer event to place the cursor inside it would cost a layout
    // for a difference nobody can see.
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const onPointerLeave = () => {
      pointer.x = 0
      pointer.y = 0
    }

    warmMesh(getCloud(opts.current.shape), {
      linkDistance: opts.current.linkDistance,
      linkNeighbors: opts.current.linkNeighbors,
    })
    resize()

    // The host box is what sizes this canvas, and it can change without the
    // window doing anything — a font swapping, a count arriving, the header's
    // own text rewrapping. So observe the element, not `resize`.
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { rootMargin: "100px" }
    )
    io.observe(canvas)

    const themeObserver = new MutationObserver(dropColors)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    })

    lastTick = gsap.ticker.time
    gsap.ticker.add(tick)

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave)

    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
      io.disconnect()
      themeObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 block h-full w-full select-none", className)}
    />
  )
}

export default ParticleField
