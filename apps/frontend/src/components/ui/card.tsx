import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import {
  LiquidCrystalFilter,
  LIQUID_CRYSTAL_FILTER_ID,
} from "../primitives/LiquidCrystalFilter"
import { cn } from "../../lib/utils"

const cardVariants = cva(
  "text-card-foreground flex flex-col gap-6 py-6",
  {
    variants: {
      variant: {
        default: "bg-card border shadow-lv1",
        crystal:
          "relative isolate overflow-hidden border border-crystal-edge shadow-crystal",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Card({
  className,
  variant = "default",
  children,
  ref,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      ref={ref}
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    >
      {variant === "crystal" && (
        <>
          <LiquidCrystalFilter />
          {/* The glass itself: tint, blur and saturation, everywhere. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-crystal backdrop-blur-[3px] backdrop-saturate-150"
          />
          {/* Refraction, on its own layer: browsers without url() in backdrop-filter
              drop this declaration and keep the plain glass above. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ backdropFilter: `url(#${LIQUID_CRYSTAL_FILTER_ID})` }}
          />
          {/* The thin lit edge of the glass. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 shadow-crystal-sheen"
          />
        </>
      )}
      {children}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  cardVariants,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
