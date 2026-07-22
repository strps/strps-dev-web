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
        "flex flex-wrap items-baseline justify-between gap-[18px] border-b border-border pb-[22px]",
        className
      )}
    >
      <div className="flex items-baseline gap-[18px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-2xl font-medium tracking-[-0.01em]">{title}</h2>
      </div>
      {action}
    </div>
  )
}
