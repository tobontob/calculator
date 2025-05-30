import './globals.css';
import type { Metadata } from 'next';
import HamburgerMenu from '@/components/layout/HamburgerMenu';
import Link from 'next/link';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: '종합 계산기',
  description: '다양한 계산기를 한 곳에서 편리하게 사용하세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
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
      </body>
    </html>
  );
} 