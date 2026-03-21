'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

export const Error: React.FC<{ name: string }> = ({ name }) => {
    const {
        formState: { errors },
    } = useFormContext()
    return (
        <div className="mt-2 text-destructive text-sm">
            {(errors[name]?.message as string) || 'This field is required'}
        </div>
    )
}
