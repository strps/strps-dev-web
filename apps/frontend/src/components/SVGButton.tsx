'use client'
import React, { useId } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'motion/react'
import { cn } from '@/lib/utils'

const MotionLink = motion.create(Link)

export type SVGButtonVariant =
    | 'github'
    | 'linkedin'
    | 'send'
    | 'default'
    | 'destructive'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'solid'
    | 'outlineGhost'

export type SVGButtonIcon =
    | 'github'
    | 'linkedin'
    | 'send'
    | 'arrowRight'
    | 'download'
    | 'externalLink'
    | 'check'
    | 'code'

interface SVGButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Picks one of the built-in icon/color presets. Ignored when `icon` and/or `color` are provided. */
    variant?: SVGButtonVariant
    href?: string
    /** Background color revealed on hover. Overrides the variant preset. */
    color?: string
    /** Resting background color. Overrides the variant preset. */
    baseColor?: string
    /**
     * Icon rendered in place of the variant preset. Accepts a name from the built-in icon
     * registry, an SVG path `d` string, or a ready-made ReactNode (rendered as-is, e.g. a
     * <motion.path> with its own hover variants). Names and path strings get the same
     * fade-in-on-hover animation (see `iconColor`/`iconTransform`).
     */
    icon?: SVGButtonIcon | React.ReactNode | string
    /** Fill color for the hover fade-in animation. Defaults to the variant preset's icon color. */
    iconColor?: string
    /** SVG transform applied to `icon` when it is a name or path string. */
    iconTransform?: string
}

/**
 * Decorative marks painted inside the pill, behind the label. Paths are authored at their
 * own scale, so each one carries the transform that fits it to the ~48px pill.
 */
const ICONS: Record<SVGButtonIcon, { d: string; transform: string }> = {
    send: {
        transform: 'translate(10, 2) scale(2.5)',
        d: "M 4.0003551 4.0003551 C 2.8923551 4.0003551 1.9996449 4.892 1.9996449 6 L 1.9996449 6.7840909 L 11.177557 12.625355 C 11.690689 12.922531 12.321306 12.923233 12.834162 12.625355 L 22.000355 6.7851562 L 22.000355 6 C 22.000355 4.892 21.107645 4.0003551 19.999645 4.0003551 L 4.0003551 4.0003551 z M 1.9996449 8.5621449 L 1.9996449 18 C 1.9996449 19.108 2.8923551 19.999645 4.0003551 19.999645 L 19.999645 19.999645 C 21.107645 19.999645 22.000355 19.108 22.000355 18 L 22.000355 8.5632102 L 13.612926 13.90483 A 0.750075 0.750075 0 0 1 13.587358 13.921875 C 12.610214 14.489422 11.400439 14.489422 10.423295 13.921875 A 0.750075 0.750075 0 0 1 10.396662 13.905895 L 1.9996449 8.5621449 z ",
    },
    github: {
        transform: 'translate(10, 5) scale(0.5)',
        d: "M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z",
    },
    linkedin: {
        transform: 'translate(10, 7) scale(0.11)',
        d: "M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889	C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056	H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806	c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1	s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73	c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079	c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426	c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472	L341.91,330.654L341.91,330.654z",
    },
    arrowRight: {
        transform: 'translate(10, 0) scale(2)',
        d: "M13.5 4.5 L21 12 L13.5 19.5 L12.44 18.44 L18.13 12.75 L3 12.75 L3 11.25 L18.13 11.25 L12.44 5.56 Z",
    },
    download: {
        transform: 'translate(10, 0) scale(2)',
        d: "M11.25 3 L12.75 3 L12.75 13.19 L16.47 9.47 L17.53 10.53 L12 16.06 L6.47 10.53 L7.53 9.47 L11.25 13.19 Z M4 18.5 L20 18.5 L20 20 L4 20 Z",
    },
    externalLink: {
        transform: 'translate(10, 0) scale(2)',
        d: "M14 3 L21 3 L21 10 L19.5 10 L19.5 5.56 L12.53 12.53 L11.47 11.47 L18.44 4.5 L14 4.5 Z M4 6 L11 6 L11 7.5 L5.5 7.5 L5.5 18.5 L16.5 18.5 L16.5 13 L18 13 L18 20 L4 20 Z",
    },
    check: {
        transform: 'translate(10, 0) scale(2)',
        d: "M9.5 16.17 L5.33 12 L3.91 13.41 L9.5 19 L21 7.5 L19.59 6.09 Z",
    },
    code: {
        transform: 'translate(10, 0) scale(2)',
        d: "M7.64 6.64 L8.7 7.7 L4.4 12 L8.7 16.3 L7.64 17.36 L2.28 12 Z M16.36 6.64 L21.72 12 L16.36 17.36 L15.3 16.3 L19.6 12 L15.3 7.7 Z",
    },
}

