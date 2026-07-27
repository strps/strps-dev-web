import { getServerSideSitemap } from 'next-sitemap'
import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'
import { unstable_cache } from 'next/cache'
import { Page } from '@strps-website/types'
import { localizeSitemapEntries } from '@/lib/sitemap'

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

    const { data } = await client.query<PagesSitemapData>({ query: PAGES_SITEMAP_QUERY })
    const results = data?.Pages

    const dateFallback = new Date().toISOString()

    // Slugs are shared across locales (§Phase 1), so one query covers every locale — each doc
    // just expands into one sitemap entry per locale, cross-linked via alternateRefs.
    const entries = results?.docs
      ? results.docs
        .filter((page) => Boolean(page?.slug))
        .map((page) => ({
          path: page?.slug === 'home' ? '/' : `/${page?.slug}`,
          lastmod: page.updatedAt || dateFallback,
        }))
      : []

    return localizeSitemapEntries(entries)
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
