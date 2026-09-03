import Section from '.'
import type { PageProcessBlock } from '@strps-website/types'
import { ProcessStepCard } from '../cards/ProcessStepCard'
import { HairlineGrid } from '@/components/primitives/HairlineGrid'
import { Reveal } from '@/components/primitives/Reveal'

type ProcessProps = Omit<PageProcessBlock, 'variant'> & {
    processVariant?: PageProcessBlock['variant'];
};

const ProcessSection: React.FC<ProcessProps> = ({ processVariant: variant, title, intro, steps, section }) => {
    if (variant === 'strip') {
        const total = steps?.length ?? 0
        return (
            <Section
                {...(section ?? {})}
                id={section?.section_id || 'process'}
                container={false}
                containerClassName="min-h-[400px] mx-auto w-full max-w-wrap px-6 pt-9 pb-0"
            >
                <HairlineGrid minItemWidth={190} cellClassName="px-5 py-[22px]">
                    {steps?.map((step, i) => (
                        // The reveal lives inside the cell, so the hairline grid
                        // still sees its own opaque cells as the grid items.
                        <Reveal key={step.id || i} delay={i * 0.07} distance={12}>
                            <span className="font-mono text-xs text-primary">{i + 1} / {total}</span>
                            <h4 className="mt-2.5 text-[15px] font-medium">{step.title}</h4>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                                {step.description}
                            </p>
                        </Reveal>
                    ))}
                </HairlineGrid>
            </Section>
        )
    }

    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'process'}
            className="py-8 md:py-14"
            container={false}
            containerClassName="mx-auto w-full max-w-wrap gap-10 px-6 md:gap-14"
        >
            <div className="max-w-2xl space-y-4">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
                {intro && (
                    <p className="text-lg leading-relaxed text-muted-foreground">{intro}</p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {steps?.map((step, i) => (
                    <ProcessStepCard
                        key={step.id || i}
                        index={i}
                        title={step.title}
                        description={step.description}
                    />
                ))}
            </div>
        </Section>
    )
}

export default ProcessSection
