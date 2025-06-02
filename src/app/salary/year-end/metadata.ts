import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

const metadata: Metadata = createMetadata({
  title: '연말정산 계산기 | 연말정산 환급금 계산',
  description: '연말정산 계산기로 연말정산 예상 환급금을 계산해보세요. 급여, 부양가족, 소득공제, 세액공제 등을 반영하여 정확한 연말정산 결과를 계산할 수 있습니다.',
  keywords: '연말정산계산기, 연말정산환급, 소득공제계산, 세액공제계산, 연말정산세금, 연말정산공제, 연말정산환급금, 연말정산신고, 연말정산공제, 연말정산결과',
  alternates: {
    canonical: 'https://calculator.ai.kr/salary/year-end'
  },
  openGraph: {
    title: '연말정산 계산기 - 연말정산 환급금 계산',
    description: '연말정산 예상 환급금을 계산해보세요. 급여, 부양가족, 각종 공제사항을 반영하여 정확한 결과를 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/salary/year-end',
  }
});

export default metadata; 