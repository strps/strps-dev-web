import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Copyright as CopyrightType } from '@/payload-types'

export const Copyright: React.FC = async () => {
  const data = await getCachedGlobal('copyright', 1)()
  const { name, startDate } = data as CopyrightType

  const startYear = new Date(startDate).getFullYear()
  const endYear = new Date().getFullYear()
  const yearRange = startYear === endYear ? startYear : `${startYear} - ${endYear}`

  return (
    <div className="text-sm text-muted-foreground text-center py-4">
      &copy; {yearRange} {name}. All Rights Reserved.
    </div>
  )
}
