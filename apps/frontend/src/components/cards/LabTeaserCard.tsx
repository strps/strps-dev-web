import { Eyebrow } from '@/components/primitives/Eyebrow'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface LabTeaserCardProps {
    href: string
    tag: string
    title: string
    note?: string | null
    imageUrl?: string | null
    linkLabel: string
    className?: string
}

/**
 * The home lab-teaser card (§3.5): a slimmer sibling to `GalleryCard` rather than
 * a restyle of it. The two now share a skin — /lab was converted off its
 * gradient-overlay look — but not a shape: `GalleryCard` is a mostly-image bento
 * tile sized by `priority`, this one a fixed teaser in a three-up row.
 *
 * The card itself is not clickable: the affordance is the `LinkArrow` pinned to
 * the bottom, so every card in a row ends on the same line whatever its copy
 * runs to. Title and note are clamped rather than allowed to set the row height.
 */
export function LabTeaserCard({
    href,
    tag,
    title,
    note,
    imageUrl,
    linkLabel,
    className,
}: LabTeaserCardProps) {
    return (
        <article
            className={cn(
                'flex h-full flex-col border border-border p-5 transition-colors duration-150 hover:border-border-strong',
                className,
            )}
        >
            <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-sharp bg-linear-to-br from-card to-border">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 720px) 100vw, 33vw"
                    />
                )}
            </div>
            <Eyebrow>{tag}</Eyebrow>
            <h4 className="mt-2 line-clamp-2 text-[15px] font-medium">{title}</h4>
            {note && <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">{note}</p>}
            <LinkArrow href={href} aria-label={`${linkLabel} — ${title}`} className="mt-auto self-start pt-4">
                {linkLabel}
            </LinkArrow>
        </article>
    )
}
