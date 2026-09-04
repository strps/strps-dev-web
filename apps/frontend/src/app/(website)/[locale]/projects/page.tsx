import type { Metadata } from 'next';
import { getProjects } from './data';
import { PageHeader } from '@/components/primitives/PageHeader';
import { Pager } from '@/components/primitives/Pager';
import { Reveal, RevealGroup } from '@/components/primitives/Reveal';
import { ProjectIndexCard } from '@/components/cards/ProjectIndexCard';
import { mediaUrl } from '@/lib/mediaUrl';
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

  // The index number continues across pages, so page 2 starts at /13.
  const firstIndex = (pagination.currentPage - 1) * 12

  return (
    <main className="mx-auto flex w-full max-w-wrap flex-col gap-12 px-6 pt-20 pb-28 md:pt-28">
      <Reveal on="mount">
        <PageHeader
          eyebrow={dictionary.projects.eyebrow}
          title={
            <>
              {dictionary.projects.heroTitlePrefix}{' '}
              <span className="text-primary">{dictionary.projects.heroTitleHighlight}</span>
            </>
          }
          lead={dictionary.projects.heroSubtitle}
          meta={dictionary.projects.countLabel(pagination.totalDocs)}
        />
      </Reveal>

      {projects.length > 0 ? (
        <RevealGroup
          itemClassName="h-full"
          className="grid grid-cols-1 gap-4 min-[721px]:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <ProjectIndexCard
              key={project.id}
              number={String(firstIndex + i + 1).padStart(2, '0')}
              title={project.title}
              description={project.meta?.description}
              tag={project.caseStudy?.tag}
              year={project.caseStudy?.year}
              imageUrl={mediaUrl(project.heroImage) ?? mediaUrl(project.meta?.image)}
              imageAlt={typeof project.heroImage === 'object' ? project.heroImage?.alt : null}
              stack={project.techStack?.map((tech) => tech.name || '').filter(Boolean) || []}
              liveUrl={project.links?.liveSite}
              repoUrl={project.links?.github}
              caseStudyHref={
                project.slug ? localizedHref(locale, `/projects/${project.slug}`) : undefined
              }
              locale={locale}
            />
          ))}
        </RevealGroup>
      ) : (
        <p className="text-sm text-muted-foreground">{dictionary.projects.none}</p>
      )}

      <Pager
        page={page}
        totalPages={pagination.totalPages}
        basePath={localizedHref(locale, '/projects')}
        locale={locale}
      />
    </main>
  );
}
