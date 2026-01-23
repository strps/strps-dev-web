import { Field } from 'payload'
import { theme } from './theme'

export const headerOverrides = (defaultTheme?: 'auto' | 'light' | 'dark' | 'inverted'): Field => {
  return {
    name: 'headerOverrides',
    type: 'group',
    label: 'Header Overrides',
    fields: [
      theme(defaultTheme || 'auto'),
      {
        name: 'background',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        name: 'overlay',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
  }
}
