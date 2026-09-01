/**
 * Resolving CSS colours to numbers, so they can be interpolated.
 *
 * The stage samples its palette from whichever section currently owns it and
 * crossfades between them, which means it has to do arithmetic on colours the
 * stylesheet expresses as `oklch(...)`. There is no way to parse that by hand
 * that stays correct as the design tokens change, so the browser does it: fill
 * one pixel with the colour and read the pixel back.
 */

export type RGB = [number, number, number]

let probe: CanvasRenderingContext2D | null = null

function getProbe() {
  if (probe) return probe
  const canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 1
  probe = canvas.getContext("2d", { willReadFrequently: true })
  return probe
}

const parsed = new Map<string, RGB>()

/** Any CSS colour string to sRGB bytes. Memoised; results are stable per string. */
export function parseColor(value: string, fallback: RGB = [136, 136, 136]): RGB {
  const trimmed = value.trim()
  if (!trimmed) return fallback
  const hit = parsed.get(trimmed)
  if (hit) return hit

  const ctx = getProbe()
  if (!ctx) return fallback
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = "#888888"
  ctx.fillStyle = trimmed
  ctx.fillRect(0, 0, 1, 1)
  const d = ctx.getImageData(0, 0, 1, 1).data
  const rgb: RGB = [d[0], d[1], d[2]]
  parsed.set(trimmed, rgb)
  return rgb
}

/** Read a custom property off an element and resolve it to bytes. */
export function readColorVar(el: Element, name: string, fallback?: RGB): RGB {
  return parseColor(getComputedStyle(el).getPropertyValue(name), fallback)
}

export function mixColor(a: RGB, b: RGB, t: number): RGB {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ]
}

export function cssColor(c: RGB) {
  return `rgb(${c[0] | 0} ${c[1] | 0} ${c[2] | 0})`
}
