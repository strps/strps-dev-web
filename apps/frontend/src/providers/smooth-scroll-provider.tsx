"use client"

import * as React from "react"
import gsap from "gsap"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

import { scrollState, syncFromWindow } from "@/lib/scroll"

export interface SmoothScrollProviderProps {
  children?: React.ReactNode
  /** Set false to keep native scrolling; the state mirror still updates. */
  enabled?: boolean
  /** Lenis easing duration in seconds. Higher lags further behind the wheel. */
  duration?: number
}

/**
 * Mounts Lenis and publishes its offset to `scrollState`.
 *
 * Two things matter here beyond "new Lenis()":
 *
 * 1. **One clock, and Lenis first on it.** Lenis is stepped from `gsap.ticker`
 *    rather than its own `requestAnimationFrame`, and `ParticleStage` draws from
 *    that same ticker. Separate loops would let the canvas read a scroll offset
 *    from the previous frame, which shows up as the background lagging the page.
 *    Sharing the ticker is only half of it: callbacks fire in the order they
 *    were added, and this provider *wraps* the canvas, so React runs the child's
 *    effect first and the canvas would otherwise be registered ahead of Lenis —
 *    drawing every frame from the offset Lenis computed on the last one. Hence
 *    `prioritize`, which pins the scroll source to the head of the list however
 *    the tree mounts.
 * 2. **Reduced motion opts out entirely.** Smooth scrolling is exactly the kind
 *    of motion the preference is about, so Lenis is never constructed; the
 *    native scroll position is mirrored instead and everything downstream keeps
 *    working.
 *
 * `lenis.css` also carries `scroll-behavior: auto !important`, which is what
 * stops the `scroll-smooth` class on `<html>` from fighting Lenis.
 */
export function SmoothScrollProvider({
  children,
  enabled = true,
  duration = 1.1,
}: SmoothScrollProviderProps) {
  React.useEffect(() => {
    syncFromWindow()

    const onResize = () => {
      scrollState.vh = window.innerHeight
      scrollState.vw = window.innerWidth
    }
    window.addEventListener("resize", onResize)

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!enabled || reduced.matches) {
      const onScroll = () => {
        scrollState.y = window.scrollY
      }
      window.addEventListener("scroll", onScroll, { passive: true })
      return () => {
        window.removeEventListener("scroll", onScroll)
        window.removeEventListener("resize", onResize)
      }
    }

    const lenis = new Lenis({ duration, smoothWheel: true })
    lenis.on("scroll", ({ scroll, velocity }: { scroll: number; velocity: number }) => {
      scrollState.y = scroll
      scrollState.velocity = velocity
    })

    const tick = (time: number) => lenis.raf(time * 1000)
    // (callback, once, prioritize) — prioritize puts Lenis at the head of the
    // ticker so every other subscriber reads this frame's offset, not the last.
    gsap.ticker.add(tick, false, true)
    // GSAP throttles its own delta after a long frame, which desynchronises
    // Lenis from the real elapsed time; Lenis integrates its own dt anyway.
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [enabled, duration])

  return <>{children}</>
}

export default SmoothScrollProvider
