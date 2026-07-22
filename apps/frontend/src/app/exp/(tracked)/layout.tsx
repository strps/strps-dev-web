import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/(website)/globals.css';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cesar Jerez | Full Stack Developer',
    description: 'Portfolio of Cesar Jerez, a Multidisciplinary Developer based in Costa Rica.',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body className={`${inter.className} min-h-screen bg-background font-sans text-foreground antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
