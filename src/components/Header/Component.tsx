import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import deepMerge from '@/utilities/deepMerge'

interface HeaderProps {
  headerOverrides?: Partial<Header>
}

export async function Header({ headerOverrides }: HeaderProps) {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const header = deepMerge(headerData, headerOverrides)

  // console.log(headerOverrides)
  // console.log(headerData)
  // console.log(header)
  return <HeaderClient data={header} />
}
