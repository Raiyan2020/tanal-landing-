import type {Metadata} from 'next';
import { Inter, Playfair_Display, Tajawal } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const tajawal = Tajawal({
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  title: 'Tanal - Luxury Digital Wedding Invitations',
  description: 'Design, customize, and share elegant invitations that capture the magic of your special day with our premium luxury platform.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable} ${tajawal.variable}`}>
      <body className="antialiased font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
