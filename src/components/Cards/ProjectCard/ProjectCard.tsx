import { cn } from "@/components/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Badge, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Media } from "@/components/Media"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


export interface ProjectTech {
    name: string
    color?: string // optional: for custom badge variants
}


export interface ProjectCardProps {
    title: string
    description?: string | null
    imageUrl?: string // fallback to placeholder
    technologies?: ProjectTech[]
    liveUrl?: string | null
    repoUrl?: string | null
    caseStudyUrl?: string
    // featured?: boolean
    className?: string
}

export function ProjectCard({
    title,
    description,
    imageUrl,
    technologies = [],
    liveUrl,
    repoUrl,
    caseStudyUrl,
    // featured = false,
    className,
}: ProjectCardProps) {
    const placeholderImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"

    return (
        <Card
            className={cn(
                "group max-w-96 p-0 gap-4 relative overflow-hidden rounded-xl transition-all ",
                // featured && "ring-2 ring-primary/40 ring-offset-2",
                className
            )}
        >
            {/* Image container */}
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Image
                    src={imageUrl || placeholderImage}
                    alt={`${title} project screenshot`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                // priority={featured}
                />
                <Media

                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Featured badge */}
                {/* {featured && (
                    <div className="absolute left-4 top-4">
                        <Badge variant='default' className="bg-primary text-primary-foreground font-medium">
                            Featured Project
                        </Badge>
                    </div>
                )} */}
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between gap-6 flex-grow">
                <CardHeader className="">
                    {
                        title && <CardTitle className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                            {title}
                        </CardTitle>
                    }

                    {
                        description && <CardDescription className="line-clamp-4">
                            {description}
                        </CardDescription>
                    }

                    {/* Tech stack */}
                    {
                        technologies && technologies.length > 0 &&
                        <div className="flex flex-wrap gap-2 mb-6">
                            {technologies.map((tech, index) => (
                                <Badge
                                    key={index}
                                    // variant="secondary"
                                    className={cn(
                                        "text-xs font-medium",
                                        tech.color && `bg-${tech.color}-100 text-${tech.color}-800 dark:bg-${tech.color}-950 dark:text-${tech.color}-300`
                                    )}
                                >
                                    {tech.name}
                                </Badge>
                            ))}
                        </div>
                    }
                </CardHeader>

                {/* Action buttons */}
                <CardFooter className="flex flex-wrap gap-3 pb-6 self-end justify-self-end ">
                    {liveUrl && (
                        <Button size="sm" asChild className="gap-1.5">
                            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                                Live Demo
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                        </Button>
                    )}

                    {repoUrl && (
                        <Button size="sm" variant="outline" asChild className="gap-1.5">
                            <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-3.5 w-3.5" />
                                Source
                            </Link>
                        </Button>
                    )}

                    {caseStudyUrl && (
                        <Button size="sm" variant="ghost" asChild className="text-primary hover:text-primary/90">
                            <Link href={caseStudyUrl}>
                                Case Study →
                            </Link>
                        </Button>
                    )}
                </CardFooter>
            </div>
        </Card>
    )
}