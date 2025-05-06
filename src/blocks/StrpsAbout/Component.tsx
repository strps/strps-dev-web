import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { Media as MediaType, Page } from '@/payload-types'
import { Code, Palette, Monitor, CircuitBoard, Briefcase } from 'lucide-react'
import { cn } from '@/utilities/ui'

type StrpsAboutProps = Extract<Page['layout'][number], { blockType: 'strpsAbout' }>
type AboutImageAdjacentProps = Extract<Page['layout'][number], { blockType: 'strpsAboutAdjacent' }>

export const StrpsAbout: React.FC<StrpsAboutProps> = (props) => {
  const { id, title, content, link, image } = props

  return (
    <div className="my-16" id={`block-${id}`}>
      <section className="relative">
        {image && (
          <div className="absolute inset-0 -z-10">
            <Media
              resource={image}
              className="absolute inset-0 -z-10 object-cover w-full h-full opacity-80"
              alt={
                typeof image === 'object'
                  ? image.alt || title || 'About section image'
                  : title || 'About section image'
              }
            />
          </div>
        )}
        <div className="container">
          <div className="flex flex-col items-center justify-center min-h-screen gap-8 py-24 text-center">
            {title && <h2 className="text-4xl font-bold">{title}</h2>}
            {content && <RichText data={content} />}
            {link && (
              <CMSLink {...link} className={cn('inline-block')}>
                {link.label}
              </CMSLink>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

// Placeholder image imports - replace with your actual image paths
// import profileImage from '@/public/your-profile-image.jpg'
// import generativeArtImage from '@/public/generative-art-example.png'

export const AboutImageAdjacent = ({ id, media, content, title }: AboutImageAdjacentProps) => {
  return (
    <div className="my-16" id={`block-${id}`}>
      <div className="container">
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
            {title && (
              <h2 className="text-2xl font-bold tracking-tight mb-4 text-center">{title}</h2>
            )}
            {content && (
              <div className="prose">
                <RichText data={content} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Layout Option 3: Story Blocks
interface StoryBlock {
  heading: string
  content: string
  icon: 'code' | 'palette' | 'monitor' | 'circuitBoard' | 'none'
  alt: string
}

interface AboutStoryBlocksProps {
  id: string
  title: string
  storyBlocks: StoryBlock[]
}

export const AboutStoryBlocks = ({ id, title, storyBlocks }: AboutStoryBlocksProps) => {
  const iconMap = {
    code: Code,
    palette: Palette,
    monitor: Monitor,
    circuitBoard: CircuitBoard,
    briefcase: Briefcase,
    none: null,
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      <section className="flex flex-col items-center justify-center">
        <div className="container">
          {title && <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h2>}
          <div className="flex flex-col items-center">
            {storyBlocks?.map((block, index) => {
              const IconComponent = block.icon !== 'none' ? iconMap[block.icon] : null

              return (
                <div key={index} className="p-6">
                  <div className=" mb-2 flex flex-row items-center">
                    {IconComponent && <IconComponent className="w-8 h-8 mr-2" />}
                    <h3 className="text-xl font-semibold tracking-tight">{block.heading}</h3>
                  </div>
                  <p className="mt-2 text-md leading-relaxed">{block.content}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
