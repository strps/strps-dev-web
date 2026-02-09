import React from 'react'
import type { Media, Project } from '@/payload-types'
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
          imageUrl={(project.heroImage as Media)?.url}
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
