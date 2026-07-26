import Section from '../section'
import type { PageLabTeaserBlock } from '@strps-website/types'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { LabTeaserCard } from '@/components/cards/LabTeaserCard'
import { resolveLinkHref } from '@/lib/resolveLinkHref'
import { getGalleryItems } from '@/app/(website)/[locale]/lab/data'
import { GALLERY_CATEGORIES } from '@/app/(website)/[locale]/lab/types'

type LabTeaserProps = Omit<PageLabTeaserBlock, 'link'> & {
    labTeaserLink?: PageLabTeaserBlock['link']
}

const LabTeaserSection: React.FC<LabTeaserProps> = ({
    eyebrow,
    title,
    intro,
    labTeaserLink: link,
    limit,
    section,
}) => {
    const actionHref = resolveLinkHref(link)
    const items = getGalleryItems().slice(0, limit ?? 3)

    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'lab'}
            spacing="section"
            container={false}
            containerClassName="mx-auto w-full max-w-wrap gap-[22px] px-6"
        >
            <SectionHeader
                eyebrow={eyebrow || 'Lab'}
                title={title}
                action={
                    actionHref && link?.label ? (
                        <LinkArrow href={actionHref}>{link.label}</LinkArrow>
                    ) : undefined
                }
            />

            {intro && <p className="max-w-2xl text-muted-foreground">{intro}</p>}

            <div className="grid grid-cols-1 gap-4 min-[721px]:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <LabTeaserCard
                        key={item.id}
                        href={item.href}
                        tag={GALLERY_CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category}
                        title={item.title}
                        note={item.description}
                        imageUrl={typeof item.imageUrl === 'string' ? item.imageUrl : item.imageUrl?.src}
                    />
                ))}
            </div>
        </Section>
    )
}

export default LabTeaserSection
