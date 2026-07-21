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

import { Page, Post } from '@strps-website/types'
import { isRecaptchaConfigured, verifyRecaptchaToken } from '@/utilities/verify-recaptcha'

// Evaluated once, server-side, when the Payload config is built. It must be a plain
// string by the time it reaches the admin bundle: an `admin.description` *function*
// runs on the client, where a server-only env var is not readable. Changing the env
// var therefore requires a server restart to update this text.
const recaptchaFieldDescription = isRecaptchaConfigured()
  ? 'Enable reCAPTCHA for this form.'
  : '⚠ reCAPTCHA is not configured on this server (RECAPTCHA_SECRET_KEY is missing). ' +
    'This setting will have no effect and no reCAPTCHA notice will be shown to visitors.'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | César Jerez` : 'César Jerez'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || ''

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
            description: recaptchaFieldDescription,
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
                // Fail open when the key is absent: that is a deployment mistake, and
                // breaking every form over it punishes visitors for it. The frontend
                // hides the reCAPTCHA notice in this case, so nothing claims protection
                // that isn't running.
                if (!isRecaptchaConfigured()) {
                  payload.logger.warn(
                    `Form ${body?.form} has reCAPTCHA enabled but RECAPTCHA_SECRET_KEY is not set — ` +
                      `accepting the submission WITHOUT verification. Set the key or untick "Enable Recaptcha".`,
                  )
                  return args
                }

                const recaptchaToken = body?.recaptchaToken
                if (!recaptchaToken) {
                  throw new Error('Recaptcha verification failed')
                }

                const result = await verifyRecaptchaToken(recaptchaToken)
                if (!result.ok) {
                  // Detail stays server-side: telling a bot why it was rejected, or what
                  // score it earned, only helps it tune.
                  payload.logger.warn(
                    { formID: body?.form, ...result },
                    'reCAPTCHA verification failed',
                  )
                  throw new Error('Recaptcha verification failed')
                }

                payload.logger.debug(
                  { formID: body?.form, score: result.score },
                  'reCAPTCHA verification passed',
                )
                return args
              }
            }

            //recaptcha not enabled for this form, continue as normal
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
