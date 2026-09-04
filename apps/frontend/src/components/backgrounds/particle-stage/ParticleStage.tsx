"use client"

import * as React from "react"
import gsap from "gsap"

import { cn } from "@/lib/utils"
import { scrollState, syncFromWindow } from "@/lib/scroll"
import { cssColor, mixColor, readColorVar, type RGB } from "./color"
import { getMesh, warmMesh, type Mesh } from "./mesh"
import { morph, morphSize, planMorph } from "./morph"
import {
  invalidate,
  onRegistryChange,
  ownerOf,
  registeredShapes,
  resolveOwner,
  type StageSection as StageSectionEntry,
} from "./registry"
import { CLOUD_SIZE, getCloud, type ShapeId } from "./shapes"

export interface ParticleStageProps {
  className?: string
  /** Cloud radius as a fraction of the viewport's smaller side. */
  radius?: number
  /** Full turns per minute around Y. */
  spinSpeed?: number
  /** Fixed tilt in radians. */
  tilt?: number
  /** How long one shape-to-shape morph takes, in seconds. */
  duration?: number
  /** GSAP ease the morph runs on. */
  ease?: string
  /**
   * Where the trigger line sits, as a fraction of viewport height. A section
   * takes the stage — and starts the morph towards its shape — once this line
   * crosses into it. 0.5 is the middle of the screen.
   */
  trigger?: number
  /**
   * How much of the cloud is kept inside the section's box and inside the
   * viewport, as a fraction of the cloud radius. The cloud slides along a
   * section taller than the screen rather than being carried off it.
   */
  parallaxPad?: number
  /** Neighbour radius in cloud units. 0 disables links. */
  linkDistance?: number
  /** Max edges kept per point. */
  linkNeighbors?: number
  /** Depth of the per-link pulse. 0 steady, 1 fades a link out at its trough. */
  linkPulse?: number
  /** Pulses per second for the fastest links. */
  linkPulseSpeed?: number
  /** How far the pointer tips the cloud, in radians. */
  pointerTilt?: number
  /** How fast the cloud chases the pointer, in units per second. */
  pointerEase?: number
  /** Base dot radius in CSS px, before perspective scaling. */
  dotRadius?: number
  dotOpacity?: number
  linkOpacity?: number
  /** CSS custom properties sampled off the owning section. */
  dotColorVar?: string
  linkColorVar?: string
}

const TWO_PI = Math.PI * 2
/**
 * How far the cloud lags the section it is anchored to, as a fraction of that
 * section's distance from the viewport centre.
 *
 * 0 glues the cloud to its section, which is correct but flat — it moves at
 * exactly the page's rate and reads as content. 1 pins it to the middle of the
 * glass and the section is forgotten. A small value keeps the cloud plainly
 * attached to its section while letting it fall a little behind, which is the
 * whole depth cue. Well under 0.5, or the anchoring stops reading at all.
 */
const PARALLAX_DRIFT = 0.1
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
 * One canvas behind the whole page, holding a single point cloud that morphs
 * from section to section as you scroll.
 *
 * Mount it once, near the root, and let sections claim it with `<StageSection>`.
 * The canvas is viewport-sized and `fixed` — never document-sized; see
 * ./README.md § Why the canvas is only one viewport tall.
 */
