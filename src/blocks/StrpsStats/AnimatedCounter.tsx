import React, { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useIsomorphicLayoutEffect,
} from 'motion/react'

interface AnimatedCounterProps {
  value: string
  prefix?: string | null
  suffix?: string | null
  duration?: number
  className?: string
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
}) => {
  const numValue = parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0
  const hasDecimal = value.includes('.')
  const decimalPlaces = hasDecimal ? (value.split('.')[1]?.length ?? 0) : 0

  const raw = useMotionValue(0)
  const spring = useSpring(raw, { damping: 30, stiffness: 100 })
  const display = useTransform(spring, (latest) =>
    hasDecimal ? latest.toFixed(Math.min(decimalPlaces, 2)) : Math.round(latest).toLocaleString(),
  )

  const prevValue = useRef(numValue)
  const isMounted = useRef(false)

  const useSafeEffect = typeof window !== 'undefined' ? useIsomorphicLayoutEffect : useEffect
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useSafeEffect(() => {
    if (!isMounted.current || prefersReducedMotion) {
      raw.set(numValue)
    } else {
      raw.set(prevValue.current)
      animate(raw, numValue, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      })
    }
    prevValue.current = numValue
    isMounted.current = true
  }, [numValue, duration, prefersReducedMotion])

  return (
    <motion.span className={className}>
      {prefix && <span>{prefix}</span>}
      <motion.span>{display}</motion.span>
      {suffix && <span>{suffix}</span>}
    </motion.span>
  )
}
