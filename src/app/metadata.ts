import { Metadata } from 'next';

const metadata: Metadata = {
  title: '계산기 AI | 무료 온라인 계산기 모음 - 금융, 세금, 건강, 부동산, 사업 계산기',
  description: '금융 계산기(대출, 이자), 세금 계산기(소득세, 부가세), 건강 계산기(BMI, 칼로리), 부동산 계산기(담보대출, 취득세), 사업 계산기(법인세, 매출이익) 등 150+ 생활 계산기를 무료로 제공합니다. 복잡한 계산을 쉽고 정확하게!',
  keywords: '계산기, 금융계산기, 대출계산기, 세금계산기, 건강계산기, 부동산계산기, 사업계산기, BMI계산기, 이자계산기, 단위변환기, 공학용계산기, 연봉계산기, 퇴직금계산기, 연말정산계산기, 주택담보대출계산기, 종합부동산세계산기, 법인세계산기, 부가가치세계산기',
  authors: [{ name: '계산기 AI' }],
  metadataBase: new URL('https://calculator.ai.kr'),
  openGraph: {
    title: '계산기 AI | 무료 온라인 계산기 모음 - 금융, 세금, 건강, 부동산, 사업 계산기',
    description: '금융 계산기(대출, 이자), 세금 계산기(소득세, 부가세), 건강 계산기(BMI, 칼로리), 부동산 계산기(담보대출, 취득세), 사업 계산기(법인세, 매출이익) 등 150+ 생활 계산기를 무료로 제공합니다. 복잡한 계산을 쉽고 정확하게!',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '계산기 AI - 무료 온라인 계산기 모음'
      }
    ],
    siteName: '계산기 AI'
  },
  twitter: {
    card: 'summary_large_image',
    title: '계산기 AI | 무료 온라인 계산기 모음',
    description: '150+ 무료 온라인 계산기 모음 - 금융, 세금, 건강, 부동산, 사업 계산기',
    images: ['/images/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    other: {
      'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || ''
    }
  },
  alternates: {
    canonical: 'https://calculator.ai.kr',
  },
  category: '온라인 계산기',
};

export default metadata; 