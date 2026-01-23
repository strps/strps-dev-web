import React from 'react'
import { cn } from '@/utilities/ui'
import { SectionBackground } from './SectionBackground'

import { Media } from '@/payload-types'

interface SectionProps {
  id?: string | null
  container?: boolean | null
  backgroundContainer?: boolean | null
  backgroundImage?: number | Media | null
  children?: React.ReactNode
  background?: 'none' | 'svgCircles' | 'image'
  className?: string
  theme?: "auto" | "light" | "dark" | "inverted" | null
  section_id?: string | null | undefined
}

/**
 * A flexible layout wrapper that provides consistent styling, spacing, and background options.
 *
 * @example
 * // Basic usage
 * <Section id="about" className="py-12">
 *   <h2>About Us</h2>
 *   <p>Content goes here</p>
 * </Section>
 *
 * @example
 * // With background image
 * <Section
 *   id="hero"
 *   background="image"
 *   backgroundImage={heroImage}
 *   className="min-h-screen flex items-center"
 * >
 *   <h1>Welcome</h1>
 * </Section>
 */
export const Section: React.FC<SectionProps> = ({
  id,
  container,
  backgroundContainer,
  background = 'none',
  backgroundImage,
  className,
  children,
  theme,
  section_id,
}) => {
  //check if backgroundImage is a Media object
  const hasBackgroundImage =
    backgroundImage && typeof backgroundImage === 'object' ? backgroundImage : undefined

  return (
    <section
      id={section_id || `block-${id}` || undefined}
      className={cn(
        theme === 'auto' ? '' : theme,
        'relative bg-background text-foreground p-6 pt-16',
        className,
      )}
      suppressHydrationWarning
    >
      <div className={cn(container ? 'container mx-auto' : '', 'relative z-10 md:p-8')}>
        {children}
      </div>
      <SectionBackground
        background={background}
        container={backgroundContainer}
        backgroundImage={hasBackgroundImage}
      />
    </section>
  )
}

export default Section
