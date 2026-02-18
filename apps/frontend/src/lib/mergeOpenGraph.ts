import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'César Jerez - Web Developer',
  images: [
    {
      url: `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/website-template-OG.webp`,
    },
  ],
  siteName: 'César Jerez',
  title: 'César Jerez',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
