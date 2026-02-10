import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteData } from '@/data/data';
import Section from '../section';
import { ProjectCard } from '../cards/ProjectCard';

export default function ProjectsSection() {
    const githubUrl = siteData.basics.profiles.find(p => p.network === "GitHub")?.url || "#";

    return (
        <Section id="projects" className="space-y-8 py-10">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
                <Button variant="ghost" asChild className="hidden sm:flex">
                    <Link href={githubUrl} target="_blank">
                        View all on GitHub <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteData.projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>

            <div className="sm:hidden flex justify-center">
                <Button variant="outline" asChild>
                    <Link href={githubUrl} target="_blank">
                        View all on GitHub <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </Section>
    );
}