/** Deeper, denser tone of `c`: pulled toward the page foreground, for the hover sweep. */
// const deep = (c: string, amount = 65) => `color-mix(in oklab, ${c} ${amount}%, var(--foreground))`
// const deep = (c: string, amount = 65) => `oklab(from ${c} calc(l - 0.15) a b)`
const deep = (c: string, amount = 0.08) => `oklch(from ${c} calc(l - 0.1) calc(c + ${amount}) h)`
// const deep = (c: string, amount = 0) => `oklab(from ${c} calc(l - 0.39) calc(a + ${amount}) calc(b + ${amount}))`

/**
 * Color presets. Each variant stays inside one hue family: `base` is the full color at rest,
 * `mainColor` is a deeper, more intense tone of it that sweeps in on hover, and `iconColor`
 * is the resting tone again so the mark reads back out of that deeper sweep. The non-brand
 * presets take their hue from the matching `variant` of the shadcn Button (see
 * components/ui/button.tsx) so a CMS `appearance` value renders consistently whichever of the
 * two buttons it lands on.
 */
const GRAPHICS: Record<
    SVGButtonVariant,
    { base: string; mainColor: string; iconColor: string; textColor: string; icon?: SVGButtonIcon }
> = {
    send: { base: '#F47B16', mainColor: deep('#F47B16', 0.03), iconColor: '#F9A45C', textColor: 'var(--primary-foreground)', icon: 'send' },
    github: { base: '#0FBF3E', mainColor: deep('#0FBF3E'), iconColor: '#5BE382', textColor: 'var(--primary-foreground)', icon: 'github' },
    linkedin: { base: '#0077B5', mainColor: deep('#0077B5'), iconColor: '#4FB3E8', textColor: 'var(--primary-foreground)', icon: 'linkedin' },

    default: { base: 'var(--primary)', mainColor: deep('var(--primary)'), iconColor: 'var(--primary)', textColor: 'var(--primary-foreground)' },
    destructive: { base: 'var(--destructive)', mainColor: deep('var(--destructive)'), iconColor: 'var(--destructive)', textColor: '#fff' },
    secondary: { base: 'var(--secondary)', mainColor: deep('var(--secondary)'), iconColor: 'var(--muted-foreground)', textColor: 'var(--secondary-foreground)' },
    outline: { base: 'var(--background)', mainColor: deep('var(--accent)'), iconColor: 'var(--accent)', textColor: 'var(--foreground)' },
    ghost: { base: 'transparent', mainColor: deep('var(--accent)'), iconColor: 'var(--accent)', textColor: 'var(--foreground)' },
    solid: { base: 'var(--foreground)', mainColor: deep('var(--primary)'), iconColor: 'var(--muted-foreground)', textColor: 'var(--background)' },
    outlineGhost: { base: 'transparent', mainColor: deep('var(--muted)'), iconColor: 'var(--muted)', textColor: 'var(--muted-foreground)' },
}

export const SVG_BUTTON_VARIANTS = Object.keys(GRAPHICS) as SVGButtonVariant[]
export const SVG_BUTTON_ICONS = Object.keys(ICONS) as SVGButtonIcon[]

