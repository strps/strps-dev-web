'use client';

import { Menu, X } from 'lucide-react';
import React, { type FC, Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeSwitch } from './ThemeSwitch';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from './ui/button';
import { CrystalSurface } from './primitives/CrystalSurface';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n/config';

/**
 * How far the page must move before the header stops being a hole in the page
 * and becomes glass. Small enough to feel immediate, large enough that a
 * rubber-band overscroll at the top does not flicker it on.
 */
const GLASS_AT = 8;

export interface HeaderClientProps {
    navItems: { name: string; href?: string; appearance?: string }[];
    overlay?: boolean;
    /** Set false to keep the header transparent at every scroll offset. */
    background?: boolean;
    theme?: 'auto' | 'light' | 'dark' | 'inverted';
    brand: React.ReactNode;
    container?: boolean;
    locale: Locale;
}

const BrandText: FC<{ brandName: string }> = ({ brandName }) => {
    return (<span className="text-xl font-bold tracking-tight text-foreground">
        {brandName}<span className="text-primary">.</span>
    </span>
    );
}

export const HeaderNav: React.FC<HeaderClientProps> = ({
    navItems = [],
    brand = <BrandText brandName="Brand" />,
    overlay = false,
    background = true,
    theme: themeOverwrite = 'auto',
    container = true,
    locale,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Lenis scrolls the window natively, so the native offset is the right
        // source here — `scrollState` exists for per-frame canvas reads, not for
        // a boolean that flips once near the top of the page.
        const onScroll = () => setIsScrolled(window.scrollY > GLASS_AT);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // The open mobile menu needs a backdrop of its own, whatever the offset:
    // links over a transparent header would sit straight on the page content.
    const glass = background && (isScrolled || isMenuOpen);

    return (
        <header
            data-glass={glass || undefined}
            className={cn(
                'top-0 left-0 right-0 z-50 isolate border-b',
                'transition-[border-color,box-shadow] duration-500 ease-out',
                overlay ? 'absolute' : 'sticky',
                glass ? 'border-crystal-edge shadow-crystal' : 'border-transparent',
            )}
        >
            {/*
              Mounted at every offset and faded, rather than mounted on scroll:
              attaching a backdrop-filter mid-scroll pops, and an element that
              only exists in one state has nothing to transition from.
            */}
            {background && (
                <CrystalSurface
                    className={cn(
                        'transition-opacity duration-500 ease-out',
                        glass ? 'opacity-100' : 'opacity-0',
                    )}
                    // A card's glass sits over one section; the bar sits over
                    // everything that scrolls under it, so it takes the milkier
                    // tint and a heavier blur to keep the nav legible.
                    tintClassName="bg-crystal-strong backdrop-blur-[12px]"
                />
            )}
            <div className={`
                    flex justify-between items-center h-16
                    ${container ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : ''}
                `}
            >
                <Link href={`/${locale}`} className="text-xl font-bold tracking-tight text-foreground">
                    {typeof (brand) === 'string' ? <BrandText brandName={brand} /> : brand}
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-7">
                    {navItems.map((item) =>
                        item.appearance === 'outlineGhost' ? (
                            <Button
                                key={item.name}
                                asChild
                                variant="outlineGhost"
                                size="sm"
                                className="h-auto rounded-sharp px-4 py-2 text-[13px]"
                            >
                                <a href={item.href}>{item.name}</a>
                            </Button>
                        ) : (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.name}
                            </a>
                        ),
                    )}
                    <Suspense fallback={null}>
                        <LanguageSwitcher locale={locale} />
                    </Suspense>
                    <ThemeSwitch />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <Suspense fallback={null}>
                        <LanguageSwitcher locale={locale} />
                    </Suspense>
                    <ThemeSwitch />
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-muted-foreground hover:text-foreground"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Dropdown — sits on the header's own glass, which spans
                the whole element and so grows with the dropdown. */}
            {isMenuOpen && (
                <div className={cn('md:hidden border-t border-crystal-edge', !background && 'bg-background')}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default HeaderNav;
