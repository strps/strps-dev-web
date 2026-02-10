import { CallToActionBlock as CallToActionBlockComponent } from '@/components/CTA'
import { CallToActionBlock as CallToActionBlockProps } from '../../../../../payload/src/payload-types'

export interface CallToActionBlockPropsWithNode {
  node: {
    fields: CallToActionBlockProps
  }
}

export const CallToActionBlock = ({ node }: CallToActionBlockPropsWithNode) => (
  <CallToActionBlockComponent className="my-8" {...node.fields} />
)
