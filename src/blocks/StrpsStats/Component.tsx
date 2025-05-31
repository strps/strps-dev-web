'use client'
import React, { useState, useEffect } from 'react'
import { Block } from 'payload'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, Variants } from 'motion/react'
import { useInView } from 'motion/react'

type Stat = {
  value: string
  label: string
  prefix?: string
  suffix?: string
  icon?: any
  color?: string
}

type Props = Block & {
  heading?: string
  description?: string
  layout?: 'grid' | 'side-by-side' | 'carousel'
  columns?: string
  stats: Stat[]
  animation?: {
    enable?: boolean
    duration?: number
    delay?: number
    staggerChildren?: number
    type?: 'spring' | 'tween' | 'inertia' | 'just'
    stiffness?: number
    damping?: number
  }
  style?: {
    variant?: 'card' | 'minimal' | 'bordered' | 'gradient'
    textAlign?: 'left' | 'center' | 'right'
    valueSize?: 'sm' | 'md' | 'lg' | 'xl'
  }
  cta?: {
    enable?: boolean
    text?: string
    link?: string
    style?: 'primary' | 'secondary' | 'outline' | 'text'
  }
  container?: {
    maxWidth?: string
    padding?: {
      top?: string
      bottom?: string
    }
  }
}

const AnimatedCounter: React.FC<{
  value: string
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}> = ({ value, prefix = '', suffix = '', duration = 2, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const numValue = parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0
  const hasDecimal = value.includes('.')

  useEffect(() => {
    setDisplayValue(0)
    const controls = setInterval(() => {
      setDisplayValue((prev) => {
        const increment = numValue / (duration * 30) // 30fps * duration
        const nextValue = prev + increment
        if (nextValue >= numValue) {
          clearInterval(controls)
          return numValue
        }
        return nextValue
      })
    }, 1000 / 30)

    return () => clearInterval(controls)
  }, [value, duration, numValue])

  const formatNumber = (num: number) => {
    if (hasDecimal) return num.toFixed(1)
    return Math.round(num).toLocaleString()
  }

  return (
    <motion.span className={className}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </motion.span>
  )
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
}

export const StrpsStats: React.FC<Props> = ({
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
  const controls = useAnimation()
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const {
    enable: enableAnimation = true,
    duration: animationDuration = 2,
    delay = 0,
    staggerChildren = 0.1,
    type = 'spring',
    stiffness = 100,
    damping = 10,
  } = animation

  const { variant = 'card', textAlign = 'center', valueSize = 'xl' } = style
  const { maxWidth = 'xl', padding = { top: 'xl', bottom: 'xl' } } = container

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm':
        return 'max-w-3xl'
      case 'md':
        return 'max-w-4xl'
      case 'lg':
        return 'max-w-5xl'
      case 'xl':
        return 'max-w-7xl'
      case 'full':
        return 'max-w-full'
      case 'none':
      default:
        return ''
    }
  }

  const getPaddingClass = (position: 'top' | 'bottom') => {
    const paddingValue = padding?.[position] || 'xl'
    switch (paddingValue) {
      case 'sm':
        return position === 'top' ? 'pt-8' : 'pb-8'
      case 'md':
        return position === 'top' ? 'pt-12' : 'pb-12'
      case 'lg':
        return position === 'top' ? 'pt-16' : 'pb-16'
      case 'xl':
        return position === 'top' ? 'pt-24' : 'pb-24'
      case 'none':
      default:
        return ''
    }
  }

  const getGridCols = () => {
    if (layout === 'side-by-side') return 'grid-cols-1'
    switch (columns) {
      case '2':
        return 'grid-cols-1 md:grid-cols-2'
      case '3':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      case '4':
      default:
        return 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4'
    }
  }

  const getVariantClasses = (color: string = 'primary') => {
    const baseClasses = 'h-full'
    const colorClasses = {
      primary: 'bg-indigo-600 text-white',
      secondary: 'bg-gray-800 text-white',
      success: 'bg-green-600 text-white',
      danger: 'bg-red-600 text-white',
      warning: 'bg-yellow-500 text-gray-900',
      info: 'bg-blue-500 text-white',
      light: 'bg-gray-100 text-gray-900',
      dark: 'bg-gray-900 text-white',
    }
    const variantClasses = {
      card: `rounded-lg shadow-md p-6 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}`,
      minimal: `p-4 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}`,
      bordered: `border-2 rounded-lg p-6 border-${color}-500 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}`,
      gradient: `bg-gradient-to-r from-${color}-500 to-${color}-700 text-white rounded-lg p-6`,
    }
    return `${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.card}`
  }

  const getTextAlignClass = () => {
    switch (textAlign) {
      case 'left':
        return 'text-left'
      case 'right':
        return 'text-right'
      case 'center':
      default:
        return 'text-center'
    }
  }

  const getValueSizeClass = () => {
    switch (valueSize) {
      case 'sm':
        return 'text-2xl md:text-3xl'
      case 'md':
        return 'text-3xl md:text-4xl'
      case 'lg':
        return 'text-4xl md:text-5xl'
      case 'xl':
      default:
        return 'text-5xl md:text-6xl'
    }
  }

  const getCtaClasses = () => {
    const baseClasses = 'inline-flex items-center px-6 py-3 rounded-md text-base font-medium'
    switch (cta.style) {
      case 'secondary':
        return `${baseClasses} bg-indigo-100 text-indigo-700 hover:bg-indigo-200`
      case 'outline':
        return `${baseClasses} border border-indigo-600 text-indigo-600 hover:bg-indigo-50`
      case 'text':
        return `${baseClasses} text-indigo-600 hover:text-indigo-800`
      case 'primary':
      default:
        return `${baseClasses} bg-indigo-600 text-white hover:bg-indigo-700`
    }
  }

  if (!stats || stats.length === 0) {
    return null
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${getPaddingClass('top')} ${getPaddingClass('bottom')} bg-white`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${getMaxWidthClass()}`}>
        {(heading || description) && (
          <motion.div className={`mb-12 ${getTextAlignClass()}`} variants={itemVariants}>
            {heading && (
              <motion.h2
                className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
                variants={itemVariants}
              >
                {heading}
              </motion.h2>
            )}
            {description && (
              <motion.p
                className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto"
                variants={itemVariants}
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        )}

        {layout === 'side-by-side' ? (
          <motion.div className="space-y-12" variants={containerVariants}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`${getVariantClasses(stat.color)} ${getTextAlignClass()}`}
                variants={itemVariants}
                custom={index}
              >
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex-1">
                    <p className="text-2xl font-medium">{stat.label}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    {enableAnimation ? (
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={animationDuration}
                        className={`font-bold ${getValueSizeClass()}`}
                      />
                    ) : (
                      <p className={`font-bold ${getValueSizeClass()}`}>
                        {stat.prefix}
                        {stat.value}
                        {stat.suffix}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div className={`grid gap-6 ${getGridCols()}`} variants={containerVariants}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={getVariantClasses(stat.color)}
                variants={itemVariants}
                custom={index}
              >
                <div className={getTextAlignClass()}>
                  {stat.icon?.url && (
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black bg-opacity-10 mb-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={stat.icon.url}
                        alt={stat.icon.alt || ''}
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </motion.div>
                  )}
                  {enableAnimation ? (
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={animationDuration}
                      className={`block font-bold ${getValueSizeClass()}`}
                    />
                  ) : (
                    <p className={`font-bold ${getValueSizeClass()}`}>
                      {stat.prefix}
                      {stat.value}
                      {stat.suffix}
                    </p>
                  )}
                  <motion.p className="mt-2 text-lg font-medium" whileHover={{ x: 5 }}>
                    {stat.label}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {cta?.enable && (
          <motion.div className={`mt-12 ${getTextAlignClass()}`} variants={itemVariants}>
            <Link href={cta.link || '#'} className={getCtaClasses()}>
              {cta.text || 'Learn More'}
              <motion.svg
                className="ml-2 -mr-1 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                whileHover={{ x: 5 }}
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
