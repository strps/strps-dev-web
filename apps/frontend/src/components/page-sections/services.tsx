import Section from './section'
import type { PageServicesBlock } from '@strps-website/types'
import { ServiceCard } from '../cards/ServiceCard'
import type { Locale } from '@/i18n/config'

const ServicesSection: React.FC<PageServicesBlock & { locale: Locale }> = ({ title, intro, services, section, locale }) => {
    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'services'}
            container={false}
            containerClassName="mx-auto w-full max-w-wrap gap-10 px-6 md:gap-14"
        >
            <div className="max-w-2xl space-y-4">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
                {intro && (
                    <p className="text-lg leading-relaxed text-muted-foreground">{intro}</p>
                )}
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
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
                        locale={locale}
                        variant='crystal'
                    />
                ))}
            </div>
        </Section>
    )
}

export default ServicesSection
