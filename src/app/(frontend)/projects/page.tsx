import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Slideshow from '@/components/Slideshow/Slideshow'
import { Media } from '@/components/Media'
import { Header } from '@/components/Header/Component'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      meta: true,
      content: true,
      updatedAt: true,
      createdAt: true,
      heroImage: true,
    },
  })

  const projectsPage = await payload.findGlobal({
    slug: 'projects-page',
  })

  const headerOverrides = projectsPage?.headerOverrides

  return (
    <>
      <Header headerOverrides={headerOverrides} />
      <main>
        <div className="dark mb-16 mx-auto max-w-[96rem]">
          <Slideshow
            interval={7000}
            className="text-foreground h-[800px]"
            slides={projects.docs.map((project) => {
              return (
                <div key={project.id} className="relative w-full h-full overflow-hidden">
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 z-10">
                    <h2 className="z-10 text-4xl font-bold mb-4">{project.title}</h2>
                    <h3 className="z-10 text-xl max-w-2xl text-center px-4">
                      {project.meta?.description}
                    </h3>
                  </div>
                  <Media
                    resource={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )
            })}
          />
        </div>

        <div className="container mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold">Projects</h1>

          <CollectionArchive
            className="py-16"
            collection={projects.docs}
            collectionName="projects"
            variant="list"
          />

          <div className="container">
            {projects.totalPages > 1 && projects.page && (
              <Pagination page={projects.page} totalPages={projects.totalPages} />
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Projects`,
  }
}
