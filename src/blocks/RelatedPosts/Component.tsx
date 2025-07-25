import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { ImageCard } from '@/components/Cards/ImageCard/ImageCard'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: SerializedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <ImageCard
              key={index}
              image={doc.heroImage}
              title={doc.title}
              description={doc.meta?.description}
              action={
                <Link
                  href={`/posts/${doc.slug}`}
                  className={buttonVariants({ variant: 'default' })}
                >
                  Read More...
                </Link>
              }
            />
          )
        })}
      </div>
    </div>
  )
}
