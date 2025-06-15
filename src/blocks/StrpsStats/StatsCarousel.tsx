import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { StatItem } from './types'
import { AnimatedCounter } from './AnimatedCounter'
import { statVariants, textAlignVariants, StatVariants, TextAlignVariants } from './variants'
import { cn } from '@/utilities/ui'
import { DynamicIcon } from 'lucide-react/dynamic'

interface StatsCarouselProps {
  stats: StatItem[]
  variant?: StatVariants['variant']
  textAlign?: TextAlignVariants['align']
  valueSize?: StatVariants['size']
  enableAnimation?: boolean
  animationDuration?: number
}

export const StatsCarousel: React.FC<StatsCarouselProps> = ({
  stats,
  variant = 'card',
  textAlign = 'center',
  valueSize = 'xl',
  enableAnimation = true,
  animationDuration = 2,
}) => {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = enableAnimation && !prefersReducedMotion

  return (
    <div className="relative">
      <motion.div
        className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 touch-pan-x"
        drag={shouldAnimate ? 'x' : false}
        dragConstraints={{ right: 0, left: 0 }}
        dragElastic={0.1}
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={cn(
              'flex-shrink-0 w-64 touch-none',
              statVariants({ variant }),
              textAlignVariants({ align: textAlign }),
            )}
            drag={shouldAnimate ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            whileHover={shouldAnimate ? { scale: 1.02 } : {}}
            whileTap={shouldAnimate ? { scale: 0.98 } : {}}
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : false}
            transition={{
              delay: shouldAnimate ? index * 0.1 : 0,
              duration: shouldAnimate ? animationDuration * 0.5 : 0,
            }}
            style={{
              cursor: shouldAnimate ? 'grab' : 'default',
            }}
          >
            <div className="p-6">
              {stat.icon && (
                <div className="mb-4 flex justify-center">
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
                className={cn(
                  'font-bold mb-2',
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
              {stat.label && <div className="text-sm text-muted-foreground">{stat.label}</div>}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <style jsx global>{`
        .touch-pan-x {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .touch-pan-x::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
