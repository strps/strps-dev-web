import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { cn } from '@/components/lib/utils'

export const PostHero: React.FC<{
  post: Post
  className?: string
}> = ({ post, className }) => {
  const { tags, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div
      className={cn('container min-h-[500px] sm:min-h-[700px] relative flex items-end', className)}
    >
      <div className="mx-auto z-10 px-6 relative sm:px-8 text-foreground pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {tags?.map((tag, index) => {
              if (typeof tag === 'object' && tag !== null) {
                const { tag: tagTitle } = tag

                const titleToUse = tagTitle || 'Untitled tag'

                const isLast = index === tags.length - 1

                return (
                  <>
                    {titleToUse}
                    {!isLast && <>, &nbsp;</>}
                  </>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            fill
            priority
            className="w-full h-full inset-0"
            imgClassName="z-10 object-cover"
            resource={heroImage}
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
