"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type ParticleInteraction = "repel" | "attract" | "none"

export interface ParticleFieldProps {
  className?: string
  /** Particles per 100k CSS pixels of canvas area. */
  density?: number
  /** Hard cap so huge viewports stay cheap. */
  maxParticles?: number
  /** Drift speed in CSS px per second. */
  speed?: number
  /** Radius range in CSS px. */
  minRadius?: number
  maxRadius?: number
  /** Draw a line between particles closer than this (CSS px). 0 disables links. */
  linkDistance?: number
  /** How the pointer affects nearby particles. */
  interaction?: ParticleInteraction
  /** Pointer influence radius in CSS px. */
  pointerRadius?: number
  /** Pointer force strength (px/s² at the pointer centre). */
  pointerStrength?: number
  /** Opacity of the dots / of the link lines. */
  dotOpacity?: number
  linkOpacity?: number
  /** CSS custom property names to sample for the dot and link colours. */
  dotColorVar?: string
  linkColorVar?: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

const TWO_PI = Math.PI * 2

function readVar(el: Element, name: string, fallback: string) {
  const value = getComputedStyle(el).getPropertyValue(name).trim()
  return value || fallback
}

/**
 * Decorative particle field on a 2D canvas.
 *
 * Sizes itself to its parent (device-pixel aware), samples its colours from the
 * active theme's CSS variables, idles when scrolled out of view or the tab is
 * hidden, and renders a single static frame under `prefers-reduced-motion`.
 */
export function ParticleField({
  className,
  density = 9,
  maxParticles = 160,
  speed = 14,
  minRadius = 0.8,
  maxRadius = 2.2,
  linkDistance = 130,
  interaction = "repel",
  pointerRadius = 150,
  pointerStrength = 900,
  dotOpacity = 0.55,
  linkOpacity = 0.14,
  dotColorVar = "--color-primary",
  linkColorVar = "--color-muted-foreground",
}: ParticleFieldProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  // Live prop mirror: the animation loop starts once and reads the latest
  // values from here, so tweaking props never restarts the simulation.
  const opts = React.useRef({
    density,
    maxParticles,
    speed,
    minRadius,
    maxRadius,
    linkDistance,
    interaction,
    pointerRadius,
    pointerStrength,
    dotOpacity,
    linkOpacity,
    dotColorVar,
    linkColorVar,
  })
  opts.current = {
    density,
    maxParticles,
    speed,
    minRadius,
    maxRadius,
    linkDistance,
    interaction,
    pointerRadius,
    pointerStrength,
    dotOpacity,
    linkOpacity,
    dotColorVar,
    linkColorVar,
  }

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let frame = 0
    let last = 0
    let visible = true
    const pointer = { x: 0, y: 0, active: false }
    let colors = { dot: "#888", link: "#888" }

    const sampleColors = () => {
      colors = {
        dot: readVar(canvas, opts.current.dotColorVar, "#888"),
        link: readVar(canvas, opts.current.linkColorVar, "#888"),
      }
    }

    const spawn = (p: Particle | undefined): Particle => {
      const { speed: s, minRadius: min, maxRadius: max } = opts.current
      const angle = Math.random() * TWO_PI
      const magnitude = s * (0.4 + Math.random() * 0.6)
      const next = p ?? ({} as Particle)
      next.x = Math.random() * width
      next.y = Math.random() * height
      next.vx = Math.cos(angle) * magnitude
      next.vy = Math.sin(angle) * magnitude
      next.r = min + Math.random() * (max - min)
      return next
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

      const target = Math.min(
        opts.current.maxParticles,
        Math.max(12, Math.round((width * height) / 100_000 * opts.current.density))
      )
      if (particles.length > target) {
        particles.length = target
      } else {
        while (particles.length < target) particles.push(spawn(undefined))
      }
      // Keep existing particles inside the new bounds.
      for (const p of particles) {
        if (p.x > width) p.x = Math.random() * width
        if (p.y > height) p.y = Math.random() * height
      }
    }

    const step = (dt: number) => {
      const {
        speed: s,
        interaction: mode,
        pointerRadius: pr,
        pointerStrength: ps,
      } = opts.current
      const maxSpeed = s * 2.5
      const applyPointer = mode !== "none" && pointer.active
      const pr2 = pr * pr

      for (const p of particles) {
        if (applyPointer) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < pr2 && d2 > 0.01) {
            const d = Math.sqrt(d2)
            // Linear falloff to zero at the influence radius.
            const force = (1 - d / pr) * ps * (mode === "repel" ? 1 : -1)
            p.vx += (dx / d) * force * dt
            p.vy += (dy / d) * force * dt
          }
        }

        // Gentle drag pulls the pointer-kicked particles back to drift speed.
        const damping = Math.exp(-0.9 * dt)
        p.vx *= damping
        p.vy *= damping

        const v = Math.hypot(p.vx, p.vy)
        if (v > maxSpeed) {
          p.vx = (p.vx / v) * maxSpeed
          p.vy = (p.vy / v) * maxSpeed
        }

        p.x += p.vx * dt
        p.y += p.vy * dt

        // Wrap around the edges so the field never thins out.
        const m = p.r + 2
        if (p.x < -m) p.x = width + m
        else if (p.x > width + m) p.x = -m
        if (p.y < -m) p.y = height + m
        else if (p.y > height + m) p.y = -m
      }
    }

    const draw = () => {
      const { linkDistance: link, dotOpacity: dotA, linkOpacity: linkA } = opts.current
      ctx.clearRect(0, 0, width, height)

      if (link > 0 && linkA > 0) {
        const link2 = link * link
        ctx.strokeStyle = colors.link
        ctx.lineWidth = 1
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i]
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const d2 = dx * dx + dy * dy
            if (d2 > link2) continue
            ctx.globalAlpha = (1 - Math.sqrt(d2) / link) * linkA
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = dotA
      ctx.fillStyle = colors.dot
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, TWO_PI)
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
      // Clamp dt so a backgrounded tab doesn't teleport everything on return.
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
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
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active =
        pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height
    }
    const onPointerLeave = () => {
      pointer.active = false
    }

    const onVisibility = () => {
      visible = !document.hidden
    }

    const onMotionChange = () => {
      if (reduced.matches) {
        stop()
        draw()
      } else {
        start()
      }
    }

    sampleColors()
    resize()
    draw()

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced.matches) draw()
    })
    ro.observe(canvas)

    // Idle while off-screen; `visible` also tracks tab visibility.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && !document.hidden
      },
      { rootMargin: "100px" }
    )
    io.observe(canvas)

    // Re-sample colours when the theme flips (class or data-theme swap).
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

export default ParticleField
