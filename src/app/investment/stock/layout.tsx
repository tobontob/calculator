import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '주식 투자 계산기 | 수익률, 손익, 세금 계산',
  description: '주식 투자 계산기로 매수/매도 시 수익률과 손익, 세금을 계산해보세요. 매매 수수료와 양도소득세를 고려한 정확한 실현 수익을 계산할 수 있습니다.',
  keywords: '주식계산기, 주식수익률계산, 주식손익계산, 주식세금계산, 양도소득세계산, 매매수수료계산, 투자수익계산, 주식투자계산기, 실현손익계산, 투자수익률',
  alternates: {
    canonical: 'https://calculator.ai.kr/investment/stock'
  },
  openGraph: {
    title: '주식 투자 계산기 - 수익률, 손익, 세금 계산',
    description: '주식 매매 시의 수익률, 손익, 세금을 계산해보세요. 매매 수수료와 양도소득세를 고려한 실제 수익을 확인할 수 있습니다.',
    url: 'https://calculator.ai.kr/investment/stock',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 