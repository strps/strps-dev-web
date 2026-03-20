import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

import Footer from '@/components/Footer';
import { ThemeProvider } from '@/providers/theme-provider';
import HeaderNav from '@/components/HeaderNav';
import { getNavItems } from '@/data/data';

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
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>

  );
}
