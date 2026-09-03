import { Check } from 'lucide-react';
import Section from '@/components/page-sections';
import { CMSLink } from '@/components/cms-link';
import type { PageServicesHeroBlock, Media } from '@strps-website/types';
import type { Locale } from '@/i18n/config';
import SVGButton from '../SVGButton';

type ServicesHeroProps = Omit<PageServicesHeroBlock, 'links'> & {
    servicesHeroLinks?: PageServicesHeroBlock['links'];
    locale: Locale;
};

const ServicesHeroSection: React.FC<ServicesHeroProps> = ({
    eyebrow,
    title,
    description,
    status,
    servicesHeroLinks,
    highlights,
    backgroundImage,
    section,
    locale,
}) => {
    const bgImage = typeof backgroundImage === 'object' && backgroundImage ? backgroundImage as Media : null;

    return (
        <Section
            {...(section ?? {})}
            className="pt-24 pb-12 md:pt-36 md:pb-16"
            container={false}
            containerClassName="mx-auto w-full max-w-wrap px-6"
            {...(bgImage?.url ? {
                image: {
                    src: `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${bgImage.url}`,
                    alt: bgImage.alt || 'Hero Background',
                    priority: true,
                    quality: 90,
                }
            } : {})}
        >
            <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {(eyebrow || status?.isAvailable) && (
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                        {eyebrow && (
                            <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                <span aria-hidden className="h-px w-8 bg-foreground/60" />
                                {eyebrow}
                            </span>
                        )}
                        {status?.isAvailable && status.label && (
                            <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                                </span>
                                {status.availableFrom ? `${status.label} — ${status.availableFrom}` : status.label}
                            </span>
                        )}
                    </div>
                )}

                <h1 className="text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
                    {title}
                </h1>

                {description && (
                    <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                        {description}
                    </p>
                )}

                <div className="flex flex-wrap gap-4 pt-2">
                    {servicesHeroLinks?.map(({ link }, i) => {
                        if (link.appearance === 'send' || link.appearance === 'github' || link.appearance === 'linkedin') {
                            return (
                                <SVGButton variant={link.appearance} href={link.url!} key={i}>
                                    {link.label}
                                </SVGButton>
                            )
                        }
                        return (
                            <CMSLink
                                key={i}
                                {...link}
                                appearance={link.appearance ?? undefined}
                                size="lg"
                                locale={locale}
                            />
                        )
                    })}
                </div>
            </div>

            {highlights && highlights.length > 0 && (
                <ul className="mt-8 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:flex-wrap sm:gap-x-10 animate-in fade-in duration-1000 delay-300 fill-mode-both">
                    {highlights.map((item, i) => (
                        <li key={item.id || i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 shrink-0 text-foreground" />
                            {item.text}
                        </li>
                    ))}
                </ul>
            )}
        </Section>
    );
};

export default ServicesHeroSection;
