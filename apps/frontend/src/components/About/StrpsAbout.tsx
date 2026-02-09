import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Section } from '@/components/Section'

type StrpsAboutProps = Extract<Page['layout'][number], { blockType: 'strpsAbout' }>

export const StrpsAbout: React.FC<StrpsAboutProps> = ({ id, title, content, link, section }) => {
    return (
        <Section id={id} {...section} className="relative min-h-screen py-24">
            <div className="flex flex-col items-center justify-center gap-8 text-center">
                {title && <h2 className="text-4xl font-bold">{title}</h2>}
                {content && <RichText data={content} />}
                {link && (
                    <CMSLink {...link} className={cn('inline-block')}>
                        {link.label}
                    </CMSLink>
                )}
            </div>
        </Section>
    )
}