import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '기본 계산기 | 사칙연산, 퍼센트, 제곱근 계산',
  description: '기본 계산기로 사칙연산, 퍼센트, 제곱근 등 기본적인 수학 계산을 해보세요. 계산 기록 저장 기능과 함께 편리한 계산이 가능합니다.',
  keywords: '계산기, 기본계산기, 사칙연산계산기, 퍼센트계산기, 제곱근계산기, 수학계산기, 온라인계산기, 기록저장, 무료계산기, 웹계산기',
  alternates: {
    canonical: 'https://calculator.ai.kr/math/basic'
  },
  openGraph: {
    title: '기본 계산기 - 사칙연산, 퍼센트, 제곱근 계산',
    description: '사칙연산, 퍼센트, 제곱근 등 기본적인 수학 계산을 할 수 있는 온라인 계산기입니다.',
    url: 'https://calculator.ai.kr/math/basic',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 