'use client'

import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Error } from './Error'
import { Width } from './Width'

interface EmailFieldProps {
    name: string
    label?: string | null
    width?: number | null
    required?: boolean | null
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
}

export const Email: React.FC<EmailFieldProps> = ({
    name,
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
                id={name}
                type="email"
                {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required: !!required })}
            />
            {errors[name] && <Error name={name} />}
        </Width>
    )
}
