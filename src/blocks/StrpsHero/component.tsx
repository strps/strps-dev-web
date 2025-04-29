import { Page } from '@/payload-types'
import SVGCircles from './SVGCircles'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button' // Assuming you have a Shadcn Button component
import Link from 'next/link'

type Props = Extract<Page['layout'][0], { blockType: 'StrpsHero' }>

export const StrpsHero: React.FC<
  Props & {
    id?: string
  }
> = (props) => {
  const { text, title, link } = props // Assuming your StrapiHero block has a 'contact' field

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center overflow-hidden relative text-primary">
      <SVGCircles
        className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20"
        aria-hidden="true"
      />
      <div className="container mx-auto text-center relative z-10 py-16 md:py-24">
        {title && <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{title}</h1>}
        {text && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8">{text}</p>
        )}
        <Link href={link.url} aria-label={link.label}>
          <Button variant="default">{link.label}</Button>
        </Link>
      </div>
      {/* <DownDoritos /> */}
    </section>
  )
}

const DownDoritos = () => {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full h-auto text-accent dark:text-accent-foreground"
      viewBox="-5 -5 110 135"
      style={{ zIndex: 10 }}
      aria-hidden="true"
    >
      <path d="M 0 0 L 50 25 L 100 0" fill="currentColor" />
      <path d="M 0 0 L 50 25 L 100 0" transform="translate(0, 50)" fill="currentColor" />
      <path d="M 0 0 L 50 25 L 100 0" transform="translate(0, 100)" fill="currentColor" />
    </svg>
  )
}
