import { MediaBlock as MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import { MediaBlock as MediaBlockProps } from '@/payload-types'

export interface MediaBlockPropsWithNode {
  node: {
    fields: MediaBlockProps
  }
}

export const MediaBlock = ({ node }: MediaBlockPropsWithNode) => (
  <MediaBlockComponent
    className="col-start-1 col-span-3"
    imgClassName="m-0"
    {...node.fields}
    captionClassName="mx-auto max-w-[48rem]"
    enableGutter={false}
    disableInnerContainer={true}
  />
)
