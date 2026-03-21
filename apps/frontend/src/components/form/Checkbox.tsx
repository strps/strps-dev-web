'use client'

import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { Checkbox as CheckboxUI } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Error } from './Error'
import { Width } from './Width'

interface CheckboxFieldProps {
    name: string
    label?: string | null
    width?: number | null
    defaultValue?: boolean | null
    required?: boolean | null
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
}

export const Checkbox: React.FC<CheckboxFieldProps> = ({
    name,
    defaultValue,
    errors,
    label,
    register,
    required,
    width,
}) => {
    const props = register(name, { required: !!required })
    const { setValue } = useFormContext()

    return (
        <Width width={width}>
            <div className="flex items-center gap-2">
                <CheckboxUI
                    defaultChecked={defaultValue ?? undefined}
                    id={name}
                    {...props}
                    onCheckedChange={(checked) => {
                        setValue(props.name, checked)
                    }}
                />
                <Label htmlFor={name}>
                    {required && (
                        <span className="text-destructive">
                            * <span className="sr-only">(required)</span>
                        </span>
                    )}
                    {label}
                </Label>
            </div>
            {errors[name] && <Error name={name} />}
        </Width>
    )
}
