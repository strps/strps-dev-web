import React from 'react'
import { Block } from 'payload/types'
import Link from 'next/link'

type Service = {
  title: string
  description?: string
  icon?: string
  link?: {
    type: 'internal' | 'external'
    label: string
    page?: any
    url?: string
  }
  features?: Array<{ feature: string }>
}

type Props = {
  block: Block & {
    heading?: string
    description?: string
    services?: Service[]
    layout?: 'grid' | 'list' | 'cards'
    showFeatured?: boolean
  }
}

const StrpsServices: React.FC<Props> = ({
  block: { heading, description, services = [], layout = 'grid', showFeatured = false },
}) => {
  // If showFeatured is true, the first service will be treated as featured
  const featuredService = showFeatured && services.length > 0 ? services[0] : null
  const otherServices = showFeatured ? services.slice(1) : services

  const renderService = (service: Service, index: number, isFeatured: boolean = false) => {
    const { title, description, icon, link, features = [] } = service

    const serviceContent = (
      <div
        className={`h-full ${isFeatured ? 'p-8' : 'p-6'} ${!isFeatured ? 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300' : ''}`}
      >
        {icon && (
          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
            {/* In a real implementation, you would render the actual Lucide icon */}
            <span className="text-xl">{icon}</span>
          </div>
        )}
        <h3 className={`${isFeatured ? 'text-2xl' : 'text-lg'} font-medium text-gray-900 mb-2`}>
          {title}
        </h3>
        {description && (
          <p className={`${isFeatured ? 'text-lg' : 'text-base'} text-gray-500 mb-4`}>
            {description}
          </p>
        )}

        {features.length > 0 && (
          <ul className="mt-4 space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">{feature.feature}</span>
              </li>
            ))}
          </ul>
        )}

        {link && (
          <div className="mt-6">
            {link.type === 'internal' && link.page ? (
              <Link
                href={`/${link.page.slug}`}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {link.label} →
              </Link>
            ) : link.url ? (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {link.label} →
              </a>
            ) : null}
          </div>
        )}
      </div>
    )

    return (
      <div
        key={index}
        className={`${isFeatured ? 'lg:col-span-2 bg-gradient-to-r from-indigo-700 to-indigo-600 text-white rounded-lg shadow-xl' : 'bg-white'}`}
      >
        {isFeatured ? (
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="p-8">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                {heading || 'Our Services'}
              </h2>
              <p className="mt-4 text-lg text-indigo-100">
                {description || 'Explore our comprehensive range of professional services'}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg m-4">{serviceContent}</div>
          </div>
        ) : (
          serviceContent
        )}
      </div>
    )
  }

  // Determine grid columns based on layout
  const gridCols = {
    grid: 'md:grid-cols-2 lg:grid-cols-3',
    list: 'md:grid-cols-1',
    cards: 'md:grid-cols-2 lg:grid-cols-3',
  }[layout]

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showFeatured && heading && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{heading}</h2>
            {description && <p className="mt-4 text-xl text-gray-500">{description}</p>}
          </div>
        )}

        <div className={`grid gap-8 ${gridCols} ${showFeatured ? 'lg:grid-cols-1' : ''}`}>
          {featuredService && renderService(featuredService, 0, true)}
          {otherServices.map((service, index) => renderService(service, index + 1, false))}
        </div>
      </div>
    </div>
  )
}

export default StrpsServices
