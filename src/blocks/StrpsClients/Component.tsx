import React, { useRef, useEffect, useState } from 'react'
import { Block } from 'payload/types'
import Image from 'next/image'
import Link from 'next/link'

type Testimonial = {
  content: string
  author: string
  position?: string
  company?: string
  authorImage?: any
}

type Client = {
  name: string
  logo: any
  url?: string
  testimonial?: Testimonial
}

type Props = {
  block: Block & {
    heading?: string
    description?: string
    displayType?: 'grid' | 'carousel' | 'testimonials' | 'combined'
    clients?: Client[]
    showDivider?: boolean
    maxLogosPerRow?: string
    logoBackground?: 'none' | 'light' | 'gray' | 'rounded'
    testimonialLayout?: 'grid' | 'slider' | 'stacked'
  }
}

const StrpsClients: React.FC<Props> = ({
  block: {
    heading,
    description,
    displayType = 'grid',
    clients = [],
    showDivider = true,
    maxLogosPerRow = '5',
    logoBackground = 'none',
    testimonialLayout = 'grid',
  },
}) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Handle carousel auto-scroll
  useEffect(() => {
    if (displayType !== 'carousel' || !isMounted || isPaused) return

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
        const maxScroll = scrollWidth - clientWidth
        const nextScroll = scrollLeft + clientWidth

        if (nextScroll >= maxScroll) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          carouselRef.current.scrollTo({ left: nextScroll, behavior: 'smooth' })
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [displayType, isMounted, isPaused])

  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle slide change for testimonial slider
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Get logo grid columns class based on selection
  const getGridCols = () => {
    const colsMap: Record<string, string> = {
      '2': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-2',
      '3': 'grid-cols-2 sm:grid-cols-3',
      '4': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
      '5': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
      '6': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
    }
    return colsMap[maxLogosPerRow] || 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
  }

  // Get logo background class
  const getLogoBgClass = () => {
    const bgMap = {
      none: '',
      light: 'bg-white p-4',
      gray: 'bg-gray-50 p-4',
      rounded: 'bg-white p-4 rounded-lg shadow-sm',
    }
    return bgMap[logoBackground] || ''
  }

  // Render logo item
  const renderLogo = (client: Client, index: number) => (
    <div
      key={index}
      className={`flex items-center justify-center h-24 ${getLogoBgClass()}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {client.url ? (
        <a
          href={client.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative w-full h-full"
          title={client.name}
        >
          <Image
            src={client.logo.url}
            alt={client.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </a>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={client.logo.url}
            alt={client.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
      )}
    </div>
  )

  // Render testimonial item
  const renderTestimonial = (client: Client, index: number) => {
    if (!client.testimonial) return null

    const { content, author, position, company, authorImage } = client.testimonial

    return (
      <div
        key={index}
        className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${
          testimonialLayout === 'slider' ? 'w-full flex-shrink-0' : ''
        }`}
      >
        <div className="mb-4 text-indigo-600">
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 32 32">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.016 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.36-2.304-5.6-5.088-5.6-1.024 0-1.856.832-1.856 1.856 0 1.152.96 1.792 1.856 1.792.64 0 1.28-.192 1.856-.384.32 3.2-1.6 6.4-5.12 6.4-1.92 0-3.2-1.6-3.2-4.352 0-5.248 4.224-10.176 9.6-13.44L9.352 4zm16 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.016 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.36-2.304-5.6-5.088-5.6-1.024 0-1.856.832-1.856 1.856 0 1.152.96 1.792 1.856 1.792.64 0 1.28-.192 1.856-.384.32 3.2-1.6 6.4-5.12 6.4-1.92 0-3.2-1.6-3.2-4.352 0-5.248 4.224-10.176 9.6-13.44L25.352 4z" />
          </svg>
        </div>
        <p className="text-gray-600 mb-6">"{content}"</p>
        <div className="flex items-center">
          {authorImage && (
            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
              <Image src={authorImage.url} alt={author} fill className="object-cover" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{author}</p>
            {(position || company) && (
              <p className="text-sm text-gray-500">
                {position}
                {position && company ? ', ' : ''}
                {company && <span>{company}</span>}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render content based on display type
  const renderContent = () => {
    switch (displayType) {
      case 'carousel':
        return (
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide py-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {clients.map((client, index) => (
              <div key={index} className="flex-shrink-0 px-4 w-64">
                {renderLogo(client, index)}
              </div>
            ))}
          </div>
        )

      case 'testimonials':
        if (testimonialLayout === 'slider') {
          return (
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {clients.map((client, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      {renderTestimonial(client, index)}
                    </div>
                  ))}
                </div>
              </div>
              {clients.length > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {clients.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === index ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        }

        return (
          <div
            className={`grid gap-6 ${
              testimonialLayout === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-3xl mx-auto'
            }`}
          >
            {clients.map((client, index) => (
              <div key={index}>{renderTestimonial(client, index)}</div>
            ))}
          </div>
        )

      case 'combined':
        return (
          <div className="space-y-12">
            <div className={`grid ${getGridCols()} gap-6`}>
              {clients.map((client, index) => (
                <div key={`logo-${index}`}>{renderLogo(client, index)}</div>
              ))}
            </div>
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">What Our Clients Say</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {clients
                  .slice(0, 2)
                  .map(
                    (client, index) =>
                      client.testimonial && (
                        <div key={`testimonial-${index}`}>{renderTestimonial(client, index)}</div>
                      ),
                  )}
              </div>
            </div>
          </div>
        )

      case 'grid':
      default:
        return (
          <div className={`grid ${getGridCols()} gap-6`}>
            {clients.map((client, index) => (
              <div key={index}>{renderLogo(client, index)}</div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(heading || description) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{heading}</h2>
            )}
            {description && (
              <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">{description}</p>
            )}
          </div>
        )}

        <div className={showDivider ? 'divide-y divide-gray-200' : ''}>{renderContent()}</div>
      </div>
    </div>
  )
}

export default StrpsClients
