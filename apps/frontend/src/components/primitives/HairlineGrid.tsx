import * as React from "react"

import { cn } from "@/lib/utils"

interface HairlineGridProps {
  /** Minimum cell width before the grid wraps to fewer columns (`auto-fit, minmax(N px, 1fr)`). */
  minItemWidth: number
  className?: string
  cellClassName?: string
  children: React.ReactNode
}

/**
 * The 1px-gap-over-border-background technique used for the process strip and
 * project grids: a bordered container with a 1px gap filled by `--border`,
 * with opaque cells laid on top so the gap reads as hairlines. §5.
 */
export function HairlineGrid({
  minItemWidth,
  className,
  cellClassName,
  children,
}: HairlineGridProps) {
  return (
    <div
      className={cn("grid gap-px border border-border bg-border", className)}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))` }}
    >
      {React.Children.map(children, (child) => (
        <div className={cn("bg-background", cellClassName)}>{child}</div>
      ))}
    </div>
  )
}
