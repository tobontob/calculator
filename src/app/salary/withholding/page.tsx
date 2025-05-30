'use client';

import { useState } from 'react';

interface WithholdingInputs {
  incomeType: string;
  amount: string;
  isResident: boolean;
  hasTaxTreaty: boolean;
  taxTreatyRate?: string;
}

interface WithholdingResult {
  grossIncome: number;
  withholdingTax: number;
  localIncomeTax: number;
  totalTax: number;
  netIncome: number;
  effectiveTaxRate: number;
}

export default function WithholdingTaxCalculator() {
  const [inputs, setInputs] = useState<WithholdingInputs>({
    incomeType: 'interest',
    amount: '',
    isResident: true,
    hasTaxTreaty: false,
    taxTreatyRate: '',
  });

  const [result, setResult] = useState<WithholdingResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    setResult(null);
  };

  const calculateTax = () => {
    const amount = parseFloat(inputs.amount.replace(/,/g, '')) || 0;
    let withholdingRate = 0;
    
    // 거주자/비거주자 및 소득 유형별 원천징수율 적용
    if (inputs.isResident) {
      switch (inputs.incomeType) {
        case 'interest':
        case 'dividend':
          withholdingRate = 0.14; // 이자/배당소득 14%
          break;
        case 'business':
          withholdingRate = 0.03; // 사업소득 3%
          break;
        case 'lecture':
          withholdingRate = 0.20; // 강연료 등 20%
          break;
        case 'pension':
          withholdingRate = 0.05; // 연금소득 5%
          break;
        case 'rent':
          withholdingRate = 0.02; // 임대소득 2%
          break;
      }
    } else {
      // 비거주자
      if (inputs.hasTaxTreaty && inputs.taxTreatyRate) {
        withholdingRate = parseFloat(inputs.taxTreatyRate) / 100;
      } else {
        switch (inputs.incomeType) {
          case 'interest':
          case 'dividend':
            withholdingRate = 0.22; // 이자/배당소득 22%
            break;
          case 'business':
            withholdingRate = 0.20; // 사업소득 20%
            break;
          case 'lecture':
            withholdingRate = 0.22; // 강연료 등 22%
            break;
          case 'pension':
            withholdingRate = 0.22; // 연금소득 22%
            break;
          case 'rent':
            withholdingRate = 0.22; // 임대소득 22%
            break;
        }
      }
    }

    const withholdingTax = amount * withholdingRate;
    const localIncomeTax = withholdingTax * 0.1; // 지방소득세 10%
    const totalTax = withholdingTax + localIncomeTax;
    
    setResult({
      grossIncome: amount,
      withholdingTax: withholdingTax,
      localIncomeTax: localIncomeTax,
      totalTax: totalTax,
      netIncome: amount - totalTax,
      effectiveTaxRate: (totalTax / amount) * 100
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">원천징수 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {/* 소득 정보 입력 */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">소득 정보</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  소득 유형
                </label>
                <select
                  name="incomeType"
                  value={inputs.incomeType}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="interest">이자소득</option>
                  <option value="dividend">배당소득</option>
                  <option value="business">사업소득</option>
                  <option value="lecture">강연료/원고료</option>
                  <option value="pension">연금소득</option>
                  <option value="rent">임대소득</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  소득금액 (원)
                </label>
                <input
                  type="text"
                  name="amount"
                  value={inputs.amount}
                  onChange={handleInputChange}
                  placeholder="예: 1000000"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          {/* 납세자 정보 */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">납세자 정보</h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isResident"
                  checked={inputs.isResident}
                  onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">거주자 여부</span>
              </label>

              {!inputs.isResident && (
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="hasTaxTreaty"
                      checked={inputs.hasTaxTreaty}
                      onChange={handleInputChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">조세조약 적용 여부</span>
                  </label>

                  {inputs.hasTaxTreaty && (
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        조세조약 세율 (%)
                      </label>
                      <input
                        type="text"
                        name="taxTreatyRate"
                        value={inputs.taxTreatyRate}
                        onChange={handleInputChange}
                        placeholder="예: 12.5"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  )}
                </div>
              )}
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
                <h3 className="font-bold text-lg mb-4">원천징수 계산 결과</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>총 소득금액:</span>
                    <span className="font-semibold">{result.grossIncome.toLocaleString()}원</span>
                  </p>
                  <p className="flex justify-between">
                    <span>원천징수세액:</span>
                    <span className="font-semibold">{Math.round(result.withholdingTax).toLocaleString()}원</span>
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
                  <p className="flex justify-between">
                    <span>실수령액:</span>
                    <span className="font-semibold text-blue-600">{Math.round(result.netIncome).toLocaleString()}원</span>
                  </p>
                  <p className="flex justify-between">
                    <span>실효세율:</span>
                    <span className="font-semibold">{result.effectiveTaxRate.toFixed(2)}%</span>
                  </p>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-1">참고사항:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>거주자와 비거주자의 원천징수 세율이 다르게 적용됩니다.</li>
                  <li>비거주자의 경우 조세조약에 따라 감면된 세율이 적용될 수 있습니다.</li>
                  <li>지방소득세는 원천징수세액의 10%로 계산됩니다.</li>
                  <li>실제 세금은 종합소득세 신고 시 정산됩니다.</li>
                  <li>특정 소득의 경우 다른 공제나 감면이 적용될 수 있습니다.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 