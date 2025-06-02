import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '개인 대출 계산기 | 대출이자, 원리금 계산',
  description: '개인 대출 계산기로 대출 이자와 월 상환금을 계산해보세요. 원리금 균등상환, 원금 균등상환, 만기일시상환 방식의 상환 계획을 확인할 수 있습니다.',
  keywords: '개인대출계산기, 대출이자계산, 원리금계산, 대출상환계획, 이자계산기, 월상환금계산, 대출원금, 대출이율, 상환방식, 대출기간',
  alternates: {
    canonical: 'https://calculator.ai.kr/daily/personal-loan'
  },
  openGraph: {
    title: '개인 대출 계산기 - 대출 이자 및 상환금 계산',
    description: '대출 이자와 월 상환금을 계산해보세요. 다양한 상환 방식에 따른 상환 계획을 확인할 수 있습니다.',
    url: 'https://calculator.ai.kr/daily/personal-loan',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 