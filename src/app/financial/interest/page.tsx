'use client';

import React, { useState } from 'react';

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState('12');
  const [calculationType, setCalculationType] = useState('compound'); // 'simple' 또는 'compound'
  const [result, setResult] = useState<{
    interest: number;
    totalAmount: number;
  } | null>(null);

  const calculateInterest = () => {
    if (!principal || !rate || !time) return;

    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compoundingFrequency);

    let interest, totalAmount;

    if (calculationType === 'simple') {
      // 단리 계산
      interest = p * r * t;
      totalAmount = p + interest;
    } else {
      // 복리 계산
      totalAmount = p * Math.pow(1 + r/n, n * t);
      interest = totalAmount - p;
    }

    setResult({
      interest: parseFloat(interest.toFixed(0)),
      totalAmount: parseFloat(totalAmount.toFixed(0))
    });
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">단/복리 이자 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">원금 (원)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 10000000"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">연이율 (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 3.5"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">기간 (년)</label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 5"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">계산 방식</label>
              <select
                value={calculationType}
                onChange={(e) => setCalculationType(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="simple">단리</option>
                <option value="compound">복리</option>
              </select>
            </div>

            {calculationType === 'compound' && (
              <div>
                <label className="block text-gray-700 mb-2">복리 계산 주기</label>
                <select
                  value={compoundingFrequency}
                  onChange={(e) => setCompoundingFrequency(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">연복리 (연 1회)</option>
                  <option value="2">반기복리 (연 2회)</option>
                  <option value="4">분기복리 (연 4회)</option>
                  <option value="12">월복리 (연 12회)</option>
                  <option value="365">일복리 (연 365회)</option>
                </select>
              </div>
            )}

            <button
              onClick={calculateInterest}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">
                      {calculationType === 'simple' ? '단리' : '복리'} 계산
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>이자:</span>
                        <span>{formatNumber(result.interest)}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>원리금 합계:</span>
                        <span>{formatNumber(result.totalAmount)}원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 사용법 및 정보 섹션 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">이자 계산기 사용법</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">단리와 복리의 차이</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">단리 (Simple Interest)</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>원금에 대해서만 이자가 붙는 방식</li>
                      <li>이자에 대한 이자는 발생하지 않음</li>
                      <li>계산식: 이자 = 원금 × 이자율 × 기간</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">복리 (Compound Interest)</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>원금과 이자를 합한 금액에 이자가 붙는 방식</li>
                      <li>이자에 대한 이자가 발생</li>
                      <li>시간이 지날수록 이자가 기하급수적으로 증가</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-blue-600 mb-2">복리 계산 주기의 영향</h3>
                <p className="text-gray-600 mb-2">복리 계산 주기가 짧을수록 최종 수령액이 늘어납니다.</p>
                <div className="bg-gray-50 p-4 rounded">
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>연복리: 1년마다 이자를 원금에 더하여 재투자</li>
                    <li>반기복리: 6개월마다 이자를 원금에 더하여 재투자</li>
                    <li>분기복리: 3개월마다 이자를 원금에 더하여 재투자</li>
                    <li>월복리: 1개월마다 이자를 원금에 더하여 재투자</li>
                    <li>일복리: 매일 이자를 원금에 더하여 재투자</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">금융정보 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.bok.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국은행</span>
                <span className="text-gray-500 text-sm ml-2">- 기준금리 정보</span>
              </a>
              <a
                href="https://www.fss.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">금융감독원</span>
                <span className="text-gray-500 text-sm ml-2">- 금융상품 정보</span>
              </a>
              <a
                href="https://www.kinfa.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">서민금융진흥원</span>
                <span className="text-gray-500 text-sm ml-2">- 서민금융 상품</span>
              </a>
              <a
                href="https://www.hf.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국주택금융공사</span>
                <span className="text-gray-500 text-sm ml-2">- 주택금융 상품</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 