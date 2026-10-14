import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'
import type { Doc } from '@strps-website/types'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import type { Locale } from '@/i18n/config'

type DocsResponse = {
  Docs: {
    docs: Doc[]
  }
}

export const GET_DOCS = gql`
  query GetDocs($locale: LocaleInputType) {
    Docs(
      where: { _status: { equals: published } }
      limit: 100
      sort: "title"
      locale: $locale
    ) {
      docs {
        id
        title
        slug
        docType
        effectiveDate
        version
        meta {
          description
        }
      }
    }
  }
`

export async function getDocs({ locale }: { locale: Locale }) {
  const client = getClient()

  const { data } = await client.query<DocsResponse>({
    query: GET_DOCS,
    variables: { locale },
  })

  return (data?.Docs?.docs ?? []) as Doc[]
}

export const GET_DOC_BY_SLUG = gql`
  query GetDocBySlug($slug: String!, $draft: Boolean, $locale: LocaleInputType) {
    Docs(where: { slug: { equals: $slug } }, limit: 1, draft: $draft, locale: $locale) {
      docs {
        id
        title
        slug
        docType
        content
        effectiveDate
        version
        updatedAt
        meta {
          title
          description
          image {
            url
          }
        }
      }
    }
  }
`

type GetDocBySlugArgs = {
  slug: string
  locale: Locale
}

export const getDocBySlug = cache(async ({ slug, locale }: GetDocBySlugArgs) => {
  let draft = false
  try {
    const { isEnabled } = await draftMode()
    draft = isEnabled
  } catch {
    // draftMode() is unavailable during static generation
  }
  const client = getClient()

  const { data } = await client.query<DocsResponse>({
    query: GET_DOC_BY_SLUG,
    variables: {
      slug,
      draft,
      locale,
    },
    fetchPolicy: draft ? 'no-cache' : 'cache-first',
  })

  return (data?.Docs?.docs?.[0] ?? null) as Doc | null
})

export async function generateStaticParams() {
  const client = getClient()

  const { data } = await client.query<DocsResponse>({
    query: gql`
      query GetAllDocSlugs {
        Docs(where: { _status: { equals: published } }, limit: 1000, pagination: false) {
          docs {
            slug
          }
        }
      }
    `,
  })

  return (data?.Docs?.docs ?? [])
    .filter((doc) => Boolean(doc?.slug))
    .map((doc) => ({ slug: doc.slug! }))
}
