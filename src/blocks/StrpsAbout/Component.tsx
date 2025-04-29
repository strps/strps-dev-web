import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import React from 'react'

interface StrpsAboutProps {
  text?: string
  image?: any // Adjust type based on your Media type
  link?: any // Adjust type based on your CMSLink prop type
  title?: string
}

export const StrpsAbout = ({ text, image, link, title }: StrpsAboutProps) => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative">
      {image && (
        <Media
          resource={image}
          className="absolute inset-0 -z-10 object-cover w-full h-full opacity-80"
          alt={image?.alt || title || 'About section image'} // Add alt text for accessibility
        />
      )}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-16 md:py-24">
        <div className="relative z-10 lg:order-2 flex justify-center items-center">
          {image && (
            <div className="rounded-lg shadow-lg overflow-hidden aspect-w-16 aspect-h-9 md:aspect-w-1 md:aspect-h-1 w-48 md:w-64">
              <Media
                resource={image}
                className="object-cover w-full h-full"
                alt={image?.alt || title || 'About me'}
              />
            </div>
          )}
        </div>
        <div className="relative z-10 text-foreground lg:order-1 flex flex-col justify-center">
          {title && <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>}
          {text && <p className="text-lg text-muted-foreground mb-6">{text}</p>}
          {link?.label && link?.href && (
            <CMSLink {...link} className={cn('inline-block')}>
              {link.label}
            </CMSLink>
          )}
        </div>
      </div>
    </section>
  )
}
