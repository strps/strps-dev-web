'use client'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { Form as FormType } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

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
      enableRecaptcha,
    } = {},
    introContent,
    introTitle,
    introText,
    introType,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
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
      (data: FormFieldBlock[]) => {
        let loadingTimerID: ReturnType<typeof setTimeout>
        const submitForm = async () => {
          setError(undefined)

          let recaptchaToken: string | undefined
          //if recaptcha is enabled, get the token
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

          // delay loading indicator by 1s
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
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Button form={formID} type="submit" variant="default">
          {submitButtonLabel}
        </Button>
      </form>
    )
  }

  const intros: Record<string, React.ReactNode> = {
    titleAndText:
      introTitle && introText ? (
        <>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{introTitle}</h2>
          <p className="text-muted-foreground text-center">{introText}</p>
        </>
      ) : null,
    richText: introContent ? <RichText data={introContent} enableGutter={false} /> : null,
    none: null,
  }

  return (
    <div className="" id={`block-${id}`}>
      <section className="h-svh flex flex-col items-center justify-center overflow-hidden relative text-primary">
        {intros[introType || 'none']}

        <div className="p-4 md:p-24 w-full max-w-[48rem] border border-border rounded-[0.8rem] relative">
          <FormProvider {...formMethods}>
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
              <RichText data={confirmationMessage} />
            )}
            {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
            {error && (
              <div className="text-destructive p-4">{`${error.status || '500'}: ${error.message || ''}`}</div>
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
              <p className="text-xs text-muted-foreground/50 absolute bottom-4 m-auto">
                This site is protected by reCAPTCHA and the Google{' '}
                <a
                  className="underline text-muted-foreground/60 hover:text-primary"
                  href="https://policies.google.com/privacy"
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  className="underline text-muted-foreground/60 hover:text-primary"
                  href="https://policies.google.com/terms"
                >
                  Terms of Service
                </a>{' '}
                apply.
              </p>
            )}
          </FormProvider>
        </div>
      </section>
    </div>
  )
}
