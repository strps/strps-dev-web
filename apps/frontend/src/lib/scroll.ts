/**
 * A single, framework-free mirror of the page's scroll position.
 *
 * Canvas backgrounds run outside React and need the scroll offset every frame.
 * Reading `window.scrollY` there is wrong once Lenis is driving the page —
 * Lenis animates its own virtual offset and only lands on the native one when
 * it settles, so the two disagree for the whole duration of a smooth scroll.
 * `SmoothScrollProvider` writes the authoritative value here; everything else
 * reads it. With no provider mounted the fields stay at their defaults, and
 * `syncFromWindow()` is the fallback.
 */
export interface ScrollState {
  /** Virtual scroll offset in CSS px — Lenis' value when it is driving. */
  y: number
  /** Signed velocity in px/frame, as reported by Lenis. 0 without it. */
  velocity: number
  /** Viewport height in CSS px. */
  vh: number
  /** Viewport width in CSS px. */
  vw: number
}

export const scrollState: ScrollState = { y: 0, velocity: 0, vh: 0, vw: 0 }

/** Fill the state from the real window. Safe to call before a provider mounts. */
export function syncFromWindow() {
  if (typeof window === "undefined") return
  scrollState.y = window.scrollY
  scrollState.vh = window.innerHeight
  scrollState.vw = window.innerWidth
}
