import Section from './section'
import type { PageLabTeaserBlock } from '@strps-website/types'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { LabTeaserCard } from '@/components/cards/LabTeaserCard'
import { Reveal, RevealGroup } from '@/components/primitives/Reveal'
import { resolveLinkHref } from '@/lib/resolveLinkHref'
import { getLocalizedGalleryItems } from '@/app/(website)/[locale]/lab/data'
import { localizedHref, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

type LabTeaserProps = Omit<PageLabTeaserBlock, 'link'> & {
    labTeaserLink?: PageLabTeaserBlock['link']
    locale: Locale
}

const LabTeaserSection: React.FC<LabTeaserProps> = ({
    eyebrow,
    title,
    intro,
    labTeaserLink: link,
    limit,
    section,
    locale,
}) => {
    const actionHref = resolveLinkHref(link, locale)
    const items = getLocalizedGalleryItems(locale).slice(0, limit ?? 3)
    const dictionary = getDictionary(locale)

    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'lab'}
            container={false}
            containerClassName="mx-auto w-full max-w-wrap gap-[22px] px-6"
        >
            <Reveal>
                <SectionHeader
                    eyebrow={eyebrow || dictionary.eyebrowFallback.lab}
                    title={title}
                    action={
                        actionHref && link?.label ? (
                            <LinkArrow href={actionHref}>{link.label}</LinkArrow>
                        ) : undefined
                    }
                />
            </Reveal>

            {intro && (
                <Reveal delay={0.08}>
                    <p className="max-w-2xl text-muted-foreground">{intro}</p>
                </Reveal>
            )}

            <RevealGroup
                itemClassName="h-full"
                className="grid grid-cols-1 gap-4 min-[721px]:grid-cols-2 lg:grid-cols-3"
            >
                {items.map((item) => (
                    <LabTeaserCard
                        key={item.id}
                        href={localizedHref(locale, item.href)}
                        tag={dictionary.lab.categories[item.category]}
                        title={item.title}
                        note={item.description}
                        imageUrl={typeof item.imageUrl === 'string' ? item.imageUrl : item.imageUrl?.src}
                    />
                ))}
            </RevealGroup>
        </Section>
    )
}

export default LabTeaserSection
