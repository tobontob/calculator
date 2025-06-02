'use client';

import { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

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

    const value = parseFloat(totalValue.replace(/,/g, ''));
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">종합부동산세 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">과세 정보 입력</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">부동산 유형</label>
              <select
                value={propertyType}
                onChange={(e) => {
                  setPropertyType(e.target.value as PropertyType);
                  setResult(null);
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="주택">주택</option>
                <option value="종합합산토지">종합합산토지</option>
                <option value="별도합산토지">별도합산토지</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">부동산 공시가격 총액 (원)</label>
              <input
                type="text"
                value={totalValue}
                onChange={(e) => {
                  setTotalValue(formatNumber(e.target.value));
                  setResult(null);
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 1,500,000,000"
              />
            </div>

            {propertyType === '주택' && (
              <div>
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
            )}

            {propertyType === '주택' && (
              <div>
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
                  <span className="ml-2">1세대 1주택자</span>
                </label>
              </div>
            )}

            <button
              onClick={calculateTax}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">계산 결과</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>과세 표준액:</span>
                    <span>{formatNumber(result.taxBase)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>종합부동산세:</span>
                    <span>{formatNumber(result.propertyTax)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>지방교육세:</span>
                    <span>{formatNumber(result.localEducationTax)}원</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>총 납부세액:</span>
                    <span>{formatNumber(result.totalTax)}원</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 사용법 및 정보 섹션 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">종합부동산세 안내</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">과세 대상</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">주택</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>과세기준: 11억원 초과</li>
                      <li>1세대 1주택: 세율 0.5~3.0%</li>
                      <li>다주택자: 세율 0.6~3.6%</li>
                      <li>1세대 1주택 20% 감면</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">토지</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>종합합산: 15억원 초과 (1~3%)</li>
                      <li>별도합산: 20억원 초과 (0.5~1.5%)</li>
                      <li>분리과세: 과세 제외</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 정보</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2227&cntntsId=7697"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">국세청</span>
                <span className="text-gray-500 text-sm ml-2">- 종합부동산세 안내</span>
              </a>
              <a
                href="https://www.wetax.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">위택스</span>
                <span className="text-gray-500 text-sm ml-2">- 세금 조회/납부</span>
              </a>
              <a
                href="https://www.realtyprice.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">부동산공시가격알리미</span>
                <span className="text-gray-500 text-sm ml-2">- 공시가격 조회</span>
              </a>
              <a
                href="https://www.molit.go.kr/portal.do"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">국토교통부</span>
                <span className="text-gray-500 text-sm ml-2">- 부동산 정책 정보</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 