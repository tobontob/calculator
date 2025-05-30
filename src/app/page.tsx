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
        { name: '단위 변환기', path: '/math/unit-converter' },
        { name: '기본 계산기', path: '/math/basic' },
        { name: '공학용 계산기', path: '/math/scientific' },
      ],
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">종합 계산기</h1>
      <div className="space-y-12 max-w-6xl mx-auto">
        {/* 수학 계산기 섹션 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">수학 계산기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/math/basic" className="block">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-2">기본 계산기</h3>
                <p className="text-gray-600">기본적인 사칙연산과 계산 기능을 제공하는 계산기입니다.</p>
              </div>
            </Link>

            <Link href="/math/scientific" className="block">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-2">공학용 계산기</h3>
                <p className="text-gray-600">삼각함수, 지수/로그, 공학 계산을 위한 고급 계산기입니다.</p>
              </div>
            </Link>

            <Link href="/math/unit-converter" className="block">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-2">단위 변환기</h3>
                <p className="text-gray-600">길이, 무게, 부피 등 다양한 단위를 변환할 수 있습니다.</p>
              </div>
            </Link>
          </div>
        </section>

        {/* 재무 계산기 섹션 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">재무 계산기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/financial/loan" className="block">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-2">대출 계산기</h3>
                <p className="text-gray-600">대출 상환 계획과 이자를 계산할 수 있는 계산기입니다.</p>
              </div>
            </Link>

            <Link href="/financial/interest" className="block">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-2">이자 계산기</h3>
                <p className="text-gray-600">단리, 복리 등 다양한 이자를 계산할 수 있는 계산기입니다.</p>
              </div>
            </Link>
          </div>
        </section>

        {/* 건강 계산기 섹션 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">건강 계산기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/health/bmi" className="block">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-2">BMI 계산기</h3>
                <p className="text-gray-600">체질량지수(BMI)를 계산하여 비만도를 확인할 수 있습니다.</p>
              </div>
            </Link>

            <Link href="/health/calorie" className="block">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-2">칼로리 계산기</h3>
                <p className="text-gray-600">일일 필요 칼로리와 기초 대사량을 계산할 수 있습니다.</p>
              </div>
            </Link>

            <Link href="/health/bodyfat" className="block">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-2">체지방률 계산기</h3>
                <p className="text-gray-600">체지방률을 계산하여 체형을 분석할 수 있습니다.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
} 