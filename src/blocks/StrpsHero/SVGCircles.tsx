'use client'
import React, { useMemo } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/utilities/ui'

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
  style?: React.CSSProperties
}

const SVGCircles: React.FC<SVGCirclesProps> = ({
  className,
  width = 150,
  height = 150,
  numCircles = 9,
  minRadius = 20,
  maxRadius = 80,
  strokeWidth = 5,
  strokeColor = '#303030',
  strokeDasharray = '75',
  style: customStyle,
}) => {
  // Generate initial rotation angles for circles
  const circleRotations = useMemo(
    () =>
      Array.from({ length: numCircles }).map(() => ({
        initial: Math.random() * 360,
        animate: { rotate: [0, 360] },
        transition: {
          duration: Math.random() * 10 + 5, // Random duration between 5-15 seconds
          repeat: Infinity,
          ease: 'linear',
        },
      })),
    [numCircles],
  )

  const defaultStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    zIndex: -1,
  }

  const combinedStyle = { ...defaultStyle, ...customStyle }

  return (
    <svg
      style={combinedStyle}
      className={cn(className)}
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
    >
      {circleRotations.map((rotation, i) => {
        const radius = minRadius + ((maxRadius - minRadius) * i) / (numCircles - 1)
        return (
          <motion.circle
            key={i}
            initial={{ rotate: rotation.initial }}
            animate={rotation.animate}
            transition={rotation.transition}
            cx="0"
            cy="0"
            r={radius}
            fill="none"
            strokeWidth={`${strokeWidth}px`}
            pathLength="100"
            strokeDasharray={strokeDasharray}
          />
        )
      })}
    </svg>
  )
}

export default SVGCircles
