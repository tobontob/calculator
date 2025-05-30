'use client';

import { useState } from 'react';
import { formatNumber } from '@/utils/format';

interface FundInputs {
  initialInvestment: string;
  monthlyInvestment: string;
  investmentPeriod: string;
  expectedReturn: string;
  managementFee: string;
  salesFee: string;
}

interface FundResult {
  totalInvestment: number;
  totalReturn: number;
  netReturn: number;
  totalFees: number;
  effectiveReturnRate: number;
  yearlyBreakdown: {
    year: number;
    investment: number;
    balance: number;
    returns: number;
    fees: number;
  }[];
}

export default function FundCalculator() {
  const [inputs, setInputs] = useState<FundInputs>({
    initialInvestment: '',
    monthlyInvestment: '',
    investmentPeriod: '',
    expectedReturn: '',
    managementFee: '1.5',
    salesFee: '0.5',
  });

  const [result, setResult] = useState<FundResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.]/g, '');
    setInputs((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const calculateFundReturns = () => {
    const initial = Number(inputs.initialInvestment) || 0;
    const monthly = Number(inputs.monthlyInvestment) || 0;
    const years = Number(inputs.investmentPeriod) || 0;
    const returnRate = Number(inputs.expectedReturn) || 0;
    const managementFee = Number(inputs.managementFee) || 0;
    const salesFee = Number(inputs.salesFee) || 0;

    const monthlyRate = returnRate / 100 / 12;
    const totalMonths = years * 12;
    const yearlyBreakdown = [];
    
    let currentBalance = initial;
    let totalInvested = initial;
    let totalFees = 0;

    for (let year = 1; year <= years; year++) {
      let yearlyInvestment = 0;
      let yearlyReturns = 0;
      let yearlyFees = 0;

      // 12개월 동안의 계산
      for (let month = 1; month <= 12; month++) {
        // 월별 투자금 추가
        currentBalance += monthly;
        yearlyInvestment += monthly;

        // 수익 계산
        const monthlyReturn = currentBalance * monthlyRate;
        yearlyReturns += monthlyReturn;
        currentBalance += monthlyReturn;

        // 수수료 계산
        const monthlyFees = currentBalance * ((managementFee / 100 / 12) + (salesFee / 100 / 12));
        yearlyFees += monthlyFees;
        currentBalance -= monthlyFees;
      }

      totalInvested += yearlyInvestment;
      totalFees += yearlyFees;

      yearlyBreakdown.push({
        year,
        investment: yearlyInvestment,
        balance: currentBalance,
        returns: yearlyReturns,
        fees: yearlyFees,
      });
    }

    const totalReturn = currentBalance - totalInvested;
    const effectiveReturnRate = ((currentBalance / totalInvested) - 1) * 100;

    setResult({
      totalInvestment: totalInvested,
      totalReturn: totalReturn,
      netReturn: currentBalance,
      totalFees,
      effectiveReturnRate,
      yearlyBreakdown,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8">펀드 수익률 계산기</h1>
        
        {/* 입력 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">투자 정보 입력</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                초기 투자금액
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
                월 적립금액
              </label>
              <input
                type="text"
                name="monthlyInvestment"
                value={inputs.monthlyInvestment}
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
                예상 수익률 (연 %)
              </label>
              <input
                type="text"
                name="expectedReturn"
                value={inputs.expectedReturn}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                펀드 보수 (연 %)
              </label>
              <input
                type="text"
                name="managementFee"
                value={inputs.managementFee}
                onChange={handleInputChange}
                placeholder="1.5"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                판매 수수료 (연 %)
              </label>
              <input
                type="text"
                name="salesFee"
                value={inputs.salesFee}
                onChange={handleInputChange}
                placeholder="0.5"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={calculateFundReturns}
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
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">총 투자금액</p>
                <p className="text-lg font-semibold">
                  {formatNumber(result.totalInvestment)}원
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">총 수익금</p>
                <p className="text-lg font-semibold text-blue-600">
                  {formatNumber(result.totalReturn)}원
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">총 수수료</p>
                <p className="text-lg font-semibold text-red-600">
                  {formatNumber(result.totalFees)}원
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">최종 평가금액</p>
                <p className="text-lg font-semibold">
                  {formatNumber(result.netReturn)}원
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">실질 수익률</p>
                <p className="text-lg font-semibold">
                  {result.effectiveReturnRate.toFixed(2)}%
                </p>
              </div>

              {/* 연도별 상세 내역 */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">연도별 상세 내역</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">연차</th>
                        <th className="px-4 py-2 text-right">투자금</th>
                        <th className="px-4 py-2 text-right">수익금</th>
                        <th className="px-4 py-2 text-right">수수료</th>
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
                          <td className="px-4 py-2 text-right text-red-600">
                            {formatNumber(year.fees)}원
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
            <li>이 계산기는 예상 수익률을 기반으로 한 시뮬레이션입니다.</li>
            <li>실제 펀드 수익률은 시장 상황에 따라 변동될 수 있습니다.</li>
            <li>펀드 보수와 판매 수수료는 펀드 종류에 따라 다를 수 있습니다.</li>
            <li>세금 관련 사항은 포함되어 있지 않습니다.</li>
            <li>복리 효과가 반영된 결과입니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 