import Image from 'next/image'

import { Eyebrow } from '@/components/primitives/Eyebrow'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { StackChip } from '@/components/primitives/StackChip'
import { cn } from '@/lib/utils'
import { localizedHref, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

export interface PostIndexCardProps {
  title: string
  description?: string | null
  /** Already-resolved image URL — the callers differ on how they build it. */
  imageUrl?: string | null
  imageAlt?: string | null
  publishedAt?: string | null
  tags?: string[]
  slug?: string | null
  className?: string
  locale: Locale
}

/** Tags past this point wrap into a second row and start crowding the copy. */
const MAX_TAGS = 3

/**
 * The `/blog` index card. Same hairline anatomy as `ArticleCard` (its home-page
 * teaser sibling), with the extra room a listing affords: a longer description
 * clamp and the post's tags as chips rather than folded into the eyebrow.
 *
 * Not clickable as a whole — the affordance is the pinned `LinkArrow`, so every
 * card in a row ends on the same line.
 */
export function PostIndexCard({
  title,
  description,
  imageUrl,
  imageAlt,
  publishedAt,
  tags = [],
  slug,
  className,
  locale,
}: PostIndexCardProps) {
  const dictionary = getDictionary(locale)
  const href = slug ? localizedHref(locale, `/blog/${slug}`) : undefined
  const shownTags = tags.filter(Boolean).slice(0, MAX_TAGS)
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <article
      className={cn(
        'group flex h-full flex-col border border-border p-5 transition-colors duration-150 hover:border-border-strong',
        className,
      )}
    >
      <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-sharp bg-linear-to-br from-card to-border">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt || ''}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>

      {formattedDate && (
        <time dateTime={publishedAt ?? undefined}>
          <Eyebrow>{formattedDate}</Eyebrow>
        </time>
      )}
      <h3 className="mt-2 text-[17px] font-medium">{title}</h3>
      {description && (
        <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {shownTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {shownTags.map((tag) => (
            <StackChip key={tag}>{tag}</StackChip>
          ))}
        </div>
      )}

      {href && (
        <LinkArrow
          href={href}
          aria-label={`${dictionary.common.readArticle} — ${title}`}
          className="mt-auto self-start pt-5"
        >
          {dictionary.common.readArticle} →
        </LinkArrow>
      )}
    </article>
  )
}
