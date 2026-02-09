import { ReactNode } from 'react'
import { Square, SquareCheckBig } from 'lucide-react'
import { SerializedListItemNode, SerializedListNode } from 'node_modules/@payloadcms/richtext-lexical/dist/features/lists/plugin'
import { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

export interface ListItem extends SerializedListItemNode {
  checked?: boolean
  children: SerializedLexicalNode[]
  value: number
}

export interface ListProps {
  node: SerializedListNode
  nodesToJSX: (params: { nodes: SerializedLexicalNode[] }) => ReactNode
}



export const List = ({ node, nodesToJSX }: ListProps) => {
  const listTypes = {
    check: (
      <ul className="my-6 ml-6 list-none [&>li]:mt-2">
        {node.children.map((child: any, i) => (
          <li key={i} className="flex items-start">
            {child.checked ? (
              <SquareCheckBig className="w-4 h-4 mr-2 mt-1 shrink-0 text-primary" />
            ) : (
              <Square className="w-4 h-4 mr-2 mt-1 shrink-0 text-muted-foreground" />
            )}
            <div>{nodesToJSX({ nodes: child.children })}</div>
          </li>
        ))}
      </ul>
    ),
    bullet: (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        {node.children.map((child: any, i) => (
          <li key={i}>
            {nodesToJSX({ nodes: child.children })}
          </li>
        ))}
      </ul>
    ),
    number: (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
        {node.children.map((child: any, i) => (
          <li key={i}>
            {nodesToJSX({ nodes: child.children })}
          </li>
        ))}
      </ol>
    ),
  }

  return listTypes[node.listType] || null
}
