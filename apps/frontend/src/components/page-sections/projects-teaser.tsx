import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Section from '../section';
import { ProjectCard } from '../cards/ProjectCard';
import { ProjectTeaserCard } from '../cards/ProjectTeaserCard';
import { ProjectSummaryCard } from '../cards/ProjectSummaryCard';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { LinkArrow } from '@/components/primitives/LinkArrow';
import { HairlineGrid } from '@/components/primitives/HairlineGrid';
import { resolveLinkHref } from '@/lib/resolveLinkHref';
import type { PageProjectsTeaserBlock, Project, Media } from '@strps-website/types';
import { getProjects } from '@/app/(website)/[locale]/projects/data';
import { localizedHref, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

type ProjectTeaserProps = Omit<PageProjectsTeaserBlock, 'link' | 'variant'> & {
    projectsLink?: PageProjectsTeaserBlock['link'];
    projectsVariant?: PageProjectsTeaserBlock['variant'];
    locale: Locale;
};

const ProjectTeaserSection = async ({
    eyebrow,
    title,
    projectsVariant: variant,
    projectsLink: link,
    populateBy,
    limit,
    selectedProjects,
    githubUrl,
    section,
    locale,
}: ProjectTeaserProps) => {
    const dictionary = getDictionary(locale);
    let projects: Project[] = [];

    if (populateBy === 'collection') {
        const { projects: fetched } = await getProjects({ limit: limit ?? 6, locale });
        projects = fetched;
    } else {
        projects = (selectedProjects || []).filter(
            (p): p is Project => typeof p === 'object' && p !== null
        );
    }

    if (variant === 'hairline') {
        const actionHref = resolveLinkHref(link, locale);

        return (
            <Section
                {...(section ?? {})}
                id={section?.section_id || 'projects'}
                spacing="section"
                container={false}
                containerClassName="mx-auto w-full max-w-wrap gap-[22px] px-6"
            >
                <SectionHeader
                    eyebrow={eyebrow || dictionary.eyebrowFallback.projects}
                    title={title}
                    action={
                        actionHref && link?.label ? (
                            <LinkArrow href={actionHref}>{link.label}</LinkArrow>
                        ) : undefined
                    }
                />

                <HairlineGrid minItemWidth={280}>
                    {projects.map((project, i) => (
                        <ProjectSummaryCard
                            key={project.id}
                            number={String(i + 1).padStart(2, '0')}
                            tag={project.caseStudy?.tag}
                            title={project.title}
                            problem={project.caseStudy?.problem}
                            contribution={project.caseStudy?.contribution}
                            stack={project.techStack?.map((t) => t.name || '').filter(Boolean) || []}
                            caseStudyHref={project.slug ? localizedHref(locale, `/projects/${project.slug}`) : undefined}
                            locale={locale}
                        />
                    ))}
                </HairlineGrid>
            </Section>
        );
    }

    return (
        <Section {...(section ?? {})} id={section?.section_id || 'projects'} className="space-y-8 py-10">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                {githubUrl && (
                    <Button variant="ghost" asChild className="hidden sm:flex">
                        <Link href={githubUrl} target="_blank">
                            {dictionary.common.viewAllOnGithub} <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </div>

            <div
                className={
                    variant === 'cards'
                        ? 'grid grid-cols-1 auto-rows-fr gap-6'
                        : 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
                }
            >
                {projects.map((project) => {
                    const metaImage = typeof project.meta?.image === 'object' && project.heroImage
                        ? (project.heroImage as Media)
                        : null;
                    const imageUrl = metaImage?.url
                        ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${metaImage.url}`
                        : undefined;
                    const technologies = project.techStack?.map((t) => ({ name: t.name || '' })) || [];
                    const caseStudyUrl = project.slug
                        ? localizedHref(locale, `/projects/${project.slug}`)
                        : undefined;

                    return variant === 'cards' ? (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.meta?.description}
                            imageUrl={imageUrl}
                            technologies={technologies}
                            liveUrl={project.links?.liveSite}
                            repoUrl={project.links?.github}
                            caseStudyUrl={caseStudyUrl}
                            orientation="horizontal"
                            locale={locale}
                        />
                    ) : (
                        <ProjectTeaserCard
                            key={project.id}
                            title={project.title}
                            description={project.meta?.description}
                            imageUrl={imageUrl}
                            technologies={technologies}
                            liveUrl={project.links?.liveSite}
                            repoUrl={project.links?.github}
                            caseStudyUrl={caseStudyUrl}
                            locale={locale}
                        />
                    );
                })}
            </div>

            {githubUrl && (
                <div className="sm:hidden flex justify-center">
                    <Button variant="outline" asChild>
                        <Link href={githubUrl} target="_blank">
                            {dictionary.common.viewAllOnGithub} <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            )}
        </Section>
    );
};

export default ProjectTeaserSection;
