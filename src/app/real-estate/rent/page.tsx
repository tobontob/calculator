'use client';

import { useState } from 'react';

export default function RentCalculator() {
  const [calculationType, setCalculationType] = useState<'월세전환' | '전세전환'>('월세전환');
  const [deposit, setDeposit] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [conversionRate, setConversionRate] = useState('');
  const [result, setResult] = useState<{
    convertedValue: number;
    yearlyInterest: number;
    monthlyInterest: number;
  } | null>(null);

  const calculateRent = () => {
    const depositValue = parseFloat(deposit);
    const monthlyRentValue = parseFloat(monthlyRent);
    const rateValue = parseFloat(conversionRate) / 100;

    if (calculationType === '월세전환') {
      // 전세 보증금을 월세로 전환
      const yearlyInterest = depositValue * rateValue;
      const monthlyInterest = yearlyInterest / 12;
      setResult({
        convertedValue: Math.round(monthlyInterest),
        yearlyInterest: Math.round(yearlyInterest),
        monthlyInterest: Math.round(monthlyInterest),
      });
    } else {
      // 월세를 전세 보증금으로 전환
      const yearlyRent = monthlyRentValue * 12;
      const convertedDeposit = yearlyRent / rateValue;
      setResult({
        convertedValue: Math.round(convertedDeposit),
        yearlyInterest: Math.round(yearlyRent),
        monthlyInterest: monthlyRentValue,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">전월세 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            계산 유형
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="월세전환"
                checked={calculationType === '월세전환'}
                onChange={(e) => {
                  setCalculationType(e.target.value as '월세전환' | '전세전환');
                  setResult(null);
                }}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">전세 → 월세</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="전세전환"
                checked={calculationType === '전세전환'}
                onChange={(e) => {
                  setCalculationType(e.target.value as '월세전환' | '전세전환');
                  setResult(null);
                }}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">월세 → 전세</span>
            </label>
          </div>
        </div>

        {calculationType === '월세전환' ? (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              전세 보증금 (원)
            </label>
            <input
              type="number"
              value={deposit}
              onChange={(e) => {
                setDeposit(e.target.value);
                setResult(null);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="예: 200000000"
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              월세 (원)
            </label>
            <input
              type="number"
              value={monthlyRent}
              onChange={(e) => {
                setMonthlyRent(e.target.value);
                setResult(null);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="예: 1000000"
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            전환율 (연 %)
          </label>
          <input
            type="number"
            value={conversionRate}
            onChange={(e) => {
              setConversionRate(e.target.value);
              setResult(null);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="예: 4.5"
            step="0.1"
          />
        </div>

        <button
          onClick={calculateRent}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          계산하기
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-4">계산 결과</h3>
              {calculationType === '월세전환' ? (
                <>
                  <p className="flex justify-between mb-2">
                    <span>전환 월세:</span>
                    <span className="font-semibold">{result.convertedValue.toLocaleString()}원/월</span>
                  </p>
                  <p className="flex justify-between mb-2">
                    <span>연간 이자:</span>
                    <span className="font-semibold">{result.yearlyInterest.toLocaleString()}원/년</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="flex justify-between mb-2">
                    <span>전환 보증금:</span>
                    <span className="font-semibold">{result.convertedValue.toLocaleString()}원</span>
                  </p>
                  <p className="flex justify-between mb-2">
                    <span>연간 월세 총액:</span>
                    <span className="font-semibold">{result.yearlyInterest.toLocaleString()}원/년</span>
                  </p>
                </>
              )}
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="font-semibold mb-1">참고사항:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>전환율은 일반적으로 연 4~7% 범위에서 결정됩니다.</li>
                <li>실제 임대료는 시장 상황과 협상에 따라 달라질 수 있습니다.</li>
                <li>관리비, 공과금 등 부대비용은 포함되지 않은 금액입니다.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 