'use client';

import { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

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
    const monthlyIncome = parseFloat(parseNumber(inputs.monthlyIncome)) || 0;
    const yearlyIncome = monthlyIncome * 12;
    const dependents = parseInt(inputs.dependents) || 1;
    
    // 1. 기본공제 계산 (본인 1명 + 부양가족)
    let totalDeduction = 1500000; // 본인 기본공제 150만원
    if (dependents > 1) {
      totalDeduction += 1500000 * (dependents - 1); // 부양가족 추가 공제
    }

    // 2. 추가공제 계산
    if (inputs.isDisabled) totalDeduction += 2000000; // 장애인 공제 200만원
    if (inputs.is65Above) totalDeduction += 1000000; // 경로우대 공제 100만원
    if (inputs.isSingleParent) totalDeduction += 1000000; // 한부모 공제 100만원

    // 3. 근로소득공제 계산 (연간 기준)
    let workIncomeDeduction = 0;
    if (yearlyIncome <= 5000000) {
      workIncomeDeduction = Math.round(yearlyIncome * 0.7);
    } else if (yearlyIncome <= 15000000) {
      workIncomeDeduction = Math.round(3500000 + (yearlyIncome - 5000000) * 0.4);
    } else if (yearlyIncome <= 45000000) {
      workIncomeDeduction = Math.round(7500000 + (yearlyIncome - 15000000) * 0.15);
    } else if (yearlyIncome <= 100000000) {
      workIncomeDeduction = Math.round(12000000 + (yearlyIncome - 45000000) * 0.05);
    } else {
      workIncomeDeduction = Math.round(14750000 + (yearlyIncome - 100000000) * 0.02);
    }

    // 4. 과세표준 계산
    const taxableIncome = Math.max(0, yearlyIncome - totalDeduction - workIncomeDeduction);

    // 5. 소득세 계산 (누진세율 적용, 반올림)
    let incomeTax = 0;
    if (taxableIncome <= 12000000) {
      incomeTax = Math.round(taxableIncome * 0.06);
    } else if (taxableIncome <= 46000000) {
      incomeTax = Math.round(720000 + (taxableIncome - 12000000) * 0.15);
    } else if (taxableIncome <= 88000000) {
      incomeTax = Math.round(5820000 + (taxableIncome - 46000000) * 0.24);
    } else if (taxableIncome <= 150000000) {
      incomeTax = Math.round(15900000 + (taxableIncome - 88000000) * 0.35);
    } else if (taxableIncome <= 300000000) {
      incomeTax = Math.round(37600000 + (taxableIncome - 150000000) * 0.38);
    } else if (taxableIncome <= 500000000) {
      incomeTax = Math.round(94600000 + (taxableIncome - 300000000) * 0.40);
    } else {
      incomeTax = Math.round(174600000 + (taxableIncome - 500000000) * 0.42);
    }

    // 6. 지방소득세 계산 (소득세의 10%, 반올림)
    const localIncomeTax = Math.round(incomeTax * 0.1);

    // 7. 월 기준으로 환산 (반올림)
    const monthlyTaxableIncome = Math.round(taxableIncome / 12);
    const monthlyIncomeTax = Math.round(incomeTax / 12);
    const monthlyLocalTax = Math.round(localIncomeTax / 12);
    const monthlyTotalTax = monthlyIncomeTax + monthlyLocalTax;
    const monthlyNetIncome = monthlyIncome - monthlyTotalTax;

    setResult({
      monthlyIncome: Math.round(monthlyIncome),
      taxableIncome: monthlyTaxableIncome,
      incomeTax: monthlyIncomeTax,
      localIncomeTax: monthlyLocalTax,
      totalTax: monthlyTotalTax,
      netIncome: Math.round(monthlyNetIncome)
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">근로소득세 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {/* 급여 정보 */}
            <div>
              <label className="block text-gray-700 mb-2">월 급여 (원)</label>
              <input
                type="text"
                name="monthlyIncome"
                value={inputs.monthlyIncome}
                onChange={(e) => setInputs(prev => ({
                  ...prev,
                  monthlyIncome: formatNumber(e.target.value)
                }))}
                placeholder="예: 3,000,000"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 공제 정보 */}
            <div>
              <label className="block text-gray-700 mb-2">부양가족 수 (본인 포함)</label>
              <input
                type="number"
                name="dependents"
                value={inputs.dependents}
                onChange={handleInputChange}
                min="1"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">나이</label>
              <input
                type="number"
                name="age"
                value={inputs.age}
                onChange={handleInputChange}
                placeholder="만 나이"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <button
              onClick={calculateTax}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">세금 내역 (월 기준)</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>총 급여:</span>
                        <span>{formatNumber(result.monthlyIncome)}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>과세표준:</span>
                        <span>{formatNumber(result.taxableIncome)}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>소득세:</span>
                        <span>{formatNumber(result.incomeTax)}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>지방소득세:</span>
                        <span>{formatNumber(result.localIncomeTax)}원</span>
                      </div>
                      <div className="border-t border-gray-300 my-2"></div>
                      <div className="flex justify-between font-semibold">
                        <span>총 세금:</span>
                        <span className="text-red-600">{formatNumber(result.totalTax)}원</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>실수령액:</span>
                        <span className="text-blue-600">{formatNumber(result.netIncome)}원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">소득세 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">기본공제</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>기본공제: 1인당 150만원</li>
                  <li>장애인 공제: 200만원</li>
                  <li>경로우대 공제: 100만원</li>
                  <li>한부모 공제: 100만원</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">근로소득공제</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>500만원 이하: 70%</li>
                  <li>1,500만원 이하: 40%</li>
                  <li>4,500만원 이하: 15%</li>
                  <li>1억원 이하: 5%</li>
                  <li>1억원 초과: 2%</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">소득세율</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>1,200만원 이하: 6%</li>
                  <li>4,600만원 이하: 15%</li>
                  <li>8,800만원 이하: 24%</li>
                  <li>1억 5천만원 이하: 35%</li>
                  <li>3억원 이하: 38%</li>
                  <li>5억원 이하: 40%</li>
                  <li>5억원 초과: 42%</li>
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
                <span className="text-gray-500 text-sm ml-2">- 근로소득세 안내</span>
              </a>
              <a
                href="https://www.hometax.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">홈택스</span>
                <span className="text-gray-500 text-sm ml-2">- 연말정산 서비스</span>
              </a>
              <a
                href="https://www.wetax.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">위택스</span>
                <span className="text-gray-500 text-sm ml-2">- 지방소득세 신고</span>
              </a>
              <a
                href="https://www.moef.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">기획재정부</span>
                <span className="text-gray-500 text-sm ml-2">- 세법 개정 정보</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 