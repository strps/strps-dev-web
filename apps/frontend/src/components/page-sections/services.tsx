import Section from '../section'
import type { PageServicesBlock } from '@strps-website/types'
import { ServiceCard } from '../cards/ServiceCard'

const ServicesSection: React.FC<PageServicesBlock> = ({ title, intro, services, section }) => {
    return (
        <Section
            id={section?.section_id || 'services'}
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {services?.map((service, i) => (
                    <ServiceCard
                        key={service.id || i}
                        index={i}
                        name={service.name}
                        forWho={service.forWho}
                        features={service.features}
                        timeline={service.timeline}
                        pricing={service.pricing}
                        goodFitPoints={service.goodFitPoints}
                        proofLabel={service.proofLabel}
                        proofUrl={service.proofUrl}
                    />
                ))}
            </div>
        </Section>
    )
}

export default ServicesSection
