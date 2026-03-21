'use client'

import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Textarea as TextareaUI } from '@/components/ui/textarea'
import { Error } from './Error'
import { Width } from './Width'

interface TextareaFieldProps {
    name: string
    label?: string | null
    width?: number | null
    defaultValue?: string | null
    required?: boolean | null
    rows?: number
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
}

export const Textarea: React.FC<TextareaFieldProps> = ({
    name,
    defaultValue,
    errors,
    label,
    register,
    required,
    rows = 3,
    width,
}) => {
    return (
        <Width width={width}>
            <Label htmlFor={name} className="mb-2">
                {label}
                {required && (
                    <span className="text-destructive">
                        * <span className="sr-only">(required)</span>
                    </span>
                )}
            </Label>
            <TextareaUI
                defaultValue={defaultValue ?? undefined}
                id={name}
                rows={rows}
                {...register(name, { required: !!required })}
            />
            {errors[name] && <Error name={name} />}
        </Width>
    )
}
