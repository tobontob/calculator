import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '연말정산 계산기 | 연말정산 환급액 계산',
  description: '근로소득세 연말정산을 계산할 수 있는 무료 온라인 계산기입니다. 소득공제, 세액공제를 반영한 예상 환급액을 계산해보세요.',
  keywords: '연말정산계산기, 연말정산환급액, 근로소득세, 소득공제, 세액공제, 연말정산시뮬레이션',
  openGraph: {
    title: '연말정산 계산기 | 연말정산 환급액 간편 계산',
    description: '근로소득세 연말정산을 계산할 수 있는 무료 온라인 계산기입니다. 소득공제, 세액공제를 반영한 예상 환급액을 계산해보세요.',
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