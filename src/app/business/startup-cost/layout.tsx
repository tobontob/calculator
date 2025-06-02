import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '창업 비용 계산기 | 초기 투자금, 운영 비용 계산',
  description: '창업 비용 계산기로 사업 시작에 필요한 초기 투자금과 운영 비용을 계산해보세요. 상세한 항목별 비용 분석과 예산 계획을 수립할 수 있습니다.',
  keywords: '창업비용계산기, 초기투자금계산, 운영비용계산, 사업자금계산, 창업자금계산, 예산계획, 비용분석, 창업준비, 사업계획, 수익분석',
  alternates: {
    canonical: 'https://calculator.ai.kr/business/startup-cost'
  },
  openGraph: {
    title: '창업 비용 계산기 - 초기 투자금 및 운영 비용 계산',
    description: '사업 시작에 필요한 초기 투자금과 운영 비용을 계산해보세요. 상세한 비용 분석으로 창업 준비를 할 수 있습니다.',
    url: 'https://calculator.ai.kr/business/startup-cost',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 