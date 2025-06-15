import { StatVariants, CtaVariants } from './variants'

export interface StatItem {
  value: string
  label: string
  prefix?: string | null
  suffix?: string | null
  color?: StatVariants['color']
  icon?: {
    url: string
    alt?: string
  }
}

export interface CtaProps {
  enable?: boolean
  text?: string
  link?: string
  style?: CtaVariants['variant']
}

export interface AnimationProps {
  enable?: boolean
  duration?: number
}

export interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none'
  padding?: {
    top?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
    bottom?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
  }
}

export interface StyleProps extends StatVariants {
  textAlign?: 'left' | 'center' | 'right'
  valueSize?: StatVariants['size']
}

export interface StrpsStatsBlock {
  heading?: string
  description?: string
  layout?: 'grid' | 'carousel' | 'side-by-side'
  columns?: '2' | '3' | '4'
  stats: StatItem[]
  animation?: AnimationProps
  style?: StyleProps
  cta?: CtaProps
  container?: ContainerProps
}
