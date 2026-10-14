'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
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

type ExecuteRecaptcha = (action?: string) => Promise<string>

/** How long a submit waits for the lazily loaded reCAPTCHA script before giving up. */
const RECAPTCHA_LOAD_TIMEOUT_MS = 10_000

/**
 * Hands the provider's `executeRecaptcha` up to `PayloadForm` once Google's script is
 * ready. Rendered as a sibling of the form, not around it, so mounting the provider late
 * never remounts the field the visitor just focused.
 */
const RecaptchaBridge: React.FC<{ onReady: (execute: ExecuteRecaptcha) => void }> = ({
    onReady,
}) => {
    const { executeRecaptcha } = useGoogleReCaptcha()
    useEffect(() => {
        if (executeRecaptcha) onReady(executeRecaptcha)
    }, [executeRecaptcha, onReady])
    return null
}

type FormInnerProps = {
    form: FormType
    formID: string | number
    submitButtonLabel?: string | null
    recaptchaActive: boolean
    /** Renders every input and the submit button disabled. */
    disabled: boolean
    honeypotRef: React.RefObject<HTMLInputElement | null>
    variant: 'default' | 'mockup'
    surface: 'default' | 'crystal'
    onFocus?: () => void
    /** Resolves once the reCAPTCHA script is ready, or `undefined` if it never loads. */
    getExecuteRecaptcha: () => Promise<ExecuteRecaptcha | undefined>
    onSubmit: (data: FieldValues, recaptchaToken?: string) => void
    onRecaptchaError: () => void
}

/**
 * Kept at module scope on purpose: declaring this inside the parent's body makes it a
 * new component type on every render, which remounts the whole subtree — and every
 * field's DOM state — whenever loading/error state changes.
 */
