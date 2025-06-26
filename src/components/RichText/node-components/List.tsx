import { ReactNode } from 'react'
import { CircleSmall, Square, SquareCheckBig } from 'lucide-react'
import { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

export interface ListItem extends SerializedLexicalNode {
  checked?: boolean
  children: SerializedLexicalNode[]
  value?: number
}

export interface ListProps {
  node: SerializedLexicalNode & {
    children: SerializedLexicalNode[] // Changed from ListItem[]
    listType: 'check' | 'bullet' | 'number'
  }
  nodesToJSX: (params: { nodes: SerializedLexicalNode[] }) => ReactNode
}

export const List = ({ node, nodesToJSX }: ListProps) => {
  const listTypes = {
    check: (
      <ul className="list-none ml-4 my-2">
        {node.children.map((child: any, i) => (
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
        {node.children.map((child: any, i) => (
          <li key={i} className="flex">
            <CircleSmall className="w-[1.25em] h-[1.25em] mr-[0.5em] shrink-0" />
            {nodesToJSX({ nodes: child.children })}
          </li>
        ))}
      </ul>
    ),
    number: (
      <ol className="list-none ml-4">
        {node.children.map((child: any, i) => (
          <li key={i} className="flex">
            <span className="block min-w-[1.25em] h-[1.25em] mr-[0.5em] pl-[0.5em] shrink-0">
              {child.value ?? i + 1}
            </span>
            {nodesToJSX({ nodes: child.children })}
          </li>
        ))}
      </ol>
    ),
  }

  return listTypes[node.listType] || null
}
