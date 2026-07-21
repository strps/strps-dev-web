import Section from '../section'
import type { PageProcessBlock } from '@strps-website/types'
import { ProcessStepCard } from '../cards/ProcessStepCard'

const ProcessSection: React.FC<PageProcessBlock> = ({ title, intro, steps, section }) => {
    return (
        <Section
            id={section?.section_id || 'process'}
            className="py-8 md:py-14"
            containerClassName="gap-10 md:gap-14"
            {...(section ?? {})}
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
