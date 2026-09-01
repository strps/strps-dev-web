import { Mail, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Section from '@/components/section';
import { CMSLink } from '@/components/cms-link';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import type { PageHeroBlock, Media } from '@strps-website/types';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import SVGButton from '../SVGButton';
import { ParticleOrb } from '@/components/backgrounds/ParticleOrb';

type HeroProps = Omit<PageHeroBlock, 'links' | 'variant'> & {
    heroLinks?: PageHeroBlock['links'];
    heroVariant?: PageHeroBlock['variant'];
    locale: Locale;
};

function composeStatus(status: PageHeroBlock['status']) {
    if (!status?.isAvailable || !status.label) return null;
    return status.availableFrom ? `${status.label} — ${status.availableFrom}` : status.label;
}

const HeroSection: React.FC<HeroProps> = (props) => {
    const { heroVariant: variant, backgroundImage, section } = props;
    const bgImage = typeof backgroundImage === 'object' && backgroundImage ? (backgroundImage as Media) : null;

    return (
        <Section
            {...(section ?? {})}
            spacing={variant === 'statement' ? 'hero' : undefined}
            className={variant === 'statement' ? undefined : 'gap-8 py-32 md:py-48 text-center'}
            container={variant === 'statement' ? false : true}
            containerClassName={variant === 'statement' ? 'mx-auto w-full max-w-wrap px-6' : 'items-center'}
            backgroundLayer={
                <ParticleOrb
                    shellCount={190}
                    tentacles={6}
                    sphereRadius={0.26}
                    className="opacity-90"
                />
            }
            {...(bgImage?.url ? {
                image: {
                    src: `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${bgImage.url}`,
                    alt: bgImage.alt || 'Hero Background',
                    priority: true,
                    quality: 90,
                }
            } : {})}
        >
            {variant === 'statement' ? <StatementHero {...props} /> : <PortraitHero {...props} />}
        </Section>
    );
};

const StatementHero: React.FC<HeroProps> = ({
    eyebrow,
    headline,
    name,
    description,
    status,
    heroLinks,
    locale,
}) => {
    const statusText = composeStatus(status);

    return (
        <div>
            {eyebrow && (
                <span className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <span aria-hidden className="h-px w-8 bg-foreground/60" />
                    {eyebrow}
                </span>
            )}

            {statusText && (
                <div className="mb-7 inline-flex items-center gap-2">
                    <span aria-hidden className="h-1.75 w-1.75 rounded-full bg-primary" />
                    <Eyebrow className="normal-case tracking-[0.06em] text-muted-foreground">
                        {statusText}
                    </Eyebrow>
                </div>
            )}

            <h1 className="max-w-[16ch] text-[clamp(34px,5.5vw,58px)] leading-[1.08] font-medium tracking-[-0.02em]">
                {headline || name}
            </h1>

            {description && (
                <p className="mt-6.5 max-w-[56ch] text-[17px] leading-[1.65] text-muted-foreground">
                    {description}
                </p>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
                {heroLinks?.map(({ link }, i) => {
                    if (link.appearance === 'send' || link.appearance === 'github' || link.appearance === 'linkedin') {
                        return (
                            <SVGButton variant={link.appearance} href={link.url!} key={i}>
                                {link.label}
                            </SVGButton>
                        );
                    }
                    return (
                        <CMSLink
                            key={i}
                            {...link}
                            appearance={link.appearance ?? 'solid'}
                            locale={locale}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const PortraitHero: React.FC<HeroProps> = ({
    name,
    label,
    description,
    location,
    status,
    email,
    heroLinks,
    locale,
}) => {
    const dictionary = getDictionary(locale);

    return (
        <div className="space-y-6 max-w-3xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {status?.isAvailable && (
                <div className="flex justify-center">
                    <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-sm font-medium border-primary/20 bg-background/50 backdrop-blur-md">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        {composeStatus(status)}
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
                    <SVGButton variant='send' className='' href={`mailto:${email}`}>
                        <Mail className="mr-2 h-4 w-4" /> <span>{dictionary.common.contactMe}</span>
                    </SVGButton>
                )}
                {heroLinks?.map(({ link }, i) => {
                    if (link.appearance === 'send' || link.appearance === 'github' || link.appearance === 'linkedin') {
                        return (
                            <SVGButton variant={link.appearance} href={link.url!} key={i}>
                                {link.label}
                            </SVGButton>
                        );
                    }
                    return (
                        <CMSLink
                            key={i}
                            {...link}
                            appearance={link.appearance ?? undefined}
                            size="lg"
                            locale={locale}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default HeroSection;
