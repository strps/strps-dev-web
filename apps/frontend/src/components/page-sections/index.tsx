import * as React from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { type SectionConfig, type Media } from "@strps-website/types"

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
  /**
   * Overrides the inner wrapper's default vertical rhythm (`py-16
   * min-h-[70svh]`) as well as adding to it — it is merged last, so a caller
   * passing its own `py-*` / `min-h-*` wins.
   */
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

      {/*
        The default vertical rhythm carries a minimum height as well as its
        padding: a section shorter than roughly two thirds of the viewport gives
        the ParticleStage no room to settle between morphs, so the cloud ends up
        permanently mid-transition. `svh` — the smallest viewport height —
        rather than `vh` or `dvh`, because it does not reflow when a mobile URL
        bar appears, and a reflow mid-scroll invalidates every cached section
        bound. It is a minimum, not a height: taller content simply grows the
        section, and `containerClassName` overrides it.
      */}
      <div className={cn(
        "relative flex flex-col gap-8 z-20 h-full w-full py-16 min-h-300 justify-center",
        container && "container mx-auto",
        containerClassName
      )}>
        {children}
      </div>
    </section>
  )
}
