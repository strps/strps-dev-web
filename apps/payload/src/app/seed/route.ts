import config from '@payload-config'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import { getHomePageData } from './home-data'
import { getAboutPageData } from './about-data'
import { headerData, footerData, copyrightData } from './globals-data'
import { projectsData } from './projects-data'
import { servicesFormData } from './forms-data'
import { getServicesPageData } from './services-data'

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

        // The contact form is shared by pageContact (home, about) and formBlock (services)
        let formDoc = (
            await payload.find({
                collection: 'forms',
                where: { title: { equals: servicesFormData.title } },
                limit: 1,
            })
        ).docs[0]

        if (!formDoc) {
            formDoc = await payload.create({
                collection: 'forms',
                data: servicesFormData,
            })
            payload.logger.info('— Contact form seeded.')
        }

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
                data: getHomePageData(formDoc.id),
            })
            payload.logger.info('— Home page seeded.')
        }

        // Check if about page already exists
        const existingAboutPage = await payload.find({
            collection: 'pages',
            where: { slug: { equals: 'about' } },
            limit: 1,
        })

        if (existingAboutPage.docs.length > 0) {
            payload.logger.info('— About page already exists, skipping page seed.')
        } else {
            await payload.create({
                collection: 'pages',
                data: getAboutPageData(formDoc.id),
            })
            payload.logger.info('— About page seeded.')
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

        // Check if services page already exists
        const existingServicesPage = await payload.find({
            collection: 'pages',
            where: { slug: { equals: 'services' } },
            limit: 1,
        })

        if (existingServicesPage.docs.length > 0) {
            payload.logger.info('— Services page already exists, skipping page seed.')
        } else {
            await payload.create({
                collection: 'pages',
                data: getServicesPageData(formDoc.id),
            })
            payload.logger.info('— Services page seeded.')
        }

        payload.logger.info('— Seed complete.')

        return Response.json({ success: true })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        payload.logger.error(message)
        return new Response(`Error seeding: ${message}`, { status: 500 })
    }
}
