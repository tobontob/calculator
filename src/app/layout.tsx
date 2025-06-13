import './globals.css';
import HamburgerMenu from '@/components/layout/HamburgerMenu';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { baseMetadata } from './metadata.config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  ...baseMetadata,
  title: '계산기 AI | 무료 온라인 계산기 모음 - 금융, 세금, 건강, 부동산, 사업 계산기',
  description: '금융 계산기(대출, 이자), 세금 계산기(소득세, 부가세), 건강 계산기(BMI, 칼로리), 부동산 계산기(담보대출, 취득세), 사업 계산기(법인세, 매출이익) 등 150+ 생활 계산기를 무료로 제공합니다.',
  keywords: '계산기, 금융계산기, 대출계산기, 세금계산기, 건강계산기, 부동산계산기, 사업계산기',
  verification: {
    google: '7vfmZg7MxwmARCQcGZbFUhv5DBtoDTv81onwUFe4KWA',
  },
  other: {
    'naver-site-verification': 'b74d70e6f3a32e82ca300a71e57242ff677527d6',
    'msvalidate.01': '5F67DA5E196AC76DF25556B56C15FC3E'
  },
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
    title: '계산기 AI | 무료 온라인 계산기 모음',
    description: '150+ 무료 온라인 계산기 모음 - 금융, 세금, 건강, 부동산, 사업 계산기',
    images: '/og-image.png',
    type: 'website',
    siteName: '계산기 AI',
    locale: 'ko_KR',
  },
  alternates: {
    canonical: 'https://calculator.ai.kr'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator Hub - 다양한 계산기 모음',
    description: '환율, 대출, 세금, 건강 등 다양한 계산기를 제공하는 서비스입니다.',
    images: ['https://calculator.ai.kr/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="b74d70e6f3a32e82ca300a71e57242ff677527d6" />
      </head>
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