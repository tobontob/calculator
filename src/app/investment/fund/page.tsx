'use client';

import { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

interface FundInputs {
  initialInvestment: string;
  monthlyInvestment: string;
  investmentPeriod: string;
  expectedReturn: string;
  managementFee: string;
  salesFee: string;
}

interface FundResult {
  finalBalance: string;
  totalInvestment: string;
  totalReturn: string;
  totalFees: string;
  netReturn: string;
  effectiveReturnRate: number;
  yearlyBreakdown: Array<{
    year: number;
    investment: string;
    returns: string;
    fees: string;
    balance: string;
  }>;
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
    if (name === 'initialInvestment' || name === 'monthlyInvestment') {
      setInputs((prev) => ({
        ...prev,
        [name]: formatNumber(value),
      }));
    } else {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setInputs((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    }
  };

  const calculateFundReturns = () => {
    const initial = parseFloat(inputs.initialInvestment.replace(/,/g, '')) || 0;
    const monthly = parseFloat(inputs.monthlyInvestment.replace(/,/g, '')) || 0;
    const years = parseInt(inputs.investmentPeriod) || 0;
    const returnRate = parseFloat(inputs.expectedReturn) || 0;
    const managementFee = parseFloat(inputs.managementFee) || 0;
    const salesFee = parseFloat(inputs.salesFee) || 0;

    const monthlyRate = returnRate / 100 / 12;
    const totalMonths = years * 12;
    const yearlyBreakdown = [];
    
    let currentBalance = initial;
    let totalInvestment = initial;
    let totalFees = 0;
    let yearInvestment = initial;
    let yearReturns = 0;
    let yearFees = 0;
    let yearStartBalance = currentBalance;

    for (let month = 1; month <= totalMonths; month++) {
      // 월별 투자금 추가
      if (month > 1) {
        currentBalance += monthly;
        totalInvestment += monthly;
        yearInvestment += monthly;
      }

      // 수익 계산
      const monthlyReturn = currentBalance * monthlyRate;
      currentBalance += monthlyReturn;
      yearReturns += monthlyReturn;

      // 수수료 계산
      const monthlyFee = currentBalance * ((managementFee + salesFee) / 100 / 12);
      currentBalance -= monthlyFee;
      totalFees += monthlyFee;
      yearFees += monthlyFee;

      // 연간 정보 저장
      if (month % 12 === 0) {
        yearlyBreakdown.push({
          year: month / 12,
          investment: formatNumber(yearInvestment),
          returns: formatNumber(yearReturns),
          fees: formatNumber(yearFees),
          balance: formatNumber(currentBalance)
        });
        yearInvestment = 0;
        yearReturns = 0;
        yearFees = 0;
        yearStartBalance = currentBalance;
      }
    }

    const totalReturn = currentBalance - totalInvestment;
    const netReturn = totalReturn - totalFees;
    const effectiveReturnRate = ((currentBalance / totalInvestment) - 1) * 100;

    setResult({
      finalBalance: formatNumber(currentBalance),
      totalInvestment: formatNumber(totalInvestment),
      totalReturn: formatNumber(totalReturn),
      totalFees: formatNumber(totalFees),
      netReturn: formatNumber(netReturn),
      effectiveReturnRate,
      yearlyBreakdown
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">펀드 수익률 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">투자 정보 입력</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">초기 투자금액</label>
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
              <label className="block text-gray-700 mb-2">월 적립금액</label>
              <input
                type="text"
                name="monthlyInvestment"
                value={inputs.monthlyInvestment}
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
            <div>
              <label className="block text-gray-700 mb-2">예상 수익률 (연 %)</label>
              <input
                type="text"
                name="expectedReturn"
                value={inputs.expectedReturn}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">펀드 보수 (연 %)</label>
              <input
                type="text"
                name="managementFee"
                value={inputs.managementFee}
                onChange={handleInputChange}
                placeholder="1.5"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">판매 수수료 (연 %)</label>
              <input
                type="text"
                name="salesFee"
                value={inputs.salesFee}
                onChange={handleInputChange}
                placeholder="0.5"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={calculateFundReturns}
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
                    <span>예상 수익금:</span>
                    <span className="text-blue-600">{formatNumber(result.totalReturn)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>최종 평가금액:</span>
                    <span>{formatNumber(result.netReturn)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>연평균 수익률:</span>
                    <span className="text-blue-600">{result.effectiveReturnRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 사용법 및 정보 섹션 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">펀드 투자 안내</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">펀드 비용 구조</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>펀드 보수: 펀드 운용에 필요한 비용</li>
                  <li>판매 수수료: 펀드 판매 시 발생하는 수수료</li>
                  <li>기타 비용: 펀드 운용 과정에서 발생하는 부수적인 비용</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">투자 시 고려사항</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>투자 목적과 기간에 맞는 펀드 선택</li>
                  <li>위험과 수익률의 상관관계 이해</li>
                  <li>분산 투자를 통한 리스크 관리</li>
                  <li>정기적인 포트폴리오 리밸런싱</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 정보</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.kofia.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">금융투자협회</span>
                <span className="text-gray-500 text-sm ml-2">- 펀드 공시 정보</span>
              </a>
              <a
                href="https://dis.kofia.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">펀드 정보 One-Click</span>
                <span className="text-gray-500 text-sm ml-2">- 펀드 검색</span>
              </a>
              <a
                href="https://www.fss.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">금융감독원</span>
                <span className="text-gray-500 text-sm ml-2">- 금융상품 비교</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 