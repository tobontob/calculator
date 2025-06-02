import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '대출 계산기 | 원리금 균등상환, 원금 균등상환, 만기일시상환 계산',
  description: '대출금 상환 계산기로 원리금 균등상환, 원금 균등상환, 만기일시상환 방식의 월별 상환금액과 이자를 계산해보세요. 대출 기간, 금리에 따른 정확한 상환 계획을 수립할 수 있습니다.',
  keywords: '대출계산기, 대출이자계산기, 원리금균등상환, 원금균등상환, 만기일시상환, 대출상환계산, 이자계산기, 월상환금계산, 대출이자, 대출기간',
  alternates: {
    canonical: 'https://calculator.ai.kr/financial/loan'
  },
  openGraph: {
    title: '대출 계산기 - 원리금/원금 균등상환, 만기일시상환 계산',
    description: '대출 상환 방식별 월 상환금액과 이자를 계산해보세요. 원리금 균등상환, 원금 균등상환, 만기일시상환 방식의 정확한 계산이 가능합니다.',
    url: 'https://calculator.ai.kr/financial/loan',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 