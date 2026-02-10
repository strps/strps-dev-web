import { BannerBlock as BannerBlockComponent, type Props as BannerComponentProps } from '@/components/Banner'
import { BannerBlock as BannerBlockProps } from '../../../../../payload/src/payload-types'

export interface BannerBlockPropsWithNode {
  node: {
    fields: BannerComponentProps
  }
}

export const BannerBlock = ({ node }: BannerBlockPropsWithNode) => (
  <BannerBlockComponent className="col-start-2 my-8" {...node.fields} />
)
