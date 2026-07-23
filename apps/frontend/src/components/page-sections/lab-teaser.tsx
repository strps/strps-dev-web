import Section from '../section'
import type { PageLabTeaserBlock } from '@strps-website/types'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { GalleryCard } from '@/components/gallery/GalleryCard'
import { resolveLinkHref } from '@/lib/resolveLinkHref'
import { getGalleryItems } from '@/app/(website)/lab/data'

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
            id={section?.section_id || 'lab'}
            spacing="section"
            containerClassName="gap-[22px]"
            {...(section ?? {})}
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <div key={item.id} className="aspect-4/3">
                        <GalleryCard item={item} className="h-full" />
                    </div>
                ))}
            </div>
        </Section>
    )
}

export default LabTeaserSection
