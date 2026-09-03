import Section from '.'
import type { PageServicesProcessBlock } from '@strps-website/types'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { NumberedRow } from '@/components/primitives/NumberedRow'
import { HairlineGrid } from '@/components/primitives/HairlineGrid'
import { Reveal, RevealGroup } from '@/components/primitives/Reveal'
import { resolveLinkHref } from '@/lib/resolveLinkHref'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

// The GraphQL fragment aliases `link` and `rows` — a response name must have
// one shape across every fragment in the query, and other blocks already claim
// those names with different shapes — so the props arrive under the aliases.
type ServicesProcessProps = Omit<PageServicesProcessBlock, 'link' | 'rows'> & {
    servicesProcessLink?: PageServicesProcessBlock['link']
    servicesProcessRows?: PageServicesProcessBlock['rows']
    locale: Locale
}

/**
 * Services teaser and process strip as one section: the numbered service rows
 * answer "what", the strip under them answers "how", and they share a header,
 * a SectionConfig and a single claim on the particle stage.
 */
const ServicesProcessSection: React.FC<ServicesProcessProps> = ({
    eyebrow,
    title,
    servicesProcessLink: link,
    servicesProcessRows: rows,
    process,
    section,
    locale,
}) => {
    const actionHref = resolveLinkHref(link, locale)
    const dictionary = getDictionary(locale)
    const steps = process?.steps
    const totalSteps = steps?.length ?? 0

    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'services'}
            container={false}
            containerClassName="min-h-[400px] mx-auto w-full max-w-wrap gap-[22px] px-6"
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
                {rows?.map((item, i) => {
                    const itemHref = resolveLinkHref(item.link, locale)
                    return (
                        <NumberedRow
                            key={item.id || i}
                            number={String(i + 1).padStart(2, '0')}
                            title={item.name}
                            description={item.summary || undefined}
                            // Each row sits alone inside its reveal wrapper, so
                            // `last:border-b-0` would match every row — drop the
                            // rule explicitly on the real last item instead.
                            className={i === (rows?.length ?? 0) - 1 ? 'border-b-0' : undefined}
                            action={
                                itemHref && item.link?.label ? (
                                    <LinkArrow href={itemHref}>{item.link.label}</LinkArrow>
                                ) : undefined
                            }
                        />
                    )
                })}
            </RevealGroup>

            {totalSteps > 0 && (
                // The container's own `gap-[22px]` already separates the strip
                // from the rows; this tops it up to roughly the 36px the
                // standalone process strip got from its own section padding.
                <div className="mt-3.5 flex flex-col gap-3.5">
                    {process?.label && (
                        <Reveal>
                            <Eyebrow as="div">{process.label}</Eyebrow>
                        </Reveal>
                    )}
                    <HairlineGrid minItemWidth={190} cellClassName="px-5 py-[22px]">
                        {steps?.map((step, i) => (
                            // The reveal lives inside the cell, so the hairline grid
                            // still sees its own opaque cells as the grid items.
                            <Reveal key={step.id || i} delay={i * 0.07} distance={12}>
                                <span className="font-mono text-xs text-primary">{i + 1} / {totalSteps}</span>
                                <h4 className="mt-2.5 text-[15px] font-medium">{step.title}</h4>
                                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                                    {step.description}
                                </p>
                            </Reveal>
                        ))}
                    </HairlineGrid>
                </div>
            )}
        </Section>
    )
}

export default ServicesProcessSection
