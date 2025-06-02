import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

const metadata: Metadata = createMetadata({
  title: '근로소득세 계산기 | 연봉 소득세 계산',
  description: '근로소득세 계산기로 연봉에 따른 소득세를 계산해보세요. 급여, 상여금, 각종 공제사항을 반영하여 정확한 근로소득세와 지방소득세를 계산할 수 있습니다.',
  keywords: '근로소득세계산기, 연봉소득세, 급여소득세, 소득세계산, 연말정산계산, 세금계산, 소득공제, 세액공제, 실수령액계산, 세율계산',
  alternates: {
    canonical: 'https://calculator.ai.kr/salary/income-tax'
  },
  openGraph: {
    title: '근로소득세 계산기 - 연봉 소득세 계산',
    description: '연봉에 따른 근로소득세를 계산해보세요. 급여, 상여금, 각종 공제사항을 반영하여 정확한 계산이 가능합니다.',
    url: 'https://calculator.ai.kr/salary/income-tax',
  }
});

export default metadata; 