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
    
    // 법인세 계산 (2024년 기준)
    let basicTax = 0;
    if (inputs.isSmallBusiness) {
      // 중소기업 세율
      if (taxableIncome <= 200000000) {
        basicTax = taxableIncome * 0.10; // 2억원 이하: 10%
      } else if (taxableIncome <= 20000000000) {
        basicTax = 20000000 + (taxableIncome - 200000000) * 0.20; // 2억원 초과 200억원 이하: 20%
      } else {
        basicTax = 3980000000 + (taxableIncome - 20000000000) * 0.22; // 200억원 초과: 22%
      }
    } else {
      // 일반기업 세율
      if (taxableIncome <= 200000000) {
        basicTax = taxableIncome * 0.11; // 2억원 이하: 11%
      } else if (taxableIncome <= 20000000000) {
        basicTax = 22000000 + (taxableIncome - 200000000) * 0.22; // 2억원 초과 200억원 이하: 22%
      } else if (taxableIncome <= 300000000000) {
        basicTax = 4378000000 + (taxableIncome - 20000000000) * 0.24; // 200억원 초과 3000억원 이하: 24%
      } else {
        basicTax = 71578000000 + (taxableIncome - 300000000000) * 0.25; // 3000억원 초과: 25%
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">법인세 계산기</h1>
      
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
              <label className="block text-gray-700 mb-2">세액공제 (원)</label>
              <input
                type="text"
                name="taxCredit"
                value={inputs.taxCredit}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isSmallBusiness"
                  checked={inputs.isSmallBusiness}
                  onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">중소기업 여부</span>
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
                    <span>법인세:</span>
                    <span className="text-blue-600">{result.basicTax.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>지방소득세:</span>
                    <span className="text-green-600">{result.localIncomeTax.toLocaleString()}원</span>
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
            <h2 className="text-xl font-bold mb-4">법인세 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">법인세율 (2024년)</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>일반기업</li>
                  <ul className="pl-5 space-y-1">
                    <li>2억원 이하: 11%</li>
                    <li>2억원 초과 200억원 이하: 22%</li>
                    <li>200억원 초과 3000억원 이하: 24%</li>
                    <li>3000억원 초과: 25%</li>
                  </ul>
                  <li className="mt-2">중소기업</li>
                  <ul className="pl-5 space-y-1">
                    <li>2억원 이하: 10%</li>
                    <li>2억원 초과 200억원 이하: 20%</li>
                    <li>200억원 초과: 22%</li>
                  </ul>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">세액공제 항목</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>연구인력개발비 세액공제</li>
                  <li>투자세액공제</li>
                  <li>고용증대 세액공제</li>
                  <li>중소기업 특별세액감면</li>
                  <li>외국납부세액공제</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">신고 및 납부</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>법인세 신고: 사업연도 종료일로부터 3개월 이내</li>
                  <li>중간예납: 사업연도 개시일부터 6개월</li>
                  <li>지방소득세: 법인세의 10%</li>
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
                <span className="text-gray-500 text-sm ml-2">- 법인세 신고</span>
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
                href="https://www.mss.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">중소벤처기업부</span>
                <span className="text-gray-500 text-sm ml-2">- 중소기업 지원</span>
              </a>
              <a
                href="https://www.kicpa.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국공인회계사회</span>
                <span className="text-gray-500 text-sm ml-2">- 세무상담</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 