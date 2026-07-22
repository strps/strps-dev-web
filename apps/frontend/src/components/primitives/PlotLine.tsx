"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The hero's decorative plotter-line SVG: draws in via `stroke-dashoffset`
 * ~200ms after mount, complete immediately under reduced motion (§4.4).
 */
export function PlotLine({ className }: { className?: string }) {
  const [drawn, setDrawn] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setDrawn(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <svg
      className={cn("block", className)}
      width="340"
      height="18"
      viewBox="0 0 340 18"
      aria-hidden="true"
    >
      <path
        className={cn(
          "fill-none stroke-primary [stroke-dasharray:620] [stroke-dashoffset:620] transition-[stroke-dashoffset] duration-[1.6s] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none motion-reduce:[stroke-dashoffset:0]",
          drawn && "[stroke-dashoffset:0]"
        )}
        strokeWidth={1.5}
        d="M2 14 C 60 14, 70 4, 120 4 S 200 14, 250 14 S 320 5, 338 8"
      />
    </svg>
  )
}
