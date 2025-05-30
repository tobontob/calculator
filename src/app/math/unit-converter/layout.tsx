import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '단위 변환기 | 길이, 무게, 온도 등 다양한 단위 변환',
  description: '길이, 무게, 넓이, 부피, 온도, 압력, 속도, 연비, 데이터량 등 다양한 단위를 쉽고 정확하게 변환할 수 있는 무료 온라인 단위 변환기입니다.',
  keywords: '단위변환기, 단위환산, 길이변환, 무게변환, 온도변환, 면적변환, 부피변환, 압력변환, 속도변환, 연비계산, 데이터단위변환',
  openGraph: {
    title: '단위 변환기 | 다양한 단위 변환 계산기',
    description: '길이, 무게, 넓이, 부피, 온도, 압력, 속도, 연비, 데이터량 등 다양한 단위를 변환할 수 있는 무료 온라인 단위 변환기입니다.',
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