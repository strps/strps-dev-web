import type { Metadata } from 'next';
import { Gallery } from "@/components/gallery/Gallery";
import { getLocalizedGalleryItems } from "./data";
import { localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from '@/i18n/getDictionary';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params
    const dictionary = getDictionary(locale)

    return {
        title: dictionary.seo.labTitle,
        description: dictionary.seo.labDescription,
        alternates: buildAlternates(locale, '/lab'),
    }
}

export default async function GalleryPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params;
    const dictionary = getDictionary(locale);
    const items = getLocalizedGalleryItems(locale).map((item) => ({
        ...item,
        href: localizedHref(locale, item.href),
    }));

    return (
        <main className="min-h-screen">
            <div className=" mx-auto px-4 py-16">
                <Gallery items={items} title={dictionary.lab.galleryTitle} locale={locale} />
            </div>
        </main>
    );
}
