import { siteData } from '@/data/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Section from '../section';

export default function AboutSection() {
    const { summary, name } = siteData.basics;
    const initials = name.split(' ').map(n => n[0]).join('');

    return (
        <Section id="about">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="flex-shrink-0">
                    <Avatar className="h-40 w-40 md:h-52 md:w-52 border-4 border-background shadow-xl">
                        <AvatarImage src="/profile.jpg" alt={name} className="object-cover" />
                        <AvatarFallback className="text-4xl">{initials}</AvatarFallback>
                    </Avatar>
                </div>

                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {summary}
                    </p>
                </div>
            </div>
        </Section>
    );
}