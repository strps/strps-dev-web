'use client'

import { useMemo, useState } from 'react'
import { X } from 'lucide-react'

import { Eyebrow } from '@/components/primitives/Eyebrow'
import { PostIndexCard } from '@/components/cards/PostIndexCard'
import { cn } from '@/lib/utils'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

export interface PostIndexItem {
  id: string
  title: string
  description?: string | null
  imageUrl?: string
  imageAlt?: string | null
  publishedAt?: string | null
  tags: string[]
  slug?: string | null
}

interface PostIndexProps {
  posts: PostIndexItem[]
  locale: Locale
}

/**
 * The `/blog` listing: search + tag filters over the cards.
 *
 * Filtering is client-side over *the current page's* posts only, and there is
 * deliberately no second, client-side pagination the way the old `BlogList` had
 * — the route already paginates on the server (`?page`), and two independent
 * pagers over the same list disagreed about how many articles there were.
 */
export function PostIndex({ posts, locale }: PostIndexProps) {
  const dictionary = getDictionary(locale)
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts],
  )

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesQuery =
        !needle ||
        post.title.toLowerCase().includes(needle) ||
        (post.description ?? '').toLowerCase().includes(needle)
      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag))
      return matchesQuery && matchesTags
    })
  }, [posts, query, selectedTags])

  const isFiltered = selectedTags.length > 0 || query.trim() !== ''

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))

  const reset = () => {
    setQuery('')
    setSelectedTags([])
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <Eyebrow>{dictionary.blog.search}</Eyebrow>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dictionary.blog.searchPlaceholder}
            className="w-full max-w-sm rounded-sharp border border-border bg-transparent px-3 py-2 text-[15px] transition-colors duration-150 placeholder:text-faint-foreground focus:border-primary focus:outline-none"
          />
        </label>

        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Eyebrow className="mr-1">{dictionary.blog.tags}</Eyebrow>
            {allTags.map((tag) => {
              const active = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'cursor-pointer rounded-sharp border px-2 py-1 font-mono text-[11px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                    active
                      ? 'border-primary text-primary'
                      : 'border-border-strong text-faint-foreground hover:border-primary hover:text-primary',
                  )}
                >
                  {tag}
                </button>
              )
            })}
            {isFiltered && (
              <button
                type="button"
                onClick={reset}
                className="flex cursor-pointer items-center gap-1 border-b border-border-strong text-sm text-muted-foreground transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {dictionary.blog.resetFilters}
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 min-[721px]:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <PostIndexCard
                key={post.id}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                imageAlt={post.imageAlt}
                publishedAt={post.publishedAt}
                tags={post.tags}
                slug={post.slug}
                locale={locale}
              />
            ))}
          </div>
          {isFiltered && (
            <Eyebrow>{dictionary.blog.showingCount(filtered.length, posts.length)}</Eyebrow>
          )}
        </>
      ) : (
        <div className="border border-border px-6 py-16 text-center">
          <h2 className="text-[17px] font-medium">{dictionary.blog.noArticlesFound}</h2>
          {isFiltered && (
            <>
              <p className="mt-1.5 text-sm text-muted-foreground">{dictionary.blog.tryAdjusting}</p>
              <button
                type="button"
                onClick={reset}
                className="mt-4 cursor-pointer border-b border-border-strong text-sm text-muted-foreground transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {dictionary.blog.clearAllFilters}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
