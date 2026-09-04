import { Eyebrow } from './Eyebrow'
import { LinkArrow } from './LinkArrow'
import { cn } from '@/lib/utils'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

interface PagerProps {
  page: number
  totalPages: number
  /** Locale-prefixed path of the listing this pages through, e.g. `/en/blog`. */
  basePath: string
  locale: Locale
  className?: string
}

/**
 * Hairline pager for the collection indexes: previous/next on the outer edges,
 * a mono "Page 2 / 5" between them.
 *
 * Plain `<Link>`s rather than the old router-pushing client component — the
 * listing pages read `?page` on the server, so the numbers work without JS and
 * are crawlable, and nothing here needs to be a client component.
 */
export function Pager({ page, totalPages, basePath, locale, className }: PagerProps) {
  const dictionary = getDictionary(locale)

  if (totalPages <= 1) return null

  const hasPrev = page > 1
  const hasNext = page < totalPages
  const hrefFor = (target: number) => (target <= 1 ? basePath : `${basePath}?page=${target}`)
  // Both edges keep their slot whether or not they're live, so the page counter
  // stays centred instead of sliding as you move through the pages.
  const edgeClass = 'basis-0 grow'

  return (
    <nav
      aria-label={dictionary.pagination.nav}
      className={cn('flex items-baseline justify-between gap-6 border-t border-border pt-5', className)}
    >
      <div className={edgeClass}>
        {hasPrev && (
          <LinkArrow href={hrefFor(page - 1)} aria-label={dictionary.pagination.goToPreviousPage}>
            ← {dictionary.pagination.previous}
          </LinkArrow>
        )}
      </div>
      <Eyebrow>{dictionary.pagination.pageOf(page, totalPages)}</Eyebrow>
      <div className={cn(edgeClass, 'text-right')}>
        {hasNext && (
          <LinkArrow href={hrefFor(page + 1)} aria-label={dictionary.pagination.goToNextPage}>
            {dictionary.pagination.next} →
          </LinkArrow>
        )}
      </div>
    </nav>
  )
}
