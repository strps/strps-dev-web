import { getProjects } from './data';
import { Pagination } from '@/components/pagination';
import { ProjectCard } from '@/components/cards/ProjectCard'
import Section from '@/components/section';
import { Media, Project } from '@strps-website/types';
import { localizedHref, type Locale } from '@/i18n/config';

export const metadata = {
  title: 'Projects | Cesar Jerez',
  description: 'A collection of projects by Cesar Jerez.',
};

export default async function ProjectsPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page?: string }>
  params: Promise<{ locale: Locale }>
}) {

  const page = Number((await searchParams).page) || 1
  const { locale } = await params
  const { projects, pagination } = await getProjects({ page, limit: 12, locale })

  return (
    <main className="min-h-screen">
      <Section
        className="py-20 md:py-32 bg-muted/30"
        container={false}
        containerClassName="mx-auto w-full max-w-wrap px-6"
      >
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Projects & <span className="text-primary">Creations</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A curated selection of my technical work, from web applications to hardware experiments.
          </p>
        </div>
      </Section>

      <div className="mx-auto w-full max-w-wrap px-6 py-16">
        <ProjectsList projects={projects} locale={locale} />
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
        />
      </div>
    </main>
  );
}

const ProjectsList = ({ projects, locale }: { projects: Array<Project>; locale: Locale }) => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        return (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.meta?.description}
            imageUrl={typeof project.meta?.image === 'object' && project.meta.image ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${project.meta.image.url}` : undefined}
            technologies={project.techStack?.filter((t): t is { name: string } => !!t.name)}
            liveUrl={project.links?.liveSite}
            repoUrl={project.links?.github}
            caseStudyUrl={localizedHref(locale, `/projects/${project.slug}`)}
          />
        )
      })}
    </div>
  )
}

