import type { ComponentProps } from 'react'
import React from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import RichText from '@/components/RichText'
import { PostIndexCard } from '@/components/cards/PostIndexCard'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { cn } from '@/lib/utils'
import { mediaUrl } from '@/lib/mediaUrl'
import { localizedHref, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import type { Post, BlogTag } from '@strps-website/types'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: SerializedEditorState
  locale: Locale
}

/**
 * Closing "keep reading" grid on an article page. Uses the same
 * `PostIndexCard` the `/blog` index does, under the section heading anatomy the
 * home sections use — it used to be a pair of shadcn `ImageCard`s with filled
 * buttons, the last place on the article page still on the old look.
 */
export const RelatedPosts: React.FC<RelatedPostsProps> = ({
  className,
  docs,
  introContent,
  locale,
}) => {
  const dictionary = getDictionary(locale)
  const posts = (docs || []).filter((doc): doc is Post => typeof doc === 'object' && doc !== null)

  if (posts.length === 0) return null

  return (
    <section className={cn('flex flex-col', className)}>
      <div className="border-b border-border pb-2">
        <h2 className="text-2xl font-medium tracking-[-0.01em]">{dictionary.blog.relatedPosts}</h2>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <Eyebrow>{dictionary.blog.eyebrow}</Eyebrow>
        <LinkArrow href={localizedHref(locale, '/blog')}>
          {dictionary.common.allArticles} →
        </LinkArrow>
      </div>

      {introContent && (
        <RichText
          className="mt-6 max-w-2xl"
          data={introContent as ComponentProps<typeof RichText>['data']}
          enableGutter={false}
        />
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 min-[721px]:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostIndexCard
            key={post.id}
            title={post.title}
            description={post.meta?.description}
            imageUrl={mediaUrl(post.heroImage)}
            imageAlt={typeof post.heroImage === 'object' ? post.heroImage?.alt : null}
            publishedAt={post.publishedAt}
            tags={(post.tags || [])
              .filter((tag): tag is BlogTag => typeof tag === 'object' && tag !== null)
              .map((tag) => tag.tag)
              .filter(Boolean)}
            slug={post.slug}
            locale={locale}
          />
        ))}
      </div>
    </section>
  )
}
