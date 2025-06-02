import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '체지방률 계산기 | 체지방 측정, 체형 분석',
  description: '체지방률 계산기로 본인의 체지방을 측정해보세요. 성별, 나이, 키, 체중, 허리둘레를 기반으로 정확한 체지방률을 계산하고 체형을 분석합니다.',
  keywords: '체지방률계산기, 체지방측정, 체형분석, 체지방계산, 체성분분석, 체지방관리, 다이어트, 체중관리, 건강관리, 비만도측정',
  alternates: {
    canonical: 'https://calculator.ai.kr/health/bodyfat'
  },
  openGraph: {
    title: '체지방률 계산기 - 체지방 측정 및 체형 분석',
    description: '성별, 나이, 키, 체중, 허리둘레를 기반으로 정확한 체지방률을 계산하고 체형을 분석해보세요.',
    url: 'https://calculator.ai.kr/health/bodyfat',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 