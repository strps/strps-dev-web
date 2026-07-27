import type { Locale } from '@/i18n/config'

export const formatDateTime = (timestamp: string, locale: Locale = 'en'): string => {
  const date = timestamp ? new Date(timestamp) : new Date()

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
