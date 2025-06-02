import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: 'BMI 계산기 | 체질량지수 계산, 비만도 측정',
  description: '체질량지수(BMI) 계산기로 본인의 비만도를 측정해보세요. 아시아-태평양 기준의 BMI 판정 기준을 제공하며, 저체중, 정상, 과체중, 비만, 고도비만 여부를 확인할 수 있습니다.',
  keywords: 'BMI계산기, 체질량지수계산기, 비만도계산기, BMI측정, 체중관리, 비만도측정, 표준체중계산, 체질량지수, 비만도체크, 건강관리',
  alternates: {
    canonical: 'https://calculator.ai.kr/health/bmi'
  },
  openGraph: {
    title: 'BMI 계산기 - 체질량지수 계산 및 비만도 측정',
    description: '체질량지수(BMI) 계산기로 본인의 비만도를 측정해보세요. 아시아-태평양 기준의 BMI 판정 기준을 제공합니다.',
    url: 'https://calculator.ai.kr/health/bmi',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 