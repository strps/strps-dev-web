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
   * Overrides the inner wrapper's default vertical rhythm (`my-24
   * min-h-[400px]`) as well as adding to it — it is merged last, so a caller
   * passing its own margin / `min-h-*` wins. Only the heroes should need to:
   * every other section shares the default rhythm so the page keeps one cadence.
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
        The default vertical rhythm — one `my-24` above and below, one
        `min-h-[400px]` floor — is shared by every section; only the heroes
        override it. The floor is a fixed pixel value rather than a viewport
        unit on purpose: a section sized off the screen reflows whenever a
        mobile URL bar appears, and a reflow mid-scroll invalidates every cached
        ParticleStage section bound. It is a minimum, not a height — taller
        content simply grows the section — and it leaves the cloud room to
        settle between morphs.
      */}
      <div className={cn(
        "relative flex flex-col gap-8 z-20 h-full w-full my-24 min-h-[400px]",
        container && "container mx-auto",
        containerClassName
      )}>
        {children}
      </div>
    </section>
  )
}
