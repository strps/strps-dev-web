'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame, type MotionValue } from 'motion/react'

export type MotionPattern = 'spring' | 'ease' | 'direct'

interface SVGCirclesProps {
  className?: string
  width?: number
  height?: number
  numCircles?: number
  minRadius?: number
  maxRadius?: number
  strokeWidth?: number
  strokeColor?: string
  strokeDasharray?: string
  motionPattern?: MotionPattern
  style?: React.CSSProperties
}

interface ParallaxCircleProps {
  followX: MotionValue<number>
  followY: MotionValue<number>
  factor: number
  radius: number
  strokeWidth: number
  strokeColor?: string
  strokeDasharray: string
  rotation: {
    initial: number
    animate: { rotate: number[] }
    transition: { duration: number; repeat: number; ease: 'linear' }
  }
}

function makeRotation() {
  const initialRotation = Math.random() * 360
  const duration = Math.random() * 1 + 120
  const direction = Math.random() < 0.5 ? 1 : -1
  return {
    initial: initialRotation,
    animate: { rotate: [initialRotation, initialRotation + 360 * direction] },
    transition: { duration, repeat: Infinity, ease: 'linear' as const },
  }
}
type Rotation = ReturnType<typeof makeRotation>

function usePointerFollow(pattern: MotionPattern) {
  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)

  // spring — always created (hooks can't be conditional)
  const springX = useSpring(targetX, { stiffness: 20, damping: 5 })
  const springY = useSpring(targetY, { stiffness: 20, damping: 5 })

  // ease — exponential lerp each frame
  const lerpX = useMotionValue(0)
  const lerpY = useMotionValue(0)
  useAnimationFrame(() => {
    lerpX.set(lerpX.get() + (targetX.get() - lerpX.get()) * 0.1)
    lerpY.set(lerpY.get() + (targetY.get() - lerpY.get()) * 0.1)
  })

  const followX = pattern === 'spring' ? springX : pattern === 'ease' ? lerpX : targetX
  const followY = pattern === 'spring' ? springY : pattern === 'ease' ? lerpY : targetY

  const setTarget = useCallback((x: number, y: number) => {
    targetX.set(x)
    targetY.set(y)
  }, [targetX, targetY])

  return { followX, followY, setTarget }
}

function ParallaxCircle({ followX, followY, factor, radius, strokeWidth, strokeColor, strokeDasharray, rotation }: ParallaxCircleProps) {
  const cx = useTransform(followX, x => x * factor)
  const cy = useTransform(followY, y => y * factor)

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      initial={{ rotate: rotation.initial }}
      animate={rotation.animate}
      transition={rotation.transition}
      r={radius}
      fill="none"
      stroke={strokeColor}
      strokeWidth={`${strokeWidth}px`}
      pathLength="100"
      strokeDasharray={strokeDasharray}
      suppressHydrationWarning
    />
  )
}

const SVGCircles: React.FC<SVGCirclesProps> = ({
  width = 150,
  height = 150,
  numCircles = 9,
  minRadius = 20,
  maxRadius = 80,
  strokeWidth = 100,
  strokeDasharray = '75',
  strokeColor = 'white',
  motionPattern = 'spring',
  className,
  style,
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const { followX, followY, setTarget } = usePointerFollow(motionPattern)

  const [circleRotations, setCircleRotations] = useState<Rotation[]>(() =>
    Array.from({ length: numCircles }, makeRotation),
  )

  useEffect(() => {
    setCircleRotations(prev => {
      if (prev.length === numCircles) return prev
      if (prev.length > numCircles) return prev.slice(0, numCircles)
      return [...prev, ...Array.from({ length: numCircles - prev.length }, makeRotation)]
    })
  }, [numCircles])

  useEffect(() => {
    const pointer = { x: 0, y: 0 }

    const compute = (clientX: number, clientY: number) => {
      const rect = svgRef.current?.getBoundingClientRect()
      if (!rect) return
      setTarget(
        (clientX - rect.left - rect.width / 2) * (width / rect.width),
        (clientY - rect.top - rect.height / 2) * (height / rect.height),
      )
    }

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      compute(e.clientX, e.clientY)
    }
    const onScroll = () => compute(pointer.x, pointer.y)
    const onLeave = () => setTarget(0, 0)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll, { capture: true })
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [width, height, setTarget])

  return (
    <svg
      ref={svgRef}
      style={style}
      className={className}
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {circleRotations.map((rotation, i) => {
        const focalLenght = 1000000
        const d0 = focalLenght / maxRadius
        const d1 = focalLenght / minRadius
        const delta_d = d1 - d0
        const d = d0 + (delta_d / numCircles) * i
        const r = focalLenght / d
        const factor = r / maxRadius
        return (
          <ParallaxCircle
            key={i}
            followX={followX}
            followY={followY}
            factor={factor}
            radius={r}
            strokeWidth={strokeWidth * factor}
            strokeDasharray={strokeDasharray}
            strokeColor={strokeColor}
            rotation={rotation}
          />
        )
      })}
    </svg>
  )
}

export default SVGCircles
