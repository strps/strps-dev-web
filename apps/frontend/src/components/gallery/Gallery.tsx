'use client'

import { useMemo, useState } from 'react'

import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Reveal } from '@/components/primitives/Reveal'
import { cn } from '@/lib/utils'
import { GalleryBar } from './GalleryBar'
import { GalleryCard } from './GalleryCard'
import type {
    GalleryCategory,
    GalleryItem,
    GalleryPriority,
} from '@/app/(website)/[locale]/lab/types'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

export interface GalleryProps {
    items: GalleryItem[]
    locale?: Locale
}

const PRIORITY_SPAN: Record<GalleryPriority, string> = {
    // Big hero tile: two columns wide, tall.
    high: 'col-span-2 sm:col-span-2 lg:col-span-2 row-span-4',
    // Medium tile: wider on desktop, comfortable height.
    medium: 'col-span-2 sm:col-span-1 lg:col-span-2 row-span-3',
    // Small tile: single cell.
    low: 'col-span-2 sm:col-span-1 lg:col-span-1 row-span-2',
}

/** Enough of a gap to read as a cascade, short enough that a filter feels instant. */
const STAGGER = 0.06

/**
 * The /lab bento grid and its filters.
 *
 * Entrances are per-card `<Reveal delay>` rather than a `<RevealGroup>`: the
 * group wraps each child in an item element of its own, which would swallow the
 * per-card `PRIORITY_SPAN` and flatten the bento into a uniform grid. Here the
 * span rides on the `Reveal` itself.
 */
export function Gallery({ items, locale = defaultLocale }: GalleryProps) {
    const dictionary = getDictionary(locale)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<GalleryCategory[]>([])
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const availableTags = useMemo(() => {
        const tags = new Set<string>()
        items.forEach((item) => item.tags?.forEach((t) => tags.add(t)))
        return Array.from(tags).sort()
    }, [items])

    const filteredItems = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        return items.filter((item) => {
            const matchesSearch =
                q.length === 0 ||
                item.title.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                item.tags?.some((t) => t.toLowerCase().includes(q))

            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(item.category)

            const matchesTags =
                selectedTags.length === 0 || selectedTags.every((t) => item.tags?.includes(t))

            return matchesSearch && matchesCategory && matchesTags
        })
    }, [items, searchQuery, selectedCategories, selectedTags])

    const toggleCategory = (category: GalleryCategory) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
        )
    }

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
        )
    }

    const reset = () => {
        setSearchQuery('')
        setSelectedCategories([])
        setSelectedTags([])
    }

    return (
        <div className="flex flex-col gap-10">
            <GalleryBar
                locale={locale}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                selectedCategories={selectedCategories}
                onToggleCategory={toggleCategory}
                availableTags={availableTags}
                selectedTags={selectedTags}
                onToggleTag={toggleTag}
                onReset={reset}
            />

            {filteredItems.length > 0 ? (
                <div
                    className={cn(
                        'grid grid-flow-dense gap-4',
                        'grid-cols-[repeat(auto-fit,minmax(220px,1fr))]',
                        'auto-rows-[110px] md:auto-rows-[120px]',
                    )}
                >
                    {filteredItems.map((item, i) => (
                        <Reveal
                            key={item.id}
                            delay={i * STAGGER}
                            amount={0.15}
                            className={PRIORITY_SPAN[item.priority ?? 'low']}
                        >
                            <GalleryCard item={item} locale={locale} className="h-full" />
                        </Reveal>
                    ))}
                </div>
            ) : (
                <div className="border border-border px-6 py-16 text-center">
                    <h2 className="text-[17px] font-medium">{dictionary.lab.noMatches}</h2>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                        {dictionary.lab.tryWidening}
                    </p>
                    <button
                        type="button"
                        onClick={reset}
                        className="mt-4 cursor-pointer border-b border-border-strong text-sm text-muted-foreground transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                    >
                        {dictionary.blog.clearAllFilters}
                    </button>
                </div>
            )}

            <div className="flex justify-center">
                <Eyebrow>{dictionary.lab.showingCount(filteredItems.length, items.length)}</Eyebrow>
            </div>
        </div>
    )
}

export default Gallery
