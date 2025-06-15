'use client'
import React from 'react'
import Image from 'next/image'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { Media } from '@/payload-types'

// Define the client logo type based on payload-types.ts
type ClientLogo = {
  id?: string | null
  name: string
  logo: number | Media
  url?: string | null
  testimonial?: {
    content?: string | null
    author?: string | null
    position?: string | null
    company?: string | null
    authorImage?: (number | null) | Media
  }
}

// Define variants using class-variance-authority
const clientsVariants = cva('', {
  variants: {
    displayType: {
      grid: 'grid gap-4',
      carousel: 'flex overflow-x-auto snap-x snap-mandatory scrollbar-hide',
      testimonials: 'space-y-8',
      combined: 'grid gap-8',
    },
    maxLogosPerRow: {
      '2': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-2',
      '3': 'grid-cols-2 sm:grid-cols-3',
      '4': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
      '5': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
      '6': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
    },
    logoBackground: {
      none: '',
      light: 'bg-muted/50',
      dark: 'bg-muted',
      rounded: 'bg-muted/50 rounded-full',
    },
    testimonialLayout: {
      grid: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3',
      slider: 'relative',
      stacked: 'space-y-8',
    },
  },
  defaultVariants: {
    displayType: 'grid',
    maxLogosPerRow: '4',
    logoBackground: 'none',
    testimonialLayout: 'grid',
  },
})

export type StrpsClientsBlock = {
  heading?: string | null
  description?: string | null
  displayType?: 'grid' | 'carousel' | 'testimonials' | 'combined' | null
  clients?: ClientLogo[] | null
  showDivider?: boolean | null
  maxLogosPerRow?: '2' | '3' | '4' | '5' | '6' | null
  logoBackground?: 'none' | 'light' | 'dark' | 'rounded' | null
  testimonialLayout?: 'grid' | 'slider' | 'stacked' | null
  id?: string | null
  blockName?: string | null
  blockType: 'strpsClients'
}

export const StrpsClients: React.FC<StrpsClientsBlock> = ({
  heading,
  description,
  displayType = 'grid',
  clients = [],
  showDivider = false,
  maxLogosPerRow = '4',
  logoBackground = 'none',
  testimonialLayout = 'grid',
}) => {
  // Get logo wrapper classes based on background variant
  const getLogoWrapperClasses = () =>
    cn(
      'relative aspect-square flex items-center justify-center overflow-hidden',
      {
        'p-4': logoBackground !== 'none',
        'rounded-lg': logoBackground === 'light' || logoBackground === 'dark',
        'rounded-full': logoBackground === 'rounded',
      },
      clientsVariants({ logoBackground }),
    )

  // Render logo item
  const renderLogo = (client: ClientLogo, index: number) => {
    if (!client?.logo) return null

    const logoId = typeof client.logo === 'number' ? client.logo : client.logo.id
    const logoUrl = typeof client.logo === 'number' ? `/api/media/${logoId}` : client.logo.url

    return (
      <div key={client.id || index} className={getLogoWrapperClasses()}>
        {client.url ? (
          <a
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full h-full"
            title={client.name}
          >
            <Image
              src={logoUrl || ''}
              alt={client.name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </a>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={logoUrl || ''}
              alt={client.name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        )}
      </div>
    )
  }

  // Render testimonial item
  const renderTestimonial = (client: ClientLogo, index: number) => {
    if (!client.testimonial) return null

    return (
      <div key={client.id || index} className="bg-card p-6 rounded-lg">
        {client.testimonial.content && (
          <p className="text-muted-foreground mb-4">&quot;{client.testimonial.content}&quot;</p>
        )}
        <div className="flex items-center gap-3">
          {client.testimonial.authorImage && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={
                  typeof client.testimonial.authorImage === 'number'
                    ? `/api/media/${client.testimonial.authorImage}`
                    : client.testimonial.authorImage.url || ''
                }
                alt={client.testimonial.author || ''}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            {client.testimonial.author && (
              <p className="font-medium">{client.testimonial.author}</p>
            )}
            {(client.testimonial.position || client.testimonial.company) && (
              <p className="text-sm text-muted-foreground">
                {[client.testimonial.position, client.testimonial.company]
                  .filter(Boolean)
                  .join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (!clients || clients.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container">
        {(heading || description) && (
          <div className="mb-8 text-center">
            {heading && <h2 className="text-3xl font-bold mb-2">{heading}</h2>}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
        )}

        {displayType === 'testimonials' ? (
          <div className={clientsVariants({ testimonialLayout })}>
            {clients.map((client, index) => renderTestimonial(client, index))}
          </div>
        ) : displayType === 'combined' ? (
          <div className="space-y-12">
            <div className={clientsVariants({ displayType: 'grid', maxLogosPerRow })}>
              {clients
                .filter((client) => !client.testimonial)
                .map((client, index) => renderLogo(client, index))}
            </div>
            <div className={clientsVariants({ testimonialLayout })}>
              {clients
                .filter((client) => client.testimonial)
                .map((client, index) => renderTestimonial(client, index))}
            </div>
          </div>
        ) : (
          <div className={clientsVariants({ displayType, maxLogosPerRow })}>
            {clients.map((client, index) => renderLogo(client, index))}
          </div>
        )}

        {showDivider && <div className="border-t border-border mt-16 pt-8" />}
      </div>
    </section>
  )
}
