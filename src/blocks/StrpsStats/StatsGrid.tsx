// StatsGrid.tsx
import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { StatItem } from './types'
import { AnimatedCounter } from './AnimatedCounter'
import {
  statVariants,
  textAlignVariants,
  StatVariants,
  TextAlignVariants,
  gridColumnsVariants,
} from './variants'
import { cn } from '@/utilities/ui'
import { DynamicIcon } from 'lucide-react/dynamic'

interface StatsGridProps {
  stats: StatItem[]
  variant?: StatVariants['variant']
  textAlign?: TextAlignVariants['align']
  valueSize?: StatVariants['size']
  enableAnimation?: boolean
  animationDuration?: number
  columns?: '2' | '3' | '4'
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  variant = 'card',
  textAlign = 'center',
  valueSize = 'xl',
  enableAnimation = true,
  animationDuration = 2,
  columns = '4',
}) => {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = enableAnimation && !prefersReducedMotion

  return (
    <div className={gridColumnsVariants({ columns })}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={cn(
            statVariants({ variant }),
            textAlignVariants({ align: textAlign }),
            'flex flex-col items-center justify-center p-6 touch-none',
          )}
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : false}
          transition={{
            delay: shouldAnimate ? index * 0.1 : 0,
            duration: shouldAnimate ? animationDuration * 0.5 : 0,
            type: 'spring',
            stiffness: 100,
            damping: 10,
          }}
          whileHover={shouldAnimate ? { y: -5 } : {}}
          whileTap={shouldAnimate ? { scale: 0.98 } : {}}
        >
          {stat.icon && (
            <div className="mb-4">
              <DynamicIcon
                name={stat.icon as any}
                className={cn(
                  'h-12 w-12 p-2 rounded-full',
                  stat.color
                    ? `bg-${stat.color}/10 text-${stat.color} dark:bg-${stat.color}/20`
                    : 'bg-muted text-muted-foreground',
                )}
              />
            </div>
          )}
          <div
            className={cn('font-bold', statVariants({ size: valueSize, color: stat.color as any }))}
          >
            {enableAnimation ? (
              <AnimatedCounter
                value={stat.value}
                duration={animationDuration}
                suffix={stat.suffix}
                prefix={stat.prefix}
              />
            ) : (
              `${stat.prefix || ''}${stat.value}${stat.suffix || ''}`
            )}
          </div>
          {stat.label && <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>}
        </motion.div>
      ))}
    </div>
  )
}
