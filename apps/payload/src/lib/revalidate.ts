const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001'
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET!

if (!REVALIDATE_SECRET) {
    console.warn('⚠️ REVALIDATE_SECRET is not set. Revalidation will not work!')
}

/**
 * Revalidate one or multiple paths (same API as Next.js revalidatePath)
 */
export async function revalidatePath(path: string | string[]) {
    const paths = Array.isArray(path) ? path : [path]

    try {
        const response = await fetch(`${FRONTEND_URL}/api/revalidate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-revalidate-secret': REVALIDATE_SECRET,
            },
            body: JSON.stringify({ paths }),
        })


        if (!response.ok) {
            console.error(`⚠️ Path revalidation failed with status ${response.status}`)
            return
        }

        console.log(`✅ Revalidated paths: ${paths.join(', ')}`)

    } catch (err) {
        console.error(` ⚠️ Failed to revalidate paths ${paths}:`, err)
    }
}

/**
 * Revalidate one or multiple tags (same API as Next.js revalidateTag)
 */
export async function revalidateTag(tag: string | string[]) {
    const tags = Array.isArray(tag) ? tag : [tag]

    try {
        const response = await fetch(`${FRONTEND_URL}/api/revalidate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-revalidate-secret': REVALIDATE_SECRET,
            },
            body: JSON.stringify({ tags }),
        })

        if (!response.ok) {
            console.error(`⚠️ Tag revalidation failed with status ${response.status}`)
            return
        }

        console.log(`✅ Revalidated tags: ${tags.join(', ')}`)
    } catch (err) {
        console.error(` ⚠️ Failed to revalidate tags ${tags}:`, err)
    }
}