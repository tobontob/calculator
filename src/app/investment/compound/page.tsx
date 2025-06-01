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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">복리 수익률 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">투자 정보 입력</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">초기 투자금액 (원)</label>
              <input
                type="text"
                name="initialInvestment"
                value={inputs.initialInvestment}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">연간 수익률 (%)</label>
              <input
                type="text"
                name="annualReturn"
                value={inputs.annualReturn}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">투자 기간 (년)</label>
              <input
                type="text"
                name="investmentPeriod"
                value={inputs.investmentPeriod}
                onChange={handleInputChange}
                placeholder="1"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={calculateCompoundInterest}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">계산 결과</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>총 투자금액:</span>
                    <span>{formatNumber(result.totalInvestment)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 수익금:</span>
                    <span className="text-blue-600">{formatNumber(result.totalReturn)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>최종 평가금액:</span>
                    <span>{formatNumber(result.finalAmount)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 수익률:</span>
                    <span className="text-blue-600">{result.returnRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 사용법 및 정보 섹션 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">복리 수익률 안내</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">복리의 이해</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>원금에 대한 이자가 발생</li>
                  <li>발생한 이자에 대해서도 이자가 발생</li>
                  <li>시간이 지날수록 수익이 기하급수적으로 증가</li>
                  <li>장기 투자일수록 복리 효과가 커짐</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">투자 전략</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>장기 투자를 통한 복리 효과 극대화</li>
                  <li>정기적인 재투자로 수익 창출</li>
                  <li>분산 투자로 리스크 관리</li>
                  <li>투자 비용 최소화</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 정보</h2>
            <div className="grid grid-cols-1 gap-2">
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
                href="https://www.ksd.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">예탁결제원</span>
                <span className="text-gray-500 text-sm ml-2">- 증권정보 포털</span>
              </a>
              <a
                href="https://www.kis.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국투자증권</span>
                <span className="text-gray-500 text-sm ml-2">- 투자 정보</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 