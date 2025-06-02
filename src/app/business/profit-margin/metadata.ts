import { Metadata } from 'next';

const metadata: Metadata = {
  title: '이익률 계산기 | 매출이익, 영업이익, 순이익률 계산',
  description: '이익률 계산기로 매출총이익률, 영업이익률, 순이익률을 계산해보세요. 매출액, 매출원가, 판관비 등을 입력하여 각종 이익률과 손익분기점을 분석할 수 있습니다.',
  keywords: '이익률계산기, 수익률계산기, 매출이익계산, 영업이익계산, 순이익계산, 손익분기점, 이익률분석, 수익성분석, 매출원가계산, 판관비계산',
  alternates: {
    canonical: 'https://calculator.ai.kr/business/profit-margin'
  },
  openGraph: {
    title: '이익률 계산기 - 매출이익, 영업이익, 순이익률 계산',
    description: '이익률 계산기로 매출총이익률, 영업이익률, 순이익률을 계산해보세요. 각종 이익률과 손익분기점을 분석할 수 있습니다.',
    url: 'https://calculator.ai.kr/business/profit-margin',
    type: 'website',
    siteName: '계산기 AI',
    locale: 'ko_KR',
  }
};

export default metadata; 