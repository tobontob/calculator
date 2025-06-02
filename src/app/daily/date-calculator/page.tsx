import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '날짜 계산기 | 기간/일수 차이 자동 계산 (무료) | 계산기 AI',
  description: '시작일과 종료일 사이의 일수, 주수, 월수를 정확히 계산해 드립니다. D-Day 계산, 근무일수 계산까지 한 번에!',
  keywords: '날짜 계산기, D-Day 계산기, 기간 계산, 일수 계산, 근무일수 계산, 무료 계산기',
  openGraph: {
    title: '날짜 계산기 | 기간/일수 차이 자동 계산 (무료) | 계산기 AI',
    description: '시작일과 종료일 사이의 일수, 주수, 월수를 정확히 계산해 드립니다. D-Day 계산, 근무일수 계산까지 한 번에!',
  },
  alternates: {
    canonical: 'https://calculator-ai.com/daily/date-calculator',
  },
};

export default function DateCalculator() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">날짜 계산기</h1>
      {/* 여기에 날짜 계산기 컴포넌트 구현 */}
    </main>
  );
} 