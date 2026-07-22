import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

type LinkArrowProps = React.ComponentProps<typeof Link>

/**
 * The muted, hairline-underlined link used for every "X →" affordance in the
 * mockups (section actions, card links, nav CTAs). The arrow is part of the
 * copy, not appended here — CMS content carries it where wanted (§6). §5.
 */
export function LinkArrow({ className, ...props }: LinkArrowProps) {
  return (
    <Link
      className={cn(
        "whitespace-nowrap border-b border-border-strong text-sm text-muted-foreground no-underline transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        className
      )}
      {...props}
    />
  )
}
