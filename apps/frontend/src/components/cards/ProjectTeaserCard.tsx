'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Github, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Badge } from '../ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

export interface ProjectTeaserCardProps {
    title: string
    description?: string | null
    imageUrl?: string | null
    technologies?: { name: string }[]
    liveUrl?: string | null
    repoUrl?: string | null
    caseStudyUrl?: string
    className?: string
    locale?: Locale
    /** Whether the info panel is open. Owned by the parent so only one card opens at a time. */
    expanded: boolean
    /** Asked to open (`true`) or close (`false`) — the parent decides what happens. */
    onExpandedChange: (expanded: boolean) => void
}

/**
 * Image-first project teaser: by default it's just the artwork. Hovering grows it a
 * touch and surfaces the title; clicking flips a panel over the image with the
 * description, stack and links. All transitions run through `motion`.
 *
 * Fully controlled: the open panel lives in the parent grid, which keeps a single
 * card expanded at a time.
 */
export function ProjectTeaserCard({
    title,
    description,
    imageUrl,
    technologies = [],
    liveUrl,
    repoUrl,
    caseStudyUrl,
    className,
    locale = defaultLocale,
    expanded,
    onExpandedChange,
}: ProjectTeaserCardProps) {
    const dictionary = getDictionary(locale)
    const [hovered, setHovered] = useState(false)

    const toggle = () => onExpandedChange(!expanded)

    return (
        <motion.article
            className={cn(
                'group relative aspect-4/3 overflow-hidden border border-border bg-muted',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                className,
            )}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={{
                scale: hovered && !expanded ? 1.03 : 1,
                zIndex: hovered || expanded ? 10 : 0,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
            {/* Image — the whole tile toggles the info panel */}
            <button
                type="button"
                onClick={toggle}
                aria-expanded={expanded}
                aria-label={title}
                className="absolute inset-0 h-full w-full cursor-pointer focus:outline-none"
            >
                <motion.div
                    className="relative h-full w-full"
                    animate={{ scale: expanded ? 1.08 : 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                >
                    <Image
                        src={imageUrl || '/placeholder_images/placeholder.png'}
                        alt={`${title} project screenshot`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </motion.div>
            </button>

            {/* Title on hover (hidden once expanded) */}
            <AnimatePresence>
                {hovered && !expanded && (
                    <motion.div
                        key="title"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4"
                    >
                        <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Info + links on click */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        key="panel"
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', stiffness: 240, damping: 28 }}
                        className="absolute inset-0 flex flex-col gap-3 overflow-y-auto bg-background/95 p-5 backdrop-blur-sm"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <h3 className="text-xl font-bold tracking-tight">{title}</h3>
                            <button
                                type="button"
                                onClick={toggle}
                                aria-label="Close"
                                className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {description && (
                            <p className="line-clamp-4 text-sm text-muted-foreground">{description}</p>
                        )}

                        {technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {technologies.map((tech, i) => (
                                    <Badge key={i} className="text-xs font-medium">
                                        {tech.name}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <div className="mt-auto flex flex-wrap gap-2 pt-2">
                            {liveUrl && (
                                <Button size="sm" asChild className="gap-1.5">
                                    <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                                        {dictionary.common.liveDemo}
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </Link>
                                </Button>
                            )}
                            {repoUrl && (
                                <Button size="sm" variant="outline" asChild className="gap-1.5">
                                    <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                                        <Github className="h-3.5 w-3.5" />
                                        {dictionary.common.source}
                                    </Link>
                                </Button>
                            )}
                            {caseStudyUrl && (
                                <Button size="sm" variant="ghost" asChild className="text-primary hover:text-primary/90">
                                    <Link href={caseStudyUrl}>{dictionary.common.readMore} →</Link>
                                </Button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    )
}
