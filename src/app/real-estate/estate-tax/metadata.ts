import { Metadata } from 'next';

const metadata: Metadata = {
  title: '재산세 계산기 | 주택, 건축물, 토지 재산세 계산',
  description: '재산세 계산기로 주택, 건축물, 토지에 대한 재산세를 계산해보세요. 공시가격 기준으로 과세표준액, 재산세, 지역자원시설세를 계산하며, 토지는 종합합산, 별도합산, 분리과세 유형을 지원합니다.',
  keywords: '재산세계산기, 부동산세금계산기, 주택재산세, 건축물재산세, 토지재산세, 과세표준액계산, 지역자원시설세, 종합합산과세, 별도합산과세, 분리과세',
  alternates: {
    canonical: 'https://calculator.ai.kr/real-estate/estate-tax'
  },
  openGraph: {
    title: '재산세 계산기 - 주택, 건축물, 토지 재산세 계산',
    description: '재산세 계산기로 주택, 건축물, 토지에 대한 재산세를 계산해보세요. 공시가격 기준으로 과세표준액과 세금을 계산합니다.',
    url: 'https://calculator.ai.kr/real-estate/estate-tax',
    type: 'website',
    siteName: '계산기 AI',
    locale: 'ko_KR',
  }
};

export default metadata; 