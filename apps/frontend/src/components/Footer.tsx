import Link from 'next/link';
import { getFooterData } from '@/data/data';

export default async function Footer() {
    const { navItems, copyright } = await getFooterData();

    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4 md:px-6">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    &copy; {copyright.years}{' '}
                    {copyright.link ? (
                        <Link href={copyright.link} className="font-semibold hover:underline underline-offset-4">
                            {copyright.name}
                        </Link>
                    ) : (
                        <span className="font-semibold">{copyright.name}</span>
                    )}
                </p>
                {navItems.length > 0 && (
                    <div className="flex gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </footer>
    );
}