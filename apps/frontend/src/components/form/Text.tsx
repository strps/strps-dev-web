'use client'

import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Error } from './Error'
import { Width } from './Width'

interface TextFieldProps {
    name: string
    label?: string | null
    width?: number | null
    defaultValue?: string | null
    required?: boolean | null
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
}

export const Text: React.FC<TextFieldProps> = ({
    name,
    defaultValue,
    errors,
    label,
    register,
    required,
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
            <Input
                defaultValue={defaultValue ?? undefined}
                id={name}
                type="text"
                {...register(name, { required: !!required })}
            />
            {errors[name] && <Error name={name} />}
        </Width>
    )
}
