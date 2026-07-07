import type { Metadata } from 'next';
import { Inter, Playfair_Display, Tajawal } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const tajawal = Tajawal({
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tanal - Luxury Digital Wedding Invitations',
  description: 'Design, customize, and share elegant invitations that capture the magic of your special day with our premium luxury platform.',
};

import { cookies } from 'next/headers';
import SplashScreen from '@/components/SplashScreen';

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const cookieStore = await cookies();
  const lang = cookieStore.get('tanal_lang')?.value || 'ar';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} className={`scroll-smooth ${inter.variable} ${playfair.variable} ${tajawal.variable}`}>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <SplashScreen />
        <main>{children}</main>
      </body>
    </html>
  );
}
