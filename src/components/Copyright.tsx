import React from 'react'
import { useCopyright } from '@/globals/copyright/route'

export const Copyright: React.FC = () => {
  const { copyrightText } = useCopyright()
  const currentYear = new Date().getFullYear()

  return (
    <div className="text-sm text-gray-600 dark:text-gray-400 text-center py-4">
      &copy; {currentYear} {copyrightText}
    </div>
  )
}
