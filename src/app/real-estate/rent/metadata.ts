import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

const metadata: Metadata = createMetadata({
  title: '전월세 계산기 | 전환율, 보증금 계산',
  description: '전월세 계산기로 전월세 전환율에 따른 보증금과 월세를 계산해보세요. 전세 보증금의 월세 전환, 월세의 보증금 전환 등 다양한 계산이 가능합니다.',
  keywords: '전월세계산기, 전환율계산기, 전세보증금계산, 월세계산기, 전세월세전환, 보증금전환, 월세전환, 전월세전환율, 임대료계산, 주택임대료',
  alternates: {
    canonical: 'https://calculator.ai.kr/real-estate/rent'
  },
  openGraph: {
    title: '전월세 계산기 - 전환율, 보증금 계산',
    description: '전월세 전환율에 따른 보증금과 월세를 계산해보세요. 전세와 월세 간의 전환 계산이 가능합니다.',
    url: 'https://calculator.ai.kr/real-estate/rent',
  }
});

export default metadata; 