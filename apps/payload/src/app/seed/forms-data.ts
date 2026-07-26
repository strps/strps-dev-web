import type { RequiredDataFromCollectionSlug } from 'payload'

type FormSeed = Omit<RequiredDataFromCollectionSlug<'forms'>, 'createdAt' | 'updatedAt' | 'id'>

export const servicesFormData: FormSeed = {
    title: 'Services Contact Form',
    enableRecaptcha: false,
    submitButtonLabel: 'Send message',
    confirmationType: 'message',
    confirmationMessage: {
        root: {
            type: 'root',
            children: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            type: 'text',
                            text: "Thanks — I'll get back to you within one business day.",
                            version: 1,
                        },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
        },
    },
    fields: [
        {
            blockType: 'text',
            name: 'name',
            label: 'Name',
            required: true,
            width: 50,
        },
        {
            blockType: 'email',
            name: 'email',
            label: 'Email',
            required: true,
            width: 50,
        },
        {
            blockType: 'textarea',
            name: 'message',
            label: 'What do you need?',
            required: true,
            width: 100,
        },
        {
            blockType: 'select',
            name: 'budget',
            label: 'Budget range',
            required: false,
            width: 100,
            options: [
                { label: '<$1k', value: 'lt-1k' },
                { label: '$1k–$5k', value: '1k-5k' },
                { label: '$5k–$15k', value: '5k-15k' },
                { label: '$15k+', value: '15k-plus' },
                { label: 'Not sure yet', value: 'not-sure' },
            ],
        },
    ],
}

/* -------------------------------------------------------------------------- */
/*  Spanish (es) patch — only fields the form-builder plugin localizes         */
/*  upstream (field label, submitButtonLabel, confirmationMessage). Select     */
/*  option labels are NOT localized, so they're intentionally omitted.         */
/* -------------------------------------------------------------------------- */

export const servicesFormDataES = {
    submitButtonLabel: 'Enviar mensaje',
    confirmationMessage: {
        root: {
            type: 'root',
            children: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            type: 'text',
                            text: 'Gracias — te responderé en un día hábil.',
                            version: 1,
                        },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
        },
    },
    fields: [
        { label: 'Nombre' },
        { label: 'Correo' },
        { label: '¿Qué necesitás?' },
        { label: 'Rango de presupuesto' },
    ],
}
