import { BannerBlock as BannerBlockComponent } from '@/components/Banner'
import { BannerBlock as BannerBlockProps } from '@strps-website/types'

export interface BannerBlockPropsWithNode {
  node: {
    fields: BannerBlockProps
  }
}

export const BannerBlock = ({ node }: BannerBlockPropsWithNode) => (
  <BannerBlockComponent className="col-start-2 my-8" style={node.fields.style} content={node.fields.content as React.ComponentProps<typeof BannerBlockComponent>['content']} />
)
