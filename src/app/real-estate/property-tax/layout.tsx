import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '종합부동산세 계산기 | 종부세 계산',
  description: '주택, 토지 등의 부동산 보유에 대한 종합부동산세(종부세)를 계산할 수 있는 무료 온라인 계산기입니다.',
  keywords: '종합부동산세계산기, 종부세계산기, 부동산세금, 주택종부세, 토지종부세, 부동산보유세',
  openGraph: {
    title: '종합부동산세 계산기 | 종부세 간편 계산',
    description: '주택, 토지 등의 부동산 보유에 대한 종합부동산세(종부세)를 계산할 수 있는 무료 온라인 계산기입니다.',
    type: 'website',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 