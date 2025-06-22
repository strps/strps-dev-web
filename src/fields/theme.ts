import { Field } from 'payload'

export const theme = (defaultValue?: 'auto' | 'light' | 'dark' | 'inverted'): Field => {
  return {
    name: 'theme',
    type: 'select',
    enumName: 'theme',
    defaultValue: defaultValue || 'auto',
    options: [
      { label: 'Auto', value: 'auto' },
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
      { label: 'Inverted', value: 'inverted' },
    ],
  }
}
