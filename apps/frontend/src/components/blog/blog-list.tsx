"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Calendar,
    Clock,
    Search,
    X,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Post } from "../../../../payload/src/payload-types"

interface BlogListProps {
    posts: Post[];
}

const ITEMS_PER_PAGE = 6;

export function BlogList({ posts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Extract all unique tags from posts
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, [posts]);

    // Filter posts logic
    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.some(tag => post.tags.includes(tag));

            return matchesSearch && matchesTags;
        });
    }, [posts, searchQuery, selectedTags]);

    // Pagination logic
    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
        setCurrentPage(1); // Reset to first page on filter change
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedTags([]);
        setCurrentPage(1);
    };

    return (
        <div className="space-y-10">
            {/* --- Controls Section --- */}
            <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative max-w-md mx-auto md:mx-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="pl-9"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>

                {/* Tags Filter */}
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm text-muted-foreground mr-2">Filter by:</span>
                    {allTags.map(tag => (
                        <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/90 transition-colors"
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                    {(selectedTags.length > 0 || searchQuery) && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="h-6 px-2 text-xs ml-auto sm:ml-2"
                        >
                            Reset Filters
                            <X className="ml-1 h-3 w-3" />
                        </Button>
                    )}
                </div>
            </div>

            {/* --- Posts Grid --- */}
            {paginatedPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {paginatedPosts.map((post) => (
                        <Card key={post.slug} className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-muted group">
                            <div className="relative w-full aspect-video overflow-hidden rounded-t-xl bg-muted">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <CardHeader className="space-y-2">
                                <div className="flex gap-2 flex-wrap">
                                    {post.tags.slice(0, 3).map(tag => (
                                        <Badge key={tag} variant="secondary" className="text-xs font-normal">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <CardTitle className="leading-tight text-xl">
                                    <Link href={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors">
                                        {post.title}
                                    </Link>
                                </CardTitle>
                                <div className="flex items-center text-sm text-muted-foreground gap-4 pt-1">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" /> {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {post.readTime}
                                    </span>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </CardContent>

                            <CardFooter className="mt-auto pt-0">
                                <Button variant="ghost" className="p-0 h-auto hover:bg-transparent hover:text-primary" asChild>
                                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-1">
                                        Read Article <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
                    <h3 className="text-lg font-medium">No articles found</h3>
                    <p className="text-muted-foreground mt-1">
                        Try adjusting your search terms or filters.
                    </p>
                    <Button
                        variant="link"
                        onClick={clearFilters}
                        className="mt-2 text-primary"
                    >
                        Clear all filters
                    </Button>
                </div>
            )}

            {/* --- Pagination --- */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center px-4 font-medium text-sm">
                        Page {currentPage} of {totalPages}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}