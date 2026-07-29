import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, isValidLocale, type Locale } from '@/i18n/config'

const LOCALE_COOKIE = 'NEXT_LOCALE'

/** Pick the best locale from the `Accept-Language` header, falling back to the default. */
function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale

  // e.g. "es-ES,es;q=0.9,en;q=0.8" → [["es-ES",1],["es",0.9],["en",0.8]]
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    const base = tag.split('-')[0]
    if (isValidLocale(base)) return base
  }

  return defaultLocale
}

function negotiateLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (isValidLocale(cookieLocale)) return cookieLocale
  return localeFromAcceptLanguage(request.headers.get('accept-language'))
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Already locale-prefixed (`/en/…`, `/es`) — let it through untouched.
  const firstSegment = pathname.split('/')[1]
  if (isValidLocale(firstSegment)) return NextResponse.next()

  // Otherwise negotiate and redirect to the prefixed equivalent.
  const locale = negotiateLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`

  const response = NextResponse.redirect(url)
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  return response
}

export const config = {
  /**
   * Run on everything except: Next internals, API + revalidate routes, the
   * `exp` sandbox (its own root layout, intentionally un-localized), and any
   * path with a file extension (favicon, `*-sitemap.xml`, static assets).
   */
  matcher: ['/((?!api|admin|exp|_next/static|_next/image|.*\\..*).*)'],
}
