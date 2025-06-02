import { Metadata } from 'next';

const metadata: Metadata = {
  title: '연체이자 계산기 | 연체금, 연체이자 계산',
  description: '연체이자 계산기로 연체금액과 연체일수에 따른 이자를 계산해보세요. 일일 발생이자, 총 연체이자, 총 납부금액을 계산하고 일자별 이자 내역을 확인할 수 있습니다.',
  keywords: '연체이자계산기, 연체금계산기, 연체이자율계산, 연체금이자계산, 연체이자조회, 연체금액계산, 일일이자계산, 연체일수계산, 연체이자율, 연체이자내역',
  alternates: {
    canonical: 'https://calculator.ai.kr/daily/overdue'
  },
  openGraph: {
    title: '연체이자 계산기 - 연체금, 연체이자 계산',
    description: '연체이자 계산기로 연체금액과 연체일수에 따른 이자를 계산해보세요. 일일 발생이자와 총 납부금액을 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/daily/overdue',
    type: 'website',
    siteName: '계산기 AI',
    locale: 'ko_KR',
  }
};

export default metadata; 