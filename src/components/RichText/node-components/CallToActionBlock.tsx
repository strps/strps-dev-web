import { CallToActionBlock as CallToActionBlockComponent } from '@/blocks/CallToAction/Component'
import { CallToActionBlock as CallToActionBlockProps } from '@/payload-types'

export interface CallToActionBlockPropsWithNode {
  node: {
    fields: CallToActionBlockProps
  }
}

export const CallToActionBlock = ({ node }: CallToActionBlockPropsWithNode) => (
  <CallToActionBlockComponent {...node.fields} />
)
