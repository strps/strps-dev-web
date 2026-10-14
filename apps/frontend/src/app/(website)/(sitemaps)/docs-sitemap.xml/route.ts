import { getServerSideSitemap } from 'next-sitemap'
import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'
import { unstable_cache } from 'next/cache'
import { Doc } from '@strps-website/types'
import { localizeSitemapEntries } from '@/lib/sitemap'

interface DocsSitemapData {
  Docs: {
    docs: Array<Pick<Doc, 'slug' | 'updatedAt'>>
  }
}

const DOCS_SITEMAP_QUERY = gql`
  query DocsSitemap {
    Docs(
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

const getDocsSitemap = unstable_cache(
  async () => {
    const client = getClient()

    const { data } = await client.query<DocsSitemapData>({ query: DOCS_SITEMAP_QUERY })
    const results = data?.Docs

    const dateFallback = new Date().toISOString()

    // Slugs are shared across locales, so one query covers every locale — each doc
    // expands into one sitemap entry per locale, cross-linked via alternateRefs.
    const entries = results?.docs
      ? results.docs
        .filter((doc) => Boolean(doc?.slug))
        .map((doc) => ({
          path: `/docs/${doc?.slug}`,
          lastmod: doc.updatedAt || dateFallback,
        }))
      : []

    return localizeSitemapEntries(entries)
  },
  ['docs-sitemap'],
  {
    tags: ['docs-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getDocsSitemap()

  return getServerSideSitemap(sitemap)
}
