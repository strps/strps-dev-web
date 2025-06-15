// StatsSideBySide.tsx
import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { StatItem } from './types'
import { AnimatedCounter } from './AnimatedCounter'
import { statVariants, StatVariants } from './variants'
import { cn } from '@/utilities/ui'
import { DynamicIcon } from 'lucide-react/dynamic'

interface StatsSideBySideProps {
  stats: StatItem[]
  variant?: StatVariants['variant']
  valueSize?: StatVariants['size']
  enableAnimation?: boolean
  animationDuration?: number
}

export const StatsSideBySide: React.FC<StatsSideBySideProps> = ({
  stats,
  variant = 'card',
  valueSize = 'xl',
  enableAnimation = true,
  animationDuration = 2,
}) => {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = enableAnimation && !prefersReducedMotion

  return (
    <motion.div
      className="bg-card rounded-lg shadow-xl overflow-hidden border border-border"
      initial={shouldAnimate ? { opacity: 0 } : false}
      animate={shouldAnimate ? { opacity: 1 } : false}
      transition={{ duration: shouldAnimate ? 0.5 : 0 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {stats.map((stat, index) => {
          const isEven = index % 2 === 0
          const isLastRow = index >= stats.length - 2

          return (
            <motion.div
              key={index}
              className={cn(
                statVariants({ variant }),
                'p-8 flex items-center touch-none',
                isEven ? 'border-b border-border md:border-r' : 'border-b border-border',
                isLastRow ? 'border-b-0' : '',
              )}
              initial={
                shouldAnimate
                  ? {
                      opacity: 0,
                      x: isEven ? -20 : 20,
                    }
                  : false
              }
              animate={
                shouldAnimate
                  ? {
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 100,
                        damping: 10,
                      },
                    }
                  : false
              }
              transition={{
                delay: shouldAnimate ? index * 0.1 : 0,
                duration: shouldAnimate ? animationDuration * 0.5 : 0,
              }}
              whileHover={
                shouldAnimate
                  ? {
                      y: -3,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
              whileTap={
                shouldAnimate
                  ? {
                      scale: 0.98,
                      transition: { duration: 0.1 },
                    }
                  : {}
              }
            >
              {stat.icon && (
                <div className="mr-6">
                  <DynamicIcon
                    name={stat.icon as any}
                    className={cn(
                      'h-12 w-12 p-2 rounded-full transition-colors duration-200',
                      stat.color
                        ? `bg-${stat.color}/10 text-${stat.color} dark:bg-${stat.color}/20`
                        : 'bg-muted text-muted-foreground',
                    )}
                  />
                </div>
              )}
              <div>
                <div
                  className={cn(
                    'font-bold',
                    statVariants({ size: valueSize, color: stat.color as any }),
                  )}
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
                {stat.label && (
                  <motion.div
                    className="text-sm text-muted-foreground"
                    initial={shouldAnimate ? { opacity: 0 } : false}
                    animate={shouldAnimate ? { opacity: 1 } : false}
                    transition={{ delay: shouldAnimate ? index * 0.1 + 0.2 : 0 }}
                  >
                    {stat.label}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
