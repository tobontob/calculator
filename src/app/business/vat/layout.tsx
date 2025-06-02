import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '부가가치세 계산기 | 부가세, 공급가액 계산',
  description: '부가가치세 계산기로 부가세와 공급가액을 계산해보세요. 세금계산서 작성에 필요한 부가세, 합계금액을 자동으로 계산해드립니다.',
  keywords: '부가세계산기, 부가가치세계산, 공급가액계산, 세금계산서, 부가세율계산, 부가세환급, 세금계산, 사업자부가세, 매출세액, 매입세액',
  alternates: {
    canonical: 'https://calculator.ai.kr/business/vat'
  },
  openGraph: {
    title: '부가가치세 계산기 - 부가세 및 공급가액 계산',
    description: '부가세와 공급가액을 쉽게 계산해보세요. 세금계산서 작성에 필요한 모든 금액을 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/business/vat',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 