import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getCopyright() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.findGlobal({
    slug: 'copyright',
  })
  return data
}

export function useCopyright() {
  // In a real app, you would use a proper data fetching hook here
  // For now, we'll return a default value
  return {
    copyrightText: 'All Rights Reserved.',
    isLoading: false,
    error: null,
  }
}
