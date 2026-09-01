import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The mono/uppercase/tracked label used ~20x across the makeover mockups
 * (section eyebrows, card tags, footer text, form labels). §5.
 */
export function Eyebrow({
  as: Tag = "span",
  className,
  ...props
}: React.ComponentProps<"span"> & { as?: React.ElementType }) {
  return (
    <Tag
      className={cn(
        "font-mono text-sm tracking-[0.08em] uppercase text-faint-foreground",
        className
      )}
      {...props}
    />
  )
}
