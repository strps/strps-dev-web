import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { siteData } from '@/data/data';

export default function Footer() {
    const githubUrl = siteData.basics.profiles.find(p => p.network === "GitHub")?.url || "#";
    const linkedinUrl = siteData.basics.profiles.find(p => p.network === "LinkedIn")?.url || "#";

    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4 md:px-6">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by <span className="font-semibold">{siteData.basics.name}</span>.
                    Based in {siteData.basics.location.countryCode}.
                </p>
                <div className="flex gap-4">
                    <Link href={githubUrl} target="_blank" className="text-muted-foreground hover:text-foreground">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href={linkedinUrl} target="_blank" className="text-muted-foreground hover:text-foreground">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}