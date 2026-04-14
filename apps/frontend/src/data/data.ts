import { getClient } from '@/lib/apollo-client'
import { gql } from '@apollo/client'
import { unstable_cache } from 'next/cache'


export const GET_HEADER = gql`
  query GetHeader {
    Header {
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

function resolveHref(link: HeaderLink['link']): string {
  if (link.type === 'reference' && link.reference?.value?.slug) {
    const prefix = link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
    return `${prefix}/${link.reference.value.slug}`
  }
  return link.url || '#'
}

async function getHeaderData() {
  const client = getClient()

  const { data } = await client.query<HeaderData>({
    query: GET_HEADER,
  })

  const header = data?.Header
  const navItems = (header?.navItems ?? []).map((item) => ({
    name: item.link.label,
    href: resolveHref(item.link),
  }))

  return {
    navItems,
    theme: header?.theme ?? 'auto',
    background: header?.background ?? true,
    overlay: header?.overlay ?? false,
  }
}

export const getCachedHeaderData = () =>
  unstable_cache(
    async () => getHeaderData(),
    ['global_header'],
    { tags: ['global_header'] },
  )

export const GET_FOOTER = gql`
  query GetFooter {
    Footer {
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
  query GetCopyright {
    Copyright {
      name
      startDate
      link
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
  }
}

export async function getFooterData() {
  const client = getClient()

  const [footerResult, copyrightResult] = await Promise.all([
    client.query<FooterData>({ query: GET_FOOTER }),
    client.query<CopyrightData>({ query: GET_COPYRIGHT }),
  ])

  const footer = footerResult.data?.Footer
  const copyright = copyrightResult.data?.Copyright

  const navItems = (footer?.navItems ?? []).map((item) => ({
    label: item.link.label,
    href: resolveHref(item.link),
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
    },
  }
}
