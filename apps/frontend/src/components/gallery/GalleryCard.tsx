import Link from 'next/link'
import Image from 'next/image'

import { Eyebrow } from '@/components/primitives/Eyebrow'
import { StackChip } from '@/components/primitives/StackChip'
import { cn } from '@/lib/utils'
import type { GalleryItem, GalleryPriority } from '@/app/(website)/[locale]/lab/types'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

export interface GalleryCardProps {
    item: GalleryItem
    className?: string
    locale?: Locale
}

/**
 * One tile in the /lab bento grid.
 *
 * The grid's bento rhythm (`priority` driving the span) is the gallery's own
 * identity and stays; the *skin* is the site's — hairline border, sharp radius,
 * weight-500 heading, `<StackChip>` tags, palette tokens. It used to draw a
 * per-category Tailwind rainbow gradient and a black overlay with white text,
 * which belonged to no theme and read the same in light and dark.
 *
 * Unlike `PostIndexCard` this one *is* clickable as a whole: the tile is mostly
 * image, so there is no body copy for a pinned `<LinkArrow>` to sit under.
 */
export function GalleryCard({ item, className, locale = defaultLocale }: GalleryCardProps) {
    const categoryLabel = getDictionary(locale).lab.categories
    const priority: GalleryPriority = item.priority ?? 'low'
    const isHigh = priority === 'high'

    return (
        <Link
            href={item.href}
            className={cn(
                'group relative block h-full w-full overflow-hidden rounded-sharp border border-border',
                'transition-colors duration-150 hover:border-primary',
                'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
                className,
            )}
        >
            {/* The tile ground: the same `--card`→`--border` ramp every card image well uses. */}
            <div aria-hidden className="absolute inset-0 bg-linear-to-br from-card to-border" />

            {item.imageUrl && (
                <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            )}

            {/* Scrim: only over an image, and only enough to hold the copy legible. */}
            {item.imageUrl && (
                <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-transparent"
                />
            )}

            <div
                className={cn(
                    'absolute inset-x-0 bottom-0 flex flex-col gap-2',
                    isHigh ? 'p-6' : 'p-5',
                )}
            >
                <div className="flex items-baseline justify-between gap-3">
                    <Eyebrow className="text-xs">{categoryLabel[item.category]}</Eyebrow>
                    {item.year && <Eyebrow className="shrink-0 text-xs">{item.year}</Eyebrow>}
                </div>

                <h3
                    className={cn(
                        'font-medium leading-tight text-foreground transition-colors duration-150 group-hover:text-primary',
                        isHigh ? 'text-2xl tracking-[-0.02em] md:text-3xl' : 'text-[17px]',
                    )}
                >
                    {item.title}
                </h3>

                {isHigh && (
                    <p className="line-clamp-3 max-w-[55ch] text-sm leading-[1.65] text-muted-foreground">
                        {item.description}
                    </p>
                )}

                {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.slice(0, isHigh ? 4 : 2).map((tag) => (
                            <StackChip key={tag}>{tag}</StackChip>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    )
}

export default GalleryCard
