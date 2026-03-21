'use client'

import React from 'react'
import type { Control, FieldErrorsImpl } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import {
    Select as SelectUI,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Error } from './Error'
import { Width } from './Width'

interface SelectFieldProps {
    name: string
    label?: string | null
    width?: number | null
    required?: boolean | null
    options?: { label: string; value: string }[] | null
    control: Control
    errors: Partial<FieldErrorsImpl>
}

export const Select: React.FC<SelectFieldProps> = ({
    name,
    control,
    errors,
    label,
    options,
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
            <Controller
                control={control}
                defaultValue=""
                name={name}
                render={({ field: { onChange, value } }) => (
                    <SelectUI onValueChange={onChange} value={value}>
                        <SelectTrigger className="w-full" id={name}>
                            <SelectValue placeholder={label ?? ''} />
                        </SelectTrigger>
                        <SelectContent>
                            {(options ?? []).map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectUI>
                )}
                rules={{ required: !!required }}
            />
            {errors[name] && <Error name={name} />}
        </Width>
    )
}
