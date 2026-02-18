import { getProjects } from './data';
import { Pagination } from '@/components/pagination';
import { ProjectCard } from '@/components/cards/ProjectCard'
import Section from '@/components/section';
import { Media, Project } from '@strps-website/types';

export const metadata = {
  title: 'Projects | Cesar Jerez',
  description: 'A collection of projects by Cesar Jerez.',
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {

  const page = Number((await searchParams).page) || 1
  const { projects, pagination } = await getProjects({ page, limit: 12 })

  return (
    <main className="min-h-screen">
      <Section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Projects & <span className="text-primary">Creations</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A curated selection of my technical work, from web applications to hardware experiments.
          </p>
        </div>
      </Section>

      <div className="container mx-auto px-4 py-16">
        <ProjectsList projects={projects} />
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
        />
      </div>
    </main>
  );
}

const ProjectsList = ({ projects }: { projects: Array<Project> }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.meta?.description}
            imageUrl={project.meta?.image?.url}
            technologies={project.techStack}
            liveUrl={project.links?.liveSite}
            repoUrl={project.links?.github}
            caseStudyUrl={`/projects/${project.slug}`}
          />
        ))}
      </div>
    </div>
  )
}

