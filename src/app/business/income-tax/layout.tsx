import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '소득세 계산기 | 근로소득세, 종합소득세 계산',
  description: '소득세 계산기로 근로소득세와 종합소득세를 계산해보세요. 소득 구간별 세율과 공제 항목을 반영한 정확한 세금을 계산할 수 있습니다.',
  keywords: '소득세계산기, 근로소득세계산, 종합소득세계산, 세금계산기, 연말정산계산, 소득세율계산, 세금공제계산, 과세표준계산, 소득공제, 세액공제',
  alternates: {
    canonical: 'https://calculator.ai.kr/business/income-tax'
  },
  openGraph: {
    title: '소득세 계산기 - 근로소득세 및 종합소득세 계산',
    description: '근로소득세와 종합소득세를 계산해보세요. 다양한 공제 항목을 반영한 정확한 세금을 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/business/income-tax',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 