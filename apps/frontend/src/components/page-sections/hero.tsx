import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Section from '@/components/section';
import { CMSLink } from '@/components/cms-link';
import type { PageHeroBlock, Media } from '@strps-website/types';

type HeroProps = Omit<PageHeroBlock, 'links'> & {
    heroLinks?: PageHeroBlock['links'];
};

const HeroSection: React.FC<HeroProps> = ({
    name,
    label,
    description,
    location,
    status,
    email,
    heroLinks,
    backgroundImage,
}) => {
    const bgImage = typeof backgroundImage === 'object' && backgroundImage ? backgroundImage as Media : null;

    return (
        <Section
            className="gap-8 py-32 md:py-48 text-center"
            containerClassName='items-center'
            {...(bgImage?.url ? {
                image: {
                    src: `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${bgImage.url}`,
                    alt: bgImage.alt || 'Hero Background',
                    priority: true,
                    quality: 90,
                }
            } : {})}
        >
            <div className="space-y-6 max-w-3xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {status?.isAvailable && (
                    <div className="flex justify-center">
                        <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-sm font-medium border-primary/20 bg-background/50 backdrop-blur-md">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            {status.label}
                        </Badge>
                    </div>
                )}

                <div className="space-y-2">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
                        {name}
                    </h1>
                    {label && (
                        <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                            {label}
                        </p>
                    )}
                    {location?.city && (
                        <div className="flex items-center justify-center text-muted-foreground gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{location.city}{location.region ? `, ${location.region}` : ''}</span>
                        </div>
                    )}
                </div>

                {description && (
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mx-auto max-w-2xl">
                        {description}
                    </p>
                )}

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    {email && (
                        <Button asChild size="lg">
                            <Link href={`mailto:${email}`}>
                                <Mail className="mr-2 h-4 w-4" /> Contact Me
                            </Link>
                        </Button>
                    )}
                    {heroLinks?.map(({ link }, i) => (
                        <CMSLink
                            key={i}
                            {...link}
                            appearance={link.appearance ?? undefined}
                            size="lg"
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default HeroSection;