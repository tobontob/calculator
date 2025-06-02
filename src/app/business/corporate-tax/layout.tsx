import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '법인세 계산기 | 법인세액, 지방소득세 계산',
  description: '법인세 계산기로 과세표준에 따른 법인세액을 계산해보세요. 법인지방소득세와 세액공제를 고려한 정확한 납부세액을 계산할 수 있습니다.',
  keywords: '법인세계산기, 법인세율계산, 법인지방소득세, 과세표준계산, 세액공제계산, 법인세신고, 기업세금계산, 법인세납부, 세금계산기, 기업회계',
  alternates: {
    canonical: 'https://calculator.ai.kr/business/corporate-tax'
  },
  openGraph: {
    title: '법인세 계산기 - 법인세액 및 지방소득세 계산',
    description: '과세표준에 따른 법인세액을 계산해보세요. 법인지방소득세와 세액공제를 반영한 정확한 납부세액을 확인할 수 있습니다.',
    url: 'https://calculator.ai.kr/business/corporate-tax',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 