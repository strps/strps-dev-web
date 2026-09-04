import type { Metadata } from 'next';
import { Gallery } from "@/components/gallery/Gallery";
import { getLocalizedGalleryItems } from "./data";
import { localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from '@/i18n/getDictionary';
import { buildAlternates } from '@/lib/seo';
import { PageHeader } from '@/components/primitives/PageHeader';
import { Reveal } from '@/components/primitives/Reveal';

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
        <main className="flex w-full flex-col gap-12  pb-28">
            <Reveal on="mount">
                <PageHeader
                    eyebrow={dictionary.lab.eyebrow}
                    title={
                        <>
                            {dictionary.lab.heroTitlePrefix}{' '}
                            <span className="text-primary">{dictionary.lab.heroTitleHighlight}</span>
                        </>
                    }
                    lead={dictionary.lab.heroSubtitle}
                    meta={dictionary.lab.countLabel(items.length)}
                />
            </Reveal>

            {/* `PageHeader` stays full-bleed for its background. Unlike /blog and
                /projects, the gallery grid is deliberately *not* capped at
                `max-w-wrap` — it runs the full width and only takes the gutter. */}
            <div className="w-full px-6">
                <Gallery items={items} locale={locale} />
            </div>
        </main>
    );
}
