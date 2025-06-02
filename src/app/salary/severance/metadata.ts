import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

const metadata: Metadata = createMetadata({
  title: '퇴직금 계산기 | 퇴직금 정산 계산',
  description: '퇴직금 계산기로 근속연수와 평균임금에 따른 퇴직금을 계산해보세요. 근무기간과 급여를 입력하여 정확한 퇴직금과 중간정산 금액을 계산할 수 있습니다.',
  keywords: '퇴직금계산기, 퇴직금정산, 근속연수계산, 평균임금계산, 중간정산계산, 퇴직금세금, 퇴직소득세, 퇴직정산금, 퇴직금산정, 법정퇴직금',
  alternates: {
    canonical: 'https://calculator.ai.kr/salary/severance'
  },
  openGraph: {
    title: '퇴직금 계산기 - 퇴직금 정산 계산',
    description: '근속연수와 평균임금에 따른 퇴직금을 계산해보세요. 근무기간과 급여에 따른 정확한 퇴직금을 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/salary/severance',
  }
});

export default metadata; 