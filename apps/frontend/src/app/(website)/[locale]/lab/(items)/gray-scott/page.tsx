import type { Metadata } from 'next';
import { GrayScottHero } from "./GrayScottHero";
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
    const { meta } = getLabContent(locale, 'gray-scott');
    return {
        title: meta.title,
        description: meta.description,
        alternates: buildAlternates(locale, '/lab/gray-scott'),
    };
}

export default async function GrayScottPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params;
    const { sections } = getLabContent(locale, 'gray-scott');
    return (
        <main className="min-h-screen">
            <GrayScottHero />
            <ItemSections sections={sections} locale={locale} />
        </main>
    );
}
