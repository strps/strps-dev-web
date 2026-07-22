import * as React from "react"

import { cn } from "@/lib/utils"

/** Mono tech-stack pill used on project cards. §5. */
export function StackChip({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "rounded-sharp border border-border-strong px-2 py-1 font-mono text-[11px] text-faint-foreground",
        className
      )}
      {...props}
    />
  )
}
