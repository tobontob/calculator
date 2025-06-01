import './globals.css';
import HamburgerMenu from '@/components/layout/HamburgerMenu';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '계산기 모음',
  description: '다양한 금융, 건강, 생활 계산기를 제공하는 웹사이트입니다.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ]
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: '계산기 모음',
    description: '다양한 금융, 건강, 생활 계산기를 제공하는 웹사이트입니다.',
    images: '/og-image.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div id="header-wrapper" className="fixed top-0 left-0 right-0 z-30 transition-colors duration-500">
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-center">
              <Link href="/" className="text-2xl font-bold text-center">
                종합 계산기
              </Link>
            </div>
          </header>
        </div>
        <HamburgerMenu />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
} 