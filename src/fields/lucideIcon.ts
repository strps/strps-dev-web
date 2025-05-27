import type { Field } from 'payload'
// import tags from 'lucide-static/tags.json'

// const iconTags = Object.keys(tags).map((tag) => ({ label: tag, value: tag }))
// export type LucideIcon = (typeof iconTags)[number]['value']

const iconTags = [
  { label: 'none', value: 'none' },
  { label: 'code', value: 'code' },
  { label: 'circuit-board', value: 'circuit-board' },
  { label: 'palette', value: 'palette' },
  { label: 'monitor', value: 'monitor' },
  { label: 'briefcase', value: 'briefcase' },
]

export const lucideIcon: Field = {
  name: 'lucideIcon',
  type: 'select',
  enumName: 'lucideIcon',
  options: iconTags,
}
