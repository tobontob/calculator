import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '예금 이자 계산기 | 정기예금, 예금이자 계산',
  description: '예금 이자 계산기로 정기예금의 이자와 세후 수익을 계산해보세요. 단리, 복리 방식과 이자 과세를 고려한 정확한 만기 수령액을 계산할 수 있습니다.',
  keywords: '예금이자계산기, 정기예금계산기, 예금이자세금, 이자소득세계산, 예금수익계산, 단리복리계산, 만기수령액계산, 예금계산기, 이자계산기, 세후수익계산',
  alternates: {
    canonical: 'https://calculator.ai.kr/investment/deposit'
  },
  openGraph: {
    title: '예금 이자 계산기 - 정기예금 이자 및 세후 수익 계산',
    description: '정기예금의 이자와 세후 수익을 계산해보세요. 단리, 복리 방식과 이자 과세를 고려한 정확한 만기 수령액을 확인할 수 있습니다.',
    url: 'https://calculator.ai.kr/investment/deposit',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 