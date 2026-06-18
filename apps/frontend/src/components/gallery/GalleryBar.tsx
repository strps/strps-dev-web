"use client";

import { useState } from "react";
import { Filter, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GALLERY_CATEGORIES, GalleryCategory } from "@/app/(website)/gallery/types";
// import { GALLERY_CATEGORIES, type GalleryCategory } from "@/app/gallery/types";

export interface GalleryBarProps {
    title: string;
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
    selectedCategories: GalleryCategory[];
    onToggleCategory: (category: GalleryCategory) => void;
    availableTags: string[];
    selectedTags: string[];
    onToggleTag: (tag: string) => void;
    onReset: () => void;
    className?: string;
}

export function GalleryBar({
    title,
    searchQuery,
    onSearchQueryChange,
    selectedCategories,
    onToggleCategory,
    availableTags,
    selectedTags,
    onToggleTag,
    onReset,
    className,
}: GalleryBarProps) {
    const [filtersOpen, setFiltersOpen] = useState(false);

    const activeFilterCount =
        (searchQuery.length > 0 ? 1 : 0) +
        selectedCategories.length +
        selectedTags.length;
    const hasActiveFilters = activeFilterCount > 0;

    return (
        <div className={cn("space-y-4 container mx-auto", className)}>
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                    {title}
                </h1>

                <Button
                    variant={filtersOpen ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFiltersOpen((v) => !v)}
                    aria-expanded={filtersOpen}
                    aria-controls="gallery-filters"
                >
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                        <Badge
                            variant="secondary"
                            className="ml-1 h-5 px-1.5 text-xs"
                        >
                            {activeFilterCount}
                        </Badge>
                    )}
                </Button>
            </div>

            {filtersOpen && (
                <div id="gallery-filters" className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                        <div className="relative w-full md:max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search the gallery…"
                                value={searchQuery}
                                onChange={(e) => onSearchQueryChange(e.target.value)}
                                className="pl-9"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    aria-label="Clear search"
                                    onClick={() => onSearchQueryChange("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {GALLERY_CATEGORIES.map(({ value, label }) => {
                                const active = selectedCategories.includes(value);
                                return (
                                    <Badge
                                        key={value}
                                        variant={active ? "default" : "outline"}
                                        onClick={() => onToggleCategory(value)}
                                        className="cursor-pointer select-none px-3 py-1 text-xs transition-colors"
                                    >
                                        {label}
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>

                    {availableTags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground mr-1">
                                Tags
                            </span>
                            {availableTags.map((tag) => {
                                const active = selectedTags.includes(tag);
                                return (
                                    <Badge
                                        key={tag}
                                        variant={active ? "secondary" : "ghost"}
                                        onClick={() => onToggleTag(tag)}
                                        className="cursor-pointer select-none transition-colors"
                                    >
                                        {tag}
                                    </Badge>
                                );
                            })}
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onReset}
                                    className="h-6 px-2 text-xs ml-auto"
                                >
                                    Reset
                                    <X className="ml-1 h-3 w-3" />
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default GalleryBar;
