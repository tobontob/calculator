'use client';

import { useState } from 'react';

interface CalculationResult {
  overdueInterest: number;
  dailyInterest: number;
  totalAmount: number;
  dailySchedule: {
    day: number;
    interest: number;
    accumulatedInterest: number;
    totalAmount: number;
  }[];
}

export default function OverdueCalculator() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [overdueDays, setOverdueDays] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateOverdueInterest = () => {
    const amount = parseFloat(principal);
    const annualRate = parseFloat(interestRate);
    const days = parseInt(overdueDays);
    const dailyRate = annualRate / 365 / 100;

    if (isNaN(amount) || isNaN(annualRate) || isNaN(days)) {
      alert('모든 필드를 올바르게 입력해주세요.');
      return;
    }

    const dailyInterest = amount * dailyRate;
    const overdueInterest = dailyInterest * days;
    const dailySchedule = [];
    let accumulatedInterest = 0;

    for (let i = 1; i <= days; i++) {
      accumulatedInterest += dailyInterest;
      dailySchedule.push({
        day: i,
        interest: dailyInterest,
        accumulatedInterest: accumulatedInterest,
        totalAmount: amount + accumulatedInterest
      });
    }

    setResult({
      overdueInterest,
      dailyInterest,
      totalAmount: amount + overdueInterest,
      dailySchedule
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">연체이자 계산기</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연체금액 (원)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="연체금액을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연체이자율 (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="연체이자율을 입력하세요"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연체일수
            </label>
            <input
              type="number"
              value={overdueDays}
              onChange={(e) => setOverdueDays(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="연체일수를 입력하세요"
            />
          </div>
        </div>

        <button
          onClick={calculateOverdueInterest}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">연체이자 계산 결과</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">일일 발생이자</p>
                <p className="text-xl font-bold text-blue-600">{formatNumber(result.dailyInterest)}원</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">총 연체이자</p>
                <p className="text-xl font-bold text-red-600">{formatNumber(result.overdueInterest)}원</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">총 납부금액</p>
                <p className="text-xl font-bold">{formatNumber(result.totalAmount)}원</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">일자별 이자 내역</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">연체일수</th>
                    <th className="px-4 py-2 text-right">일일이자</th>
                    <th className="px-4 py-2 text-right">누적이자</th>
                    <th className="px-4 py-2 text-right">총 금액</th>
                  </tr>
                </thead>
                <tbody>
                  {result.dailySchedule.map((item) => (
                    <tr key={item.day} className="border-b">
                      <td className="px-4 py-2">{item.day}일</td>
                      <td className="px-4 py-2 text-right">{formatNumber(item.interest)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(item.accumulatedInterest)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(item.totalAmount)}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">참고사항</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>일반적인 연체이자율은 연 17~24% 수준입니다.</li>
          <li>연체이자는 연체금액에 대해 일단위로 계산됩니다.</li>
          <li>연체가 장기화될수록 신용도가 하락할 수 있습니다.</li>
          <li>연체 해결이 어려운 경우 금융회사와 상담하여 분할상환 등을 협의하세요.</li>
          <li>실제 연체이자는 금융회사의 정책에 따라 차이가 있을 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
} 