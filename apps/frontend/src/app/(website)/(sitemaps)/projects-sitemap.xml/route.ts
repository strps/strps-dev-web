import { getServerSideSitemap } from 'next-sitemap'
import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'
import { unstable_cache } from 'next/cache'
import { Project } from '@strps-website/types'

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
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL

    const { data } = await client.query<ProjectsSitemapData>({ query: PROJECTS_SITEMAP_QUERY })
    const results = data?.Projects

    const dateFallback = new Date().toISOString()

    const sitemap = results?.docs
      ? results.docs
        .filter((project) => Boolean(project?.slug))
        .map((project) => ({
          loc: `${SITE_URL}/projects/${project?.slug}`,
          lastmod: project.updatedAt || dateFallback,
        }))
      : []

    return sitemap
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
