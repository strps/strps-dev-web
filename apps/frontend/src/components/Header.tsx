import Link from 'next/link';
import { Code2 } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                    <Code2 className="h-6 w-6" />
                    <span>STRPS.DEV</span>
                </div>
                <nav className="flex gap-4 sm:gap-6">
                    <Link href="#projects" className="text-sm font-medium hover:underline underline-offset-4">
                        Projects
                    </Link>
                    <Link href="#experience" className="text-sm font-medium hover:underline underline-offset-4">
                        Experience
                    </Link>
                    <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}