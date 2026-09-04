import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'
import type { Project } from '@strps-website/types' // your generated types
import { draftMode } from 'next/headers'
import { cache } from 'react'
import type { Locale } from '@/i18n/config'

export const GET_PROJECTS = gql`
  query GetProjects(
    $page: Int = 1
    $limit: Int = 12
    $where: Project_where
    $locale: LocaleInputType
  ) {
    Projects(
      page: $page
      limit: $limit
      where: $where
      sort: "-publishedAt"
      locale: $locale
    ) {
      docs {
        id
        title
        slug
        publishedAt
        heroImage {
          url
          alt
        }
        meta {
          title
          description
          image { 
            url 
            alt
          }
        }
        links {
          liveSite
          github
        }
        techStack {
          name
        }
        caseStudy {
          tag
          year
          problem
          contribution
          context
          decisions
          outcome
        }
      }
      totalDocs
      totalPages
      page
      hasNextPage
      hasPrevPage
    }
  }
`
type ProjectsResponse = {
  Projects: {
    docs: Project[]
    totalDocs: number
    totalPages: number
    page: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

type GetProjectsParams = {
  page?: number
  limit?: number
  locale: Locale
}

export async function getProjects({ page = 1, limit = 12, locale }: GetProjectsParams) {
  const client = getClient()

  const { data } = await client.query<ProjectsResponse>({
    query: GET_PROJECTS,
    variables: {
      page,
      limit,
      locale,
      where: {
        _status: { equals: 'published' },
      },
    },
  })

  return {
    projects: data!.Projects.docs as Project[],
    pagination: {
      totalDocs: data!.Projects.totalDocs,
      totalPages: data!.Projects.totalPages,
      currentPage: data!.Projects.page,
      hasNextPage: data!.Projects.hasNextPage,
      hasPrevPage: data!.Projects.hasPrevPage,
    },
  }
}


export const GET_PROJECT_BY_SLUG = gql`
  query GetProjectBySlug($slug: String!, $draft: Boolean, $locale: LocaleInputType) {
    Projects(
      where: { slug: { equals: $slug } }
      limit: 1
      draft: $draft
      locale: $locale
    ) {
      docs {
        id
        title
        slug
        content
        publishedAt
        heroImage { url alt width height }
        meta { 
          title 
          description 
          image { url } 
        }
        links {
          github
          liveSite
        }
        techStack {
          name
        }
        caseStudy {
          tag
          year
          problem
          contribution
          context
          decisions
          outcome
        }
        appearance { headerOverrides { background } }
      }
    }
  }
`
type GetProjectBySlugArgs = {
  slug: string
  locale: Locale
}

export const getProjectBySlug = cache(async ({ slug, locale }: GetProjectBySlugArgs) => {
  const { isEnabled: draft } = await draftMode()
  const client = getClient()

  const { data } = await client.query<ProjectsResponse>({
    query: GET_PROJECT_BY_SLUG,
    variables: {
      slug,
      draft,
      locale,
    },
    fetchPolicy: draft ? 'no-cache' : 'cache-first',
  })

  return data!.Projects.docs[0] as Project | null
})

export async function generateStaticParams() {
  const client = getClient()

  const { data } = await client.query<ProjectsResponse>({
    query: gql`
      query GetAllProjectSlugs {
        Projects(
          where: { _status: { equals: published } }
          limit: 1000
          pagination: false
        ) {
          docs {
            slug
          }
        }
      }
    `,
  })

  return data!.Projects.docs.map((doc) => ({
    slug: doc.slug!,
  }))
}
