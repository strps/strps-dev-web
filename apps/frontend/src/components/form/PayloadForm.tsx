'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm, FormProvider, useFormContext, FieldValues } from 'react-hook-form'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import type { Form as FormType } from '@strps-website/types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { fields } from '@/components/form/fields'
import { RECAPTCHA_ACTION, RECAPTCHA_SITE_KEY, isRecaptchaConfigured } from '@/lib/recaptcha'
import { cn } from '@/lib/utils'
import { defaultLocale, isValidLocale, localizedHref } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

export interface PayloadFormProps {
    form: FormType
    /** Field skin (§3.9): `default` is the pre-makeover shadcn look, `mockup` the hairline/mono skin. */
    variant?: 'default' | 'mockup'
    /**
     * What the form sits on. `crystal` swaps the fields' opaque `--card` fill for
     * the translucent crystal field tokens, so a form inside a glass surface does
     * not punch solid rectangles through it. See `docs/liquid-crystal.md`.
     */
    surface?: 'default' | 'crystal'
    className?: string
    /** Wraps the confirmation message when the form has submitted successfully. */
    successClassName?: string
}

type FormInnerProps = {
    form: FormType
    formID: string | number
    submitButtonLabel?: string | null
    recaptchaActive: boolean
    variant: 'default' | 'mockup'
    surface: 'default' | 'crystal'
    onSubmit: (data: FieldValues, recaptchaToken?: string) => void
    onRecaptchaError: () => void
}

/**
 * Kept at module scope on purpose: declaring this inside the parent's body makes it a
 * new component type on every render, which remounts the whole subtree — including the
 * reCAPTCHA provider and every field's DOM state — whenever loading/error state changes.
 */
const FormInner: React.FC<FormInnerProps> = ({
    form,
    formID,
    submitButtonLabel,
    recaptchaActive,
    variant,
    surface,
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
            data-surface={surface}
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

/**
 * The Payload-forms submit/error/success state machine and field rendering, shared by
 * the `formBlock` section (§/services, wrapped in its own Section+Card) and `pageContact`
 * (§3.9, embedded directly in the contact split layout with mockup success-box styling).
 * One implementation, two shells — see decision #4 in the makeover doc.
 */
export function PayloadForm({
    form: formFromProps,
    variant = 'mockup',
    surface = 'default',
    className,
    successClassName,
}: PayloadFormProps) {
    const {
        id: formID,
        confirmationMessage,
        confirmationType,
        redirect,
        submitButtonLabel,
        enableRecaptcha = false,
    } = formFromProps

    const formMethods = useForm({
        defaultValues: formFromProps.fields as FieldValues,
    })

    const [isLoading, setIsLoading] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [error, setError] = useState<{ message: string; status?: string }>()
    const router = useRouter()
    const routeParams = useParams<{ locale: string }>()
    const locale = isValidLocale(routeParams.locale) ? routeParams.locale : defaultLocale
    const dictionary = getDictionary(locale)

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
        setError({ message: dictionary.form.recaptchaFailed })
    }, [dictionary])

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
                            message: res.errors?.[0]?.message || dictionary.form.internalServerError,
                            status: res.status,
                        })
                        return
                    }

                    setIsLoading(false)
                    setHasSubmitted(true)

                    if (confirmationType === 'redirect' && redirect) {
                        const { url } = redirect
                        if (url) router.push(localizedHref(locale, url))
                    }
                } catch (err) {
                    console.warn(err)
                    setIsLoading(false)
                    setError({ message: dictionary.form.somethingWentWrong })
                }
            }

            void submitForm()
        },
        [confirmationType, formID, redirect, router, locale, dictionary],
    )

    const formInner = (
        <FormInner
            form={formFromProps}
            formID={formID as string | number}
            submitButtonLabel={submitButtonLabel}
            recaptchaActive={recaptchaActive}
            variant={variant}
            surface={surface}
            onSubmit={onSubmit}
            onRecaptchaError={onRecaptchaError}
        />
    )

    return (
        <FormProvider {...formMethods}>
            <div className={className}>
                {!isLoading && hasSubmitted && confirmationType === 'message' && (
                    <div className={successClassName}>
                        <RichText
                            data={confirmationMessage as DefaultTypedEditorState}
                            enableGutter={false}
                            enableProse={variant !== 'mockup'}
                        />
                    </div>
                )}
                {isLoading && !hasSubmitted && <p>{dictionary.form.loading}</p>}
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
                    <p
                        className={cn(
                            'text-xs text-muted-foreground mt-6',
                            variant !== 'mockup' && 'text-center',
                        )}
                    >
                        {dictionary.form.recaptchaNoticePrefix}{' '}
                        <a
                            className="underline hover:text-primary"
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {dictionary.form.privacyPolicy}
                        </a>{' '}
                        {dictionary.form.and}{' '}
                        <a
                            className="underline hover:text-primary"
                            href="https://policies.google.com/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {dictionary.form.termsOfService}
                        </a>{' '}
                        {dictionary.form.recaptchaNoticeSuffix}
                    </p>
                )}
            </div>
        </FormProvider>
    )
}
