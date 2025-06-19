import { cn } from '@/utilities/ui'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArchiveCard } from '@/components/Cards/ArchiveCard'
import type { Post, Project } from '@/payload-types'

const collectionVariants = cva('grid', {
  variants: {
    variant: {
      grid: 'grid-cols-4 gap-4',
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
    <div className={cn('container', collectionVariants({ variant }), className)}>
      {collection?.length > 0 &&
        collection.map((item, index) => {
          if (typeof item === 'object' && item !== null) {
            return (
              <div
                className={cn({
                  'col-span-4': variant === 'grid',
                  'flex flex-col sm:flex-row gap-4': variant === 'list',
                })}
                key={index}
              >
                <ArchiveCard doc={item} relationTo={collectionName} variant={variant} />
              </div>
            )
          }

          return null
        })}
    </div>
  )
}
