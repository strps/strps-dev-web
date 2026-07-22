import * as React from "react"

import { cn } from "@/lib/utils"

interface NumberedRowProps {
  /** Pre-formatted index, e.g. "01" — the caller derives this from array position (§3.2). */
  number: string
  title: string
  description?: string
  /** Typically a <LinkArrow>. */
  action?: React.ReactNode
  className?: string
}

/**
 * The services-teaser row: `70px 1fr 90px` grid, collapsing to a single
 * column at the mockup's 720px breakpoint (not Tailwind's 640px `sm:`). §5.
 */
export function NumberedRow({ number, title, description, action, className }: NumberedRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-baseline gap-x-5 gap-y-1.5 border-b border-border py-[26px] last:border-b-0 min-[721px]:grid-cols-[70px_1fr_90px]",
        className
      )}
    >
      <span className="font-mono text-[13px] text-faint-foreground">{number}</span>
      <div>
        <h3 className="text-[17px] font-medium">{title}</h3>
        {description && (
          <p className="mt-1.5 max-w-[48ch] text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && (
        <div className="justify-self-start whitespace-nowrap min-[721px]:justify-self-end">
          {action}
        </div>
      )}
    </div>
  )
}
