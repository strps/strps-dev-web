import Section from './section'
import type { PageServicesTeaserBlock } from '@strps-website/types'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { NumberedRow } from '@/components/primitives/NumberedRow'
import { Reveal, RevealGroup } from '@/components/primitives/Reveal'
import { resolveLinkHref } from '@/lib/resolveLinkHref'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

type ServicesTeaserProps = Omit<PageServicesTeaserBlock, 'link'> & {
    teaserLink?: PageServicesTeaserBlock['link']
    locale: Locale
}

const ServicesTeaserSection: React.FC<ServicesTeaserProps> = ({
    eyebrow,
    title,
    teaserLink: link,
    items,
    section,
    locale,
}) => {
    const actionHref = resolveLinkHref(link, locale)
    const dictionary = getDictionary(locale)

    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'services'}
            container={false}
            containerClassName="mx-auto w-full max-w-wrap gap-[22px] px-6"
        >
            <Reveal>
                <SectionHeader
                    eyebrow={eyebrow || dictionary.eyebrowFallback.services}
                    title={title}
                    action={
                        actionHref && link?.label ? (
                            <LinkArrow href={actionHref}>{link.label}</LinkArrow>
                        ) : undefined
                    }
                />
            </Reveal>

            <RevealGroup stagger={0.07}>
                {items?.map((item, i) => {
                    const itemHref = resolveLinkHref(item.link, locale)
                    return (
                        <NumberedRow
                            key={item.id || i}
                            number={String(i + 1).padStart(2, '0')}
                            title={item.name}
                            description={item.summary || undefined}
                            // Each row now sits alone inside its reveal wrapper, so
                            // `last:border-b-0` would match every row — drop the rule
                            // explicitly on the real last item instead.
                            className={i === (items?.length ?? 0) - 1 ? 'border-b-0' : undefined}
                            action={
                                itemHref && item.link?.label ? (
                                    <LinkArrow href={itemHref}>{item.link.label}</LinkArrow>
                                ) : undefined
                            }
                        />
                    )
                })}
            </RevealGroup>
        </Section>
    )
}

export default ServicesTeaserSection
