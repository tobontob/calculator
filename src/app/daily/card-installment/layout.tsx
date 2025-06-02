import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '카드 할부 계산기 | 할부 수수료, 할부 이자 계산',
  description: '신용카드 할부 계산기로 할부 수수료와 월 할부금을 계산해보세요. 할부 개월 수에 따른 총 부담액과 실제 이자율을 확인할 수 있습니다.',
  keywords: '카드할부계산기, 할부수수료계산, 할부이자계산, 신용카드할부, 월할부금계산, 할부이자율, 할부개월수, 카드할부이자, 할부원금, 총부담액계산',
  alternates: {
    canonical: 'https://calculator.ai.kr/daily/card-installment'
  },
  openGraph: {
    title: '카드 할부 계산기 - 할부 수수료 및 이자 계산',
    description: '신용카드 할부의 수수료와 월 할부금을 계산해보세요. 할부 기간에 따른 총 부담액을 확인할 수 있습니다.',
    url: 'https://calculator.ai.kr/daily/card-installment',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 