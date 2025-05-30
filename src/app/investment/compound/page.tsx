'use client';

import { useState } from 'react';
import { formatNumber } from '@/utils/format';

interface CompoundInputs {
  initialInvestment: string;
  annualReturn: string;
  investmentPeriod: string;
  compoundingFrequency: 'annually' | 'quarterly' | 'monthly' | 'daily';
  additionalInvestment: string;
  additionalFrequency: 'monthly' | 'quarterly' | 'annually';
}

interface CompoundResult {
  finalAmount: number;
  totalInvestment: number;
  totalReturn: number;
  returnRate: number;
  yearlyBreakdown: {
    year: number;
    investment: number;
    balance: number;
    returns: number;
  }[];
}

export default function CompoundCalculator() {
  const [inputs, setInputs] = useState<CompoundInputs>({
    initialInvestment: '',
    annualReturn: '',
    investmentPeriod: '',
    compoundingFrequency: 'annually',
    additionalInvestment: '',
    additionalFrequency: 'monthly',
  });

  const [result, setResult] = useState<CompoundResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'compoundingFrequency' || name === 'additionalFrequency') {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setInputs((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    }
  };

  const calculateCompoundInterest = () => {
    const initial = Number(inputs.initialInvestment) || 0;
    const annualRate = (Number(inputs.annualReturn) || 0) / 100;
    const years = Number(inputs.investmentPeriod) || 0;
    const additional = Number(inputs.additionalInvestment) || 0;

    // 복리 계산 주기에 따른 연간 복리 횟수 설정
    let periodsPerYear = 1;
    switch (inputs.compoundingFrequency) {
      case 'daily':
        periodsPerYear = 365;
        break;
      case 'monthly':
        periodsPerYear = 12;
        break;
      case 'quarterly':
        periodsPerYear = 4;
        break;
      default:
        periodsPerYear = 1;
    }

    // 추가 투자 주기에 따른 연간 투자 횟수 설정
    let investmentsPerYear = 12;
    switch (inputs.additionalFrequency) {
      case 'annually':
        investmentsPerYear = 1;
        break;
      case 'quarterly':
        investmentsPerYear = 4;
        break;
      default:
        investmentsPerYear = 12;
    }

    const yearlyBreakdown = [];
    let currentBalance = initial;
    let totalInvestment = initial;
    
    for (let year = 1; year <= years; year++) {
      let yearlyInvestment = 0;
      let startYearBalance = currentBalance;

      // 1년 동안의 추가 투자 및 복리 계산
      for (let period = 1; period <= periodsPerYear; period++) {
        // 해당 기간의 추가 투자 계산
        const periodsUntilNextInvestment = periodsPerYear / investmentsPerYear;
        if (period % periodsUntilNextInvestment === 0) {
          currentBalance += additional;
          yearlyInvestment += additional;
        }

        // 복리 계산
        const periodRate = annualRate / periodsPerYear;
        currentBalance *= (1 + periodRate);
      }

      totalInvestment += yearlyInvestment;
      const yearlyReturn = currentBalance - startYearBalance - yearlyInvestment;

      yearlyBreakdown.push({
        year,
        investment: yearlyInvestment,
        balance: currentBalance,
        returns: yearlyReturn,
      });
    }

    const totalReturn = currentBalance - totalInvestment;
    const returnRate = ((currentBalance / totalInvestment) - 1) * 100;

    setResult({
      finalAmount: currentBalance,
      totalInvestment,
      totalReturn,
      returnRate,
      yearlyBreakdown,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8">복리 수익률 계산기</h1>
        
        {/* 입력 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">투자 정보 입력</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                초기 투자금액 (원)
              </label>
              <input
                type="text"
                name="initialInvestment"
                value={inputs.initialInvestment}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                연간 수익률 (%)
              </label>
              <input
                type="text"
                name="annualReturn"
                value={inputs.annualReturn}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                투자 기간 (년)
              </label>
              <input
                type="text"
                name="investmentPeriod"
                value={inputs.investmentPeriod}
                onChange={handleInputChange}
                placeholder="1"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                복리 계산 주기
              </label>
              <select
                name="compoundingFrequency"
                value={inputs.compoundingFrequency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="annually">연복리</option>
                <option value="quarterly">분기복리</option>
                <option value="monthly">월복리</option>
                <option value="daily">일복리</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                추가 투자금액 (원)
              </label>
              <input
                type="text"
                name="additionalInvestment"
                value={inputs.additionalInvestment}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                추가 투자 주기
              </label>
              <select
                name="additionalFrequency"
                value={inputs.additionalFrequency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="monthly">매월</option>
                <option value="quarterly">매분기</option>
                <option value="annually">매년</option>
              </select>
            </div>
            <button
              onClick={calculateCompoundInterest}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              계산하기
            </button>
          </div>
        </div>

        {/* 결과 섹션 */}
        {result && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">투자 수익 분석</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">총 투자금액</p>
                  <p className="text-lg font-semibold">
                    {formatNumber(result.totalInvestment)}원
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">최종 평가금액</p>
                  <p className="text-lg font-semibold">
                    {formatNumber(result.finalAmount)}원
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">총 수익금</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {formatNumber(result.totalReturn)}원
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">총 수익률</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {result.returnRate.toFixed(2)}%
                  </p>
                </div>
              </div>

              {/* 연도별 상세 내역 */}
              <div>
                <h3 className="text-lg font-semibold mb-2">연도별 상세 내역</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">연차</th>
                        <th className="px-4 py-2 text-right">추가 투자금</th>
                        <th className="px-4 py-2 text-right">수익금</th>
                        <th className="px-4 py-2 text-right">평가금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyBreakdown.map((year) => (
                        <tr key={year.year} className="border-t">
                          <td className="px-4 py-2">{year.year}년차</td>
                          <td className="px-4 py-2 text-right">
                            {formatNumber(year.investment)}원
                          </td>
                          <td className="px-4 py-2 text-right text-blue-600">
                            {formatNumber(year.returns)}원
                          </td>
                          <td className="px-4 py-2 text-right font-semibold">
                            {formatNumber(year.balance)}원
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 참고 사항 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">참고 사항</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>복리는 이자에 이자가 붙는 효과를 계산에 반영합니다.</li>
            <li>연복리는 1년에 한 번, 월복리는 매월, 일복리는 매일 복리 효과가 적용됩니다.</li>
            <li>추가 투자금은 선택한 주기에 따라 정기적으로 투자되는 것으로 계산됩니다.</li>
            <li>실제 투자 수익은 시장 상황에 따라 달라질 수 있습니다.</li>
            <li>세금과 수수료는 계산에 포함되지 않았습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 