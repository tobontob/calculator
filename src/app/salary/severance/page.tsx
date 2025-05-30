'use client';

import { useState } from 'react';

interface WorkPeriod {
  startDate: string;
  endDate: string;
}

interface SeveranceResult {
  years: number;
  months: number;
  days: number;
  severancePay: number;
  averageMonthlyWage: number;
}

export default function SeveranceCalculator() {
  const [workPeriod, setWorkPeriod] = useState<WorkPeriod>({
    startDate: '',
    endDate: '',
  });
  const [monthlyWage, setMonthlyWage] = useState('');
  const [result, setResult] = useState<SeveranceResult | null>(null);

  const calculateWorkPeriod = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    const months = Math.floor(remainingDays / 30);
    const days = remainingDays % 30;

    return { years, months, days };
  };

  const calculateSeverancePay = () => {
    if (!workPeriod.startDate || !workPeriod.endDate || !monthlyWage) return;

    const startDate = new Date(workPeriod.startDate);
    const endDate = new Date(workPeriod.endDate);
    const averageMonthlyWage = parseFloat(monthlyWage);

    if (endDate <= startDate) {
      alert('퇴사일이 입사일보다 빠를 수 없습니다.');
      return;
    }

    const { years, months, days } = calculateWorkPeriod(startDate, endDate);
    const totalYears = years + (months / 12) + (days / 365);

    // 1년 미만 근무시 퇴직금 없음
    if (totalYears < 1) {
      setResult({
        years,
        months,
        days,
        severancePay: 0,
        averageMonthlyWage
      });
      return;
    }

    // 퇴직금 = 평균임금 30일분 × 근속연수
    const severancePay = Math.round((averageMonthlyWage / 30) * 30 * totalYears);

    setResult({
      years,
      months,
      days,
      severancePay,
      averageMonthlyWage
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">퇴직금 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            입사일
          </label>
          <input
            type="date"
            value={workPeriod.startDate}
            onChange={(e) => setWorkPeriod({ ...workPeriod, startDate: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            퇴사일
          </label>
          <input
            type="date"
            value={workPeriod.endDate}
            onChange={(e) => setWorkPeriod({ ...workPeriod, endDate: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            평균임금 (원/월)
          </label>
          <input
            type="number"
            value={monthlyWage}
            onChange={(e) => setMonthlyWage(e.target.value)}
            placeholder="예: 3000000"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          onClick={calculateSeverancePay}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          계산하기
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-4">퇴직금 계산 결과</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>근속기간:</span>
                  <span className="font-semibold">
                    {result.years}년 {result.months}개월 {result.days}일
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>평균임금(월):</span>
                  <span className="font-semibold">{result.averageMonthlyWage.toLocaleString()}원</span>
                </p>
                <div className="border-t border-gray-300 my-2"></div>
                <p className="flex justify-between font-bold text-lg">
                  <span>예상 퇴직금:</span>
                  <span className="text-blue-600">{result.severancePay.toLocaleString()}원</span>
                </p>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="font-semibold mb-1">참고사항:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>퇴직금은 계속근로기간 1년에 대하여 30일분 이상의 평균임금을 지급해야 합니다.</li>
                <li>근로기간이 1년 미만인 경우 퇴직금이 발생하지 않습니다.</li>
                <li>평균임금은 퇴직일 이전 3개월 동안의 임금 총액을 그 기간의 총일수로 나눈 금액입니다.</li>
                <li>정확한 퇴직금은 관련 법령 및 회사 정책에 따라 달라질 수 있습니다.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 