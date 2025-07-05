import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Section } from '@/components/Section/Section'
import { StrpsAboutStoryBlocks } from '@/payload-types'
import { DynamicIcon } from 'lucide-react/dynamic'

type StrpsAboutProps = Extract<Page['layout'][number], { blockType: 'strpsAbout' }>
type AboutImageAdjacentProps = Extract<Page['layout'][number], { blockType: 'strpsAboutAdjacent' }>

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

// Placeholder image imports - replace with your actual image paths
// import profileImage from '@/public/your-profile-image.jpg'
// import generativeArtImage from '@/public/generative-art-example.png'

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
          <Media
            resource={media}
            imgClassName="transition-opacity duration-300 object-cover"
            fill
            alt={title || 'Generative art'}
          />
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

// Layout Option 3: Story Blocks
export const AboutStoryBlocks = ({ id, title, storyBlocks, section }: StrpsAboutStoryBlocks) => {
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
