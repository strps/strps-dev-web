import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { Page } from '@/payload-types'
import { Section } from '@/components/Section'

type AboutImageAdjacentProps = Extract<Page['layout'][number], { blockType: 'strpsAboutAdjacent' }>

export const AboutImageAdjacent = ({
    id,
    media,
    content,
    title,
    section,
}: AboutImageAdjacentProps) => {
    return (
        <Section id={id} {...section} className="my-16">
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="relative w-full aspect-w-1 aspect-h-1 rounded-md overflow-hidden shadow-md">
                    {media && typeof media === 'object' && media.url && (
                        <Image
                            src={media.url}
                            alt={media.alt || title || 'Generative art'}
                            fill
                            className="transition-opacity duration-300 object-cover"
                        />
                    )}
                </div>
                <div className="mt-4 md:mt-0">
                    {title && <h2 className="text-2xl font-bold tracking-tight mb-4 text-center">{title}</h2>}
                    {content && (
                        <div className="prose">
                            <RichText data={content} />
                        </div>
                    )}
                </div>
            </div>
        </Section>
    )
}