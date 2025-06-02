import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

const metadata: Metadata = createMetadata({
  title: '취득세 계산기 | 부동산 취득세 계산',
  description: '부동산 취득세 계산기로 주택, 토지, 상가 등 부동산 매입 시 발생하는 취득세를 계산해보세요. 취득가액과 부동산 유형에 따른 정확한 취득세와 지방교육세를 계산할 수 있습니다.',
  keywords: '취득세계산기, 부동산취득세, 주택취득세, 토지취득세, 상가취득세, 취득세율계산, 지방교육세, 농어촌특별세, 부동산세금, 취득세감면',
  alternates: {
    canonical: 'https://calculator.ai.kr/real-estate/property-tax'
  },
  openGraph: {
    title: '취득세 계산기 - 부동산 취득세 계산',
    description: '부동산 매입 시 발생하는 취득세를 계산해보세요. 취득가액과 부동산 유형에 따른 정확한 세금을 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/real-estate/property-tax',
  }
});

export default metadata; 