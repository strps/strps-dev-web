'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { Width } from './Width'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export const Message: React.FC<{ message?: DefaultTypedEditorState | null }> = ({ message }) => {
    return (
        <Width className="my-12" width="100">
            {message && <RichText data={message} />}
        </Width>
    )
}
