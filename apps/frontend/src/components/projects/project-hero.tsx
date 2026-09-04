import Image from 'next/image'

import { Eyebrow } from '@/components/primitives/Eyebrow'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { StackChip } from '@/components/primitives/StackChip'
import { cn } from '@/lib/utils'
import { mediaUrl } from '@/lib/mediaUrl'
import { localizedHref, defaultLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import type { Project } from '@strps-website/types'

/**
 * The case-study header on `/projects/[slug]`.
 *
 * A project's own header rather than the article one it used to borrow: the
 * eyebrow carries the case-study tag and year, and the meta rule carries the
 * stack and the live/source links instead of an author and a date.
 */
export function ProjectHero({
  project,
  locale = defaultLocale,
  className,
}: {
  project: Project
  locale?: Locale
  className?: string
}) {
  const dictionary = getDictionary(locale)
  const { title, heroImage, meta, techStack, links, caseStudy } = project

  const eyebrow = [caseStudy?.tag, caseStudy?.year].filter(Boolean).join(' · ')
  const stack = techStack?.map((tech) => tech.name || '').filter(Boolean) || []
  const imageSrc = mediaUrl(heroImage)

  return (
    <header className={cn('flex flex-col', className)}>
      <LinkArrow href={localizedHref(locale, '/projects')} className="self-start">
        ← {dictionary.projects.backToIndex}
      </LinkArrow>

      <Eyebrow className="mt-8">{eyebrow || dictionary.eyebrowFallback.projects}</Eyebrow>
      <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-[-0.02em] md:text-5xl">{title}</h1>
      {meta?.description && (
        <p className="mt-4.5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          {meta.description}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-5 border-t border-border pt-4">
        {stack.length > 0 && (
          <div className="flex flex-col gap-2">
            <Eyebrow>{dictionary.projects.stack}</Eyebrow>
            <div className="flex flex-wrap gap-1.5">
              {stack.map((item) => (
                <StackChip key={item}>{item}</StackChip>
              ))}
            </div>
          </div>
        )}
        {(links?.liveSite || links?.github) && (
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            {links?.liveSite && (
              <LinkArrow href={links.liveSite} target="_blank" rel="noopener noreferrer">
                {dictionary.common.liveDemo} ↗
              </LinkArrow>
            )}
            {links?.github && (
              <LinkArrow href={links.github} target="_blank" rel="noopener noreferrer">
                {dictionary.common.source} ↗
              </LinkArrow>
            )}
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
