import { BannerBlock as BannerBlockComponent } from '@/blocks/Banner/Component'
import { BannerBlock as BannerBlockProps } from '@/payload-types'

export interface BannerBlockPropsWithNode {
  node: {
    fields: BannerBlockProps
  }
}

export const BannerBlock = ({ node }: BannerBlockPropsWithNode) => (
  <BannerBlockComponent className="col-start-2 mb-4" {...node.fields} />
)
