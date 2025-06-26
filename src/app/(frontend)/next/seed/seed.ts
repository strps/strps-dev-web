import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import { contactForm as contactFormData } from './contact-form'
import { seedContactPage } from './contact-page'
import { strpsMetaImage } from './strps_meta_image'
import { trackbitMetaImage } from './trackbit_meta_image'
import { project1 } from './project-1'
import { project2 } from './project-2'
import { fetchFileFromDisk } from '@/utilities/loadImageBuffer'
import { Form } from '@/payload-types'
import { post4 } from './post-4'
import { post5 } from './post-5'
import { seedHomePage } from './home'

const collections: CollectionSlug[] = [
  'blogTags',
  'media',
  'pages',
  'posts',
  'projects',
  'forms',
  'form-submissions',
  'projectTags',
]
const globals: Extract<GlobalSlug, 'header' | 'footer'>[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  // First create the contact form
  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  // Seed home page and get the created documents
  const { image1Doc, image2Doc, image3Doc, imageHomeDoc } = await seedHomePage({
    payload,
    req,
    contactForm: contactForm as Form,
  })

  // Load remaining media
  const [strps1Buffer, trackbit1Buffer] = await Promise.all([
    fetchFileFromDisk('/src/app/(frontend)/next/seed/strps_meta_image.webp'),
    fetchFileFromDisk('/src/app/(frontend)/next/seed/trackbit_meta_image.webp'),
  ])

  const [strps1Doc, trackbit1Doc] = await Promise.all([
    payload.create({
      collection: 'media',
      data: strpsMetaImage,
      file: strps1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: trackbitMetaImage,
      file: trackbit1Buffer,
    }),
  ])

  // Create demo author
  const demoAuthor = await payload.create({
    collection: 'users',
    data: {
      name: 'Demo Author',
      email: 'demo-author@example.com',
      password: 'password',
    },
  })

  payload.logger.info(`— Seeding categories...`)

  await Promise.all([
    payload.create({
      collection: 'blogTags',
      data: {
        tag: 'Technology',
      },
    }),

    payload.create({
      collection: 'blogTags',
      data: {
        tag: 'News',
      },
    }),

    payload.create({
      collection: 'blogTags',
      data: {
        tag: 'Finance',
      },
    }),
    payload.create({
      collection: 'blogTags',
      data: {
        tag: 'Design',
      },
    }),

    payload.create({
      collection: 'blogTags',
      data: {
        tag: 'Software',
      },
    }),

    payload.create({
      collection: 'blogTags',
      data: {
        tag: 'Engineering',
      },
    }),
  ])

  payload.logger.info(`— Seeding projects...`)

  // Create STRPS Website project
  await payload.create({
    collection: 'projects',
    data: project1({
      heroImage: imageHomeDoc,
      metaImage: strps1Doc,
      author: demoAuthor,
    }),
  })

  // Create Trakbit project
  await payload.create({
    collection: 'projects',
    data: project2({
      heroImage: imageHomeDoc,
      author: demoAuthor,
      metaImage: trackbit1Doc,
      screenshot1: image1Doc,
      screenshot2: image2Doc,
      screenshot3: image3Doc,
    }),
  })

  payload.logger.info(`— Seeding posts...`)

  const post4Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post4({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post5Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post5({ heroImage: image2Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  await payload.update({
    id: post4Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [],
    },
  })
  await payload.update({
    id: post5Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [],
    },
  })

  payload.logger.info(`— Seeding pages...`)

  // Seed the contact page with the contact form and get the created page
  const { contactPage } = await seedContactPage({
    payload,
    contactForm: contactForm as Form,
  })

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Projects',
              url: '/projects',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Blog',
              url: '/blog',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Projects',
              url: '/projects',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Blog',
              url: '/posts',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'projects-page',
      data: {
        headerOverrides: {
          background: true,
          overlay: false,
        },
      },
    }),
    payload.updateGlobal({
      slug: 'blog-page',
      data: {
        headerOverrides: {
          background: true,
          overlay: false,
        },
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
