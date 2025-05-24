import {
  DefaultNodeTypes,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import { cn } from '@/utilities/ui'

// Import node components
import {
  BannerBlock,
  MediaBlock,
  CodeBlock,
  CallToActionBlock,
  Heading,
  List,
  Paragraph,
  HorizontalRule,
} from './node-components'

// Import types
import type { BannerBlock as BannerBlockType } from '@/payload-types'
import type { CallToActionBlock as CTABlockType } from '@/payload-types'
import type { MediaBlock as MediaBlockType } from '@/payload-types'
import type { CodeBlockProps as CodeBlockType } from '@/blocks/Code/Component'
import type { SerializedBlockNode } from '@payloadcms/richtext-lexical'

/**
 * Union type of all possible node types that can be rendered by the RichText component.
 * Extends default node types with custom block types used in the application.
 */
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockType | MediaBlockType | BannerBlockType | CodeBlockType>

/**
 * Converts an internal document link to a URL path.
 * @param linkNode - The link node containing document reference
 * @returns The URL path for the linked document
 * @throws {Error} If the document value is not an object
 */
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

/**
 * Configuration for converting lexical nodes to React components.
 * Maps each node type to its corresponding React component.
 */
const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock node={node} />,
    mediaBlock: ({ node }) => <MediaBlock node={node} />,
    code: ({ node }) => <CodeBlock node={node} />,
    cta: ({ node }) => <CallToActionBlock node={node} />,
  },
  heading: Heading,
  list: List,
  paragraph: Paragraph,
  horizontalrule: HorizontalRule,
})

/**
 * Props for the RichText component
 * @property {DefaultTypedEditorState} data - The rich text content to render
 * @property {boolean} [enableGutter=true] - Whether to enable container gutters
 * @property {boolean} [enableProse=true] - Whether to apply prose styling
 */
type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

/**
 * A rich text renderer component that converts lexical editor state to React components.
 * Supports various node types including custom blocks, headings, lists, and more.
 *
 * @component
 * @example
 * ```tsx
 * <RichText
 *   data={editorState}
 *   enableGutter={true}
 *   enableProse={true}
 *   className="custom-class"
 * />
 * ```
 */
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

// Re-export types for external use
export type { NodeTypes }

/**
 * Type alias for RichText component props.
 * Can be used when you need to reference the component's props type.
 */
export type RichTextProps = Props
