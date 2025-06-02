'use client';

import { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

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
    if (name === 'amount') {
      setInputs(prev => ({
        ...prev,
        amount: formatNumber(value)
      }));
    } else {
      setInputs(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">원천징수 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">소득 유형</label>
              <select
                name="incomeType"
                value={inputs.incomeType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-gray-700 mb-2">소득금액 (원)</label>
              <input
                type="text"
                name="amount"
                value={inputs.amount}
                onChange={handleInputChange}
                placeholder="예: 1000000"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
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
                      <label className="block text-gray-700 mb-2">조세조약 세율 (%)</label>
                      <input
                        type="text"
                        name="taxTreatyRate"
                        value={inputs.taxTreatyRate}
                        onChange={handleInputChange}
                        placeholder="예: 12.5"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              )}
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
                    <h3 className="font-semibold mb-2">원천징수 내역</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>총 소득금액:</span>
                        <span>{result.grossIncome.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>원천징수세액:</span>
                        <span>{Math.round(result.withholdingTax).toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>지방소득세:</span>
                        <span>{Math.round(result.localIncomeTax).toLocaleString()}원</span>
                      </div>
                      <div className="border-t border-gray-300 my-2"></div>
                      <div className="flex justify-between font-semibold">
                        <span>총 세금:</span>
                        <span className="text-red-600">{Math.round(result.totalTax).toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>실수령액:</span>
                        <span className="text-blue-600">{Math.round(result.netIncome).toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>실효세율:</span>
                        <span>{result.effectiveTaxRate.toFixed(2)}%</span>
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
            <h2 className="text-xl font-bold mb-4">원천징수 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">거주자 원천징수</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>이자/배당소득: 14%</li>
                  <li>사업소득: 3%</li>
                  <li>강연료/원고료: 20%</li>
                  <li>연금소득: 5%</li>
                  <li>임대소득: 2%</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">비거주자 원천징수</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>이자/배당소득: 22%</li>
                  <li>사업소득: 20%</li>
                  <li>강연료/원고료: 22%</li>
                  <li>연금소득: 22%</li>
                  <li>임대소득: 22%</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">주요 참고사항</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>지방소득세는 원천징수세액의 10%입니다.</li>
                  <li>비거주자는 조세조약에 따라 감면세율이 적용될 수 있습니다.</li>
                  <li>실제 세금은 종합소득세 신고 시 정산됩니다.</li>
                  <li>특정 소득의 경우 다른 공제나 감면이 적용될 수 있습니다.</li>
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
                <span className="text-gray-500 text-sm ml-2">- 원천징수 신고 안내</span>
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
                <span className="text-gray-500 text-sm ml-2">- 조세조약 정보</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 