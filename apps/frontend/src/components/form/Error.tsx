'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { defaultLocale, isValidLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

export const Error: React.FC<{ name: string }> = ({ name }) => {
    const {
        formState: { errors },
    } = useFormContext()
    const routeParams = useParams<{ locale?: string }>()
    const locale = isValidLocale(routeParams.locale) ? routeParams.locale : defaultLocale
    const dictionary = getDictionary(locale)

    return (
        <div className="mt-2 text-destructive text-sm">
            {(errors[name]?.message as string) || dictionary.form.fieldRequired}
        </div>
    )
}
