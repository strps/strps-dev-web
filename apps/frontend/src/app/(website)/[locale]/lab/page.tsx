import { Gallery } from "@/components/gallery/Gallery";
import { getGalleryItems } from "./data";
import { localizedHref, type Locale } from "@/i18n/config";

export const metadata = {
    title: "Gallery | Cesar Jerez",
    description:
        "A small gallery of personal projects, experiments, and art — most pieces live as their own pages.",
};

export default async function GalleryPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params;
    const items = getGalleryItems().map((item) => ({
        ...item,
        href: localizedHref(locale, item.href),
    }));

    return (
        <main className="min-h-screen">
            <div className=" mx-auto px-4 py-16">
                <Gallery items={items} title="Gallery & Tinkering" />
            </div>
        </main>
    );
}
