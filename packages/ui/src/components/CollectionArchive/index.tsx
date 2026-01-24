import { cn } from '@/utilities/ui'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import type { Post, Project } from '@/payload-types'
import Link from 'next/link'
import { ImageCard } from '../Cards/ImageCard/ImageCard'
import { buttonVariants } from '../ui/button'

const collectionVariants = cva('grid', {
  variants: {
    variant: {
      grid: 'grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4',
      list: 'grid-cols-1 auto-rows-fr gap-16 justify-items-center mx-0',
    },
  },
  defaultVariants: {
    variant: 'grid',
  },
})

type CollectionVariantProps = VariantProps<typeof collectionVariants>

export type Props = {
  collection: (Post | Project)[]
  variant?: CollectionVariantProps['variant']
  urlPath: 'blog' | 'projects'
  className?: string
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { collection, variant = 'grid', className, urlPath } = props

  return (
    <div className={cn('container mx-auto', className)}>
      <div className={cn(collectionVariants({ variant }))}>
        {collection?.length > 0 &&
          collection.map((item, index) => {
            if (typeof item === 'object' && item !== null) {
              return (
                <ImageCard
                  key={index}
                  imagePosition="left"
                  image={item.heroImage}
                  title={item.title}
                  description={item.meta?.description}
                  action={
                    <Link
                      href={`/${urlPath}/${item.slug}`}
                      className={buttonVariants({ variant: 'default' })}
                    >
                      Read More...
                    </Link>
                  }
                  className="max-w-[60rem]"
                />
              )
            }
            return null
          })}
      </div>
    </div>
  )
}
