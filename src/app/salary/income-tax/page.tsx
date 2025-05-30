'use client';

import { useState } from 'react';

interface TaxInputs {
  monthlyIncome: string;
  dependents: string;
  age: string;
  isDisabled: boolean;
  is65Above: boolean;
  isSingleParent: boolean;
}

interface TaxResult {
  monthlyIncome: number;
  taxableIncome: number;
  incomeTax: number;
  localIncomeTax: number;
  totalTax: number;
  netIncome: number;
}

export default function IncomeTaxCalculator() {
  const [inputs, setInputs] = useState<TaxInputs>({
    monthlyIncome: '',
    dependents: '1',
    age: '',
    isDisabled: false,
    is65Above: false,
    isSingleParent: false
  });

  const [result, setResult] = useState<TaxResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setResult(null);
  };

  const calculateTax = () => {
    const monthlyIncome = parseFloat(inputs.monthlyIncome) || 0;
    const yearlyIncome = monthlyIncome * 12;
    const dependents = parseInt(inputs.dependents) || 1;
    
    // 1. 기본공제 계산
    let totalDeduction = 1500000 * dependents; // 기본공제: 1인당 150만원

    // 2. 추가공제 계산
    if (inputs.isDisabled) totalDeduction += 2000000; // 장애인 공제 200만원
    if (inputs.is65Above) totalDeduction += 1000000; // 경로우대 공제 100만원
    if (inputs.isSingleParent) totalDeduction += 1000000; // 한부모 공제 100만원

    // 3. 근로소득공제 계산
    let workIncomeDeduction = 0;
    if (yearlyIncome <= 5000000) {
      workIncomeDeduction = yearlyIncome * 0.7;
    } else if (yearlyIncome <= 15000000) {
      workIncomeDeduction = 3500000 + (yearlyIncome - 5000000) * 0.4;
    } else if (yearlyIncome <= 45000000) {
      workIncomeDeduction = 7500000 + (yearlyIncome - 15000000) * 0.15;
    } else if (yearlyIncome <= 100000000) {
      workIncomeDeduction = 12000000 + (yearlyIncome - 45000000) * 0.05;
    } else {
      workIncomeDeduction = 14750000 + (yearlyIncome - 100000000) * 0.02;
    }

    // 4. 과세표준 계산
    const taxableIncome = Math.max(0, yearlyIncome - totalDeduction - workIncomeDeduction);

    // 5. 소득세 계산 (누진세율 적용)
    let incomeTax = 0;
    if (taxableIncome <= 12000000) {
      incomeTax = taxableIncome * 0.06;
    } else if (taxableIncome <= 46000000) {
      incomeTax = 720000 + (taxableIncome - 12000000) * 0.15;
    } else if (taxableIncome <= 88000000) {
      incomeTax = 5820000 + (taxableIncome - 46000000) * 0.24;
    } else if (taxableIncome <= 150000000) {
      incomeTax = 15900000 + (taxableIncome - 88000000) * 0.35;
    } else if (taxableIncome <= 300000000) {
      incomeTax = 37600000 + (taxableIncome - 150000000) * 0.38;
    } else if (taxableIncome <= 500000000) {
      incomeTax = 94600000 + (taxableIncome - 300000000) * 0.40;
    } else {
      incomeTax = 174600000 + (taxableIncome - 500000000) * 0.42;
    }

    // 6. 지방소득세 계산 (소득세의 10%)
    const localIncomeTax = incomeTax * 0.1;

    // 7. 월 기준으로 환산
    const monthlyTaxableIncome = taxableIncome / 12;
    const monthlyIncomeTax = incomeTax / 12;
    const monthlyLocalTax = localIncomeTax / 12;
    const monthlyTotalTax = monthlyIncomeTax + monthlyLocalTax;
    const monthlyNetIncome = monthlyIncome - monthlyTotalTax;

    setResult({
      monthlyIncome: monthlyIncome,
      taxableIncome: monthlyTaxableIncome,
      incomeTax: monthlyIncomeTax,
      localIncomeTax: monthlyLocalTax,
      totalTax: monthlyTotalTax,
      netIncome: monthlyNetIncome
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">근로소득세 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {/* 급여 정보 */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">급여 정보</h2>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                월 급여 (원)
              </label>
              <input
                type="number"
                name="monthlyIncome"
                value={inputs.monthlyIncome}
                onChange={handleInputChange}
                placeholder="예: 3000000"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          {/* 공제 정보 */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">공제 정보</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  부양가족 수 (본인 포함)
                </label>
                <input
                  type="number"
                  name="dependents"
                  value={inputs.dependents}
                  onChange={handleInputChange}
                  min="1"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  나이
                </label>
                <input
                  type="number"
                  name="age"
                  value={inputs.age}
                  onChange={handleInputChange}
                  placeholder="만 나이"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDisabled"
                    checked={inputs.isDisabled}
                    onChange={handleInputChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">장애인 여부</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="is65Above"
                    checked={inputs.is65Above}
                    onChange={handleInputChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">만 65세 이상</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isSingleParent"
                    checked={inputs.isSingleParent}
                    onChange={handleInputChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">한부모 가족</span>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={calculateTax}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            계산하기
          </button>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-lg mb-4">세금 계산 결과 (월 기준)</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>총 급여:</span>
                    <span className="font-semibold">{result.monthlyIncome.toLocaleString()}원</span>
                  </p>
                  <p className="flex justify-between">
                    <span>과세표준:</span>
                    <span className="font-semibold">{Math.round(result.taxableIncome).toLocaleString()}원</span>
                  </p>
                  <p className="flex justify-between">
                    <span>소득세:</span>
                    <span className="font-semibold">{Math.round(result.incomeTax).toLocaleString()}원</span>
                  </p>
                  <p className="flex justify-between">
                    <span>지방소득세:</span>
                    <span className="font-semibold">{Math.round(result.localIncomeTax).toLocaleString()}원</span>
                  </p>
                  <div className="border-t border-gray-300 my-2"></div>
                  <p className="flex justify-between">
                    <span>총 세금:</span>
                    <span className="font-semibold text-red-600">{Math.round(result.totalTax).toLocaleString()}원</span>
                  </p>
                  <p className="flex justify-between font-bold text-lg">
                    <span>실수령액:</span>
                    <span className="text-blue-600">{Math.round(result.netIncome).toLocaleString()}원</span>
                  </p>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-1">참고사항:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>기본공제는 1인당 150만원이 적용됩니다.</li>
                  <li>장애인 공제 200만원, 경로우대 공제 100만원, 한부모 공제 100만원이 적용됩니다.</li>
                  <li>근로소득공제가 급여 수준에 따라 자동 적용됩니다.</li>
                  <li>지방소득세는 소득세의 10%로 계산됩니다.</li>
                  <li>실제 세금은 다양한 공제 항목에 따라 달라질 수 있습니다.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 