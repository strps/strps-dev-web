import config from '@payload-config'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import { getHomePageData, homePageDataES } from './home-data'
import { getAboutPageData, aboutPageDataES } from './about-data'
import {
    headerData,
    footerData,
    copyrightData,
    headerDataES,
    footerDataES,
    copyrightDataES,
} from './globals-data'
import { projectsData, projectsDataES } from './projects-data'
import { servicesFormData, servicesFormDataES } from './forms-data'
import { getServicesPageData, servicesPageDataES } from './services-data'
import { seedLocalizedDoc, seedLocalizedGlobal } from './localize'

export async function POST(): Promise<Response> {
    const payload = await getPayload({ config })
    const headers = await getHeaders()

    const { user } = await payload.auth({ headers })

    if (!user) {
        return new Response('Unauthorized', { status: 401 })
    }

    try {
        payload.logger.info('— Seeding database (en + es)...')

        // Seed globals — en write, then es translation onto the same doc.
        await Promise.all([
            seedLocalizedGlobal(payload, 'header', headerData, headerDataES),
            seedLocalizedGlobal(payload, 'footer', footerData, footerDataES),
            seedLocalizedGlobal(payload, 'copyright', copyrightData, copyrightDataES),
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
            formDoc = await seedLocalizedDoc(payload, 'forms', servicesFormData, servicesFormDataES)
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
            await seedLocalizedDoc(payload, 'pages', getHomePageData(formDoc.id), homePageDataES)
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
            await seedLocalizedDoc(payload, 'pages', getAboutPageData(formDoc.id), aboutPageDataES)
            payload.logger.info('— About page seeded.')
        }

        // Seed projects
        for (const [i, project] of projectsData.entries()) {
            const existing = await payload.find({
                collection: 'projects',
                where: { slug: { equals: project.slug } },
                limit: 1,
            })
            if (existing.docs.length === 0) {
                await seedLocalizedDoc(payload, 'projects', project, projectsDataES[i])
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
            await seedLocalizedDoc(payload, 'pages', getServicesPageData(formDoc.id), servicesPageDataES)
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
