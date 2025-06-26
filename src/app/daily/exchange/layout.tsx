import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '환율 계산기 - Calculator Hub',
  description: '실시간 환율 정보를 기반으로 한 정확한 환율 계산기입니다. USD, JPY, EUR, CNY, GBP 등 다양한 통화 지원.',
  openGraph: {
    title: '환율 계산기 - Calculator Hub',
    description: '실시간 환율 정보를 기반으로 한 정확한 환율 계산기입니다. USD, JPY, EUR, CNY, GBP 등 다양한 통화 지원.',
    url: 'https://calculator.ai.kr/daily/exchange',
    siteName: 'Calculator Hub',
    images: [
      {
        url: 'https://calculator.ai.kr/api/og/exchange',
        width: 1200,
        height: 630,
        alt: '환율 계산기',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '환율 계산기 - Calculator Hub',
    description: '실시간 환율 정보를 기반으로 한 정확한 환율 계산기입니다. USD, JPY, EUR, CNY, GBP 등 다양한 통화 지원.',
    images: ['https://calculator.ai.kr/api/og/exchange'],
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 