import { HeaderNav } from '@strps-website/ui'
import { getCachedGlobal } from '@/utilities/getGlobals'

import type { Header, Page } from '@/payload-types'
import deepMerge from '@/utilities/deepMerge'

interface HeaderProps {
  headerOverrides?: Partial<Header>
}

export async function Header({ headerOverrides }: HeaderProps) {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const header = deepMerge(headerData, headerOverrides)
  const navItems = header.navItems!.map((item) => {

    var href: string | undefined;
    if (item.link.type === 'reference') {
      const ref = item.link.reference;
      switch (ref?.relationTo) {
        case 'pages':
          href = `/${(ref.value as Page).slug}`;
          break;
        case 'posts':
          href = `/blog/${(ref.value as any).slug}`;
          break;
        default:
          href = '/';
      }
    } else {
      href = item.link.url || undefined;
    }

    return (
      {
        name: item.link.label,
        href: href,
      })
  })

  console.log('Header props:', { header });

  return (
    <HeaderNav
      navItems={navItems}
      brand={"C.Jerez"}
      overlay={header.overlay || false}
      background={header.background || true}
      theme={header.theme || 'auto'}
    />
  )
}
