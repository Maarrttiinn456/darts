import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({
    variable: '--font-sans',
    subsets: ['latin', 'latin-ext'],
});

const playfair = Playfair_Display({
    variable: '--font-heading',
    subsets: ['latin', 'latin-ext'],
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
                className={`${inter.variable} ${playfair.variable} antialiased`}
            >
                {children}
                <Toaster position="top-center" />
            </body>
        </html>
    );
}
