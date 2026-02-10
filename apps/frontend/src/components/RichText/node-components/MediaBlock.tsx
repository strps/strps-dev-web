import { MediaBlock as MediaBlockComponent } from '@/components/cms-media/block'
import { MediaBlock as MediaBlockProps } from '../../../../../payload/src/payload-types'

export interface MediaBlockPropsWithNode {
  node: {
    fields: MediaBlockProps
  }
}

export const MediaBlock = ({ node }: MediaBlockPropsWithNode) => (
  <MediaBlockComponent
    className="col-start-1 col-span-3 my-8"
    imgClassName="m-0"
    {...node.fields}
    captionClassName="mx-auto max-w-[48rem]"
    enableGutter={false}
    disableInnerContainer={true}
  />
)
