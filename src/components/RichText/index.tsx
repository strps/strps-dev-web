import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import { CircleSmall, Square, SquareCheckBig } from 'lucide-react'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
  // Custom heading converter
  heading: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children })
    const headings = {
      h1: <h1 className="text-4xl font-bold mb-2">{text}</h1>,
      h2: <h2 className="text-3xl font-bold mb-2">{text}</h2>,
      h3: <h3 className="text-2xl font-bold mb-2">{text}</h3>,
      h4: <h4 className="text-xl font-bold mb-2">{text}</h4>,
      h5: <h5 className="text-lg font-bold mb-2">{text}</h5>,
      h6: <h6 className="text-base font-bold mb-2">{text}</h6>,
    }
    const heading = headings[node.tag]
    return heading
  },
  // Custom list converter
  list: ({ node, nodesToJSX }) => {
    const nodelistTypes = {
      check: (
        <ul className="list-none ml-4 my-2">
          {node.children.map((child, i) => (
            <li key={i} className="flex">
              {child.checked ? (
                <SquareCheckBig className="w-[1.25em] h-[1.25em] mr-[0.5em] shrink-0" />
              ) : (
                <Square className="w-[1.25em] h-[1.25em] mr-[0.5em] shrink-0" />
              )}
              {nodesToJSX({ nodes: child.children })}
            </li>
          ))}
        </ul>
      ),
      bullet: (
        <ul className="list-none ml-4">
          {node.children.map((child, i) => (
            <li key={i} className="flex">
              <CircleSmall className="w-[1.25em] h-[1.25em] mr-[0.5em] shrink-0" />
              {nodesToJSX({ nodes: child.children })}
            </li>
          ))}
        </ul>
      ),
      number: (
        <ol className="list-none ml-4">
          {node.children.map((child, i) => (
            <li key={i} className="flex">
              <span className="block min-w-[1.25em] h-[1.25em] mr-[0.5em] pl-[0.5em] shrink-0">
                {child.value}
              </span>
              {nodesToJSX({ nodes: child.children })}
            </li>
          ))}
        </ol>
      ),
    }

    const listNode = nodelistTypes[node.listType]
    return listNode
  },
  paragraph: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children })
    return <p className="mb-2 pl-4">{text}</p>
  },
  horizontalrule: () => {
    console.log('horizontalrule')
    return <hr className="my-6 h-1 border-none bg-muted-foreground" />
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
