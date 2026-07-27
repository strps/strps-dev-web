'use client'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useParams } from 'next/navigation'
import React from 'react'
import { defaultLocale, isValidLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number
  basePath?: string
}> = (props) => {
  const router = useRouter()
  const pathname = usePathname()
  const routeParams = useParams<{ locale?: string }>()
  const locale = isValidLocale(routeParams.locale) ? routeParams.locale : defaultLocale
  const dictionary = getDictionary(locale)

  const { className, page, totalPages, basePath } = props
  const resolvedBasePath = basePath ?? pathname
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const navigateToPage = (targetPage: number) => {
    router.push(`${resolvedBasePath}?page=${targetPage}`)
  }

  if (totalPages <= 1) return null

  return (
    <div className={cn('my-12', className)}>
      <PaginationComponent aria-label={dictionary.pagination.nav}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPrevPage}
              onClick={() => navigateToPage(page - 1)}
              label={dictionary.pagination.previous}
              aria-label={dictionary.pagination.goToPreviousPage}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis label={dictionary.pagination.morePages} />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => navigateToPage(page - 1)}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive
              onClick={() => navigateToPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => navigateToPage(page + 1)}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis label={dictionary.pagination.morePages} />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!hasNextPage}
              onClick={() => navigateToPage(page + 1)}
              label={dictionary.pagination.next}
              aria-label={dictionary.pagination.goToNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
