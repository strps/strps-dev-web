import { Page } from '@/payload-types'
import SVGCircles from './SVGCircles'
import { CMSLink } from '@/components/Link'

type StrpsHeroProps = Extract<Page['layout'][number], { blockType: 'strpsHero' }>

export const StrpsHero: React.FC<StrpsHeroProps & { id?: string }> = (props) => {
  const { id, text, title, links } = props

  return (
    <div className="" id={`block-${id}`}>
      <section className="h-svh flex flex-col items-center justify-center relative text-primary">
        <SVGCircles
          className="absolute inset-0 w-full h-full stroke-[var(--svg-circle-color)]"
          aria-hidden="true"
        />
        <div className="container p-8">
          {title && <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{title}</h1>}
          {text && (
            <p className="text-lg self-center place-self-center md:text-xl text-muted-foreground max-w-xl mb-8">
              {text}
            </p>
          )}
          {links && (
            <div className="">
              {Array.isArray(links) && links.length > 0 && (
                <ul className="flex justify-center gap-4 mx-auto">
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
