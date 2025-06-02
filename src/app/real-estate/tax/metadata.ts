import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

const metadata: Metadata = createMetadata({
  title: '양도소득세 계산기 | 부동산 양도소득세 계산',
  description: '부동산 양도소득세 계산기로 주택, 토지 등 부동산 매매 시 발생하는 양도소득세를 계산해보세요. 취득가액, 양도가액, 보유기간에 따른 세금을 정확하게 계산할 수 있습니다.',
  keywords: '양도소득세계산기, 부동산양도세, 주택양도세, 토지양도세, 양도세계산, 양도차익계산, 부동산세금, 양도소득, 양도세율, 장기보유공제',
  alternates: {
    canonical: 'https://calculator.ai.kr/real-estate/tax'
  },
  openGraph: {
    title: '양도소득세 계산기 - 부동산 양도소득세 계산',
    description: '부동산 매매 시 발생하는 양도소득세를 계산해보세요. 취득가액, 양도가액, 보유기간에 따른 세금을 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/real-estate/tax',
  }
});

export default metadata; 