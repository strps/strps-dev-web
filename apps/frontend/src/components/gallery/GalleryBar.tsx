'use client'

import * as React from 'react'
import { useState } from 'react'
import { X } from 'lucide-react'

import { Eyebrow } from '@/components/primitives/Eyebrow'
import { cn } from '@/lib/utils'
import { GALLERY_CATEGORIES, type GalleryCategory } from '@/app/(website)/[locale]/lab/types'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

export interface GalleryBarProps {
    searchQuery: string
    onSearchQueryChange: (value: string) => void
    selectedCategories: GalleryCategory[]
    onToggleCategory: (category: GalleryCategory) => void
    availableTags: string[]
    selectedTags: string[]
    onToggleTag: (tag: string) => void
    onReset: () => void
    className?: string
    locale?: Locale
}

/** The mono chip both the category and the tag filters toggle. */
function FilterChip({
    active,
    className,
    ...props
}: React.ComponentProps<'button'> & { active: boolean }) {
    return (
        <button
            type="button"
            aria-pressed={active}
            className={cn(
                'cursor-pointer rounded-sharp border px-2 py-1 font-mono text-[11px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
                active
                    ? 'border-primary text-primary'
                    : 'border-border-strong text-faint-foreground hover:border-primary hover:text-primary',
                className,
            )}
            {...props}
        />
    )
}

/**
 * The /lab filter row. Same controls as `post-index`'s — a hairline search
 * field and mono chips — kept behind a disclosure because the gallery adds a
 * second (category) axis on top of the tags.
 *
 * The chips are real `<button aria-pressed>`s: they used to be `<Badge>`s with
 * an `onClick`, i.e. unreachable by keyboard and unannounced as toggles.
 */
export function GalleryBar({
    searchQuery,
    onSearchQueryChange,
    selectedCategories,
    onToggleCategory,
    availableTags,
    selectedTags,
    onToggleTag,
    onReset,
    className,
    locale = defaultLocale,
}: GalleryBarProps) {
    const dictionary = getDictionary(locale)
    const [filtersOpen, setFiltersOpen] = useState(false)

    const activeFilterCount =
        (searchQuery.length > 0 ? 1 : 0) + selectedCategories.length + selectedTags.length
    const hasActiveFilters = activeFilterCount > 0

    return (
        <div className={cn('flex flex-col gap-4', className)}>
            <div className="flex items-center justify-end">
                <button
                    type="button"
                    onClick={() => setFiltersOpen((v) => !v)}
                    aria-expanded={filtersOpen}
                    aria-controls="gallery-filters"
                    className="cursor-pointer border-b border-border-strong text-sm text-muted-foreground transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                    {dictionary.lab.filters}
                    {hasActiveFilters && (
                        <span className="ml-1.5 font-mono text-[11px] text-primary">
                            {activeFilterCount}
                        </span>
                    )}
                </button>
            </div>

            {filtersOpen && (
                <div id="gallery-filters" className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 min-[721px]:flex-row min-[721px]:items-end min-[721px]:justify-between">
                        <label className="flex w-full flex-col gap-1.5 min-[721px]:max-w-sm">
                            <Eyebrow>{dictionary.lab.search}</Eyebrow>
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => onSearchQueryChange(e.target.value)}
                                placeholder={dictionary.lab.searchPlaceholder}
                                className="w-full rounded-sharp border border-border bg-transparent px-3 py-2 text-[15px] transition-colors duration-150 placeholder:text-faint-foreground focus:border-primary focus:outline-none"
                            />
                        </label>

                        <div className="flex flex-wrap items-center gap-2">
                            {GALLERY_CATEGORIES.map(({ value }) => (
                                <FilterChip
                                    key={value}
                                    active={selectedCategories.includes(value)}
                                    onClick={() => onToggleCategory(value)}
                                >
                                    {dictionary.lab.categories[value]}
                                </FilterChip>
                            ))}
                        </div>
                    </div>

                    {availableTags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <Eyebrow className="mr-1">{dictionary.lab.tags}</Eyebrow>
                            {availableTags.map((tag) => (
                                <FilterChip
                                    key={tag}
                                    active={selectedTags.includes(tag)}
                                    onClick={() => onToggleTag(tag)}
                                >
                                    {tag}
                                </FilterChip>
                            ))}
                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={onReset}
                                    className="ml-auto flex cursor-pointer items-center gap-1 border-b border-border-strong text-sm text-muted-foreground transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                                >
                                    {dictionary.lab.reset}
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default GalleryBar
