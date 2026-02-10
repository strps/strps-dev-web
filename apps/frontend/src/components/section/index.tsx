import * as React from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
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

export default function Section({
  className,
  image,
  overlayClassName,
  containerClassName,
  children,
  ...props
}: SectionProps) {


  return (
    <section
      className={cn("w-full relative overflow-hidden", className)}
      {...props}
    >
      {image && (
        <div className="absolute inset-0 -z-10 h-full w-full select-none">
          {/* Overlay to ensure text readability */}
          <div
            className={cn(
              "absolute inset-0 bg-background/85 backdrop-blur-[2px] z-10",
              overlayClassName
            )}
          />
          <Image
            fill
            quality={90}
            {...image}
            // Ensure critical styles (fill, object-cover) aren't accidentally broken by spread props,
            // while allowing custom classes to be appended.
            className={cn("object-cover opacity-60", image.className)}
          />
        </div>
      )}

      {/* Content Wrapper */}
      <div className={cn("container mx-auto relative flex flex-col gap-8 z-20 h-full w-full py-16", containerClassName)}>
        {children}
      </div>
    </section>
  )
}

