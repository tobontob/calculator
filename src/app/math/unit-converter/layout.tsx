import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '단위 변환 계산기 | 길이, 무게, 면적, 부피 변환',
  description: '단위 변환 계산기로 길이, 무게, 면적, 부피 등 다양한 단위를 변환해보세요. 미터법과 야드파운드법 간의 변환도 가능합니다.',
  keywords: '단위변환계산기, 길이변환, 무게변환, 면적변환, 부피변환, 단위계산기, 미터법변환, 야드파운드법, 단위환산, 변환계산기',
  alternates: {
    canonical: 'https://calculator.ai.kr/math/unit-converter'
  },
  openGraph: {
    title: '단위 변환 계산기 - 길이, 무게, 면적, 부피 변환',
    description: '길이, 무게, 면적, 부피 등 다양한 단위를 쉽고 정확하게 변환할 수 있는 온라인 계산기입니다.',
    url: 'https://calculator.ai.kr/math/unit-converter',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 