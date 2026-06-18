"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GalleryBar } from "./GalleryBar";
import { GalleryCard } from "./GalleryCard";
import type { GalleryCategory, GalleryItem, GalleryPriority } from "@/app/(website)/gallery/types";

export interface GalleryProps {
    items: GalleryItem[];
    title: string;
}

const PRIORITY_SPAN: Record<GalleryPriority, string> = {
    // Big hero tile: two columns wide, tall.
    high: "col-span-2 sm:col-span-2 lg:col-span-2 row-span-4",
    // Medium tile: wider on desktop, comfortable height.
    medium: "col-span-2 sm:col-span-1 lg:col-span-2 row-span-3",
    // Small tile: single cell.
    low: "col-span-2 sm:col-span-1 lg:col-span-1 row-span-2",
};

export function Gallery({ items, title }: GalleryProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<GalleryCategory[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const availableTags = useMemo(() => {
        const tags = new Set<string>();
        items.forEach((item) => item.tags?.forEach((t) => tags.add(t)));
        return Array.from(tags).sort();
    }, [items]);

    const filteredItems = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return items.filter((item) => {
            const matchesSearch =
                q.length === 0 ||
                item.title.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                item.tags?.some((t) => t.toLowerCase().includes(q));

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(item.category);

            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every((t) => item.tags?.includes(t));

            return matchesSearch && matchesCategory && matchesTags;
        });
    }, [items, searchQuery, selectedCategories, selectedTags]);

    const toggleCategory = (category: GalleryCategory) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const reset = () => {
        setSearchQuery("");
        setSelectedCategories([]);
        setSelectedTags([]);
    };

    return (
        <div className="space-y-10">
            <GalleryBar
                title={title}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                selectedCategories={selectedCategories}
                onToggleCategory={toggleCategory}
                availableTags={availableTags}
                selectedTags={selectedTags}
                onToggleTag={toggleTag}
                onReset={reset}
            />

            {filteredItems.length > 0 ? (
                <div
                    className={cn(
                        "grid gap-4 grid-flow-dense",
                        "grid-cols-[repeat(auto-fit,minmax(220px,1fr))]",
                        "auto-rows-[110px] md:auto-rows-[120px]",
                        "animate-in fade-in slide-in-from-bottom-2 duration-500"
                    )}
                >
                    {filteredItems.map((item) => (
                        <GalleryCard
                            key={item.id}
                            item={item}
                            className={PRIORITY_SPAN[item.priority ?? "low"]}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
                    <h3 className="text-lg font-medium">Nothing matches those filters</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Try widening the search or clearing a filter.
                    </p>
                    <Button variant="link" onClick={reset} className="mt-2 text-primary">
                        Clear all filters
                    </Button>
                </div>
            )}

            <div className="flex justify-center text-xs text-muted-foreground">
                Showing {filteredItems.length} of {items.length}
            </div>
        </div>
    );
}

export default Gallery;
