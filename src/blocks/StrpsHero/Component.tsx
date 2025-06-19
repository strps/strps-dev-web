import { CMSLink } from '@/components/Link'
import { Section } from '@/components/Section/Section'
import { StrpsHeroBlock } from '@/payload-types'

export const StrpsHero: React.FC<StrpsHeroBlock & { id?: string }> = (props) => {
  const { id, title, text, links, section } = props

  return (
    <Section
      id={id}
      {...section}
      className="h-svh flex flex-col items-center justify-center relative text-primary"
    >
      {title && <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{title}</h1>}
      {text && (
        <p className="text-lg self-center place-self-center md:text-xl text-muted-foreground max-w-xl mb-8">
          {text}
        </p>
      )}
      {links && (
        <div>
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
    </Section>
  )
}
