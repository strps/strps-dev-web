import type { Project } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { ProjectArchive } from './ProjectArchive'
import { Section } from '@/components/Section/Section'
import { ProjectsArchiveBlock as ProjectsArchiveBlockProps } from '@/payload-types'

export const ProjectsArchiveBlock: React.FC<ProjectsArchiveBlockProps> = async (props) => {
  const {
    id,
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
    })

    collection = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedProjects = selectedDocs.map((project) => {
        if (typeof project.value === 'object') return project.value
      }) as Project[]

      collection = filteredSelectedProjects
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
      <ProjectArchive collection={collection} />
    </Section>
  )
}
