import * as React from "react"

import { cn } from "@/lib/utils"
import { Eyebrow } from "./Eyebrow"

interface SectionHeaderProps {
  eyebrow: string
  title: string
  /** Typically a <LinkArrow>, right-aligned on the baseline row. */
  action?: React.ReactNode
  className?: string
}

/**
 * Baseline-aligned eyebrow + title row with a bottom hairline and an optional
 * right-side action link. Appears in every section. §5.
 */
export function SectionHeader({ eyebrow, title, action, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-4.5 pb-5.5",
        className
      )}
    >
      <div className="w-full border-b border-border pb-2">
        <h2 className="text-4xl font-medium tracking-[-0.01em]">{title}</h2>
      </div>
      <div className=" w-full flex items-baseline gap-4.5 justify-between">
        <Eyebrow>{eyebrow}</Eyebrow>
        {action}
      </div>
    </div>
  )
}
