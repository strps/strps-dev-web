import { getClient } from '@/lib/apollo-client'
import { gql } from '@apollo/client'
import { unstable_cache } from 'next/cache'
import type { Locale } from '@/i18n/config'


export const GET_HEADER = gql`
  query GetHeader($locale: LocaleInputType) {
    Header(locale: $locale) {
      navItems {
        link {
          type
          newTab
          url
          label
          appearance
          reference {
            relationTo
            value {
              ... on Page {
                slug
              }
              ... on Post {
                slug
              }
            }
          }
        }
      }
      theme
      background
      overlay
    }
  }
`

interface HeaderLink {
  link: {
    type?: 'reference' | 'custom' | null
    newTab?: boolean | null
    url?: string | null
    label: string
    appearance?: 'default' | 'outlineGhost' | null
    reference?: {
      relationTo: string
      value: { slug: string }
    } | null
  }
}

interface HeaderData {
  Header: {
    navItems?: HeaderLink[] | null
    theme?: 'auto' | 'light' | 'dark' | 'inverted' | null
    background?: boolean | null
    overlay?: boolean | null
  }
}

function resolveHref(link: HeaderLink['link'], locale: Locale): string {
  if (link.type === 'reference' && link.reference?.value?.slug) {
    const prefix = link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
    return `/${locale}${prefix}/${link.reference.value.slug}`
  }
  const url = link.url || '#'
  return url.startsWith('/') ? `/${locale}${url}` : url
}

async function getHeaderData(locale: Locale) {
  const client = getClient()

  const { data } = await client.query<HeaderData>({
    query: GET_HEADER,
    variables: { locale },
  })

  const header = data?.Header
  const navItems = (header?.navItems ?? []).map((item) => ({
    name: item.link.label,
    href: resolveHref(item.link, locale),
    appearance: item.link.appearance ?? 'default',
  }))

  return {
    navItems,
    theme: header?.theme ?? 'auto',
    background: header?.background ?? true,
    overlay: header?.overlay ?? false,
  }
}

export const getCachedHeaderData = (locale: Locale) =>
  unstable_cache(
    async () => getHeaderData(locale),
    ['global_header', locale],
    { tags: [`global_header_${locale}`, 'global_header'] },
  )

export const GET_FOOTER = gql`
  query GetFooter($locale: LocaleInputType) {
    Footer(locale: $locale) {
      navItems {
        link {
          type
          newTab
          url
          label
          reference {
            relationTo
            value {
              ... on Page {
                slug
              }
              ... on Post {
                slug
              }
            }
          }
        }
      }
    }
  }
`

export const GET_COPYRIGHT = gql`
  query GetCopyright($locale: LocaleInputType) {
    Copyright(locale: $locale) {
      name
      startDate
      link
      location
    }
  }
`

interface FooterData {
  Footer: {
    navItems?: HeaderLink[] | null
  }
}

interface CopyrightData {
  Copyright: {
    name: string
    startDate: string
    link?: string | null
    location?: string | null
  }
}

export async function getFooterData(locale: Locale) {
  const client = getClient()

  const [footerResult, copyrightResult] = await Promise.all([
    client.query<FooterData>({ query: GET_FOOTER, variables: { locale } }),
    client.query<CopyrightData>({ query: GET_COPYRIGHT, variables: { locale } }),
  ])

  const footer = footerResult.data?.Footer
  const copyright = copyrightResult.data?.Copyright

  const navItems = (footer?.navItems ?? []).map((item) => ({
    label: item.link.label,
    href: resolveHref(item.link, locale),
    newTab: item.link.newTab ?? false,
  }))

  const currentYear = new Date().getFullYear()
  const startYear = copyright?.startDate
    ? new Date(copyright.startDate).getFullYear()
    : currentYear

  return {
    navItems,
    copyright: {
      name: copyright?.name ?? '',
      years: startYear < currentYear ? `${startYear}–${currentYear}` : `${currentYear}`,
      link: copyright?.link ?? null,
      location: copyright?.location ?? null,
    },
  }
}
