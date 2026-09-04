import Image from 'next/image'

import { Eyebrow } from '@/components/primitives/Eyebrow'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { cn } from '@/lib/utils'
import { formatDateTime } from '@/lib/formatDateTime'
import { formatAuthors } from '@/lib/formatAuthors'
import { mediaUrl } from '@/lib/mediaUrl'
import { localizedHref, defaultLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import type { Post } from '@strps-website/types'

/**
 * The article header on `/blog/[slug]`.
 *
 * Replaces the old shared `PostHero`, whose look — a `min-h-175` image bleed
 * with a black gradient and a forced `dark` class over it — belonged to the
 * pre-makeover site and was the one place a reader met an inverted theme. Here
 * the type sits on the page's own background in the hairline language, and the
 * hero image is a framed 16:9 plate below the meta rule.
 */
export function ArticleHero({
  post,
  locale = defaultLocale,
  className,
}: {
  post: Post
  locale?: Locale
  className?: string
}) {
  const dictionary = getDictionary(locale)
  const { tags, heroImage, populatedAuthors, publishedAt, title } = post

  const tagLine = (tags || [])
    .map((tag) => (typeof tag === 'object' && tag !== null ? tag.tag : null))
    .filter(Boolean)
    .join(' · ')
  const authors = populatedAuthors?.length ? formatAuthors(populatedAuthors) : ''
  const imageSrc = mediaUrl(heroImage)

  return (
    <header className={cn('flex flex-col', className)}>
      <LinkArrow href={localizedHref(locale, '/blog')} className="self-start">
        ← {dictionary.blog.backToIndex}
      </LinkArrow>

      <Eyebrow className="mt-8">{tagLine || dictionary.blog.eyebrow}</Eyebrow>
      <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-[-0.02em] md:text-5xl">{title}</h1>

      <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-t border-border pt-4">
        {authors && (
          <div className="flex flex-col gap-1">
            <Eyebrow>{dictionary.blog.author}</Eyebrow>
            <p className="text-sm text-muted-foreground">{authors}</p>
          </div>
        )}
        {publishedAt && (
          <div className="flex flex-col gap-1">
            <Eyebrow>{dictionary.blog.datePublished}</Eyebrow>
            <time dateTime={publishedAt} className="text-sm text-muted-foreground">
              {formatDateTime(publishedAt, locale)}
            </time>
          </div>
        )}
      </div>

      {imageSrc && (
        <div className="relative mt-10 aspect-video overflow-hidden rounded-sharp border border-border bg-linear-to-br from-card to-border">
          <Image
            src={imageSrc}
            alt={(typeof heroImage === 'object' && heroImage?.alt) || ''}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 960px) 100vw, 960px"
          />
        </div>
      )}
    </header>
  )
}
