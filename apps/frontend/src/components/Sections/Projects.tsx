import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { resumeData } from '@/data/data';

export default function ProjectsSection() {
    const githubUrl = resumeData.basics.profiles.find(p => p.network === "GitHub")?.url || "#";

    return (
        <section id="projects" className="space-y-8 py-10">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
                <Button variant="ghost" asChild className="hidden sm:flex">
                    <Link href={githubUrl} target="_blank">
                        View all on GitHub <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumeData.projects.map((project) => (
                    <Card key={project.name} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-xl">{project.name}</CardTitle>
                            <CardDescription className="line-clamp-3 mt-2">
                                {project.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 mt-auto">
                            {/* If you wanted to categorize projects by technology, you could add a mapping here. 
                  Since the JSON doesn't strictly have project tags, we leave this area flexible 
                  or we can infer tags from the description/title if needed. 
              */}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline" asChild>
                                <Link href={project.url} target="_blank">
                                    View Project
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="sm:hidden flex justify-center">
                <Button variant="outline" asChild>
                    <Link href={githubUrl} target="_blank">
                        View all on GitHub <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </section>
    );
}