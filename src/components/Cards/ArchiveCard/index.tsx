'use client'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

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

export type CardData = Pick<Post | Project, 'slug' | 'meta' | 'title'>

export const ArchiveCard: React.FC<{
  className?: string
  doc?: CardData
  relationTo?: 'posts' | 'projects'
  title?: string
}> = (props) => {
  const { className, doc, relationTo, title: titleFromProps } = props

  const { slug, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <Card className={cn('flex flex-col pt-0 overflow-clip', className)}>
      {metaImage && typeof metaImage !== 'string' && (
        <div className="relative w-full">
          <Media resource={metaImage} size="33vw" />
        </div>
      )}
      <CardHeader>
        {titleToUse && (
          <CardTitle>
            <Link href={href}>{titleToUse}</Link>
          </CardTitle>
        )}
      </CardHeader>
      {description && (
        <CardContent>
          <CardDescription>{sanitizedDescription}</CardDescription>
        </CardContent>
      )}
      <CardFooter className="grow flex justify-end items-end">
        <Link href={href}>Read more...</Link>
      </CardFooter>
    </Card>
  )
}
