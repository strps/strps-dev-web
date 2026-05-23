import { Gallery } from "@/components/gallery/Gallery";
import { getGalleryItems } from "@/app/gallery/data";

export const metadata = {
    title: "Gallery | Cesar Jerez",
    description:
        "A small gallery of personal projects, experiments, and art — most pieces live as their own pages.",
};

export default function GalleryPage() {
    const items = getGalleryItems();

    return (
        <main className="min-h-screen">
            <div className=" mx-auto px-4 py-16">
                <Gallery items={items} title="Gallery & Tinkering" />
            </div>
        </main>
    );
}
