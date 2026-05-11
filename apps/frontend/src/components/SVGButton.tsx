'use client'
import React, { useRef } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { type VariantProps } from 'class-variance-authority'

interface SVGButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    svgClassName?: string
    strokeColor?: string
    strokeWidth?: number
}

export default function SVGButton({
    className,
    svgClassName,
    strokeColor,
    strokeWidth = 1.5,
    variant = 'default',
    size = 'default',
    children,
    onMouseEnter,
    onMouseLeave,
    ...props
}: SVGButtonProps) {
    const ref = useRef<HTMLButtonElement>(null)
    const rawProgress = useSpring(0, { stiffness: 80, damping: 20 })
    const pathLength = useTransform(rawProgress, [0, 1], [0, 1])
    const opacity = useTransform(rawProgress, [0, 0.1], [0, 1])

    const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        rawProgress.set(1)
        onMouseEnter?.(e)
    }

    const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        rawProgress.set(0)
        onMouseLeave?.(e)
    }

    const borderRadius = 9
    const borderWidth = 0.4
    const heigth = 3
    const recessHeight = heigth - borderWidth * 2
    const buttonColor = '#555555'

    return (
        <button
            ref={ref}
            data-slot="svg-button"
            className='relative  px-4 py-2'
            style={{
                height: `${heigth}em`,
            }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            {...props}
        >
            <svg
                aria-hidden
                className={cn(
                    'pointer-events-none absolute inset-0 h-full w-full overflow-visible z-0',
                    svgClassName,
                )}
            >
                <defs>
                    <linearGradient id="gradient_1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(200, 200, 200)" />
                        <stop offset="100%" stopColor="rgb(50, 50, 50)" />
                    </linearGradient>
                    <linearGradient id="gradient_2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(50, 50, 50)" />
                        <stop offset="100%" stopColor="rgb(255, 255, 255)" />
                    </linearGradient>

                    <linearGradient id="gradient_3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(100, 100, 100)" />
                        <stop offset="100%" stopColor="rgb(5, 5, 5)" />
                    </linearGradient>

                    <mask id="pillMask">
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            rx={borderRadius}
                            ry={borderRadius}
                            fill="white"
                            pathLength="1"

                        />
                        <rect
                            x={(borderWidth / 2) + "em"}
                            y={(borderWidth / 2) + "em"}
                            width={`calc(100% - ${borderWidth}em)`}
                            height={`calc(100% - ${borderWidth}em)`}
                            rx={recessHeight / 2 + "em"}
                            ry={recessHeight / 2 + "em"}
                            fill="black"
                        />
                    </mask>
                    <filter
                        id="shadow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                    >
                        {/* 1. Drop Shadow */}
                        <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="shadowBlur" />
                        <feOffset in="shadowBlur" dx="0" dy="3" result="shadowOffset" />
                        <feComponentTransfer in="shadowOffset" result="shadow">
                            <feFuncA type="linear" slope="0.65" />   {/* Shadow opacity */}
                        </feComponentTransfer>

                        {/* 2. Colored Reflection / Highlight */}
                        <feFlood floodColor={buttonColor} floodOpacity="0.3" result="highlightColor" />   {/* ← Color here */}
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="highlightBlur" />
                        <feOffset in="highlightBlur" dx="0" dy="-1" result="highlightOffset" />
                        <feComposite
                            in="highlightColor"
                            in2="highlightOffset"
                            operator="in"
                            result="coloredReflection"
                        />

                        {/* 3. Merge All Layers */}
                        <feMerge>
                            <feMergeNode in="shadow" />              {/* Shadow */}
                            <feMergeNode in="coloredReflection" />   {/* Colored Reflection */}
                            <feMergeNode in="SourceGraphic" />       {/* Original pill */}
                        </feMerge>
                    </filter>


                </defs>

                <g filter="url(#shadow)">

                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx={borderRadius}
                        ry={borderRadius}
                        fill="none"
                        strokeWidth='0.05em'
                        stroke={'url(#gradient_3)'}
                        pathLength="1"
                    />

                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx={borderRadius}
                        ry={borderRadius}
                        fill={buttonColor}
                        pathLength="1"


                    />


                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx={borderRadius}
                        ry={borderRadius}
                        fill="url(#gradient_1)"
                        style={{ mixBlendMode: "multiply" }}
                        pathLength="1"
                        opacity={0.4}
                        mask='url(#pillMask)'
                    />

                    <rect
                        x={(borderWidth / 2) + "em"}
                        y={(borderWidth / 2) + "em"}
                        width={`calc(100% - ${borderWidth}em)`}
                        height={`calc(100% - ${borderWidth}em)`}
                        rx={recessHeight / 2 + "em"}
                        ry={recessHeight / 2 + "em"}
                        fill="url(#gradient_2)"
                        pathLength="1"
                        style={{ mixBlendMode: "multiply" }}
                        opacity={0.25}
                    />
                </g>
            </svg>

            {children}
        </button>
    )
}
