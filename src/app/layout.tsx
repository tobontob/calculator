import './globals.css';
import type { Metadata } from 'next';
import HamburgerMenu from '@/components/layout/HamburgerMenu';
import Link from 'next/link';
import { headers } from 'next/headers';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '계산기 모음 | 금융, 건강, 수학, 부동산 계산기',
  description: '다양한 계산기를 한 곳에서 편리하게 사용하세요.',
  keywords: '계산기, 단위변환기, 공학용계산기, 대출계산기, BMI계산기, 이자계산기, 온라인계산기, 무료계산기',
  authors: [{ name: '종합 계산기' }],
  openGraph: {
    title: '계산기 모음 | 무료 온라인 계산기',
    description: '단위변환, 수학, 금융, 건강 등 다양한 계산기를 제공하는 무료 온라인 계산기 사이트입니다.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://your-domain.com', // 실제 도메인으로 변경 필요
  },
  twitter: {
    card: 'summary_large_image',
    title: '계산기 모음 | 무료 온라인 계산기',
    description: '단위변환, 수학, 금융, 건강 등 다양한 계산기를 제공하는 무료 온라인 계산기 사이트입니다.',
  },
  verification: {
    google: 'your-google-verification-code', // Google Search Console 인증 코드
  },
  alternates: {
    canonical: 'https://your-domain.com', // 실제 도메인으로 변경 필요
  },
  metadataBase: new URL('http://localhost:3000'),
};

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