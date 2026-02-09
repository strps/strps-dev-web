'use client'
import React, { useState } from 'react'
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

const CirclesRenderer: React.FC<SVGCirclesProps> = ({
  width,
  height,
  numCircles,
  minRadius,
  maxRadius,
  strokeWidth,
  strokeDasharray,
  className,
  style,
}) => {
  const circleRotations = useState(() =>
    Array.from({ length: numCircles! }).map(() => {
      const initialRotation = Math.random() * 360
      const duration = Math.random() * 10 + 10
      return {
        initial: initialRotation,
        animate: { rotate: [initialRotation, initialRotation + 360] },
        transition: {
          duration,
          repeat: Infinity,
          ease: 'linear',
        },
      }
    })
  )[0]

  return (
    <svg
      style={style}
      className={cn('overflow-visible', className)}
      viewBox={`${-width! / 2} ${-height! / 2} ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {circleRotations.map((rotation, i) => {
        const radius = minRadius! + ((maxRadius! - minRadius!) * i) / (numCircles! - 1)
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
            suppressHydrationWarning
          />
        )
      })}
    </svg>
  )
}

const SVGCircles: React.FC<SVGCirclesProps> = (props) => {
  const {
    numCircles = 9,
    width = 150,
    height = 150,
    minRadius = 20,
    maxRadius = 80,
    strokeWidth = 5,
    strokeDasharray = '75',
    ...rest
  } = props

  return (
    <CirclesRenderer
      key={numCircles}
      numCircles={numCircles}
      width={width}
      height={height}
      minRadius={minRadius}
      maxRadius={maxRadius}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      {...rest}
    />
  )
}

export default SVGCircles