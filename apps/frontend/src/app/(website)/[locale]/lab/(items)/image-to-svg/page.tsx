import type { Metadata } from 'next';
import { ImageToSvgHero } from "./ImageToSvgHero";
import type { Locale } from '@/i18n/config';
import { buildAlternates } from '@/lib/seo';
import { getLabContent } from "../../content";
import { ItemSections } from "@/components/gallery/item-content";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params;
    const { meta } = getLabContent(locale, 'image-to-svg');
    return {
        title: meta.title,
        description: meta.description,
        alternates: buildAlternates(locale, '/lab/image-to-svg'),
    };
}

export default async function ImageToSvgPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params;
    const { sections } = getLabContent(locale, 'image-to-svg');
    return (
        <main className="min-h-screen">
            <ImageToSvgHero />
            <ItemSections sections={sections} locale={locale} />
        </main>
    );
}