export function ParticleStage({
  className,
  radius = 0.26,
  spinSpeed = 0.3,
  tilt = -0.32,
  duration = 1.2,
  ease = "power2.inOut",
  trigger = 0.5,
  parallaxPad = 0.9,
  linkDistance = 0.34,
  linkNeighbors = 3,
  linkPulse = 0.9,
  linkPulseSpeed = 0.5,
  pointerTilt = 0.02,
  pointerEase = 2.5,
  dotRadius = 1.5,
  dotOpacity = 0.72,
  linkOpacity = 0.5,
  dotColorVar = "--color-primary",
  linkColorVar = "--color-muted-foreground",
}: ParticleStageProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  // Live prop mirror: the loop starts once and reads the newest values from
  // here, so tweaking a prop retunes the running stage instead of restarting it.
  const props = {
    radius, spinSpeed, tilt, duration, ease, trigger, parallaxPad,
    linkDistance, linkNeighbors, linkPulse, linkPulseSpeed,
    pointerTilt, pointerEase,
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

    // Working buffers, allocated once and rewritten every frame.
    const world = new Float32Array(CLOUD_SIZE * 3)
    const sizes = new Float32Array(CLOUD_SIZE)
    const projected: Projected[] = Array.from({ length: CLOUD_SIZE }, () => ({
      sx: 0, sy: 0, scale: 1, depth: 0, wx: 0, wy: 0, wz: 0, nearFade: 1,
    }))

    // Per-point breathing, rolled once. This is the one animated layer that is
    // *not* a function of scroll: it integrates over wall-clock time, so it
    // keeps the cloud alive while the page is still and is unaffected by
    // scrolling backwards.
    const breathPhase = new Float32Array(CLOUD_SIZE)
    const breathAmp = new Float32Array(CLOUD_SIZE)
    for (let i = 0; i < CLOUD_SIZE; i++) {
      breathPhase[i] = Math.random() * TWO_PI
      breathAmp[i] = 0.015 + Math.random() * 0.05
    }

    const pointer = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }
    let spin = 0

    // Palette, crossfaded between the two sections in play.
    const fallback: RGB = [136, 136, 136]
    let colorKey = ""
    let fromDot = fallback
    let fromLink = fallback
    let toDot = fallback
    let toLink = fallback

    let sampledFrom: HTMLElement | null = null
    let sampledTo: HTMLElement | null = null

    // Colours are read with getComputedStyle, which forces style resolution —
    // far too expensive per frame. The owning pair only changes at a seam, so
    // key on it and re-sample then.
    const sampleColors = (fromEl: HTMLElement, toEl: HTMLElement) => {
      const o = opts.current
      const key = `${o.dotColorVar}|${o.linkColorVar}`
      if (key === colorKey && sampledFrom === fromEl && sampledTo === toEl) return
      colorKey = key
      sampledFrom = fromEl
      sampledTo = toEl
      fromDot = readColorVar(fromEl, o.dotColorVar, fallback)
      fromLink = readColorVar(fromEl, o.linkColorVar, fallback)
      toDot = readColorVar(toEl, o.dotColorVar, fallback)
      toLink = readColorVar(toEl, o.linkColorVar, fallback)
    }

    /** Force a re-sample: theme switch, or a section registering/leaving. */
    const dropColors = () => {
      sampledFrom = null
      sampledTo = null
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

    // --- the transition ---------------------------------------------------
    // `t` is integrated over wall-clock time, not read off the scroll offset:
    // crossing a seam *starts* a morph, and that morph then runs to completion
    // at its own speed whether the reader keeps scrolling, stops dead, or turns
    // around. See ./README.md § Triggering.
    let from: StageSectionEntry | null = null
    let to: StageSectionEntry | null = null
    /** Seconds since the running morph began. */
    let elapsed = 0
    // Reused rather than reallocated: this object is rebuilt every frame.
    const stage = {
      from: null as unknown as StageSectionEntry,
      to: null as unknown as StageSectionEntry,
      t: 1,
      anchor: 0,
      top: 0,
      bottom: 0,
    }

    let easeKey = ""
    let easeFn: (x: number) => number = (x) => x
    const resolveEase = (name: string) => {
      if (name !== easeKey) {
        easeKey = name
        easeFn = gsap.parseEase(name) ?? ((x: number) => x)
      }
      return easeFn
    }

    /**
     * Step the transition and report what should be on screen.
     *
     * Returns null while nothing is registered. The section boxes are read live
     * every frame — they move with the page — and blended by the same `t` as
     * the shape, so handing the cloud from one section to the next is
     * continuous for free.
     */
    const advance = (dt: number) => {
      const o = opts.current
      const owner = resolveOwner(o.trigger)
      if (!owner) return null

      // Reduced motion gets the destination shape, never the journey.
      const dur = reduced.matches ? 0 : Math.max(0, o.duration)

      // First frame, or everything we were drawing has unregistered.
      if (!from || !to || !ownerOf(to)) {
        from = owner.section
        to = owner.section
        elapsed = dur
      }

      elapsed += dt
      // A seam crossed mid-morph does not interrupt it: the running morph lands
      // first, and only then does the stage set off towards whichever section
      // holds the trigger line by that point. Flinging the page therefore skips
      // the shapes it flew past instead of queueing a backlog of morphs.
      if (owner.section !== to && elapsed >= dur) {
        from = to
        to = owner.section
        elapsed = 0
      }

      const raw = dur > 0 ? Math.min(elapsed / dur, 1) : 1
      const t = raw >= 1 ? 1 : resolveEase(o.ease)(raw)

      // The section being morphed away from can unregister mid-flight — a CMS
      // block swapping out, a route change tearing the old page down. Drop it
      // and finish where we are rather than reading a stale box.
      const toBox = ownerOf(to)!
      let fromBox = ownerOf(from)
      if (!fromBox) {
        from = to
        fromBox = toBox
      }

      stage.from = from
      stage.to = to
      stage.t = t
      stage.anchor = fromBox.anchor + (toBox.anchor - fromBox.anchor) * t
      stage.top = fromBox.top + (toBox.top - fromBox.top) * t
      stage.bottom = fromBox.bottom + (toBox.bottom - fromBox.bottom) * t
      return stage
    }

    /**
     * Draw one frame. The shape comes from `advance()`, which owns the timed
     * morph; placement is derived from the live section boxes it reports.
     */
    const draw = (dt: number) => {
      const o = opts.current
      time += dt
      spin += (o.spinSpeed * TWO_PI * dt) / 60

      const follow = Math.max(0, Math.min(1, dt * o.pointerEase))
      eased.x += (pointer.x - eased.x) * follow
      eased.y += (pointer.y - eased.y) * follow

      ctx.clearRect(0, 0, width, height)
      if (width === 0 || height === 0) return

      const stage = advance(dt)
      if (!stage) return
      const t = stage.t

      const fromCloud = getCloud(stage.from.shape)
      const toCloud = getCloud(stage.to.shape)

      const plan = planMorph(fromCloud, toCloud)
      morph(plan, t, world)
      morphSize(plan, t, sizes)

      sampleColors(stage.from.el, stage.to.el)
      const dotColor = cssColor(mixColor(fromDot, toDot, t))
      const linkColor = cssColor(mixColor(fromLink, toLink, t))

      // Per-section placement, blended alongside the shape.
      const lerp = (a: number | undefined, b: number | undefined, d: number) =>
        (a ?? d) + ((b ?? d) - (a ?? d)) * t
      const offX = lerp(stage.from.offset?.x, stage.to.offset?.x, 0)
      const offY = lerp(stage.from.offset?.y, stage.to.offset?.y, 0)
      const scaleMul = lerp(stage.from.scale, stage.to.scale, 1)
      const alphaMul = lerp(stage.from.opacity, stage.to.opacity, 1)
      if (alphaMul <= 0.001) return

      const cx = width / 2 + width * offX
      const R = Math.min(width, height) * o.radius * scaleMul

      // The cloud belongs to its section, not to the glass: it is anchored to
      // the section's centre and travels with it, less PARALLAX_DRIFT of the
      // distance to the viewport centre so it falls slightly behind the page.
      // Both the anchor and the box are blended across a transition alongside
      // the shape, so handing the cloud from one section to the next is
      // continuous for free.
      const line = scrollState.y + scrollState.vh / 2
      let cy =
        height / 2 + (stage.anchor - line) * (1 - PARALLAX_DRIFT) + height * offY

      // A section taller than the screen would carry the cloud off the top
      // long before it stops owning the stage, so the cloud slides along the
      // section instead of leaving with it: keep it inside the part of the
      // section box that is actually on screen. The pad never eats past that
      // band's own centre, so the clamp stays continuous as the band shrinks —
      // a jump here would be a visible snap at exactly the moment a short
      // section enters or leaves.
      const vTop = Math.max(stage.top - scrollState.y, 0)
      const vBot = Math.min(stage.bottom - scrollState.y, height)
      if (vBot > vTop) {
        const pad = Math.min(R * o.parallaxPad, (vBot - vTop) / 2)
        const lo = vTop + pad
        const hi = vBot - pad
        cy = cy < lo ? lo : cy > hi ? hi : cy
      }

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
        const x = world[i * 3] * R * breath
        const y = world[i * 3 + 1] * R * breath
        const z = world[i * 3 + 2] * R * breath

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
          denom <= nearPlane
            ? 0
            : denom >= nearPlane * 2
              ? 1
              : (denom - nearPlane) / nearPlane
        p.sx = cx + x1 * s
        p.sy = cy + y2 * s
        p.scale = s
        p.depth = z2
        p.wx = x
        p.wy = y
        p.wz = z
      }

      drawLinks(stage.from.shape, stage.to.shape, t, R, linkColor, alphaMul)
      drawDots(dotColor, alphaMul)
      ctx.globalAlpha = 1
    }

    /**
     * Both meshes at once, crossfaded, each culled by live distance.
     *
     * A mesh is only valid for the shape it was built from: once the points
     * start moving, its edges stretch, and a stretched edge drawn at full
     * strength is a line across the canvas. So every edge is checked against
     * its rest length and fades out as it is pulled apart — which is exactly
     * the read you want, the old structure coming apart while the new one knits
     * together. At t = 0 or 1 only one mesh is live and the cull never fires.
     */
    const drawLinks = (
      fromShape: ShapeId,
      toShape: ShapeId,
      t: number,
      R: number,
      color: string,
      alphaMul: number
    ) => {
      const o = opts.current
      if (o.linkOpacity <= 0 || o.linkDistance <= 0) return

      const meshOpts = { linkDistance: o.linkDistance, linkNeighbors: o.linkNeighbors }
      const paths: Path2D[] = new Array(LINK_BUCKETS)
      const used = new Uint8Array(LINK_BUCKETS)
      for (let i = 0; i < LINK_BUCKETS; i++) paths[i] = new Path2D()

      const pulseAmount = Math.max(0, Math.min(1, o.linkPulse))
      const pulseRate = o.linkPulseSpeed * TWO_PI

      const addMesh = (mesh: Mesh, weight: number) => {
        if (weight <= 0.01) return
        for (let e = 0; e < mesh.a.length; e++) {
          const a = projected[mesh.a[e]]
          const b = projected[mesh.b[e]]
          const rest = mesh.rest[e] * R
          if (rest <= 0) continue

          const dx = a.wx - b.wx
          const dy = a.wy - b.wy
          const dz = a.wz - b.wz
          const stretch = Math.sqrt(dx * dx + dy * dy + dz * dz) / rest
          // Compressed edges brighten, stretched ones dim, and anything pulled
          // past ~1.9x its rest length is gone.
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
              (0.5 +
                0.5 * Math.sin(time * pulseRate * mesh.pulse[e * 2 + 1] + mesh.pulse[e * 2]))

          // A link is only as visible as its dimmest end.
          const w = s * fade * pulse * weight * a.nearFade * b.nearFade
          if (w <= 0.02) continue
          let bucket = (w * LINK_BUCKETS) | 0
          if (bucket >= LINK_BUCKETS) bucket = LINK_BUCKETS - 1
          paths[bucket].moveTo(a.sx, a.sy)
          paths[bucket].lineTo(b.sx, b.sy)
          used[bucket] = 1
        }
      }

      // Settled on one shape: draw its mesh outright. Crossfading it against
      // itself would fade the links out entirely at the ends of the morph.
      if (fromShape === toShape) {
        addMesh(getMesh(getCloud(fromShape), meshOpts), 1)
      } else {
        addMesh(getMesh(getCloud(fromShape), meshOpts), 1 - t)
        addMesh(getMesh(getCloud(toShape), meshOpts), t)
      }

      ctx.strokeStyle = color
      ctx.lineWidth = 1
      for (let i = 0; i < LINK_BUCKETS; i++) {
        if (!used[i]) continue
        ctx.globalAlpha = ((i + 0.5) / LINK_BUCKETS) * o.linkOpacity * alphaMul
        ctx.stroke(paths[i])
      }
    }

    // Painter's algorithm needs back-to-front order. The index array is
    // allocated once; only the sort runs per frame.
    const order = new Array<number>(CLOUD_SIZE)
    for (let i = 0; i < CLOUD_SIZE; i++) order[i] = i

    const drawDots = (color: string, alphaMul: number) => {
      const o = opts.current
      order.sort((a, b) => projected[b].depth - projected[a].depth)
      ctx.fillStyle = color
      for (const i of order) {
        const p = projected[i]
        const fade = Math.max(0.12, Math.min(1, (p.scale - 0.68) / 0.55)) * p.nearFade
        if (fade <= 0) continue
        ctx.globalAlpha = o.dotOpacity * fade * alphaMul
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, Math.max(0.3, o.dotRadius * sizes[i] * p.scale), 0, TWO_PI)
        ctx.fill()
      }
    }

    // --- driving ---------------------------------------------------------
    // The stage draws from gsap.ticker, the same clock SmoothScrollProvider
    // steps Lenis on. A separate requestAnimationFrame loop would be a frame
    // behind the scroll offset it is reading, which reads as the background
    // lagging the page.
    const tick = (now: number) => {
      // gsap.ticker reports seconds, not milliseconds.
      if (document.hidden) {
        lastTick = now
        return
      }
      // Clamp dt so a backgrounded tab does not jump the animation on return,
      // and freeze the time-based layers entirely under reduced motion — the
      // scroll-driven morph still tracks, it just has nothing breathing on top.
      const dt = reduced.matches ? 0 : Math.min(now - lastTick, 0.05)
      lastTick = now
      draw(dt)
    }

    const warmAll = () => {
      const meshOpts = {
        linkDistance: opts.current.linkDistance,
        linkNeighbors: opts.current.linkNeighbors,
      }
      for (const id of new Set(registeredShapes())) warmMesh(getCloud(id), meshOpts)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (width === 0 || height === 0) return
      // Normalised to [-1, 1] across the viewport.
      pointer.x = (e.clientX / width) * 2 - 1
      pointer.y = (e.clientY / height) * 2 - 1
    }
    const onPointerLeave = () => {
      pointer.x = 0
      pointer.y = 0
    }
    const onResize = () => {
      resize()
      invalidate()
    }

    syncFromWindow()
    resize()

    const unsubscribe = onRegistryChange(() => {
      dropColors()
      warmAll()
    })
    warmAll()

    // Sections move when anything above them reflows — an image loading, a font
    // swapping, a CMS block hydrating — so the cached bounds have to be dropped
    // on any document-size change, not just on resize.
    const ro = new ResizeObserver(() => invalidate())
    ro.observe(document.body)

    const themeObserver = new MutationObserver(dropColors)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    })

    lastTick = gsap.ticker.time
    gsap.ticker.add(tick)

    window.addEventListener("resize", onResize)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave)

    return () => {
      gsap.ticker.remove(tick)
      unsubscribe()
      ro.disconnect()
      themeObserver.disconnect()
      window.removeEventListener("resize", onResize)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100dvh] select-none",
        className
      )}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}

export default ParticleStage
