import { Metadata } from 'next';

const metadata: Metadata = {
  title: '날짜 계산기 | D-Day, 기간, 근무일수 계산',
  description: '날짜 계산기로 두 날짜 사이의 기간을 계산해보세요. D-Day, 일수, 주수, 월수, 근무일수 등 다양한 날짜 계산이 가능하며, 공휴일을 제외한 실제 근무일수도 계산할 수 있습니다.',
  keywords: '날짜계산기, D-Day계산기, 기간계산기, 일수계산, 근무일수계산, 날짜차이계산, 공휴일계산, 주말제외계산, 만나이계산, 날짜계산',
  alternates: {
    canonical: 'https://calculator.ai.kr/daily/date-calculator'
  },
  openGraph: {
    title: '날짜 계산기 - D-Day, 기간, 근무일수 계산',
    description: '날짜 계산기로 두 날짜 사이의 기간을 계산해보세요. D-Day, 일수, 근무일수 등 다양한 날짜 계산이 가능합니다.',
    url: 'https://calculator.ai.kr/daily/date-calculator',
    type: 'website',
    siteName: '계산기 AI',
    locale: 'ko_KR',
  }
};

export default metadata; 