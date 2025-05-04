import { Page } from '@/payload-types'
import SVGCircles from './SVGCircles'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type StrpsHeroProps = Extract<Page['layout'][number], { blockType: 'strpsHero' }>

export const StrpsHero: React.FC<StrpsHeroProps & { id?: string }> = (props) => {
  const { id, text, title, link } = props

  return (
    <div className="my-16" id={`block-${id}`}>
      <section className="min-h-[80vh] flex flex-col items-center justify-center overflow-hidden relative text-primary">
        <SVGCircles
          className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20"
          aria-hidden="true"
        />
        <div className="container">
          {title && (
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-center">
              {title}
            </h1>
          )}
          {text && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 text-center mx-auto">
              {text}
            </p>
          )}
          {link?.url && link?.label && (
            <div className="text-center">
              <Link href={link.url} aria-label={link.label}>
                <Button variant="default">{link.label}</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
