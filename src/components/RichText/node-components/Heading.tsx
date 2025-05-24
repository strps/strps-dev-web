import { ReactNode } from 'react'

export interface HeadingProps {
  node: {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    children: any[]
  }
  nodesToJSX: (params: { nodes: any[] }) => ReactNode
}

export const Heading = ({ node, nodesToJSX }: HeadingProps) => {
  const text = nodesToJSX({ nodes: node.children })

  const headings = {
    h1: <h1 className="text-4xl font-bold mb-2">{text}</h1>,
    h2: <h2 className="text-3xl font-bold mb-2">{text}</h2>,
    h3: <h3 className="text-2xl font-bold mb-2">{text}</h3>,
    h4: <h4 className="text-xl font-bold mb-2">{text}</h4>,
    h5: <h5 className="text-lg font-bold mb-2">{text}</h5>,
    h6: <h6 className="text-base font-bold mb-2">{text}</h6>,
  }

  return headings[node.tag]
}
