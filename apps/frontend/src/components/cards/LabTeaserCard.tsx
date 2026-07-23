import Link from 'next/link'
import Image from 'next/image'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { cn } from '@/lib/utils'

export interface LabTeaserCardProps {
    href: string
    tag: string
    title: string
    note?: string | null
    imageUrl?: string | null
    className?: string
}

/**
 * The home lab-teaser card (§3.5): a slimmer sibling to `GalleryCard` rather than
 * a restyle of it — `GalleryCard` also serves the /lab page's own (out-of-scope,
 * §10) gradient-overlay design, so reusing it here would have carried that look
 * into the makeover, or forced a premature /lab redesign onto this phase.
 */
export function LabTeaserCard({ href, tag, title, note, imageUrl, className }: LabTeaserCardProps) {
    return (
        <Link
            href={href}
            className={cn(
                'block border border-border p-5 transition-colors duration-150 hover:border-border-strong focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
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
            <h4 className="mt-2 text-[15px] font-medium">{title}</h4>
            {note && <p className="mt-1.5 text-sm text-muted-foreground">{note}</p>}
        </Link>
    )
}
