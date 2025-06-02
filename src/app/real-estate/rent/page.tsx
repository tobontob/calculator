'use client';

import { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

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
    const depositValue = parseFloat(deposit.replace(/,/g, ''));
    const monthlyRentValue = parseFloat(monthlyRent.replace(/,/g, ''));
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">전월세 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">계산 정보 입력</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">계산 유형</label>
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
              <div>
                <label className="block text-gray-700 mb-2">전세 보증금 (원)</label>
                <input
                  type="text"
                  value={deposit}
                  onChange={(e) => {
                    setDeposit(formatNumber(e.target.value));
                    setResult(null);
                  }}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 200,000,000"
                />
              </div>
            ) : (
              <div>
                <label className="block text-gray-700 mb-2">월세 (원)</label>
                <input
                  type="text"
                  value={monthlyRent}
                  onChange={(e) => {
                    setMonthlyRent(formatNumber(e.target.value));
                    setResult(null);
                  }}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 1,000,000"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2">전환율 (연 %)</label>
              <input
                type="number"
                value={conversionRate}
                onChange={(e) => {
                  setConversionRate(e.target.value);
                  setResult(null);
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 4.5"
                step="0.1"
              />
            </div>

            <button
              onClick={calculateRent}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">계산 결과</h3>
                {calculationType === '월세전환' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>전환 월세:</span>
                      <span>{formatNumber(result.convertedValue)}원/월</span>
                    </div>
                    <div className="flex justify-between">
                      <span>연간 이자:</span>
                      <span>{formatNumber(result.yearlyInterest)}원/년</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>전환 보증금:</span>
                      <span>{formatNumber(result.convertedValue)}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>연간 월세 총액:</span>
                      <span>{formatNumber(result.yearlyInterest)}원/년</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 사용법 및 정보 섹션 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">전월세 안내</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">전월세 전환 이해하기</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">전세 → 월세 전환</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>전세 보증금을 월세로 전환할 때 사용</li>
                      <li>보증금 운용 수익을 월세로 환산</li>
                      <li>전환율이 높을수록 월세가 높아짐</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">월세 → 전세 전환</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>월세를 전세 보증금으로 전환할 때 사용</li>
                      <li>월세의 연간 총액을 기준으로 계산</li>
                      <li>전환율이 높을수록 보증금이 낮아짐</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 정보</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.myhome.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">마이홈포털</span>
                <span className="text-gray-500 text-sm ml-2">- 주택 임대차 정보</span>
              </a>
              <a
                href="https://rt.molit.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">렌트홈</span>
                <span className="text-gray-500 text-sm ml-2">- 전월세 실거래가 정보</span>
              </a>
              <a
                href="https://www.khug.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">주택도시보증공사</span>
                <span className="text-gray-500 text-sm ml-2">- 전세자금 보증</span>
              </a>
              <a
                href="https://www.lh.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">LH 한국토지주택공사</span>
                <span className="text-gray-500 text-sm ml-2">- 임대주택 정보</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 