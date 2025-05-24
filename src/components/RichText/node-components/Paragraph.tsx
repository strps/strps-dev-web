import { ReactNode } from 'react'

export interface ParagraphProps {
  node: {
    children: any[]
  }
  nodesToJSX: (params: { nodes: any[] }) => ReactNode
}

export const Paragraph = ({ node, nodesToJSX }: ParagraphProps) => {
  const text = nodesToJSX({ nodes: node.children })
  return <p className="mb-2 pl-4">{text}</p>
}
