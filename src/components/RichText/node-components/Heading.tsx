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
    h1: <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 mt-8 first:mt-0">{text}</h1>,
    h2: <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4 mt-8">{text}</h2>,
    h3: <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4 mt-6">{text}</h3>,
    h4: <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4 mt-6">{text}</h4>,
    h5: <h5 className="scroll-m-20 text-lg font-semibold tracking-tight mb-4 mt-6">{text}</h5>,
    h6: <h6 className="scroll-m-20 text-base font-semibold tracking-tight mb-4 mt-6">{text}</h6>,
  }

  return headings[node.tag]
}
