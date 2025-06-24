import React from 'react'
import { cn } from '@/utilities/ui'
import { SectionBackground } from './SectionBackground'

import { SectionConfig } from '@/payload-types'

interface SectionProps extends SectionConfig {
  id?: string | null
  children: React.ReactNode
  className?: string
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
  background,
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
      id={section_id ? section_id : id ? `block-${id}` : undefined}
      className={cn(
        theme === 'auto' ? '' : theme,
        'relative bg-background text-foreground',
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
