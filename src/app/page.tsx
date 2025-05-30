'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  const categories = [
    {
      title: '재무 계산기',
      items: [
        { name: '대출 계산기', path: '/financial/loan' },
        { name: '이자 계산기', path: '/financial/interest' },
      ],
    },
    {
      title: '건강 계산기',
      items: [
        { name: '체질량 지수(BMI) 계산기', path: '/health/bmi' },
        { name: '칼로리 계산기', path: '/health/calorie' },
        { name: '체지방률 계산기', path: '/health/bodyfat' },
      ],
    },
    {
      title: '수학 계산기',
      items: [
        { name: '기본 계산기', path: '/math/basic' },
        { name: '공학용 계산기', path: '/math/scientific' },
        { name: '단위 변환기', path: '/math/unit-converter' },
      ],
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">종합 계산기</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.title} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
} 