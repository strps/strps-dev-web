import type { Metadata } from 'next';
import { IcoReactionDiffusionHero } from "./IcoReactionDiffusionHero";
import type { Locale } from "@/i18n/config";
import { buildAlternates } from '@/lib/seo';
import { getLabContent } from "../../content";
import { ItemSections } from "@/components/gallery/item-content";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params;
    const { meta } = getLabContent(locale, 'reaction-sphere');
    return {
        title: meta.title,
        description: meta.description,
        alternates: buildAlternates(locale, '/lab/reaction-sphere'),
    };
}

export default async function ReactionSpherePage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params;
    const { sections } = getLabContent(locale, 'reaction-sphere');
    return (
        <main className="min-h-screen">
            <IcoReactionDiffusionHero />
            <ItemSections sections={sections} locale={locale} />
        </main>
    );
}
