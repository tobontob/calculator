import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '이윤율 계산기 | 마진율, 수익률 계산',
  description: '이윤율 계산기로 판매 마진과 수익률을 계산해보세요. 원가와 판매가를 기준으로 순이익과 이윤율을 정확하게 계산할 수 있습니다.',
  keywords: '이윤율계산기, 마진율계산, 수익률계산, 순이익계산, 원가계산, 판매가계산, 마진계산기, 수익계산기, 이익률계산, 원가대비이익',
  alternates: {
    canonical: 'https://calculator.ai.kr/business/profit-margin'
  },
  openGraph: {
    title: '이윤율 계산기 - 마진율 및 수익률 계산',
    description: '판매 마진과 수익률을 계산해보세요. 원가와 판매가 기준의 정확한 이윤율을 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/business/profit-margin',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 