import { Page } from '@/payload-types'
import SVGCircles from './SVGCircles'

/**
 * Hero component
 * @component
 * @example
 * return (
 *  <Hero />
 * )
 * @returns
 * <section className={styles.hero}>
 * <SVGCircles />
 */

type Props = Extract<Page['layout'][0], { blockType: 'StrpsHero' }>

export const StrpsHero: React.FC<
  Props & {
    id?: string
  }
> = (props) => {
  console.log(props)
  const { text, title } = props

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center overflow-hidden relative">
      <SVGCircles className={'absolute'} />
      <div className="">
        <p>{title}</p>
        <p>{text}</p>
        <p></p>
      </div>
      {/* <DownDoritos /> */}
    </section>
  )
}

const DownDoritos = () => {
  return (
    <svg className="" viewBox="-5 -5 110 135" style={{ zIndex: 1000 }}>
      <path d="M 0 0 L 50 25 L 100 0" />
      <path d="M 0 0 L 50 25 L 100 0" transform="translate(0, 50)" />
      <path d="M 0 0 L 50 25 L 100 0" transform="translate(0, 100)" />
    </svg>
  )
}
