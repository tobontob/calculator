import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '근로소득세 계산기 | 급여 소득세 계산',
  description: '근로소득에 대한 소득세를 계산할 수 있는 무료 온라인 계산기입니다. 급여 수준에 따른 세금을 간편하게 계산해보세요.',
  keywords: '근로소득세계산기, 급여소득세, 근로소득세율, 소득세계산, 급여세금계산',
  openGraph: {
    title: '근로소득세 계산기 | 급여 소득세 간편 계산',
    description: '근로소득에 대한 소득세를 계산할 수 있는 무료 온라인 계산기입니다. 급여 수준에 따른 세금을 간편하게 계산해보세요.',
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