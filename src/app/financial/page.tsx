'use client';

import Link from 'next/link';

export default function FinancialCalculators() {
  const calculators = [
    {
      name: '대출 계산기',
      description: '대출 원리금 상환액과 이자를 계산합니다.',
      path: '/financial/loan',
    },
    {
      name: '이자 계산기',
      description: '예금과 대출의 이자를 계산합니다.',
      path: '/financial/interest',
    },
    {
      name: '예적금 계산기',
      description: '정기예금과 적금의 만기 수령액을 계산합니다.',
      path: '/financial/deposit',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8">재무 계산기</h1>
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