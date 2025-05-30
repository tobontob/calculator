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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">사업소득세 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              수입금액 (원)
            </label>
            <input
              type="text"
              name="revenue"
              value={inputs.revenue}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="수입금액을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              필요경비 (원)
            </label>
            <input
              type="text"
              name="expenses"
              value={inputs.expenses}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="필요경비를 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              부양가족 수
            </label>
            <select
              name="dependents"
              value={inputs.dependents}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>{num}명</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="isFirstYear"
                checked={inputs.isFirstYear}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              사업 개시 첫해
            </label>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="hasInsurance"
                checked={inputs.hasInsurance}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              4대보험 가입
            </label>
          </div>
        </div>

        <button
          onClick={calculateTax}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">사업소득세 계산 결과</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">과세표준</p>
              <p className="text-xl font-bold">{formatNumber(result.taxableIncome)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">기본공제</p>
              <p className="text-xl font-bold text-green-600">{formatNumber(result.basicDeduction)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">소득세</p>
              <p className="text-xl font-bold text-blue-600">{formatNumber(result.incomeTax)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">지방소득세</p>
              <p className="text-xl font-bold text-purple-600">{formatNumber(result.localIncomeTax)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">총 세금</p>
              <p className="text-xl font-bold text-red-600">{formatNumber(result.totalTax)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">실효세율</p>
              <p className="text-xl font-bold">{result.effectiveTaxRate.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">참고사항</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>소득세율은 과세표준 구간에 따라 6%~45%가 적용됩니다.</li>
          <li>기본공제는 1인당 150만원이 적용됩니다.</li>
          <li>사업 개시 첫해는 30% 감면 혜택이 적용됩니다.</li>
          <li>4대보험 가입자는 추가로 10% 감면 혜택이 적용됩니다.</li>
          <li>지방소득세는 소득세의 10%가 추가로 부과됩니다.</li>
          <li>정확한 세금은 관할 세무서나 세무사와 상담하시기 바랍니다.</li>
        </ul>
      </div>
    </div>
  );
} 