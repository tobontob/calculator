'use client';

import Link from 'next/link';

export default function InvestmentCalculators() {
  const calculators = [
    {
      name: '주식 투자수익 계산기',
      description: '주식 투자의 수익률과 손익을 계산합니다.',
      path: '/investment/stock',
    },
    {
      name: '펀드 수익률 계산기',
      description: '펀드 투자의 수익률을 계산합니다.',
      path: '/investment/fund',
    },
    {
      name: '복리 수익률 계산기',
      description: '복리 효과를 고려한 투자 수익률을 계산합니다.',
      path: '/investment/compound',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8">투자 계산기</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator) => (
            <Link
              key={calculator.path}
              href={calculator.path}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{calculator.name}</h2>
              <p className="text-gray-600">{calculator.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 