import type { Project } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { ProjectArchive } from './ProjectArchive'
import { Section } from '@/components/Section/Section'

export const ProjectsArchiveBlock: React.FC<{
  id?: string
  categories?: any[]
  introContent?: any
  limit?: number
  populateBy?: 'collection' | 'selection'
  selectedDocs?: { value: Project }[]
  relationTo?: 'projects'
  title?: string
}> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo,
    title,
  } = props

  const limit = limitFromProps || 3

  let collection: Project[] = []

  if (populateBy === 'collection' && relationTo) {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: relationTo,
      depth: 1,
      limit,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
        content: true,
        updatedAt: true,
        createdAt: true,
      },
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    collection = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Project[]

      collection = filteredSelectedPosts
    }
  }

  return (
    <Section id={id} container={true} backgroundContainer={false} className="py-16">
      {title && <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h2>}
      {introContent && (
        <div className="mb-16">
          <RichText
            className="ms-0 max-w-[48rem] mx-auto"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}
      <ProjectArchive collection={collection} />
    </Section>
  )
}
