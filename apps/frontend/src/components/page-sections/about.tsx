import { cn } from '@/lib/utils';
import RichText from '@/components/RichText';
import Section from './section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { LinkArrow } from '@/components/primitives/LinkArrow';
import { Reveal } from '@/components/primitives/Reveal';
import { resolveLinkHref } from '@/lib/resolveLinkHref';
import type { PageAboutBlock } from '@strps-website/types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

type AboutProps = Omit<PageAboutBlock, 'link'> & {
    aboutLink?: PageAboutBlock['link'];
    locale: Locale;
};

const proseClassName =
    '[&_p]:text-[15px] [&_p]:leading-[1.7] [&_p]:text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground [&_b]:font-medium [&_b]:text-foreground';

const AboutSection: React.FC<AboutProps> = ({ eyebrow, title, layout, summary, body, aboutLink: link, section, locale }) => {
    const actionHref = resolveLinkHref(link, locale);
    const isTwoColumn = layout === 'twoColumn';
    const dictionary = getDictionary(locale);

    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'about'}
            container={false}
            containerClassName="mx-auto w-full max-w-wrap px-6"
        >
            <Reveal>
                <SectionHeader
                    eyebrow={eyebrow || dictionary.eyebrowFallback.about}
                    title={title}
                    action={
                        actionHref && link?.label ? (
                            <LinkArrow href={actionHref}>{link.label}</LinkArrow>
                        ) : undefined
                    }
                />
            </Reveal>

            {body ? (
                <Reveal delay={0.1}>
                    <RichText
                        data={body as DefaultTypedEditorState}
                        enableGutter={false}
                        enableProse={false}
                        className={cn(
                            'mt-9',
                            isTwoColumn ? 'grid items-start gap-12.5 md:grid-cols-2' : 'max-w-[60ch] space-y-4',
                            proseClassName,
                        )}
                    />
                </Reveal>
            ) : summary ? (
                <Reveal delay={0.1}>
                    <p className="mt-9 max-w-[60ch] text-[15px] leading-[1.7] text-muted-foreground">{summary}</p>
                </Reveal>
            ) : null}
        </Section>
    );
};

export default AboutSection;
