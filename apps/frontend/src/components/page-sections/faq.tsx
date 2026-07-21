import Section from '../section'
import type { PageFaqBlock } from '@strps-website/types'
import { Accordion } from '@/components/ui/accordion'
import { FaqItem } from '../cards/FaqItem'

const FaqSection: React.FC<PageFaqBlock> = ({ title, intro, questions, section }) => {
    return (
        <Section
            id={section?.section_id || 'faq'}
            className="py-8 md:py-14"
            containerClassName="gap-10 md:gap-12 max-w-3xl"
            {...(section ?? {})}
        >
            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
                {intro && (
                    <p className="text-lg leading-relaxed text-muted-foreground">{intro}</p>
                )}
            </div>

            <Accordion type="single" collapsible className="border-t">
                {questions?.map((item, i) => (
                    <FaqItem
                        key={item.id || i}
                        value={item.id || String(i)}
                        question={item.question}
                        answer={item.answer}
                    />
                ))}
            </Accordion>
        </Section>
    )
}

export default FaqSection
