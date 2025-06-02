import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '공학용 계산기 | 삼각함수, 지수, 로그 계산',
  description: '공학용 계산기로 삼각함수, 지수, 로그 등 고급 수학 계산을 해보세요. 과학, 공학 계산에 필요한 다양한 함수를 제공합니다.',
  keywords: '공학용계산기, 과학계산기, 삼각함수계산기, 지수계산기, 로그계산기, 수학계산기, 공학계산기, 과학공학계산기, 고급계산기, 함수계산기',
  alternates: {
    canonical: 'https://calculator.ai.kr/math/scientific'
  },
  openGraph: {
    title: '공학용 계산기 - 삼각함수, 지수, 로그 계산',
    description: '삼각함수, 지수, 로그 등 과학, 공학 계산에 필요한 다양한 함수를 제공하는 온라인 계산기입니다.',
    url: 'https://calculator.ai.kr/math/scientific',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 