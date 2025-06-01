'use client';

import { useState } from 'react';

interface BusinessIncomeInputs {
  revenue: string;
  expenses: string;
  dependents: string;
  isFirstYear: boolean;
  hasInsurance: boolean;
}

interface BusinessIncomeResult {
  taxableIncome: number;
  basicDeduction: number;
  incomeTax: number;
  localIncomeTax: number;
  totalTax: number;
  effectiveTaxRate: number;
}

export default function BusinessIncomeTaxCalculator() {
  const [inputs, setInputs] = useState<BusinessIncomeInputs>({
    revenue: '',
    expenses: '',
    dependents: '1',
    isFirstYear: false,
    hasInsurance: false,
  });

  const [result, setResult] = useState<BusinessIncomeResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const { name, value, type, checked } = e.target;
      setInputs(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    } else {
      const { name, value } = e.target;
      setInputs(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setResult(null);
  };

  const calculateTax = () => {
    const revenue = parseFloat(inputs.revenue.replace(/,/g, '')) || 0;
    const expenses = parseFloat(inputs.expenses.replace(/,/g, '')) || 0;
    const dependents = parseInt(inputs.dependents) || 1;

    // 과세표준 계산
    const taxableIncome = revenue - expenses;
    
    // 기본공제 계산
    const basicDeduction = 1500000 * dependents; // 1인당 150만원 기본공제
    const adjustedIncome = Math.max(0, taxableIncome - basicDeduction);

    // 소득세 계산 (2024년 기준)
    let incomeTax = 0;
    if (adjustedIncome <= 14000000) {
      incomeTax = adjustedIncome * 0.06; // 1,400만원 이하: 6%
    } else if (adjustedIncome <= 50000000) {
      incomeTax = 840000 + (adjustedIncome - 14000000) * 0.15; // 1,400만원 초과 5,000만원 이하: 15%
    } else if (adjustedIncome <= 88000000) {
      incomeTax = 6240000 + (adjustedIncome - 50000000) * 0.24; // 5,000만원 초과 8,800만원 이하: 24%
    } else if (adjustedIncome <= 150000000) {
      incomeTax = 15360000 + (adjustedIncome - 88000000) * 0.35; // 8,800만원 초과 1.5억원 이하: 35%
    } else if (adjustedIncome <= 300000000) {
      incomeTax = 37060000 + (adjustedIncome - 150000000) * 0.38; // 1.5억원 초과 3억원 이하: 38%
    } else if (adjustedIncome <= 500000000) {
      incomeTax = 94060000 + (adjustedIncome - 300000000) * 0.40; // 3억원 초과 5억원 이하: 40%
    } else if (adjustedIncome <= 1000000000) {
      incomeTax = 174060000 + (adjustedIncome - 500000000) * 0.42; // 5억원 초과 10억원 이하: 42%
    } else {
      incomeTax = 384060000 + (adjustedIncome - 1000000000) * 0.45; // 10억원 초과: 45%
    }

    // 사업 개시 첫해 감면 (30%)
    if (inputs.isFirstYear) {
      incomeTax *= 0.7;
    }

    // 4대보험 가입자 추가 공제 (10%)
    if (inputs.hasInsurance) {
      incomeTax *= 0.9;
    }

    // 지방소득세 계산 (소득세의 10%)
    const localIncomeTax = incomeTax * 0.1;

    // 총 세금
    const totalTax = incomeTax + localIncomeTax;

    // 실효세율 계산
    const effectiveTaxRate = (totalTax / taxableIncome) * 100;

    setResult({
      taxableIncome,
      basicDeduction,
      incomeTax,
      localIncomeTax,
      totalTax,
      effectiveTaxRate: isNaN(effectiveTaxRate) ? 0 : effectiveTaxRate
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">사업소득세 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">수입금액 (원)</label>
              <input
                type="text"
                name="revenue"
                value={inputs.revenue}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">필요경비 (원)</label>
              <input
                type="text"
                name="expenses"
                value={inputs.expenses}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">부양가족 수</label>
              <input
                type="text"
                name="dependents"
                value={inputs.dependents}
                onChange={handleInputChange}
                placeholder="1"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isFirstYear"
                  checked={inputs.isFirstYear}
                  onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">사업 개시 첫해</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="hasInsurance"
                  checked={inputs.hasInsurance}
                  onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">4대보험 가입</span>
              </label>
            </div>

            <button
              onClick={calculateTax}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>과세표준:</span>
                    <span>{result.taxableIncome.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>기본공제:</span>
                    <span className="text-green-600">{result.basicDeduction.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>소득세:</span>
                    <span className="text-blue-600">{result.incomeTax.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>지방소득세:</span>
                    <span className="text-purple-600">{result.localIncomeTax.toLocaleString()}원</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>총 세금:</span>
                    <span className="text-red-600">{result.totalTax.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>실효세율:</span>
                    <span>{result.effectiveTaxRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">사업소득세 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">소득세율 구간 (2024년)</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>1,400만원 이하: 6%</li>
                  <li>1,400만원 초과 5,000만원 이하: 15%</li>
                  <li>5,000만원 초과 8,800만원 이하: 24%</li>
                  <li>8,800만원 초과 1.5억원 이하: 35%</li>
                  <li>1.5억원 초과 3억원 이하: 38%</li>
                  <li>3억원 초과 5억원 이하: 40%</li>
                  <li>5억원 초과 10억원 이하: 42%</li>
                  <li>10억원 초과: 45%</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">공제 및 감면</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>기본공제: 1인당 150만원</li>
                  <li>사업 개시 첫해: 30% 감면</li>
                  <li>4대보험 가입자: 10% 추가 감면</li>
                  <li>지방소득세: 소득세의 10%</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">신고 및 납부</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>종합소득세 신고: 매년 5월</li>
                  <li>중간예납: 11월</li>
                  <li>원천징수: 매월/분기별 신고</li>
                  <li>수정신고: 법정신고기한 경과 후 가능</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.nts.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">국세청</span>
                <span className="text-gray-500 text-sm ml-2">- 종합소득세 신고</span>
              </a>
              <a
                href="https://www.hometax.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">홈택스</span>
                <span className="text-gray-500 text-sm ml-2">- 전자신고 서비스</span>
              </a>
              <a
                href="https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/pp/index_pp.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">모의계산 서비스</span>
                <span className="text-gray-500 text-sm ml-2">- 종합소득세 계산</span>
              </a>
              <a
                href="https://www.kacpta.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국세무사회</span>
                <span className="text-gray-500 text-sm ml-2">- 세무상담</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 