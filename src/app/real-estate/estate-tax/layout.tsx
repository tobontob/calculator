import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '재산세 계산기 | 부동산 재산세 계산',
  description: '주택, 건축물, 토지에 대한 재산세를 계산할 수 있는 무료 온라인 계산기입니다.',
  keywords: '재산세계산기, 부동산재산세, 주택재산세, 건축물재산세, 토지재산세, 지방세계산',
  openGraph: {
    title: '재산세 계산기 | 부동산 재산세 간편 계산',
    description: '주택, 건축물, 토지에 대한 재산세를 계산할 수 있는 무료 온라인 계산기입니다.',
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