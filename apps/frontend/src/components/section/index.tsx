import * as React from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { type SectionConfig, type Media } from "@strps-website/types"
import SVGCircles from "./SVGCircles"


/**
 * Vertical rhythm. Each variant carries a minimum height as well as its
 * padding: a section shorter than roughly two thirds of the viewport gives the
 * ParticleStage no room to settle between morphs, so the cloud ends up
 * permanently mid-transition. `svh` — the smallest viewport height — rather
 * than `vh` or `dvh`, because it does not reflow when a mobile URL bar appears,
 * and a reflow mid-scroll invalidates every cached section bound.
 *
 * These are minimums, not heights: content taller than them simply grows the
 * section, and `className` overrides them (twMerge resolves `min-h-*`).
 */
const SPACING_VARIANTS = {
  default: "py-16 min-h-[70svh]",
  hero: "pt-[110px] pb-[90px] min-h-svh",
  section: "pt-[90px] pb-0 min-h-[70svh]",
  contact: "pt-[90px] pb-[110px] min-h-[80svh]",
} as const

type SectionSpacing = keyof typeof SPACING_VARIANTS

interface SectionProps extends React.HTMLAttributes<HTMLElement>, Partial<SectionConfig> {
  /**
   * Optional background image configuration.
   * Pass standard Next.js Image props here (src, alt, quality, etc.).
   * If provided, renders an optimized Next.js Image with an overlay.
   */
  image?: ImageProps
  /**
   * Optional custom class for the background overlay.
   * Defaults to "bg-background/85 backdrop-blur-[2px]"
   */
  overlayClassName?: string
  containerClassName?: string
  /**
   * Optional decorative layer rendered behind this section's content, at
   * `-z-10`. Pointer-events are disabled for it.
   *
   * Note that it will occlude the site-wide `ParticleStage`, which sits behind
   * the whole page at the same depth. Sections normally claim the stage instead
   * (see `backgrounds/particle-stage/section-shapes.ts`); use this only for a
   * background that genuinely belongs to one section.
   */
  backgroundLayer?: React.ReactNode
  /**
   * Whether to wrap content in a centered container. Defaults to `true`.
   * No longer CMS-driven (the `section.container` field was removed) —
   * callers pass this directly.
   */
  container?: boolean
  /**
   * Vertical rhythm preset. Defaults to the existing `py-16`.
   * `hero` / `section` / `contact` match the mockup's spacing scale (§4.3).
   */
  spacing?: SectionSpacing
}

function resolveImageProps(backgroundImage: (number | null) | Media | undefined): ImageProps | undefined {
  if (!backgroundImage || typeof backgroundImage === "number") return undefined
  const media = backgroundImage as Media
  if (!media.url) return undefined
  return {
    src: media.url,
    alt: media.alt ?? "",
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  }
}

export default function Section({
  className,
  image,
  overlayClassName,
  containerClassName,
  backgroundLayer,
  children,
  spacing = "default",
  // SectionConfig props
  section_id,
  theme,
  container = true,
  backgroundContainer,
  background,
  backgroundImage,
  ...props
}: SectionProps) {

  const resolvedImage = background === "image"
    ? (image ?? resolveImageProps(backgroundImage))
    : image

  return (
    <section
      {...props}
      id={section_id ?? props.id}
      data-theme={theme ?? undefined}
      className={cn("w-full relative overflow-hidden", className)}
    >
      {resolvedImage && (
        <div className="absolute inset-0 -z-10 h-full w-full select-none">
          <div
            className={cn(
              "absolute inset-0 bg-background/85 backdrop-blur-[2px] z-10",
              overlayClassName
            )}
          />
          <Image
            fill
            quality={90}
            {...resolvedImage}
            className={cn("object-cover opacity-60", resolvedImage.className)}
          />
        </div>
      )}

      {backgroundLayer && (
        <div className="absolute inset-0 -z-10 h-full w-full select-none pointer-events-none">
          {backgroundLayer}
        </div>
      )}

      {background === "svgCircles" && (
        <div className="absolute inset-0 -z-10 h-full w-full select-none pointer-events-none">
          <SVGCircles
            className="w-full h-full block stroke-svg"
            width={1600}
            height={900}
            numCircles={8}
            maxRadius={920}
            focalLength={1000}
            worldDepth={6667}
            strokeWidth={10}
            strokeDasharray="40 20"
            // strokeColor="green"
            style={{ opacity: 0.12 }}
          />
        </div>
      )}

      <div className={cn(
        "relative flex flex-col gap-8 z-20 h-full w-full",
        SPACING_VARIANTS[spacing],
        container && "container mx-auto",
        containerClassName
      )}>
        {children}
      </div>
    </section>
  )
}
