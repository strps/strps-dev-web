import { Page } from '@/payload-types'
import SVGCircles from './SVGCircles'
import { CMSLink } from '@/components/Link'

type StrpsHeroProps = Extract<Page['layout'][number], { blockType: 'strpsHero' }>

export const StrpsHero: React.FC<StrpsHeroProps & { id?: string }> = (props) => {
  const { id, text, title, links } = props

  return (
    <div className="" id={`block-${id}`}>
      <section className="h-svh flex flex-col items-center justify-center overflow-hidden relative text-primary">
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
          {links && (
            <div className="text-center">
              {Array.isArray(links) && links.length > 0 && (
                <ul className="flex md:justify-center gap-4">
                  {links.map(({ link }, i) => {
                    return (
                      <li key={i}>
                        <CMSLink {...link} />
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
