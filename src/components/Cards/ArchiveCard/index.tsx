'use client'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import type { Post, Project } from '@/payload-types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Media } from '@/components/Media'
import { ArrowRight } from 'lucide-react'

// Define the card variants using CVA
const cardVariants = cva('flex flex-col overflow-hidden w-full', {
  variants: {
    variant: {
      grid: 'pt-0 h-full',
      list: 'flex-row p-0 h-56',
    },
  },
  defaultVariants: {
    variant: 'grid',
  },
})

const imageVariants = cva('relative', {
  variants: {
    variant: {
      grid: 'w-full aspect-video',
      list: 'h-full w-1/3 flex-shrink-0',
    },
  },
})

const contentVariants = cva('flex flex-col', {
  variants: {
    variant: {
      grid: 'p-6',
      list: 'p-6',
    },
  },
})

const footerVariants = cva('mt-auto pt-4', {
  variants: {
    variant: {
      grid: 'border-t border-border',
      list: 'border-t-0',
    },
  },
})

type CardVariantProps = VariantProps<typeof cardVariants>

export type CardData = Pick<Post | Project, 'slug' | 'meta' | 'title'>

export const ArchiveCard: React.FC<{
  className?: string
  doc?: CardData
  relationTo?: 'posts' | 'projects'
  title?: string
  variant?: CardVariantProps['variant']
}> = (props) => {
  const { className, doc, relationTo, title: titleFromProps, variant } = props

  const { slug, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  const metaImageAlt = (metaImage as { alt: string | undefined })?.alt || ''

  return (
    <Card
      className={cn(cardVariants({ variant }), className)}
      aria-labelledby={`${slug}-title`}
      role="article"
    >
      {metaImage && typeof metaImage !== 'string' && (
        <div className={cn(imageVariants({ variant }))} aria-hidden={!metaImageAlt}>
          <Media resource={metaImage} fill alt={metaImageAlt} imgClassName="object-cover" />
        </div>
      )}
      <div
        className={cn(contentVariants({ variant }), {
          'flex-1 flex flex-col': variant === 'list',
          'h-full': variant === 'grid',
        })}
      >
        <div className="space-y-2">
          <CardHeader className="p-0">
            <CardTitle id={`${slug}-title`} className="text-lg font-semibold">
              {titleToUse}
            </CardTitle>
          </CardHeader>
          {sanitizedDescription && (
            <CardDescription className="line-clamp-3 text-muted-foreground">
              {sanitizedDescription}
            </CardDescription>
          )}
        </div>
        <CardFooter className={cn(footerVariants({ variant }), 'p-0 pt-4 mt-auto')}>
          <Link
            href={href}
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            aria-label={`View details about ${titleToUse}`}
          >
            View details
            <ArrowRight />
          </Link>
        </CardFooter>
      </div>
    </Card>
  )
}
