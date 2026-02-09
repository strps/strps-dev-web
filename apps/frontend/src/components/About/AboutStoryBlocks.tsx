import { Section, type SectionProps } from '@/components/Section'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

interface StoryBlock {
    lucideIcon?: IconName | 'none'
    heading: string
    content: string
}

interface AboutStoryBlocksProps {
    id?: string
    title?: string
    storyBlocks?: StoryBlock[]
    section?: SectionProps
}

export const AboutStoryBlocks = ({ id, title, storyBlocks, section }: AboutStoryBlocksProps) => {
    return (
        <Section
            id={id}
            {...section}
            className="flex flex-col items-center justify-center relative text-primary"
        >
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h2>}
            <div className="flex flex-col items-center gap-8">
                {storyBlocks?.map((block, index) => {
                    const IconComponent =
                        block.lucideIcon && block.lucideIcon !== 'none' ? (
                            <DynamicIcon name={block.lucideIcon} className="w-8 h-8 mr-2" />
                        ) : null

                    return (
                        <div key={index} className="w-full">
                            <div className="flex flex-row items-center">
                                {IconComponent}
                                <h3 className="text-xl font-semibold tracking-tight">{block.heading}</h3>
                            </div>
                            <p className="pl-4 mt-2 text-md leading-relaxed">{block.content}</p>
                        </div>
                    )
                })}
            </div>
        </Section>
    )
}