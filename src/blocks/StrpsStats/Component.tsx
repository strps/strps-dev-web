'use client'

import React, { useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/utilities/ui'
import { StrpsStatsBlock } from './types'
import { StatsGrid } from './StatsGrid'
import { StatsCarousel } from './StatsCarousel'
import { StatsSideBySide } from './StatsSideBySide'
import {
  containerVariants,
  textAlignVariants,
  ctaVariants,
  paddingVariants,
  PaddingVariants,
} from './variants'

const containerMotionVariants = {
  hidden: { opacity: 0 },
  visible: (reduced: boolean) => ({
    opacity: 1,
    transition: reduced
      ? {}
      : {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
  }),
}

const itemMotionVariants = (reduced: boolean) => ({
  hidden: reduced ? { opacity: 1 } : { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: reduced
      ? {}
      : {
          type: 'spring',
          stiffness: 100,
          damping: 10,
        },
  },
})

export const StrpsStats: React.FC<StrpsStatsBlock> = ({
  heading,
  description,
  layout = 'grid',
  columns = '4',
  stats = [],
  animation = {},
  style = {},
  cta = {},
  container = {},
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const prefersReducedMotion = useReducedMotion()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const { enable: enableAnimation = true, duration: animationDuration = 2 } = animation
  const { variant = 'card', textAlign = 'center', valueSize = 'xl' } = style
  const { maxWidth = 'xl', padding = { top: 'xl', bottom: 'xl' } } = container

  if (!stats || stats.length === 0) {
    return null
  }

  // Respect reduced motion preference
  const shouldAnimate = isClient && enableAnimation && !prefersReducedMotion

  const renderStats = () => {
    const commonProps = {
      stats,
      variant,
      textAlign,
      valueSize,
      enableAnimation: shouldAnimate,
      animationDuration,
    }

    switch (layout) {
      case 'carousel':
        return <StatsCarousel {...commonProps} />
      case 'side-by-side':
        return <StatsSideBySide {...commonProps} />
      case 'grid':
      default:
        return <StatsGrid {...commonProps} columns={columns} />
    }
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative',
        paddingVariants({
          paddingTop: padding?.top as PaddingVariants['paddingTop'],
          paddingBottom: padding?.bottom as PaddingVariants['paddingBottom'],
        }),
      )}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerMotionVariants}
      custom={!shouldAnimate}
    >
      <div className={containerVariants({ maxWidth })}>
        {(heading || description) && (
          <motion.div
            className={cn('mb-12', textAlignVariants({ align: textAlign }))}
            variants={itemMotionVariants(!shouldAnimate)}
          >
            {heading && (
              <motion.h2
                className="text-3xl font-extrabold text-foreground sm:text-4xl"
                variants={itemMotionVariants(!shouldAnimate)}
              >
                {heading}
              </motion.h2>
            )}
            {description && (
              <motion.p
                className="mt-4 text-xl text-muted-foreground"
                variants={itemMotionVariants(!shouldAnimate)}
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        )}

        {renderStats()}

        {cta?.enable && cta?.link && (
          <motion.div className="mt-12 text-center" variants={itemMotionVariants(!shouldAnimate)}>
            <a
              href={cta.link}
              className={cn(
                ctaVariants({ variant: cta.style as any }),
                'transition-colors duration-200',
              )}
            >
              {cta.text || 'Learn more'}
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default StrpsStats
