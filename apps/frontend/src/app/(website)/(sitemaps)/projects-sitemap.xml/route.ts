import { getServerSideSitemap } from 'next-sitemap'
import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'
import { unstable_cache } from 'next/cache'
import { Project } from '@strps-website/types'
import { localizeSitemapEntries } from '@/lib/sitemap'

interface ProjectsSitemapData {
  Projects: {
    docs: Array<Pick<Project, 'slug' | 'updatedAt'>>
  }
}

const PROJECTS_SITEMAP_QUERY = gql`
  query ProjectsSitemap {
    Projects(
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

const getProjectsSitemap = unstable_cache(
  async () => {
    const client = getClient()

    const { data } = await client.query<ProjectsSitemapData>({ query: PROJECTS_SITEMAP_QUERY })
    const results = data?.Projects

    const dateFallback = new Date().toISOString()

    const entries = results?.docs
      ? results.docs
        .filter((project) => Boolean(project?.slug))
        .map((project) => ({
          path: `/projects/${project?.slug}`,
          lastmod: project.updatedAt || dateFallback,
        }))
      : []

    return localizeSitemapEntries(entries)
  },
  ['projects-sitemap'],
  {
    tags: ['projects-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getProjectsSitemap()

  return getServerSideSitemap(sitemap)
}
