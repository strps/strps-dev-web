import Image from 'next/image'

import { Eyebrow } from '@/components/primitives/Eyebrow'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { StackChip } from '@/components/primitives/StackChip'
import { cn } from '@/lib/utils'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

export interface ProjectIndexCardProps {
  /** Position in the index, already padded ("01"). Shown when there's no year. */
  number: string
  title: string
  description?: string | null
  tag?: string | null
  year?: string | null
  imageUrl?: string | null
  imageAlt?: string | null
  stack?: string[]
  liveUrl?: string | null
  repoUrl?: string | null
  caseStudyHref?: string | null
  className?: string
  locale?: Locale
}

/** How many stack chips fit before the row starts to fight the card's rhythm. */
const MAX_STACK_CHIPS = 5

/**
 * The `/projects` index card: the hairline anatomy `LabTeaserCard` and
 * `ArticleCard` share (bordered box, 4:3 media, mono eyebrow, clamped copy),
 * plus the stack chips and the live/source/case-study links a project listing
 * needs.
 *
 * Like its siblings the card itself isn't a link — the affordances are the
 * pinned link row at the bottom, so every card in a row ends on the same line
 * whatever its copy runs to.
 */
export function ProjectIndexCard({
  number,
  title,
  description,
  tag,
  year,
  imageUrl,
  imageAlt,
  stack = [],
  liveUrl,
  repoUrl,
  caseStudyHref,
  className,
  locale = defaultLocale,
}: ProjectIndexCardProps) {
  const dictionary = getDictionary(locale)
  const shownStack = stack.filter(Boolean).slice(0, MAX_STACK_CHIPS)
  const overflow = stack.filter(Boolean).length - shownStack.length

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

      <div className="flex items-baseline justify-between gap-3">
        {tag ? <Eyebrow>{tag}</Eyebrow> : <span />}
        <Eyebrow>{year || `/${number}`}</Eyebrow>
      </div>

      <h3 className="mt-2 text-[17px] font-medium">{title}</h3>
      {description && (
        <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {shownStack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {shownStack.map((item) => (
            <StackChip key={item}>{item}</StackChip>
          ))}
          {overflow > 0 && <StackChip>+{overflow}</StackChip>}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-baseline gap-x-5 gap-y-2 pt-5">
        {caseStudyHref && (
          <LinkArrow href={caseStudyHref} aria-label={`${dictionary.common.viewCaseStudy} — ${title}`}>
            {dictionary.common.viewCaseStudy} →
          </LinkArrow>
        )}
        {liveUrl && (
          <LinkArrow href={liveUrl} target="_blank" rel="noopener noreferrer">
            {dictionary.common.liveDemo} ↗
          </LinkArrow>
        )}
        {repoUrl && (
          <LinkArrow href={repoUrl} target="_blank" rel="noopener noreferrer">
            {dictionary.common.source} ↗
          </LinkArrow>
        )}
      </div>
    </article>
  )
}
