import { Metadata } from 'next';

const metadata: Metadata = {
  title: '적금 계산기 | 단리/복리 적금 이자 계산',
  description: '적금 계산기로 단리와 복리 이자를 계산해보세요. 월 적립액, 적립 기간, 이율에 따른 만기 수령액과 세후 이자를 계산하며, 월별 상세 내역도 확인할 수 있습니다.',
  keywords: '적금계산기, 적금이자계산, 단리계산기, 복리계산기, 적금만기계산, 이자세금계산, 월적립식적금, 적금수익계산, 적금이율계산, 적금수령액',
  alternates: {
    canonical: 'https://calculator.ai.kr/investment/savings'
  },
  openGraph: {
    title: '적금 계산기 - 단리/복리 적금 이자 계산',
    description: '적금 계산기로 단리와 복리 이자를 계산해보세요. 월 적립액, 적립 기간, 이율에 따른 만기 수령액을 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/investment/savings',
    type: 'website',
    siteName: '계산기 AI',
    locale: 'ko_KR',
  }
};

export default metadata; 