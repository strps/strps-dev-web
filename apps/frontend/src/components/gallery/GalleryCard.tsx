import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { GalleryItem, GalleryPriority } from "@/app/(website)/[locale]/lab/types";

const categoryLabel: Record<GalleryItem["category"], string> = {
    art: "Art",
    experiment: "Experiment",
    project: "Project",
};

const placeholderGradient: Record<GalleryItem["category"], string> = {
    art: "from-fuchsia-600 via-purple-600 to-indigo-700",
    experiment: "from-amber-500 via-orange-600 to-red-700",
    project: "from-emerald-500 via-teal-600 to-sky-700",
};

export interface GalleryCardProps {
    item: GalleryItem;
    className?: string;
}

export function GalleryCard({ item, className }: GalleryCardProps) {
    const priority: GalleryPriority = item.priority ?? "low";
    const isHigh = priority === "high";

    return (
        <Link
            href={item.href}
            className={cn(
                "group relative block h-full w-full overflow-hidden rounded-2xl",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl",
                className
            )}
        >
            {item.imageUrl ? (
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            ) : (
                <GalleryPlaceholder item={item} />
            )}

            <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-black/90"
            />

            <Badge className="absolute top-3 left-3 backdrop-blur-sm bg-background/70 text-foreground border border-border">
                {categoryLabel[item.category]}
            </Badge>

            <ArrowUpRight
                className="absolute top-3 right-3 h-5 w-5 text-white/80 transition-all duration-300 group-hover:text-white group-hover:rotate-12"
            />

            <div
                className={cn(
                    "absolute inset-x-0 bottom-0 flex flex-col gap-2 text-white",
                    isHigh ? "p-6 md:p-7" : "p-4 md:p-5"
                )}
            >
                <div className="flex items-baseline justify-between gap-3">
                    <h3
                        className={cn(
                            "font-bold leading-tight tracking-tight",
                            isHigh ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                        )}
                    >
                        {item.title}
                    </h3>
                    {item.year && (
                        <span className="text-xs text-white/70 shrink-0">{item.year}</span>
                    )}
                </div>

                {isHigh && (
                    <p className="text-sm text-white/80 line-clamp-3 leading-relaxed max-w-prose">
                        {item.description}
                    </p>
                )}

                {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.slice(0, isHigh ? 4 : 2).map((tag) => (
                            <Badge
                                key={tag}
                                variant="outline"
                                className="text-[10px] font-normal text-white/90 border-white/30 bg-white/5 backdrop-blur-sm"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}

function GalleryPlaceholder({ item }: { item: GalleryItem }) {
    const initials = item.title
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 3)
        .toUpperCase();
    return (
        <div
            className={cn(
                "absolute inset-0 bg-linear-to-br",
                placeholderGradient[item.category]
            )}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl font-black tracking-tighter text-white/15 select-none">
                    {initials}
                </span>
            </div>
        </div>
    );
}

export default GalleryCard;
