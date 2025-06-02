import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '주택담보대출 계산기 | 원리금 균등상환, 원금 균등상환 계산',
  description: '주택담보대출 계산기로 원리금 균등상환, 원금 균등상환 방식의 월별 상환금액과 이자를 계산해보세요. LTV 비율과 DTI 비율도 함께 계산할 수 있습니다.',
  keywords: '주택담보대출계산기, 담보대출이자계산, 원리금균등상환, 원금균등상환, LTV계산기, DTI계산기, 대출이자계산, 대출상환계획, 담보대출한도, 이자계산기',
  alternates: {
    canonical: 'https://calculator.ai.kr/real-estate/mortgage'
  },
  openGraph: {
    title: '주택담보대출 계산기 - 원리금/원금 균등상환 계산',
    description: '주택담보대출의 월별 상환금액과 이자를 계산해보세요. LTV, DTI 비율도 함께 확인할 수 있습니다.',
    url: 'https://calculator.ai.kr/real-estate/mortgage',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 