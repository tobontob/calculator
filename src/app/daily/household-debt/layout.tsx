import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '가계부채 계산기 | DSR, DTI 계산',
  description: '가계부채 계산기로 DSR(총부채원리금상환비율)과 DTI(총부채상환비율)를 계산해보세요. 대출 가능 한도와 상환 능력을 확인할 수 있습니다.',
  keywords: '가계부채계산기, DSR계산기, DTI계산기, 대출한도계산, 부채비율계산, 상환능력계산, 원리금상환비율, 총부채상환비율, 연소득대비부채, 대출심사',
  alternates: {
    canonical: 'https://calculator.ai.kr/daily/household-debt'
  },
  openGraph: {
    title: '가계부채 계산기 - DSR, DTI 계산',
    description: 'DSR과 DTI를 계산하여 대출 가능 한도와 상환 능력을 확인해보세요. 정확한 가계부채 비율을 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/daily/household-debt',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 