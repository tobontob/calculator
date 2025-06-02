import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '실수령액 계산기 | 월급 실수령액, 세후 연봉 계산',
  description: '실수령액 계산기로 월급과 연봉의 실수령액을 계산해보세요. 소득세, 주민세, 국민연금, 건강보험, 고용보험, 장기요양보험을 모두 고려한 정확한 계산이 가능합니다.',
  keywords: '실수령액계산기, 월급실수령액, 세후연봉계산, 연봉실수령액, 급여실수령액, 세금계산, 4대보험계산, 소득세계산, 급여계산기, 연봉계산기',
  alternates: {
    canonical: 'https://calculator.ai.kr/salary/after-tax'
  },
  openGraph: {
    title: '실수령액 계산기 - 월급/연봉 실수령액 계산',
    description: '월급과 연봉의 실수령액을 계산해보세요. 세금과 4대 보험료를 모두 고려한 정확한 실수령액을 확인할 수 있습니다.',
    url: 'https://calculator.ai.kr/salary/after-tax',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 