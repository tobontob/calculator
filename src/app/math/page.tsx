'use client';

import Link from 'next/link';

export default function MathCalculator() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">수학 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Link href="/math/basic" className="block">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4">기본 계산기</h2>
            <p className="text-gray-600">기본적인 사칙연산과 계산 기능을 제공하는 계산기입니다.</p>
          </div>
        </Link>

        <Link href="/math/scientific" className="block">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4">공학용 계산기</h2>
            <p className="text-gray-600">삼각함수, 지수/로그, 공학 계산을 위한 고급 계산기입니다.</p>
          </div>
        </Link>

        <Link href="/math/unit-converter" className="block">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4">단위 변환기</h2>
            <p className="text-gray-600">길이, 무게, 부피 등 다양한 단위를 변환할 수 있습니다.</p>
          </div>
        </Link>
      </div>
    </div>
  );
} 