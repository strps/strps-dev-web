import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
// import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
// import { searchFields } from '@/search/fieldOverrides'
// import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { verifyRecaptchaToken } from '@/blocks/StrpsForm/verify-recaptcha'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | César Jerez` : 'César Jerez'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['blogTags', 'projectTags'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        const fields = defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })

        fields.splice(0, 0, {
          name: 'enableRecaptcha',
          type: 'checkbox',
          defaultValue: false,
          label: 'Enable Recaptcha',
          admin: {
            description: 'Enable reCAPTCHA for this form.',
            position: 'sidebar',
          },
        })

        return fields
      },
    },
    formSubmissionOverrides: {
      hooks: {
        beforeOperation: [
          async ({ args, operation, req }) => {
            const payload = req.payload
            const body = req?.data

            //if operation is create, check if recaptcha is enabled
            if (operation === 'create') {
              //check if form id has the recaptcha enabled
              const recaptchaEnabled = (
                await payload.findByID({
                  collection: 'forms',
                  id: body?.form,
                  select: {
                    enableRecaptcha: true,
                  },
                })
              ).enableRecaptcha

              //if recaptcha is enabled, verify the token
              if (recaptchaEnabled) {
                const recaptchaToken = body?.recaptchaToken
                if (!recaptchaToken) {
                  throw new Error('Recaptcha token is missing')
                }
                const isTokenValid = await verifyRecaptchaToken(recaptchaToken)
                if (!isTokenValid) {
                  throw new Error('Recaptcha token is invalids')
                }
                console.error('Recaptcha token is valid')
                return args
              }
            }

            //if recaptcha is not enabled, continue as normal TODO: we cannot create a for if the recaptcha is configured properly (example: the env variables are not set, like the site key or secret key) we should not allow to create a form if the recaptcha is not configured properly, it will give a false impresion to the user.
            return args
          },
        ],
      },
    },
  }),
  // searchPlugin({
  //   collections: ['posts'],
  //   beforeSync: beforeSyncWithSearch,
  //   searchOverrides: {
  //     fields: ({ defaultFields }) => {
  //       return [...defaultFields, ...searchFields]
  //     },
  //   },
  // }),
  payloadCloudPlugin(),
]
