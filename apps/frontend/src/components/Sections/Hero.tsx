import Link from 'next/link';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { resumeData } from '@/data/data';

export default function HeroSection() {
    const { name, label, location, summary, email, profiles } = resumeData.basics;
    const githubUrl = profiles.find(p => p.network === "GitHub")?.url || "#";
    const linkedinUrl = profiles.find(p => p.network === "LinkedIn")?.url || "#";

    return (
        <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-10 md:py-20">
            <div className="flex-1 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
                        {name}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                        {label}
                    </p>
                    <div className="flex items-center text-muted-foreground gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{location.city}, {location.region}</span>
                    </div>
                </div>

                <p className="max-w-[600px] text-lg text-muted-foreground leading-relaxed">
                    {summary}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                    <Button asChild size="lg">
                        <Link href={`mailto:${email}`}>
                            <Mail className="mr-2 h-4 w-4" /> Contact Me
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href={githubUrl} target="_blank">
                            <Github className="mr-2 h-4 w-4" /> GitHub
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href={linkedinUrl} target="_blank">
                            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="flex-shrink-0">
                <Avatar className="h-40 w-40 md:h-64 md:w-64 border-4 border-muted">
                    <AvatarImage src="/profile.jpg" alt={name} />
                    <AvatarFallback className="text-4xl">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
            </div>
        </section>
    );
}