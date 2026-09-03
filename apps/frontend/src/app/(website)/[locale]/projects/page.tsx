import type { Metadata } from 'next';
import { getProjects } from './data';
import { Pagination } from '@/components/pagination';
import { ProjectCard } from '@/components/cards/ProjectCard'
import Section from '@/components/page-sections/section';
import { Media, Project } from '@strps-website/types';
import { localizedHref, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dictionary = getDictionary(locale)

  return {
    title: dictionary.seo.projectsTitle,
    description: dictionary.seo.projectsDescription,
    alternates: buildAlternates(locale, '/projects'),
  }
}

export default async function ProjectsPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page?: string }>
  params: Promise<{ locale: Locale }>
}) {

  const page = Number((await searchParams).page) || 1
  const { locale } = await params
  const dictionary = getDictionary(locale)
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
            {dictionary.projects.heroTitlePrefix} <span className="text-primary">{dictionary.projects.heroTitleHighlight}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {dictionary.projects.heroSubtitle}
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
            locale={locale}
          />
        )
      })}
    </div>
  )
}

