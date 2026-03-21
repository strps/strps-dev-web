import { cn } from "@//lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "../ui/badge"


export interface ProjectTech {
    name: string
    color?: string // optional: for custom badge variants
}


export interface ProjectCardProps {
    title: string
    description?: string | null
    imageUrl?: string | null// fallback to placeholder
    technologies?: ProjectTech[]
    liveUrl?: string | null
    repoUrl?: string | null
    caseStudyUrl?: string
    // featured?: boolean
    orientation?: 'vertical' | 'horizontal'
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
    orientation = 'vertical',
    className,
}: ProjectCardProps) {
    const placeholderImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
    const isHorizontal = orientation === 'horizontal'

    return (
        <Card
            className={cn(
                "group p-0 gap-4 relative overflow-hidden rounded-xl transition-all",
                isHorizontal
                    ? "flex flex-col sm:flex-row sm:max-w-none"
                    : "max-w-96",
                // featured && "ring-2 ring-primary/40 ring-offset-2",
                className
            )}
        >
            {/* Image container */}
            <div className={cn(
                "relative overflow-hidden bg-muted shrink-0",
                isHorizontal
                    ? "aspect-[16/9] sm:aspect-auto sm:w-2/5 sm:min-h-full"
                    : "aspect-[16/9]"
            )}>
                <Image
                    src={imageUrl || placeholderImage}
                    alt={`${title} project screenshot`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={isHorizontal
                        ? "(max-width: 640px) 100vw, 40vw"
                        : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    }
                // priority={featured}
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
            <div className={cn(
                "flex flex-col justify-between gap-6 flex-grow",
                isHorizontal && "sm:pt-6"
            )}>
                <CardHeader className="">
                    {
                        title && <CardTitle className="text-3xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
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
                        <div className="flex flex-wrap gap-2 mb-6 mt-4">
                            {technologies.map((tech, index) => {
                                return (
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
                                )
                            })}
                        </div>
                    }

                    {caseStudyUrl && (
                        <Button size="sm" variant="ghost" asChild className="text-primary hover:text-primary/90 justify-self-end">
                            <Link href={caseStudyUrl}>
                                Read more →
                            </Link>
                        </Button>
                    )}
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


                </CardFooter>
            </div>
        </Card>
    )
}