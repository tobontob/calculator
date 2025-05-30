import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '원천징수 계산기 | 소득별 원천징수 세액 계산',
  description: '근로소득, 사업소득, 이자소득, 배당소득 등 다양한 소득에 대한 원천징수 세액을 계산할 수 있는 무료 온라인 계산기입니다.',
  keywords: '원천징수계산기, 원천징수세액, 근로소득원천징수, 사업소득원천징수, 이자소득원천징수, 배당소득원천징수',
  openGraph: {
    title: '원천징수 계산기 | 소득별 원천징수 세액 계산',
    description: '근로소득, 사업소득, 이자소득, 배당소득 등 다양한 소득에 대한 원천징수 세액을 계산할 수 있는 무료 온라인 계산기입니다.',
    type: 'website',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 