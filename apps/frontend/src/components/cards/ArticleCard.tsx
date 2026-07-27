import Link from 'next/link'
import Image from 'next/image'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { cn } from '@/lib/utils'
import { localizedHref, type Locale } from '@/i18n/config'

export interface ArticleCardProps {
    title: string
    description?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    publishedAt?: string | null
    tags?: { tag: string }[]
    slug?: string | null
    authors?: { name?: string | null }[]
    className?: string
    locale: Locale
}

export function ArticleCard({
    title,
    description,
    imageUrl,
    imageAlt,
    publishedAt,
    tags = [],
    slug,
    className,
    locale,
}: ArticleCardProps) {
    const articleUrl = slug ? localizedHref(locale, `/blog/${slug}`) : undefined
    const formattedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        : null
    const meta = [tags[0]?.tag, formattedDate].filter(Boolean).join(' · ')
    const cardClassName = cn(
        'block h-full border border-border p-5 transition-colors duration-150 hover:border-border-strong focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
        className,
    )

    const content = (
        <>
            <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-sharp bg-linear-to-br from-card to-border">
                {imageUrl && (
                    <Image
                        src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/${imageUrl}`}
                        alt={imageAlt || `${title} article image`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 720px) 100vw, 33vw"
                    />
                )}
            </div>
            {meta && <Eyebrow>{meta}</Eyebrow>}
            <h4 className="mt-2 text-[15px] font-medium">{title}</h4>
            {description && (
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{description}</p>
            )}
        </>
    )

    if (articleUrl) {
        return (
            <Link href={articleUrl} className={cardClassName}>
                {content}
            </Link>
        )
    }

    return <div className={cardClassName}>{content}</div>
}
