import React, { ReactNode } from 'react'
import { cn } from '@/utilities/ui'

interface TwoColumnLayoutProps {
  left: ReactNode
  right: ReactNode
  reverse?: boolean
  className?: string
  leftClassName?: string
  rightClassName?: string
  gap?: string
  verticalAlign?: 'start' | 'center' | 'end' | 'stretch'
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  left,
  right,
  reverse = false,
  className = '',
  leftClassName = '',
  rightClassName = '',
  gap = 'gap-8',
  verticalAlign = 'start',
}) => {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row',
        gap,
        alignClasses[verticalAlign],
        reverse ? 'md:flex-row-reverse' : '',
        className,
      )}
    >
      <div className={cn('flex-1', leftClassName)}>{left}</div>
      <div className={cn('flex-1', rightClassName)}>{right}</div>
    </div>
  )
}
