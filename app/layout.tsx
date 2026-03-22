import type { Metadata } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const barlow = Barlow({
    variable: '--font-sans',
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '500', '600'],
});

const barlowCondensed = Barlow_Condensed({
    variable: '--font-heading',
    subsets: ['latin', 'latin-ext'],
    weight: ['600', '700', '800'],
});

export const metadata: Metadata = {
    title: 'Darts App',
    description: 'Darts scoring and stats',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="cs" className="dark">
            <body
                className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}
            >
                <main>{children}</main>
                <Toaster position="top-center" />
            </body>
        </html>
    );
}
