import React, { ReactNode } from 'react'
import { cn } from '@/utilities/ui'

interface GridLayoutProps {
  children: ReactNode
  className?: string
  itemClassName?: string
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto-fit' | 'auto-fill'
  gap?: string
  minWidth?: string
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  className = '',
  itemClassName = '',
  columns = 3,
  gap = 'gap-6',
  minWidth = 'min-w-[200px]',
}) => {
  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6',
    'auto-fit': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    'auto-fill': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
  }

  return (
    <div className={cn('grid', gridColumns[columns], gap, className)}>
      {React.Children.map(children, (child, index) => (
        <div className={cn(minWidth, itemClassName)} key={index}>
          {child}
        </div>
      ))}
    </div>
  )
}
