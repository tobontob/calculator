import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '환율 계산기 | 실시간 환율, 송금 환율 계산',
  description: '실시간 환율 계산기로 주요 통화의 환율을 계산해보세요. 달러, 엔, 유로 등 주요 통화의 매매기준율과 송금 환율을 제공합니다.',
  keywords: '환율계산기, 실시간환율, 환율변환, 달러환율, 엔화환율, 유로환율, 송금환율계산, 매매기준율, 통화변환, 외화계산기',
  alternates: {
    canonical: 'https://calculator.ai.kr/daily/exchange'
  },
  openGraph: {
    title: '환율 계산기 - 실시간 환율 및 송금 환율 계산',
    description: '주요 통화의 실시간 환율을 계산해보세요. 매매기준율과 송금 환율 정보를 확인할 수 있습니다.',
    url: 'https://calculator.ai.kr/daily/exchange',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 