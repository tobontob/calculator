import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

const metadata: Metadata = createMetadata({
  title: '원천징수 계산기 | 급여 원천세 계산',
  description: '원천징수 계산기로 급여에서 공제되는 소득세와 지방소득세를 계산해보세요. 월급여, 상여금, 부양가족 수에 따른 정확한 원천징수세액을 계산할 수 있습니다.',
  keywords: '원천징수계산기, 급여원천세, 소득세원천징수, 원천세계산, 급여공제, 근로소득세, 지방소득세, 원천징수세액, 실수령액계산, 월급여공제',
  alternates: {
    canonical: 'https://calculator.ai.kr/salary/withholding'
  },
  openGraph: {
    title: '원천징수 계산기 - 급여 원천세 계산',
    description: '급여에서 공제되는 소득세와 지방소득세를 계산해보세요. 월급여와 부양가족 수에 따른 정확한 원천징수세액을 계산할 수 있습니다.',
    url: 'https://calculator.ai.kr/salary/withholding',
  }
});

export default metadata; 