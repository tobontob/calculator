import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '이자 계산기 | 단리, 복리 이자 계산',
  description: '이자 계산기로 단리와 복리 방식의 이자를 계산해보세요. 원금, 이자율, 기간을 입력하여 정확한 이자 수익과 세후 실수령액을 계산할 수 있습니다.',
  keywords: '이자계산기, 단리계산기, 복리계산기, 이자수익계산, 예금이자계산, 적금이자계산, 이자세금계산, 이자소득세, 실수령액계산, 복리수익률',
  alternates: {
    canonical: 'https://calculator.ai.kr/financial/interest'
  },
  openGraph: {
    title: '이자 계산기 - 단리/복리 이자 계산',
    description: '단리와 복리 방식의 이자를 계산해보세요. 원금, 이자율, 기간에 따른 정확한 이자 수익을 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/financial/interest',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 