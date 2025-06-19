import { cn } from '@/utilities/ui'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArchiveCard } from '@/components/Cards/ArchiveCard'
import type { Post, Project } from '@/payload-types'

const collectionVariants = cva('grid', {
  variants: {
    variant: {
      grid: 'grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
      list: 'grid-cols-1 gap-16',
    },
  },
  defaultVariants: {
    variant: 'grid',
  },
})

type CollectionVariantProps = VariantProps<typeof collectionVariants>

export type Props = {
  collection: (Post | Project)[]
  collectionName: 'posts' | 'projects'
  variant?: CollectionVariantProps['variant']
  className?: string
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { collection, collectionName, variant = 'grid', className } = props

  return (
    <div className={cn('container mx-auto', className)}>
      {collection?.length > 0 && (
        <div className={cn(collectionVariants({ variant }))}>
          {collection.map((item, index) => {
            if (typeof item === 'object' && item !== null) {
              return (
                <ArchiveCard key={index} doc={item} relationTo={collectionName} variant={variant} />
              )
            }
            return null
          })}
        </div>
      )}
    </div>
  )
}
