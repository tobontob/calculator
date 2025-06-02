import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '연체 이자 계산기 | 연체료, 지연이자 계산',
  description: '연체 이자 계산기로 연체 기간에 따른 연체료와 지연이자를 계산해보세요. 정확한 연체 금액과 일일 발생 이자를 확인할 수 있습니다.',
  keywords: '연체이자계산기, 연체료계산, 지연이자계산, 연체금액계산, 연체일수계산, 일일이자계산, 연체이율, 연체기간, 연체원금, 연체이자율',
  alternates: {
    canonical: 'https://calculator.ai.kr/daily/overdue'
  },
  openGraph: {
    title: '연체 이자 계산기 - 연체료 및 지연이자 계산',
    description: '연체 기간에 따른 연체료와 지연이자를 계산해보세요. 정확한 연체 금액을 확인할 수 있습니다.',
    url: 'https://calculator.ai.kr/daily/overdue',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 