import { Metadata } from 'next';

const metadata: Metadata = {
  title: '펀드 수익률 계산기 | 펀드 투자 수익 계산',
  description: '펀드 수익률 계산기로 예상 수익과 비용을 계산해보세요. 초기 투자금, 월 적립금, 예상 수익률, 펀드 보수, 판매 수수료를 반영하여 최종 평가금액과 연평균 수익률을 계산할 수 있습니다.',
  keywords: '펀드수익률계산기, 펀드투자계산, 펀드수익계산, 펀드보수계산, 판매수수료계산, 투자수익률계산, 펀드평가금액, 연평균수익률, 투자수익계산, 펀드비용',
  alternates: {
    canonical: 'https://calculator.ai.kr/investment/fund'
  },
  openGraph: {
    title: '펀드 수익률 계산기 - 펀드 투자 수익 계산',
    description: '펀드 수익률 계산기로 예상 수익과 비용을 계산해보세요. 펀드 보수와 판매 수수료를 반영하여 실제 수익을 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/investment/fund',
    type: 'website',
    siteName: '계산기 AI',
    locale: 'ko_KR',
  }
};

export default metadata; 