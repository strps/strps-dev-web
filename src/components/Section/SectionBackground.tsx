import React, { ReactElement } from 'react'
import SVGCircles from '@/blocks/StrpsHero/SVGCircles'
import { cn } from '@/utilities/ui'
import { Media } from '@/payload-types'
import { Media as CMSMedia } from '@/components/Media'

type BackgroundType = 'SVGCircles' | 'svgCircles' | Media | ReactElement | string | null | undefined

interface SectionBackgroundProps {
  background?: BackgroundType
  className?: string
  container?: boolean
  backgroundImage?: Media
}

export const SectionBackground = ({
  className,
  background,
  container,
  backgroundImage,
}: SectionBackgroundProps) => {
  if (!background) return null

  // Handle SVG Circles background
  if (background === 'SVGCircles' || background === 'svgCircles') {
    return (
      <SVGCircles
        className={cn(
          'absolute -translate-1/2 top-1/2 left-1/2 w-full h-full stroke-[var(--svg-circle-color)] -z-10',
          container ? 'container mx-auto' : '',
          className,
        )}
        aria-hidden="true"
      />
    )
  }

  // Handle Media object background
  if (background == 'image') {
    return backgroundImage ? (
      <CMSMedia
        resource={backgroundImage}
        alt=""
        className={cn(
          'absolute inset-0 w-full object-cover -z-10',
          container ? 'container mx-auto' : '',
          className,
        )}
        fill
        aria-hidden="true"
      />
    ) : null
  }

  // Handle React elements
  if (React.isValidElement(background)) {
    return React.cloneElement(background as React.ReactElement<{ className?: string }>, {
      className: cn('absolute inset-0 w-full h-full -z-10', className),
    })
  }

  // Handle string URLs
  if (typeof background === 'string') {
    return (
      <div
        className={cn('absolute inset-0 w-full h-full -z-10', className)}
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />
    )
  }

  return null
}
