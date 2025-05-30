import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '펀드 수익률 계산기 | 펀드 투자 수익 계산',
  description: '펀드 투자의 수익률을 계산하고 투자 기간별 수익/손실을 분석할 수 있는 무료 온라인 계산기입니다.',
  keywords: '펀드수익률계산기, 펀드수익계산, 투자수익률계산, 펀드투자, 투자성과분석',
  openGraph: {
    title: '펀드 수익률 계산기 | 펀드 투자 수익 계산',
    description: '펀드 투자의 수익률을 계산하고 투자 기간별 수익/손실을 분석할 수 있는 무료 온라인 계산기입니다.',
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