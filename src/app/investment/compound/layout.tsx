import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '복리 계산기 | 복리 수익, 투자 수익률 계산',
  description: '복리 계산기로 장기 투자의 복리 효과를 계산해보세요. 투자 기간, 수익률, 추가 투자금을 고려한 정확한 미래 가치를 계산할 수 있습니다.',
  keywords: '복리계산기, 복리수익계산, 투자수익률계산, 장기투자계산, 복리효과계산, 투자수익계산, 미래가치계산, 투자계산기, 복리이자계산, 자산증식계산',
  alternates: {
    canonical: 'https://calculator.ai.kr/investment/compound'
  },
  openGraph: {
    title: '복리 계산기 - 복리 수익 및 투자 수익률 계산',
    description: '장기 투자의 복리 효과를 계산해보세요. 투자 기간과 수익률에 따른 정확한 미래 자산 가치를 확인할 수 있습니다.',
    url: 'https://calculator.ai.kr/investment/compound',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 