import { Section } from '@/components/Section'
import { Button } from '../ui/button'
import Link from 'next/link'

interface StrpsHeroProps {
  id?: string
  title?: string
  text?: string
  links?: {
    variant?: 'default' | 'outline'
    label?: string | null
    newTab?: boolean | null
    href?: string | null
  }[]
  section?: Partial<React.ComponentProps<typeof Section>>
}

export const StrpsHero: React.FC<StrpsHeroProps> = ({ id, title, text, links, section }) => {

  return (
    <Section
      id={id}
      {...section}
      className="pt-16 min-h-200 flex flex-col items-center justify-center relative text-primary overflow-hidden"
    >
      <div className="flex flex-col gap-8 px-4 mt-4">
        {title && <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{title}</h1>}
        {text && (
          <p className="text-lg self-center place-self-center md:text-xl text-muted-foreground max-w-xl mb-8">
            {text}
          </p>
        )}
        {links && (
          <div>
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex justify-center gap-4 mx-auto flex-wrap">
                {links.map((link, i) => {

                  const newTabProps = link.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

                  return (
                    <li key={i} className="w-auto">
                      <Button asChild variant={link.variant || 'default'}>
                        <Link href={link.href || ''} {...newTabProps}>
                          {link.label && link.label}
                        </Link>
                      </Button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </Section>
  )
}
