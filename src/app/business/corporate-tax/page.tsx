'use client';

import { useState } from 'react';

interface CorporateTaxInputs {
  revenue: string;
  expenses: string;
  taxCredit: string;
  isSmallBusiness: boolean;
}

interface CorporateTaxResult {
  taxableIncome: number;
  basicTax: number;
  localIncomeTax: number;
  totalTax: number;
  effectiveTaxRate: number;
}

export default function CorporateTaxCalculator() {
  const [inputs, setInputs] = useState<CorporateTaxInputs>({
    revenue: '',
    expenses: '',
    taxCredit: '',
    isSmallBusiness: false,
  });

  const [result, setResult] = useState<CorporateTaxResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setResult(null);
  };

  const calculateTax = () => {
    const revenue = parseFloat(inputs.revenue.replace(/,/g, '')) || 0;
    const expenses = parseFloat(inputs.expenses.replace(/,/g, '')) || 0;
    const taxCredit = parseFloat(inputs.taxCredit.replace(/,/g, '')) || 0;

    // 과세표준 계산
    const taxableIncome = revenue - expenses;
    
    // 기본 법인세 계산
    let basicTax = 0;
    if (inputs.isSmallBusiness) {
      // 중소기업 세율 적용
      if (taxableIncome <= 200000000) {
        basicTax = taxableIncome * 0.10; // 2억 이하: 10%
      } else if (taxableIncome <= 20000000000) {
        basicTax = 20000000 + (taxableIncome - 200000000) * 0.20; // 2억 초과 200억 이하: 20%
      } else {
        basicTax = 3980000000 + (taxableIncome - 20000000000) * 0.22; // 200억 초과: 22%
      }
    } else {
      // 일반기업 세율 적용
      if (taxableIncome <= 200000000) {
        basicTax = taxableIncome * 0.10; // 2억 이하: 10%
      } else if (taxableIncome <= 20000000000) {
        basicTax = 20000000 + (taxableIncome - 200000000) * 0.20; // 2억 초과 200억 이하: 20%
      } else if (taxableIncome <= 300000000000) {
        basicTax = 3980000000 + (taxableIncome - 20000000000) * 0.22; // 200억 초과 3000억 이하: 22%
      } else {
        basicTax = 65780000000 + (taxableIncome - 300000000000) * 0.25; // 3000억 초과: 25%
      }
    }

    // 세액공제 적용
    basicTax = Math.max(0, basicTax - taxCredit);

    // 지방소득세 계산 (법인세의 10%)
    const localIncomeTax = basicTax * 0.1;

    // 총 세금
    const totalTax = basicTax + localIncomeTax;

    // 실효세율 계산
    const effectiveTaxRate = (totalTax / taxableIncome) * 100;

    setResult({
      taxableIncome,
      basicTax,
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
      <h1 className="text-3xl font-bold text-center mb-8">법인세 계산기</h1>
      
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
              세액공제 (원)
            </label>
            <input
              type="text"
              name="taxCredit"
              value={inputs.taxCredit}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="세액공제 금액을 입력하세요"
            />
          </div>
          <div className="flex items-center">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="isSmallBusiness"
                checked={inputs.isSmallBusiness}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              중소기업 여부
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
          <h2 className="text-xl font-bold mb-4">법인세 계산 결과</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">과세표준</p>
              <p className="text-xl font-bold">{formatNumber(result.taxableIncome)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">법인세</p>
              <p className="text-xl font-bold text-blue-600">{formatNumber(result.basicTax)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">지방소득세</p>
              <p className="text-xl font-bold text-green-600">{formatNumber(result.localIncomeTax)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">총 세금</p>
              <p className="text-xl font-bold text-red-600">{formatNumber(result.totalTax)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded md:col-span-2">
              <p className="text-sm text-gray-600">실효세율</p>
              <p className="text-xl font-bold">{result.effectiveTaxRate.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">참고사항</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>법인세율은 과세표준 구간에 따라 차등 적용됩니다.</li>
          <li>중소기업은 일반기업보다 낮은 세율이 적용될 수 있습니다.</li>
          <li>지방소득세는 법인세의 10%가 추가로 부과됩니다.</li>
          <li>세액공제는 연구개발, 투자, 고용 등 다양한 항목이 있습니다.</li>
          <li>정확한 세금은 관할 세무서나 세무사와 상담하시기 바랍니다.</li>
        </ul>
      </div>
    </div>
  );
} 