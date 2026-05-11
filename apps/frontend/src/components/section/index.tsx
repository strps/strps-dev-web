import * as React from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { type SectionConfig, type Media } from "@strps-website/types"
import SVGCircles from "./SVGCircles"


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

      {background === "svgCircles" && (
        <div className="absolute inset-0 -z-10 h-full w-full select-none pointer-events-none">
          <SVGCircles
            className="w-full h-full block stroke-svg"
            width={1600}
            height={900}
            numCircles={8}
            minRadius={120}
            maxRadius={920}
            strokeWidth={10}
            strokeDasharray="40 20"
            // strokeColor="green"
            style={{ opacity: 0.12 }}
          />
        </div>
      )}

      <div className={cn(
        "relative flex flex-col gap-8 z-20 h-full w-full py-16",
        container && "container mx-auto",
        containerClassName
      )}>
        {children}
      </div>
    </section>
  )
}
