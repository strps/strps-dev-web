import { CodeBlock as CodeBlockComponent, CodeBlockProps } from '@/components/code/Component'

export interface CodeBlockPropsWithNode {
  node: {
    fields: CodeBlockProps
  }
}

export const CodeBlock = ({ node }: CodeBlockPropsWithNode) => (
  <CodeBlockComponent className="col-start-2 my-8" {...node.fields} />
)
