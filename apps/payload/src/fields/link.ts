import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import crypto from 'crypto'

/**
 * Which component renders the link on the frontend. Each appearance carries its own
 * variant set, kept in sync with the component it maps to:
 *   `default`   → <Button>    (apps/frontend/src/components/ui/button.tsx)
 *   `svgButton` → <SVGButton> (apps/frontend/src/components/SVGButton.tsx)
 */
export type LinkAppearances = 'default' | 'svgButton'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Button',
    value: 'default',
  },
  svgButton: {
    label: 'SVG Button',
    value: 'svgButton',
  },
}

/** Mirrors `buttonVariants` in apps/frontend/src/components/ui/button.tsx. */
export const buttonVariantOptions: Record<string, { label: string; value: string }> = {
  default: { label: 'Default', value: 'default' },
  destructive: { label: 'Destructive', value: 'destructive' },
  outline: { label: 'Outline', value: 'outline' },
  secondary: { label: 'Secondary', value: 'secondary' },
  ghost: { label: 'Ghost', value: 'ghost' },
  link: { label: 'Link', value: 'link' },
  solid: { label: 'Solid', value: 'solid' },
  outlineGhost: { label: 'Outline Ghost', value: 'outlineGhost' },
}

/** Mirrors `GRAPHICS` in apps/frontend/src/components/SVGButton.tsx. */
export const svgButtonVariantOptions: Record<string, { label: string; value: string }> = {
  default: { label: 'Default', value: 'default' },
  destructive: { label: 'Destructive', value: 'destructive' },
  secondary: { label: 'Secondary', value: 'secondary' },
  outline: { label: 'Outline', value: 'outline' },
  ghost: { label: 'Ghost', value: 'ghost' },
  solid: { label: 'Solid', value: 'solid' },
  outlineGhost: { label: 'Outline Ghost', value: 'outlineGhost' },
  send: { label: 'Send', value: 'send' },
  github: { label: 'GitHub', value: 'github' },
  linkedin: { label: 'LinkedIn', value: 'linkedin' },
}

const toOptions = (
  registry: Record<string, { label: string; value: string }>,
  keys?: string[],
): { label: string; value: string }[] =>
  (keys ?? Object.keys(registry)).map((key) => registry[key] ?? { label: key, value: key })

type LinkType = (options?: {
  /**
   * Which appearances the editor may choose from. Defaults to both. `false` drops the
   * appearance/variant controls entirely (plain link).
   */
  appearances?: LinkAppearances[] | false
  /** Restrict the `default` (Button) appearance to these variants. Defaults to all. */
  variants?: string[]
  /** Restrict the `svgButton` appearance to these variants. Defaults to all. */
  svgVariants?: string[]
  disableLabel?: boolean
  overrides?: Partial<GroupField>
  hashEnumName?: boolean
  /**
   * Whether the link's destination (reference/url) and label are required once
   * the group is touched. Defaults to `true` (existing behavior). Set `false`
   * for a standalone, genuinely optional single-link field — otherwise Payload's
   * generated type marks the whole group as required on the parent block, which
   * makes it impossible to leave the link empty.
   */
  required?: boolean
}) => Field

export const link: LinkType = ({
  appearances,
  variants,
  svgVariants,
  disableLabel = false,
  overrides = {},
  hashEnumName,
  required = true,
} = {}) => {
  /**
   * Payload derives enum type names from the table name plus the column path, which can
   * overflow Postgres' 63-character cap on deeply nested blocks. Reproduce the generated
   * name when it fits — so existing enums keep their readable names — and fall back to a
   * hash of the table name otherwise.
   * ref: https://github.com/payloadcms/payload/discussions/8544
   */
  const enumNameFor =
    (column: string) =>
    ({ tableName }: { tableName?: string }) => {
      const generated = `enum_${tableName}_${column}`
      if (!hashEnumName && generated.length <= 63) return generated
      return (
        crypto
          .createHash('md5')
          .update(tableName || '')
          .digest('hex') + `_${column}`
      )
    }

  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'posts', 'docs'],
      required,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          // Only the visible link text is localized — reference/url/appearance
          // stay shared across locales (same destination, translated label).
          localized: true,
          admin: {
            width: '50%',
          },
          label: 'Label',
          required,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    const appearancesToUse: LinkAppearances[] = appearances ?? ['default', 'svgButton']

    const appearanceFields: Field[] = [
      {
        name: 'appearance',
        type: 'select',
        enumName: enumNameFor('appearance'),
        admin: {
          description: 'Which button component renders this link.',
          width: '34%',
        },
        defaultValue: appearancesToUse[0] ?? 'default',
        options: appearancesToUse.map(
          (appearance) => appearanceOptions[appearance] ?? { label: appearance, value: appearance },
        ),
      },
    ]

    if (appearancesToUse.includes('default')) {
      appearanceFields.push({
        name: 'variant',
        type: 'select',
        enumName: enumNameFor('variant'),
        admin: {
          condition: (_, siblingData) => (siblingData?.appearance ?? 'default') === 'default',
          description: 'Button style.',
          width: '66%',
        },
        defaultValue: 'default',
        label: 'Variant',
        options: toOptions(buttonVariantOptions, variants),
      })
    }

    if (appearancesToUse.includes('svgButton')) {
      appearanceFields.push({
        name: 'svgVariant',
        type: 'select',
        enumName: enumNameFor('svg_variant'),
        admin: {
          condition: (_, siblingData) => siblingData?.appearance === 'svgButton',
          description: 'SVG button color/icon preset.',
          width: '66%',
        },
        defaultValue: svgVariants?.[0] ?? 'default',
        label: 'SVG Variant',
        options: toOptions(svgButtonVariantOptions, svgVariants),
      })
    }

    linkResult.fields.push({
      type: 'row',
      fields: appearanceFields,
    })
  }

  return deepMerge(linkResult, overrides)
}