export default function SVGButton({
    className,
    children,
    variant = 'github',
    href,
    color,
    baseColor,
    icon,
    iconColor,
    iconTransform,
    ...props
}: SVGButtonProps) {


    const borderRadius = 9
    const borderWidth = 0.4
    const heigth = 3
    const recessHeight = heigth - borderWidth * 2

    //Motion variants
    const buttonVariants: Variants = {
        initial: {
            scale: 1,
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.8,
                ease: [0, 0.71, 0.2, 1.01]
                // stiffness: 300,
                // damping: 20,
            },

        },
        tap: {
            scale: 0.95,
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }
        }
    }
    const bgRectVariants: Variants = {
        initial: {
            width: '0%',
        },
        hover: {
            width: '100%',

        },

    }


    const uniqueId = useId()
    const clipPathId = `button_${uniqueId}_clip`
    const pillMaskId = `button_${uniqueId}_pill_mask`

    const preset = GRAPHICS[variant]
    const mainColor = color ?? preset.mainColor
    const baseFill = baseColor ?? preset.base

    const iconName =
        typeof icon === 'string' && icon in ICONS
            ? (icon as SVGButtonIcon)
            : icon === undefined
                ? preset.icon
                : undefined
    const iconPath = iconName ? ICONS[iconName] : typeof icon === 'string' ? { d: icon, transform: 'translate(10, 0) scale(2)' } : undefined

    const resolvedIcon = iconPath ? (
        <motion.path
            transform={iconTransform ?? iconPath.transform}
            d={iconPath.d}
            fill={iconColor ?? preset.iconColor}
            variants={{
                initial: { fillOpacity: 0 },
                hover: { fillOpacity: 1 },
            }}
        />
    ) : (
        icon
    )

    const sharedProps = {
        className: cn('relative inline-flex items-center no-underline px-6 py-2 cursor-pointer', className),
        style: { height: `${heigth}em`, color: preset.textColor },
        initial: "initial" as const,
        whileHover: "hover" as const,
        whileTap: "tap" as const,
        variants: buttonVariants,
    }

    const inner = (
        <>
            <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible z-0"
            >
                <defs>
                    <linearGradient id="gradient_1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(255, 255, 255)" />
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

                    <clipPath id={clipPathId}>
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            rx={borderRadius}
                            ry={borderRadius}
                        />
                    </clipPath>
                    <mask id={pillMaskId}>
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

                        {/* 2. Colored Reflection / Highlight — derived from the actual rendered fill */}
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" result="highlightBlur" />
                        <feOffset in="highlightBlur" dx="0" dy="-2" result="highlightOffset" />
                        <feComponentTransfer in="highlightOffset" result="coloredReflection">
                            <feFuncA type="linear" slope="0.1" />
                        </feComponentTransfer>

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
                        strokeWidth='0.2em'
                        stroke={'url(#gradient_3)'}
                        pathLength="1"
                    />
                    {/* color group */}
                    <g clipPath={`url(#${clipPathId})`}>
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill={baseFill}
                        />
                        <motion.rect
                            x="0"
                            y="0"
                            height="100%"
                            fill={mainColor}
                            opacity={1}
                            variants={bgRectVariants}
                        />
                        {resolvedIcon}

                    </g>

                    <g
                        clipPath={`url(#${clipPathId})`}
                        style={{ filter: "blur(1px)" }}
                    >
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
                            mask={`url(#${pillMaskId})`}
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
                            style={{
                                mixBlendMode: "multiply",
                                filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 1))"
                            }}
                            opacity={0.25}

                        />

                    </g>
                </g>
            </svg>
            <span
                className="relative z-10 flex items-center"
                style={{
                    filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3))"
                }}
            >
                {children}
            </span>
        </>
    )

    return href ? (
        <MotionLink href={href} {...sharedProps}>
            {inner}
        </MotionLink>
    ) : (
        <motion.button {...sharedProps}>
            {inner}
        </motion.button>
    )
}


