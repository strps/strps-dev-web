import type { Form } from '@/payload-types'
import type { RequiredDataFromCollectionSlug, Payload } from 'payload'

type ContactArgs = {
  contactForm: Form
}

type SeedContactPageArgs = {
  payload: Payload
  contactForm: Form
}

export const seedContactPage = async ({ payload, contactForm }: SeedContactPageArgs) => {
  payload.logger.info(`— Seeding contact page...`)

  const contactPage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: contact({
      contactForm: contactForm as Form,
    }),
  })

  return {
    contactForm,
    contactPage,
  }
}

export const contact: (args: ContactArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
}) => {
  return {
    slug: 'contact',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'strpsFormBlock',
        enableIntro: true,
        form: contactForm,
        introContent: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Example contact form:',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h3',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        section: {
          theme: 'auto',
          background: 'none',
          container: true,
        },
      },
    ],
    title: 'Contact',
  }
}
