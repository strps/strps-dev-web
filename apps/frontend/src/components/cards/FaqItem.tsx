import {
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion'

export interface FaqItemProps {
    question: string
    answer: string
    value: string
}

export const FaqItem: React.FC<FaqItemProps> = ({ question, answer, value }) => {
    return (
        <AccordionItem value={value}>
            <AccordionTrigger className="py-5 text-base font-medium tracking-tight hover:no-underline data-[state=open]:text-foreground [&>svg]:mt-1">
                {question}
            </AccordionTrigger>
            <AccordionContent className="pb-6">
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{answer}</p>
            </AccordionContent>
        </AccordionItem>
    )
}
