import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '날짜 계산기 | 기간 계산, D-day 계산',
  description: '날짜 계산기로 두 날짜 사이의 기간과 D-day를 계산해보세요. 특정 날짜로부터 며칠 후의 날짜도 쉽게 계산할 수 있습니다.',
  keywords: '날짜계산기, D-day계산기, 기간계산기, 날짜차이계산, 근무일수계산, 공휴일계산, 달력계산기, 날짜더하기, 날짜빼기, 날짜간격',
  alternates: {
    canonical: 'https://calculator.ai.kr/daily/date-calculator'
  },
  openGraph: {
    title: '날짜 계산기 - 기간 및 D-day 계산',
    description: '두 날짜 사이의 기간과 D-day를 계산해보세요. 날짜 계산을 쉽고 정확하게 할 수 있습니다.',
    url: 'https://calculator.ai.kr/daily/date-calculator',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 