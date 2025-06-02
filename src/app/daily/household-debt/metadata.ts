import { Metadata } from 'next';

const metadata: Metadata = {
  title: '가계부채 계산기 | DTI, DSR 계산 및 위험도 평가',
  description: '가계부채 계산기로 DTI(총부채상환비율)와 DSR(총부채원리금상환비율)을 계산해보세요. 주택담보대출, 신용카드대출, 개인대출 등 각종 부채를 입력하여 부채 위험도를 평가할 수 있습니다.',
  keywords: '가계부채계산기, DTI계산기, DSR계산기, 부채비율계산, 대출상환비율, 부채위험도평가, 대출한도계산, 총부채계산, 대출상환능력, 부채관리',
  alternates: {
    canonical: 'https://calculator.ai.kr/daily/household-debt'
  },
  openGraph: {
    title: '가계부채 계산기 - DTI, DSR 계산 및 위험도 평가',
    description: '가계부채 계산기로 DTI와 DSR을 계산해보세요. 각종 부채를 입력하여 부채 위험도를 평가할 수 있습니다.',
    url: 'https://calculator.ai.kr/daily/household-debt',
    type: 'website',
    siteName: '계산기 AI',
    locale: 'ko_KR',
  }
};

export default metadata; 