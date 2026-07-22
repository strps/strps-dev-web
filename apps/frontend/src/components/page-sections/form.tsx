'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider, useFormContext, FieldValues } from 'react-hook-form'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import type { FormBlock, Form as FormType } from '@strps-website/types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/RichText'
import Section from '@/components/section'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fields } from '@/components/form/fields'
import { RECAPTCHA_ACTION, RECAPTCHA_SITE_KEY, isRecaptchaConfigured } from '@/lib/recaptcha'

type FormSectionProps = FormBlock & {
    form: FormType & { enableRecaptcha?: boolean }
    /**
     * Field skin (§3.9). Not a Payload field yet — schema work is Phase 3 — so this
     * defaults to the mockup skin now that `/services`, the only current `formBlock`
     * consumer, is switching over (§7 Phase 2 item 8).
     */
    variant?: 'default' | 'mockup'
}

type FormInnerProps = {
    form: FormType
    formID: string | number
    submitButtonLabel?: string | null
    recaptchaActive: boolean
    variant: 'default' | 'mockup'
    onSubmit: (data: FieldValues, recaptchaToken?: string) => void
    onRecaptchaError: () => void
}

/**
 * Kept at module scope on purpose: declaring this inside FormSection's body makes it a
 * new component type on every render, which remounts the whole subtree — including the
 * reCAPTCHA provider and every field's DOM state — whenever loading/error state changes.
 */
const FormInner: React.FC<FormInnerProps> = ({
    form,
    formID,
    submitButtonLabel,
    recaptchaActive,
    variant,
    onSubmit,
    onRecaptchaError,
}) => {
    const { executeRecaptcha } = useGoogleReCaptcha()
    const formMethods = useFormContext()
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = formMethods

    const handleFormSubmit = useCallback(
        (data: FieldValues) => {
            if (!recaptchaActive) {
                onSubmit(data)
                return
            }

            // Script blocked or still loading. Never submit tokenless — the server rejects
            // it anyway, so surface an accurate message instead of a generic 500.
            if (!executeRecaptcha) {
                onRecaptchaError()
                return
            }

            void (async () => {
                let recaptchaToken: string | undefined
                try {
                    recaptchaToken = await executeRecaptcha(RECAPTCHA_ACTION)
                } catch (err) {
                    console.error(err)
                    onRecaptchaError()
                    return
                }
                if (!recaptchaToken) {
                    onRecaptchaError()
                    return
                }
                onSubmit(data, recaptchaToken)
            })()
        },
        [executeRecaptcha, onRecaptchaError, onSubmit, recaptchaActive],
    )

    return (
        <form
            id={String(formID)}
            data-variant={variant}
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <div className="mb-4 last:mb-0">
                {form?.fields?.map((field, index) => {
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                        // Remap GraphQL aliased defaultValue fields back to defaultValue
                        const { defaultBool, defaultNum, defaultStr, ...rest } = field as any
                        const defaultValue = defaultBool ?? defaultNum ?? defaultStr
                        return (
                            <div
                                className={variant === 'mockup' ? 'mb-4.5 last:mb-0' : 'mb-6 last:mb-0'}
                                key={index}
                            >
                                <Field
                                    form={form}
                                    {...rest}
                                    defaultValue={defaultValue}
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

            <Button
                form={String(formID)}
                type="submit"
                variant={variant === 'mockup' ? 'solid' : 'default'}
                className={variant === 'mockup' ? 'w-full' : undefined}
            >
                {submitButtonLabel}
            </Button>
        </form>
    )
}

const FormSection: React.FC<FormSectionProps> = (props) => {
    const {
        form: formFromProps,
        form: {
            id: formID,
            confirmationMessage,
            confirmationType,
            redirect,
            submitButtonLabel,
            title,
            enableRecaptcha = false,
        } = {},
        introContent,
        introTitle,
        introText,
        introType = 'none',
        section,
        variant = 'mockup',
    } = props

    const formMethods = useForm({
        defaultValues: formFromProps.fields as FieldValues,
    })

    const [isLoading, setIsLoading] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [error, setError] = useState<{ message: string; status?: string }>()
    const router = useRouter()

    // reCAPTCHA is only active when the editor enabled it AND the site key exists.
    // Without this the legend below would claim protection that isn't running.
    const recaptchaActive = Boolean(enableRecaptcha) && isRecaptchaConfigured

    useEffect(() => {
        if (process.env.NODE_ENV !== 'production' && enableRecaptcha && !isRecaptchaConfigured) {
            console.warn(
                `Form ${formID} has reCAPTCHA enabled in Payload but NEXT_PUBLIC_RECAPTCHA_SITE_KEY ` +
                    `is not set — running without reCAPTCHA and hiding the notice.`,
            )
        }
    }, [enableRecaptcha, formID])

    const onRecaptchaError = useCallback(() => {
        setError({ message: 'Recaptcha verification failed' })
    }, [])

    const onSubmit = useCallback(
        (data: FieldValues, recaptchaToken?: string) => {
            let loadingTimerID: ReturnType<typeof setTimeout>
            const submitForm = async () => {
                setError(undefined)

                const dataToSend = Object.entries(data).map(([name, value]) => ({
                    field: name,
                    value,
                }))

                loadingTimerID = setTimeout(() => {
                    setIsLoading(true)
                }, 1000)

                try {
                    const req = await fetch(
                        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/form-submissions`,
                        {
                            body: JSON.stringify({
                                form: formID,
                                submissionData: dataToSend,
                                recaptchaToken,
                            }),
                            headers: { 'Content-Type': 'application/json' },
                            method: 'POST',
                        },
                    )

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
                        if (url) router.push(url)
                    }
                } catch (err) {
                    console.warn(err)
                    setIsLoading(false)
                    setError({ message: 'Something went wrong.' })
                }
            }

            void submitForm()
        },
        [confirmationType, formID, redirect, router],
    )

    const intros: Record<string, React.ReactNode> = {
        titleAndText: (
            <>
                {introTitle && (
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                        {introTitle || title}
                    </h2>
                )}
                {introText && <p className="text-muted-foreground text-center">{introText}</p>}
            </>
        ),
        richText: introContent ? <RichText data={introContent as DefaultTypedEditorState} enableGutter={false} /> : null,
        none: null,
    }

    const formInner = (
        <FormInner
            form={formFromProps}
            formID={formID as string | number}
            submitButtonLabel={submitButtonLabel}
            recaptchaActive={recaptchaActive}
            variant={variant}
            onSubmit={onSubmit}
            onRecaptchaError={onRecaptchaError}
        />
    )

    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'form'}
            className="flex items-center justify-center py-16 md:py-24"
        >
            <div className="w-full max-w-4xl mx-auto px-4">
                {intros[introType ?? 'none']}
                <Card className="p-6 md:p-12">
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
                            (recaptchaActive ? (
                                <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
                                    {formInner}
                                </GoogleReCaptchaProvider>
                            ) : (
                                formInner
                            ))}
                        {recaptchaActive && (
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
                </Card>
            </div>
        </Section>
    )
}

export default FormSection
