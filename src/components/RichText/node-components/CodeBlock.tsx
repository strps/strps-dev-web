import { CodeBlock as CodeBlockComponent, CodeBlockProps } from '@/blocks/Code/Component'

export interface CodeBlockPropsWithNode {
  node: {
    fields: CodeBlockProps
  }
}

export const CodeBlock = ({ node }: CodeBlockPropsWithNode) => (
  <CodeBlockComponent className="col-start-2" {...node.fields} />
)
