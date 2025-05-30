import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '퇴직금 계산기 | 퇴직금 간편 계산',
  description: '근무기간과 평균임금을 입력하여 퇴직금을 계산할 수 있는 무료 온라인 계산기입니다.',
  keywords: '퇴직금계산기, 퇴직금계산방법, 퇴직금산정, 퇴직금계산식, 퇴직금시뮬레이션',
  openGraph: {
    title: '퇴직금 계산기 | 퇴직금 간편 계산',
    description: '근무기간과 평균임금을 입력하여 퇴직금을 계산할 수 있는 무료 온라인 계산기입니다.',
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