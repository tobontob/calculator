'use client';

import { useState } from 'react';

type PropertyType = '주택' | '종합합산토지' | '별도합산토지';

interface TaxRate {
  threshold: number;
  rate: number;
  deduction: number;
}

export default function PropertyTaxCalculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>('주택');
  const [totalValue, setTotalValue] = useState('');
  const [isMultipleHouse, setIsMultipleHouse] = useState(false);
  const [isFirstHome, setIsFirstHome] = useState(false);
  const [result, setResult] = useState<{
    taxBase: number;
    propertyTax: number;
    localEducationTax: number;
    totalTax: number;
  } | null>(null);

  // 과세 표준 구간별 세율 (2024년 기준)
  const getTaxRates = (type: PropertyType, isMultiple: boolean): TaxRate[] => {
    if (type === '주택') {
      if (isMultiple) {
        return [
          { threshold: 1100000000, rate: 0.006, deduction: 0 },
          { threshold: 1500000000, rate: 0.015, deduction: 9900000 },
          { threshold: 3000000000, rate: 0.024, deduction: 23400000 },
          { threshold: Infinity, rate: 0.036, deduction: 59400000 }
        ];
      } else {
        return [
          { threshold: 1100000000, rate: 0.005, deduction: 0 },
          { threshold: 1500000000, rate: 0.012, deduction: 7700000 },
          { threshold: 3000000000, rate: 0.019, deduction: 18200000 },
          { threshold: Infinity, rate: 0.03, deduction: 51200000 }
        ];
      }
    } else if (type === '종합합산토지') {
      return [
        { threshold: 1500000000, rate: 0.01, deduction: 0 },
        { threshold: 3000000000, rate: 0.02, deduction: 15000000 },
        { threshold: Infinity, rate: 0.03, deduction: 45000000 }
      ];
    } else {
      return [
        { threshold: 2000000000, rate: 0.005, deduction: 0 },
        { threshold: 4000000000, rate: 0.01, deduction: 10000000 },
        { threshold: Infinity, rate: 0.015, deduction: 30000000 }
      ];
    }
  };

  const calculateTax = () => {
    if (!totalValue) return;

    const value = parseFloat(totalValue);
    let taxBase = 0;

    // 과세 표준액 계산 (공정시장가액비율 적용)
    if (propertyType === '주택') {
      // 주택의 경우 공정시장가액비율 95% 적용
      taxBase = value * 0.95;
    } else {
      // 토지의 경우 공정시장가액비율 95% 적용
      taxBase = value * 0.95;
    }

    // 공제금액 적용
    if (propertyType === '주택') {
      taxBase -= 1100000000; // 11억 공제
    } else if (propertyType === '종합합산토지') {
      taxBase -= 1500000000; // 15억 공제
    } else {
      taxBase -= 2000000000; // 20억 공제
    }

    if (taxBase <= 0) {
      setResult({
        taxBase: 0,
        propertyTax: 0,
        localEducationTax: 0,
        totalTax: 0
      });
      return;
    }

    // 세율 적용
    const rates = getTaxRates(propertyType, isMultipleHouse);
    let propertyTax = 0;

    for (let i = 0; i < rates.length; i++) {
      if (taxBase <= rates[i].threshold) {
        propertyTax = (taxBase * rates[i].rate) - rates[i].deduction;
        break;
      }
    }

    // 1세대 1주택 공제 적용
    if (propertyType === '주택' && isFirstHome) {
      propertyTax *= 0.8; // 20% 감면
    }

    // 지방교육세 계산 (종부세의 20%)
    const localEducationTax = propertyTax * 0.2;

    // 총 세액 계산
    const totalTax = propertyTax + localEducationTax;

    setResult({
      taxBase: Math.round(taxBase),
      propertyTax: Math.round(propertyTax),
      localEducationTax: Math.round(localEducationTax),
      totalTax: Math.round(totalTax)
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">종합부동산세 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            부동산 유형
          </label>
          <select
            value={propertyType}
            onChange={(e) => {
              setPropertyType(e.target.value as PropertyType);
              setResult(null);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="주택">주택</option>
            <option value="종합합산토지">종합합산토지</option>
            <option value="별도합산토지">별도합산토지</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            부동산 공시가격 총액 (원)
          </label>
          <input
            type="number"
            value={totalValue}
            onChange={(e) => {
              setTotalValue(e.target.value);
              setResult(null);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="예: 1500000000"
          />
        </div>

        {propertyType === '주택' && (
          <>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isMultipleHouse}
                  onChange={(e) => {
                    setIsMultipleHouse(e.target.checked);
                    setResult(null);
                  }}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">다주택자 여부</span>
              </label>
            </div>

            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isFirstHome}
                  onChange={(e) => {
                    setIsFirstHome(e.target.checked);
                    setResult(null);
                  }}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">1세대 1주택 여부</span>
              </label>
            </div>
          </>
        )}

        <button
          onClick={calculateTax}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          계산하기
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-4">세금 계산 결과</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>과세표준액:</span>
                  <span className="font-semibold">{result.taxBase.toLocaleString()}원</span>
                </p>
                <p className="flex justify-between">
                  <span>종합부동산세:</span>
                  <span className="font-semibold">{result.propertyTax.toLocaleString()}원</span>
                </p>
                <p className="flex justify-between">
                  <span>지방교육세:</span>
                  <span className="font-semibold">{result.localEducationTax.toLocaleString()}원</span>
                </p>
                <div className="border-t border-gray-300 my-2"></div>
                <p className="flex justify-between font-bold text-lg">
                  <span>총 세금:</span>
                  <span className="text-blue-600">{result.totalTax.toLocaleString()}원</span>
                </p>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="font-semibold mb-1">참고사항:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>공정시장가액비율 95%가 적용됩니다.</li>
                <li>주택의 경우 11억원, 종합합산토지는 15억원, 별도합산토지는 20억원 공제됩니다.</li>
                <li>1세대 1주택자는 종합부동산세 20% 감면 혜택이 적용됩니다.</li>
                <li>정확한 세금은 관할 세무서나 전문가와 상담하시기 바랍니다.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 