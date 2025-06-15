import React from 'react'
import { StrpsServicesBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic'
import { CMSLink } from '@/components/Link'

type Service = NonNullable<StrpsServicesBlock['services']>[number]
type LucideIconName = keyof typeof dynamicIconImports

export const StrpsServices: React.FC<StrpsServicesBlock> = ({
  heading,
  description,
  services: servicesProp,
  layout = 'grid',
  showFeatured = false,
}) => {
  const services = servicesProp || []

  // If showFeatured is true, the first service will be treated as featured
  const featuredService = showFeatured && services.length > 0 ? services[0] : null
  const otherServices = showFeatured ? services.slice(1) : services

  const renderService = (service: Service, index: number, isFeatured: boolean = false) => {
    const { title, description, icon, link } = service

    // Helper function to safely get the URL from a link object
    const getLinkUrl = (link: any) => {
      if (link.type !== 'reference' || !link.reference) return link.url || ''
      if (typeof link.reference.value === 'number') return ''
      return `/${link.reference.value.slug}`
    }

    // Check if the icon is a valid Lucide icon
    const isValidIconName = icon && icon in dynamicIconImports
    const iconComponent = isValidIconName ? <DynamicIcon name={icon as LucideIconName} /> : null

    const serviceContent = (
      <div
        className={cn(
          'h-full',
          isFeatured ? 'p-8' : 'p-6',
          !isFeatured &&
            'bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border',
        )}
      >
        {iconComponent}
        <h3
          className={cn(
            'font-medium mb-2',
            isFeatured ? 'text-2xl text-primary-foreground' : 'text-lg text-foreground',
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              'mb-4',
              isFeatured ? 'text-lg text-muted-foreground' : 'text-base text-muted-foreground',
            )}
          >
            {description}
          </p>
        )}
        {link && (
          <span
            className={cn(
              'inline-flex items-center text-sm font-medium',
              isFeatured ? 'text-primary-foreground' : 'text-primary',
            )}
          >
            {link.label}
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        )}
      </div>
    )

    if (link) {
      return (
        <CMSLink
          key={index}
          type={link.type || 'custom'}
          url={getLinkUrl(link)}
          newTab={link.newTab}
          className={cn('block h-full', {
            'bg-primary text-primary-foreground rounded-lg': isFeatured,
          })}
        >
          {serviceContent}
        </CMSLink>
      )
    }

    return (
      <div
        key={index}
        className={cn('h-full', {
          'bg-primary text-primary-foreground rounded-lg': isFeatured,
        })}
      >
        {serviceContent}
      </div>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="space-y-12">
          {featuredService && (
            <div className="bg-primary text-primary-foreground rounded-lg overflow-hidden">
              {renderService(featuredService, 0, true)}
            </div>
          )}

          <div
            className={cn('grid gap-6', {
              'md:grid-cols-2 lg:grid-cols-3': layout === 'grid',
              'space-y-6': layout === 'list',
              'md:grid-cols-2': layout === 'cards',
            })}
          >
            {otherServices.map((service, index) => (
              <React.Fragment key={index}>{renderService(service, index + 1)}</React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
