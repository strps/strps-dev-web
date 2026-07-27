'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { locales, localeLabels, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'

const LOCALE_COOKIE = 'NEXT_LOCALE'

export function LanguageSwitcher({ locale, className }: { locale: Locale; className?: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const hrefFor = (target: Locale) => {
    const segments = pathname.split('/')
    segments[1] = target
    const query = searchParams.toString()
    return `${segments.join('/') || '/'}${query ? `?${query}` : ''}`
  }

  const persistCookie = (target: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
  }

  return (
    <div className={cn('flex items-center gap-1', className)} role="group" aria-label="Language">
      {locales.map((code) => {
        const isActive = code === locale
        return (
          <Link
            key={code}
            href={hrefFor(code)}
            hrefLang={code}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => persistCookie(code)}
            title={localeLabels[code]}
            className={cn(
              'rounded-full px-2 py-1 text-xs font-medium uppercase tracking-wide transition-colors',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {code}
          </Link>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
