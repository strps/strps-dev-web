import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
}

export function ArticleCard({
    title,
    description,
    imageUrl,
    imageAlt,
    publishedAt,
    tags = [],
    slug,
    authors = [],
    className,
}: ArticleCardProps) {
    const articleUrl = slug ? `/blog/${slug}` : undefined
    const formattedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        : null

    return (
        <Card
            className={cn(
                'group max-w-96 p-0 gap-4 relative overflow-hidden rounded-xl transition-all',
                className,
            )}
        >
            {/* Image container */}
            <div className="relative aspect-video overflow-hidden bg-muted">
                {imageUrl ? (
                    <Image
                        src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/${imageUrl}`}
                        alt={imageAlt || `${title} article image`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <span className="text-sm">No image</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between gap-6 grow">
                <CardHeader>
                    {/* Date and authors */}
                    {(formattedDate || authors.length > 0) && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            {formattedDate && (
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {formattedDate}
                                </span>
                            )}
                            {formattedDate && authors.length > 0 && <span>·</span>}
                            {authors.length > 0 && (
                                <span>{authors.map((a) => a.name).filter(Boolean).join(', ')}</span>
                            )}
                        </div>
                    )}

                    {title && (
                        <CardTitle className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                            {articleUrl ? (
                                <Link href={articleUrl} className="hover:underline">
                                    {title}
                                </Link>
                            ) : (
                                title
                            )}
                        </CardTitle>
                    )}

                    {description && (
                        <CardDescription className="line-clamp-3">{description}</CardDescription>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs font-medium">
                                    {tag.tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardHeader>

                {/* Action */}
                <CardFooter className="flex flex-wrap gap-3 pb-6 self-end justify-self-end">
                    {articleUrl && (
                        <Button size="sm" asChild className="gap-1.5">
                            <Link href={articleUrl}>
                                Read Article
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                        </Button>
                    )}
                </CardFooter>
            </div>
        </Card>
    )
}
