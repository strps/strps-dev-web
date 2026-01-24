import React, { ReactNode } from 'react'
import { cn } from '@/utilities/ui'

interface SidebarLayoutProps {
  sidebar: ReactNode
  children: ReactNode
  sidebarWidth?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  contentClassName?: string
  sidebarClassName?: string
  gap?: string
  reverse?: boolean
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  sidebar,
  children,
  sidebarWidth = 'md',
  className = '',
  contentClassName = '',
  sidebarClassName = '',
  gap = 'gap-8',
  reverse = false,
}) => {
  const widthClasses = {
    sm: 'md:w-1/4',
    md: 'md:w-1/3',
    lg: 'md:w-2/5',
    xl: 'md:w-1/2',
  }

  return (
    <div
      className={cn(
        'flex flex-col',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row',
        gap,
        className,
      )}
    >
      <aside className={cn('w-full', widthClasses[sidebarWidth], sidebarClassName)}>
        {sidebar}
      </aside>

      <main className={cn('flex-1', contentClassName)}>{children}</main>
    </div>
  )
}