const FormInner: React.FC<FormInnerProps> = ({
    form,
    formID,
    submitButtonLabel,
    recaptchaActive,
    disabled,
    honeypotRef,
    variant,
    surface,
    onFocus,
    getExecuteRecaptcha,
    onSubmit,
    onRecaptchaError,
}) => {
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

            void (async () => {
                // Script blocked or timed out. Never submit tokenless — the server rejects
                // it anyway, so surface an accurate message instead of a generic 500.
                const executeRecaptcha = await getExecuteRecaptcha()
                if (!executeRecaptcha) {
                    onRecaptchaError()
                    return
                }

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
        [getExecuteRecaptcha, onRecaptchaError, onSubmit, recaptchaActive],
    )

    return (
        <form
            id={String(formID)}
            data-variant={variant}
            data-surface={surface}
            onFocus={onFocus}
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <fieldset disabled={disabled}>
                {/* Honeypot: off-screen rather than `display:none`, which some bots skip. Kept
                    outside react-hook-form so it never enters `submissionData`; the server
                    rejects any submission where it is filled. */}
                <input
                    ref={honeypotRef}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    defaultValue=""
                    className="absolute -left-[10000px] h-px w-px overflow-hidden"
                />
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
            </fieldset>
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
        recaptchaActive: serverRecaptchaActive = false,
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

    // Spam signals checked by the server: a hidden field only bots fill, and how long the
    // form was on screen before submitting.
    const honeypotRef = useRef<HTMLInputElement>(null)
    const mountedAtRef = useRef<number | null>(null)
    useEffect(() => {
        mountedAtRef.current = Date.now()
    }, [])

    // Payload decides: `recaptchaActive` is true only when the box is ticked AND the server
    // holds the secret, so it will verify. Without the secret it is false, and no notice
    // claims protection that isn't running.
    const recaptchaActive = Boolean(serverRecaptchaActive) && isRecaptchaConfigured
    // The server will demand a token this page cannot mint, so every submit would fail.
    // Show the form as broken rather than let visitors fill it in for nothing.
    const recaptchaMisconfigured = Boolean(serverRecaptchaActive) && !isRecaptchaConfigured

    useEffect(() => {
        if (recaptchaMisconfigured) {
            console.error(
                `Form ${formID} requires reCAPTCHA but NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set — ` +
                    `the form is disabled. Set the site key or untick "Enable Recaptcha" in Payload.`,
            )
        }
    }, [recaptchaMisconfigured, formID])

    // Google's script loads on the first focus inside the form (React's `onFocus` is
    // `focusin`, so it bubbles), not on render: visitors who never touch the form never
    // contact Google. A submit without prior focus (iOS does not focus tapped buttons)
    // arms it too and waits.
    const [recaptchaArmed, setRecaptchaArmed] = useState(false)
    const executeRecaptchaRef = useRef<ExecuteRecaptcha | undefined>(undefined)
    const recaptchaWaitersRef = useRef<Array<(execute: ExecuteRecaptcha) => void>>([])

    const armRecaptcha = useCallback(() => setRecaptchaArmed(true), [])

    const onRecaptchaReady = useCallback((execute: ExecuteRecaptcha) => {
        executeRecaptchaRef.current = execute
        recaptchaWaitersRef.current.splice(0).forEach((resolve) => resolve(execute))
    }, [])

    const getExecuteRecaptcha = useCallback(() => {
        setRecaptchaArmed(true)
        if (executeRecaptchaRef.current) return Promise.resolve(executeRecaptchaRef.current)
        return new Promise<ExecuteRecaptcha | undefined>((resolve) => {
            const timerID = setTimeout(() => resolve(undefined), RECAPTCHA_LOAD_TIMEOUT_MS)
            recaptchaWaitersRef.current.push((execute) => {
                clearTimeout(timerID)
                resolve(execute)
            })
        })
    }, [])

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
                                hp: honeypotRef.current?.value ?? '',
                                elapsedMs:
                                    mountedAtRef.current === null
                                        ? 0
                                        : Date.now() - mountedAtRef.current,
                            }),
                            headers: { 'Content-Type': 'application/json' },
                            method: 'POST',
                        },
                    )

                    clearTimeout(loadingTimerID)

                    // Map by status, never echo the server's text: it is English-only and
                    // deliberately vague about which spam check fired.
                    if (req.status >= 400) {
                        setIsLoading(false)
                        setError({
                            message:
                                req.status === 400
                                    ? dictionary.form.submissionRejected
                                    : req.status === 403
                                      ? dictionary.form.recaptchaFailed
                                      : req.status === 429
                                        ? dictionary.form.tooManyRequests
                                        : dictionary.form.internalServerError,
                            status: String(req.status),
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

    const displayedError =
        error ?? (recaptchaMisconfigured ? { message: dictionary.form.recaptchaFailed } : undefined)

    const formInner = (
        <FormInner
            form={formFromProps}
            formID={formID as string | number}
            submitButtonLabel={submitButtonLabel}
            recaptchaActive={recaptchaActive}
            disabled={recaptchaMisconfigured}
            honeypotRef={honeypotRef}
            variant={variant}
            surface={surface}
            onFocus={recaptchaActive && !recaptchaArmed ? armRecaptcha : undefined}
            getExecuteRecaptcha={getExecuteRecaptcha}
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
                {displayedError && (
                    <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
                        {/* Client-side errors (blocked script, missing site key, network) carry
                            no status; don't invent one. */}
                        {displayedError.status
                            ? `${displayedError.status}: ${displayedError.message || ''}`
                            : displayedError.message}
                    </div>
                )}
                {!hasSubmitted && formInner}
                {/* Stays mounted after submit: unmounting the provider removes the script. */}
                {recaptchaActive && recaptchaArmed && (
                    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
                        <RecaptchaBridge onReady={onRecaptchaReady} />
                    </GoogleReCaptchaProvider>
                )}
                {/* Point-of-collection privacy notice (GDPR Art. 13 / CR Ley 8968). The slug is
                    fixed by the legal-docs seed; see docs/dev/legal/compliance-tracker.md. */}
                {!hasSubmitted && (
                    <p
                        className={cn(
                            'text-xs text-muted-foreground mt-6',
                            variant !== 'mockup' && 'text-center',
                        )}
                    >
                        {dictionary.form.privacyNoticePrefix}{' '}
                        <a
                            className="underline hover:text-primary"
                            href={localizedHref(locale, '/docs/privacy-policy')}
                        >
                            {dictionary.form.privacyNoticeLink}
                        </a>
                        {dictionary.form.privacyNoticeSuffix}
                    </p>
                )}
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
