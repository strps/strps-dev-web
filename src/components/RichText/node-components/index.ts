// Node Components
export { BannerBlock } from './BannerBlock'
export { MediaBlock } from './MediaBlock'
export { CodeBlock } from './CodeBlock'
export { CallToActionBlock } from './CallToActionBlock'
export { Heading } from './Heading'
export { List } from './List'
export { Paragraph } from './Paragraph'
export { HorizontalRule } from './HorizontalRule'

// Re-export types from individual components if needed
import type { BannerBlockPropsWithNode } from './BannerBlock'
import type { MediaBlockPropsWithNode } from './MediaBlock'
import type { CodeBlockPropsWithNode } from './CodeBlock'
import type { CallToActionBlockPropsWithNode } from './CallToActionBlock'
import type { HeadingProps } from './Heading'
import type { ListProps } from './List'
import type { ParagraphProps } from './Paragraph'

export type NodeComponentProps =
  | BannerBlockPropsWithNode
  | MediaBlockPropsWithNode
  | CodeBlockPropsWithNode
  | CallToActionBlockPropsWithNode
  | HeadingProps
  | ListProps
  | ParagraphProps
  | {} // For HorizontalRule which has no props
