'use client';

import React from 'react';
import Link from 'next/link';

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
  {
    title: '부동산/주택 계산기',
    items: [
      { name: '주택담보대출 계산기', path: '/real-estate/mortgage' },
      { name: '전월세 계산기', path: '/real-estate/rent' },
      { name: '취득세/등록세 계산기', path: '/real-estate/tax' },
      { name: '종합부동산세 계산기', path: '/real-estate/property-tax' },
      { name: '재산세 계산기', path: '/real-estate/estate-tax' },
    ],
  },
  {
    title: '급여/세금 계산기',
    items: [
      { name: '연봉/월급 실수령액 계산기', path: '/salary/after-tax' },
      { name: '퇴직금 계산기', path: '/salary/severance' },
      { name: '연말정산 계산기', path: '/salary/year-end' },
      { name: '근로소득세 계산기', path: '/salary/income-tax' },
      { name: '원천징수 계산기', path: '/salary/withholding' },
    ],
  },
  {
    title: '투자/저축 계산기',
    items: [
      { name: '적금 만기 계산기', path: '/investment/savings' },
      { name: '펀드 수익률 계산기', path: '/investment/fund' },
      { name: '주식 투자수익 계산기', path: '/investment/stock' },
      { name: '복리 수익률 계산기', path: '/investment/compound' },
      { name: '예적금 이자 계산기', path: '/investment/deposit' },
    ],
  },
  {
    title: '생활금융 계산기',
    items: [
      { name: '카드 할부금 계산기', path: '/daily/card-installment' },
      { name: '신용대출 이자 계산기', path: '/daily/personal-loan' },
      { name: '연체이자 계산기', path: '/daily/overdue' },
      { name: '환율 계산기', path: '/daily/exchange' },
      { name: '가계부채 상환 계산기', path: '/daily/household-debt' },
    ],
  },
  {
    title: '사업/창업 계산기',
    items: [
      { name: '부가가치세 계산기', path: '/business/vat' },
      { name: '법인세 계산기', path: '/business/corporate-tax' },
      { name: '사업소득세 계산기', path: '/business/income-tax' },
      { name: '매출이익률 계산기', path: '/business/profit-margin' },
      { name: '창업비용 계산기', path: '/business/startup-cost' },
    ],
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">종합 계산기</h1>
      <div className="grid gap-8">
        {/* 첫 번째 줄: 기존 카테고리 */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category) => (
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

        {/* 두 번째 줄: 부동산/주택, 급여/세금, 투자/저축 */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.slice(3, 6).map((category) => (
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

        {/* 세 번째 줄: 생활금융, 사업/창업 */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-start-1 md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">{categories[6].title}</h2>
              <ul className="space-y-2">
                {categories[6].items.map((item) => (
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
          </div>
          <div className="md:col-start-2 md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">{categories[7].title}</h2>
              <ul className="space-y-2">
                {categories[7].items.map((item) => (
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
          </div>
        </div>
      </div>
    </main>
  );
} 