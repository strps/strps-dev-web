import { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { SerializedParagraphNode } from '@payloadcms/richtext-lexical'
import { ReactNode } from 'react'

export interface ParagraphProps {
  node: SerializedParagraphNode<SerializedLexicalNode>
  nodesToJSX: (params: { nodes: SerializedLexicalNode[] }) => ReactNode
}

export const Paragraph = ({ node, nodesToJSX }: ParagraphProps) => {
  const text = nodesToJSX({ nodes: node.children })
  return <p className="mb-2 pl-4z">{text}</p>
}
