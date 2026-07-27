import Link from 'next/link'
import type { Metadata } from 'next'
import { defaultLocale, isValidLocale, localizedHref, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

type Args = {
    params: Promise<{ locale?: string }>
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
    const { locale: rawLocale } = await paramsPromise
    const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale
    const dictionary = getDictionary(locale)

    return { title: dictionary.notFound.title }
}

export default async function NotFound({ params: paramsPromise }: Args) {
    const { locale: rawLocale } = await paramsPromise
    const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale
    const dictionary = getDictionary(locale)

    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight">{dictionary.notFound.title}</h1>
            <p className="text-muted-foreground">{dictionary.notFound.description}</p>
            <Link href={localizedHref(locale, '/')} className="mt-2 underline hover:text-primary">
                {dictionary.notFound.backHome}
            </Link>
        </main>
    )
}
