import { Metadata } from 'next';

const metadata: Metadata = {
  title: '온라인 무료 계산기 모음 | 계산기 AI - 건강, 금융, 날짜, 단위 변환',
  description: '체중 계산기, 칼로리 계산기, 대출 이자 계산기 등 100+가지 생활 계산기를 무료로 제공합니다. 복잡한 계산을 간편하게!',
  keywords: '계산기, 단위변환기, 공학용계산기, 대출계산기, BMI계산기, 이자계산기, 온라인계산기, 무료계산기, 건강계산기, 금융계산기',
  authors: [{ name: '계산기 AI' }],
  metadataBase: new URL('https://calculator-ai.com'),
  openGraph: {
    title: '온라인 무료 계산기 모음 | 계산기 AI - 건강, 금융, 날짜, 단위 변환',
    description: '체중 계산기, 칼로리 계산기, 대출 이자 계산기 등 100+가지 생활 계산기를 무료로 제공합니다. 복잡한 계산을 간편하게!',
    type: 'website',
    locale: 'ko_KR',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'google-site-verification-code',
    other: {
      'naver-site-verification': 'naver-site-verification-code'
    }
  },
  alternates: {
    canonical: 'https://calculator-ai.com',
  },
};

export default metadata; 