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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">단/복리 이자 계산기</h1>
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
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
    </div>
  );
} 