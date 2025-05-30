import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '취득세/등록세 계산기 | 부동산 취득세 계산',
  description: '아파트, 주택, 상가 등 부동산 취득 시 납부해야 할 취득세와 등록세를 간편하게 계산할 수 있는 무료 온라인 계산기입니다.',
  keywords: '취득세계산기, 등록세계산기, 부동산취득세, 아파트취득세, 주택취득세, 상가취득세, 세금계산기',
  openGraph: {
    title: '취득세/등록세 계산기 | 부동산 세금 계산',
    description: '아파트, 주택, 상가 등 부동산 취득 시 납부해야 할 취득세와 등록세를 계산할 수 있는 무료 온라인 계산기입니다.',
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