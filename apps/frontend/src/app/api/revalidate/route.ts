import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {

    if (!process.env.REVALIDATE_SECRET) {
        console.warn('⚠️ REVALIDATE_SECRET is not set in frontend')
        return new Response('Revalidation secret not configured', { status: 500 })
    }

    try {
        // 1. Verify secret (security!)
        const secret = request.headers.get('x-revalidate-secret')
        if (secret !== process.env.REVALIDATE_SECRET) {
            console.log('⚠️ Invalid revalidation secret', { received: secret })
            console.log('Expected secret:', process.env.REVALIDATE_SECRET)

            return new Response('Invalid revalidation secret', { status: 401 })
        }

        const body = await request.json()
        const { paths, tags } = body

        // Revalidate specific paths (e.g. /projects/my-project)
        if (paths && Array.isArray(paths)) {
            paths.forEach((path: string) => {
                revalidatePath(path)
                console.log(`Revalidated path: ${path}`)
            })
        }

        // Revalidate by tags (more scalable - recommended)
        if (tags && Array.isArray(tags)) {
            tags.forEach((tag: string) => {
                revalidateTag(tag, 'max')
                console.log(`Revalidated tag: ${tag}`)
            })
        }

        return Response.json({ revalidated: true, now: Date.now() })
    } catch (err) {
        console.error('Revalidation error:', err)
        return new Response('Error revalidating', { status: 500 })
    }
}