import { cn } from '@/utilities/ui'
import React from 'react'
import type { Project } from '@/payload-types'
import { ImageCard } from '@/components/Cards/ImageCard/ImageCard'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { ProjectCard } from '@/components/Cards/ProjectCard/ProjectCard'

export type Props = {
  collection: Project[]
}

export const ProjectArchive: React.FC<Props> = ({ collection }) => {


  return (
    <div className="grid justify-items-center gap-16 sm:gap-8 grid-cols-[repeat(auto-fit,minmax(calc(250px-1rem)))] sm:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
      {collection?.map((project, index) => (
        <ProjectCard
          key={index}
          imageUrl={project.heroImage?.url}
          title={project.title}
          description={project.meta?.description}
          caseStudyUrl={`/projects/${project.slug}`}
          liveUrl={project.links?.liveSite}
          repoUrl={project.links?.github}
        />
      ))}
    </div>
  )
}
