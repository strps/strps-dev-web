import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Section from '../section';
import { ProjectCard } from '../cards/ProjectCard';
import type { PageProjectsBlock, Project, Media } from '@strps-website/types';

const ProjectsSection: React.FC<PageProjectsBlock> = ({ title, selectedProjects, githubUrl, section }) => {
    const projects = (selectedProjects || []).filter(
        (p): p is Project => typeof p === 'object' && p !== null
    );

    return (
        <Section id={section?.section_id || 'projects'} className="space-y-8 py-10">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                {githubUrl && (
                    <Button variant="ghost" asChild className="hidden sm:flex">
                        <Link href={githubUrl} target="_blank">
                            View all on GitHub <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => {
                    const heroImage = typeof project.heroImage === 'object' && project.heroImage
                        ? (project.heroImage as Media)
                        : null;

                    return (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.meta?.description}
                            imageUrl={heroImage?.url}
                            technologies={project.techStack?.map((t) => ({ name: t.name || '' })) || []}
                            liveUrl={project.links?.liveSite}
                            repoUrl={project.links?.github}
                            caseStudyUrl={project.slug ? `/projects/${project.slug}` : undefined}
                        />
                    );
                })}
            </div>

            {githubUrl && (
                <div className="sm:hidden flex justify-center">
                    <Button variant="outline" asChild>
                        <Link href={githubUrl} target="_blank">
                            View all on GitHub <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            )}
        </Section>
    );
};

export default ProjectsSection;