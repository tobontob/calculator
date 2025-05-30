import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '적금 만기 계산기 | 적금 이자 계산',
  description: '적금 만기 시 받을 수 있는 금액을 계산할 수 있는 무료 온라인 계산기입니다. 월 납입금액, 기간, 금리에 따른 만기금액을 간편하게 계산해보세요.',
  keywords: '적금계산기, 적금이자계산, 만기금액계산, 적금만기계산, 이자계산기',
  openGraph: {
    title: '적금 만기 계산기 | 적금 이자 간편 계산',
    description: '적금 만기 시 받을 수 있는 금액을 계산할 수 있는 무료 온라인 계산기입니다. 월 납입금액, 기간, 금리에 따른 만기금액을 간편하게 계산해보세요.',
    type: 'website',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 