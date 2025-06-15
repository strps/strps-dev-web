'use client'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider, FieldValues } from 'react-hook-form'
import type { Form as FormType } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Section } from '@/components/Section/Section'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
  id?: string
  introTitle?: string
  introText?: string
  introType?: 'richText' | 'titleAndText' | 'none'
  enableRecaptcha?: boolean
}

export const StrpsFormBlock: React.FC<FormBlockType> = (props) => {
  const {
    id,
    form: formFromProps,
    form: {
      id: formID,
      confirmationMessage,
      confirmationType,
      redirect,
      submitButtonLabel,
      title,
    } = {},
    introContent,
    introTitle,
    introText,
    introType = 'none',
    enableRecaptcha = false,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields as FieldValues,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const FormComponent: React.FC = () => {
    const { executeRecaptcha } = useGoogleReCaptcha()

    const onSubmit = useCallback(
      (data: FieldValues) => {
        let loadingTimerID: ReturnType<typeof setTimeout>
        const submitForm = async () => {
          setError(undefined)

          let recaptchaToken: string | undefined
          if (enableRecaptcha && executeRecaptcha) {
            try {
              recaptchaToken = await executeRecaptcha()
            } catch (err) {
              console.error(err)
              setError({
                message: 'Recaptcha verification failed',
              })
              recaptchaToken = undefined
              return
            }
            if (!recaptchaToken) {
              setError({
                message: 'Recaptcha verification failed',
              })
              recaptchaToken = undefined
              return
            }
          }

          const dataToSend = Object.entries(data).map(([name, value]) => ({
            field: name,
            value,
          }))

          loadingTimerID = setTimeout(() => {
            setIsLoading(true)
          }, 1000)

          try {
            const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
              body: JSON.stringify({
                form: formID,
                submissionData: dataToSend,
                recaptchaToken,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            })

            const res = await req.json()

            clearTimeout(loadingTimerID)

            if (req.status >= 400) {
              setIsLoading(false)

              setError({
                message: res.errors?.[0]?.message || 'Internal Server Error',
                status: res.status,
              })

              return
            }

            setIsLoading(false)
            setHasSubmitted(true)

            if (confirmationType === 'redirect' && redirect) {
              const { url } = redirect

              const redirectUrl = url

              if (redirectUrl) router.push(redirectUrl)
            }
          } catch (err) {
            console.warn(err)
            setIsLoading(false)
            setError({
              message: 'Something went wrong.',
            })
          }
        }

        void submitForm()
      },
      [executeRecaptcha],
    )

    return (
      <form id={String(formID)} onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 last:mb-0">
          {formFromProps &&
            formFromProps.fields &&
            formFromProps.fields?.map((field, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
              if (Field) {
                return (
                  <div className="mb-6 last:mb-0" key={index}>
                    <Field
                      form={formFromProps}
                      {...field}
                      {...formMethods}
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  </div>
                )
              }
              return null
            })}
        </div>

        <Button form={String(formID)} type="submit" variant="default">
          {submitButtonLabel}
        </Button>
      </form>
    )
  }

  const intros: Record<string, React.ReactNode> = {
    titleAndText: (
      <>
        {introTitle && (
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{introTitle || title}</h2>
        )}
        {introText && <p className="text-muted-foreground text-center">{introText}</p>}
      </>
    ),
    richText: introContent ? <RichText data={introContent} enableGutter={false} /> : null,
    none: null,
  }

  return (
    <Section
      id={id}
      container={true}
      backgroundContainer={false}
      theme="auto"
      background="none"
      className="flex items-center justify-center py-16"
    >
      <div className="w-full max-w-4xl mx-auto">
        {intros[introType]}
        <div className="p-6 md:p-12 bg-card rounded-xl shadow-sm border border-border">
          <FormProvider {...formMethods}>
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
              <RichText data={confirmationMessage as DefaultTypedEditorState} />
            )}
            {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
                {`${error.status || '500'}: ${error.message || ''}`}
              </div>
            )}
            {!hasSubmitted &&
              (enableRecaptcha ? (
                <GoogleReCaptchaProvider
                  reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                >
                  <FormComponent />
                </GoogleReCaptchaProvider>
              ) : (
                <FormComponent />
              ))}
            {enableRecaptcha && (
              <p className="text-xs text-muted-foreground mt-6 text-center">
                This site is protected by reCAPTCHA and the Google{' '}
                <a
                  className="underline hover:text-primary"
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  className="underline hover:text-primary"
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>{' '}
                apply.
              </p>
            )}
          </FormProvider>
        </div>
      </div>
    </Section>
  )
}
