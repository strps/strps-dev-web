'use client';

import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { type FC, useState, } from 'react';
import Link from 'next/link';



export interface HeaderClientProps {
    navItems: { name: string; href?: string }[];
    overlay?: boolean;
    background?: boolean;
    theme?: 'auto' | 'light' | 'dark' | 'inverted';
    brand: React.ReactNode;
    container?: boolean;
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
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { setTheme, theme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header
            className={`
                top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border 
                ${overlay ? 'absolute' : 'relative'} 
                ${container ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : ''}
                ${background ? 'bg-background' : 'bg-transparent'}
                `
            }
        >
            <div className="flex justify-between items-center h-16">
                <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
                    {typeof (brand) === 'string' ? <BrandText brandName={brand} /> : brand}
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-muted-foreground hover:text-foreground"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-background border-b border-border">
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