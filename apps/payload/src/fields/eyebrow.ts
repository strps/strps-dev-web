import { Field } from 'payload'

/**
 * Shared mono eyebrow label used above section titles (§4.2, §5) — reused
 * across every block that has a heading rather than redeclared per block.
 */
export const eyebrowField: Field = {
  name: 'eyebrow',
  type: 'text',
  label: 'Eyebrow',
  admin: {
    description: 'Small mono label above the title, e.g. "Services"',
  },
}
