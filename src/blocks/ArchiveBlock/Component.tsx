import type { Post, ArchiveBlock as ArchiveBlockProps, Project } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Section } from '@/components/Section/Section'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    tags,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo,
    title,
  } = props

  const limit = limitFromProps || 3

  let collection: Post[] | Project[] = []

  if (populateBy === 'collection' && relationTo) {
    const payload = await getPayload({ config: configPromise })

    const flattenedTags = tags?.map((tag) => {
      if (typeof tag === 'object') return tag.id
      else return tag
    })

    const fetchedPosts = await payload.find({
      collection: relationTo,
      depth: 1,
      limit,
      select: {
        title: true,
        slug: true,
        tags: true,
        meta: true,
        content: true,
        updatedAt: true,
        createdAt: true,
      },
      ...(flattenedTags && flattenedTags.length > 0
        ? {
            where: {
              tags: {
                in: flattenedTags,
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
      }) as Post[]

      collection = filteredSelectedPosts
    }
  }

  return (
    <Section
      id={id}
      container={true}
      backgroundContainer={false}
      className="py-16"
      theme="auto"
      background="none"
    >
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
      {relationTo && <CollectionArchive collection={collection} collectionName={relationTo} />}
    </Section>
  )
}
