import config from '@payload-config'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import { homePageData } from './home-data'
import { headerData, footerData, copyrightData } from './globals-data'
import { projectsData } from './projects-data'

export async function POST(): Promise<Response> {
    const payload = await getPayload({ config })
    const headers = await getHeaders()

    const { user } = await payload.auth({ headers })

    if (!user) {
        return new Response('Unauthorized', { status: 401 })
    }

    try {
        payload.logger.info('— Seeding database...')

        // Seed globals
        await Promise.all([
            payload.updateGlobal({ slug: 'header', data: headerData }),
            payload.updateGlobal({ slug: 'footer', data: footerData }),
            payload.updateGlobal({ slug: 'copyright', data: copyrightData }),
        ])
        payload.logger.info('— Globals seeded.')

        // Check if home page already exists
        const existingPages = await payload.find({
            collection: 'pages',
            where: { slug: { equals: 'home' } },
            limit: 1,
        })

        if (existingPages.docs.length > 0) {
            payload.logger.info('— Home page already exists, skipping page seed.')
        } else {
            await payload.create({
                collection: 'pages',
                data: homePageData,
            })
            payload.logger.info('— Home page seeded.')
        }

        // Seed projects
        for (const project of projectsData) {
            const existing = await payload.find({
                collection: 'projects',
                where: { slug: { equals: project.slug } },
                limit: 1,
            })
            if (existing.docs.length === 0) {
                await payload.create({
                    collection: 'projects',
                    data: project,
                })
            }
        }
        payload.logger.info('— Projects seeded.')

        payload.logger.info('— Seed complete.')

        return Response.json({ success: true })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        payload.logger.error(message)
        return new Response(`Error seeding: ${message}`, { status: 500 })
    }
}
