import Section from '../section'
import type { PageServicesTeaserBlock } from '@strps-website/types'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { NumberedRow } from '@/components/primitives/NumberedRow'
import { resolveLinkHref } from '@/lib/resolveLinkHref'

type ServicesTeaserProps = Omit<PageServicesTeaserBlock, 'link'> & {
    teaserLink?: PageServicesTeaserBlock['link']
}

const ServicesTeaserSection: React.FC<ServicesTeaserProps> = ({
    eyebrow,
    title,
    teaserLink: link,
    items,
    section,
}) => {
    const actionHref = resolveLinkHref(link)

    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'services'}
            spacing="section"
            container={false}
            containerClassName="mx-auto w-full max-w-wrap gap-[22px] px-6"
        >
            <SectionHeader
                eyebrow={eyebrow || 'Services'}
                title={title}
                action={
                    actionHref && link?.label ? (
                        <LinkArrow href={actionHref}>{link.label}</LinkArrow>
                    ) : undefined
                }
            />

            <div>
                {items?.map((item, i) => {
                    const itemHref = resolveLinkHref(item.link)
                    return (
                        <NumberedRow
                            key={item.id || i}
                            number={String(i + 1).padStart(2, '0')}
                            title={item.name}
                            description={item.summary || undefined}
                            action={
                                itemHref && item.link?.label ? (
                                    <LinkArrow href={itemHref}>{item.link.label}</LinkArrow>
                                ) : undefined
                            }
                        />
                    )
                })}
            </div>
        </Section>
    )
}

export default ServicesTeaserSection
