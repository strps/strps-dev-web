import { getServerSideSitemap } from 'next-sitemap'
import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'
import { unstable_cache } from 'next/cache'
import { Page } from '@strps-website/types'

interface PagesSitemapData {
  Pages: {
    docs: Array<Pick<Page, 'slug' | 'updatedAt'>>
  }
}

const PAGES_SITEMAP_QUERY = gql`
  query PagesSitemap {
    Pages(
      where: { _status: { equals: published } }
      limit: 1000
      pagination: false
    ) {
      docs {
        slug
        updatedAt
      }
    }
  }
`

const getPagesSitemap = unstable_cache(
  async () => {
    const client = getClient()
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL

    const { data } = await client.query<PagesSitemapData>({ query: PAGES_SITEMAP_QUERY })
    const results = data?.Pages

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/search`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/posts`,
        lastmod: dateFallback,
      },
    ]

    const sitemap = results?.docs
      ? results.docs
        .filter((page) => Boolean(page?.slug))
        .map((page) => {
          return {
            loc: page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page?.slug}`,
            lastmod: page.updatedAt || dateFallback,
          }
        })
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
