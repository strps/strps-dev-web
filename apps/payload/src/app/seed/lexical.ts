/**
 * Minimal Lexical node builders for seed data.
 *
 * Shared by every `*-data.ts` file that writes a `richText` field. Rich-text
 * values are replaced wholesale on the `es` write rather than structurally
 * zipped, so the same builders serve both the `en` data and the Spanish patch
 * (see `localize.ts`).
 */

export const h2 = (text: string) => ({
    type: 'heading',
    tag: 'h2',
    children: [{ type: 'text', text, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
})

export const h3 = (text: string) => ({
    type: 'heading',
    tag: 'h3',
    children: [{ type: 'text', text, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
})

export const p = (text: string) => ({
    type: 'paragraph',
    children: [{ type: 'text', text, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
})

export const ul = (items: string[]) => ({
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: items.map((text, i) => ({
        type: 'listitem',
        children: [{ type: 'text', text, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        value: i + 1,
        version: 1,
    })),
})

export type LexicalNode = { [k: string]: unknown; type: string; version: number }

export const doc = (...children: LexicalNode[]) => ({
    root: {
        type: 'root',
        children,
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
    },
})
