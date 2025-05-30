import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '전월세 계산기 | 전환율, 월세 부담금 계산',
  description: '전세 보증금과 월세 전환율을 계산하고, 월세 부담금을 비교 분석할 수 있는 무료 온라인 전월세 계산기입니다.',
  keywords: '전월세계산기, 전환율계산, 월세계산, 전세계산, 보증금계산, 임대료계산, 부동산계산기',
  openGraph: {
    title: '전월세 계산기 | 보증금 및 월세 계산',
    description: '전세 보증금과 월세 전환율을 계산하고, 월세 부담금을 비교 분석할 수 있는 무료 온라인 전월세 계산기입니다.',
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