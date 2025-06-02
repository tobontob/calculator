import { Metadata } from 'next';
import { createMetadata } from '@/app/metadata.config';

export const metadata: Metadata = createMetadata({
  title: '칼로리 계산기 | 일일 필요 칼로리, 기초대사량 계산',
  description: '일일 필요 칼로리와 기초대사량을 계산해보세요. 나이, 성별, 키, 체중, 활동량을 고려한 정확한 칼로리 소비량과 권장 섭취량을 제공합니다.',
  keywords: '칼로리계산기, 기초대사량계산기, 일일칼로리계산, 칼로리소비량, 권장칼로리, 다이어트칼로리, 체중관리, 식단관리, 운동칼로리, 건강관리',
  alternates: {
    canonical: 'https://calculator.ai.kr/health/calorie'
  },
  openGraph: {
    title: '칼로리 계산기 - 일일 필요 칼로리 및 기초대사량 계산',
    description: '나이, 성별, 키, 체중, 활동량을 고려한 정확한 일일 필요 칼로리와 기초대사량을 계산해보세요.',
    url: 'https://calculator.ai.kr/health/calorie',
  }
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 