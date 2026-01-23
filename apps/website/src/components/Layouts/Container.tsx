import React, { ReactNode } from 'react'
import { cn } from '@/utilities/ui'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'xl',
  padding = 'md',
}) => {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-full',
  }

  const paddingClasses = {
    none: 'p-0',
    sm: 'px-4 py-2 sm:px-6',
    md: 'px-4 py-8 sm:px-6 lg:px-8',
    lg: 'px-4 py-12 sm:px-6 lg:px-8',
    xl: 'px-4 py-16 sm:px-6 lg:px-8',
  }

  return (
    <div className={cn('w-full mx-auto', sizeClasses[size], paddingClasses[padding], className)}>
      {children}
    </div>
  )
}
