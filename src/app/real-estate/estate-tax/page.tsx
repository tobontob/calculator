'use client';

import { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

type PropertyType = '주택' | '건축물' | '토지';
type LandType = '종합합산' | '별도합산' | '분리과세';

interface TaxRate {
  threshold: number;
  rate: number;
}

export default function EstateTaxCalculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>('주택');
  const [landType, setLandType] = useState<LandType>('종합합산');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<{
    taxBase: number;
    estateTax: number;
    cityTax: number;
    totalTax: number;
  } | null>(null);

  // 주택 과세표준 구간별 세율 (2024년 기준)
  const houseTaxRates: TaxRate[] = [
    { threshold: 60000000, rate: 0.001 },
    { threshold: 150000000, rate: 0.0015 },
    { threshold: 300000000, rate: 0.0025 },
    { threshold: Infinity, rate: 0.004 }
  ];

  // 건축물 세율
  const buildingTaxRate = 0.0025;

  // 토지 세율
  const landTaxRates = {
    종합합산: [
      { threshold: 50000000, rate: 0.002 },
      { threshold: 100000000, rate: 0.003 },
      { threshold: Infinity, rate: 0.004 }
    ],
    별도합산: [
      { threshold: 200000000, rate: 0.002 },
      { threshold: 1000000000, rate: 0.003 },
      { threshold: Infinity, rate: 0.004 }
    ],
    분리과세: [
      { threshold: Infinity, rate: 0.002 } // 일반 분리과세 기준
    ]
  };

  const calculateTax = () => {
    if (!value) return;

    const assessedValue = parseFloat(value.replace(/,/g, ''));
    let taxBase = 0;
    let estateTax = 0;

    // 과세표준액 계산 (공정시장가액비율 적용)
    taxBase = assessedValue * 0.6; // 공정시장가액비율 60% 적용

    // 재산세 계산
    if (propertyType === '주택') {
      // 주택 누진세율 적용
      for (let i = 0; i < houseTaxRates.length; i++) {
        if (taxBase <= houseTaxRates[i].threshold) {
          estateTax = taxBase * houseTaxRates[i].rate;
          break;
        }
      }
    } else if (propertyType === '건축물') {
      // 건축물 단일세율 적용
      estateTax = taxBase * buildingTaxRate;
    } else {
      // 토지 과세유형별 세율 적용
      const rates = landTaxRates[landType];
      for (let i = 0; i < rates.length; i++) {
        if (taxBase <= rates[i].threshold) {
          estateTax = taxBase * rates[i].rate;
          break;
        }
      }
    }

    // 지역자원시설세 계산 (재산세의 20%)
    const cityTax = estateTax * 0.2;

    // 총 세액 계산
    const totalTax = estateTax + cityTax;

    setResult({
      taxBase: Math.round(taxBase),
      estateTax: Math.round(estateTax),
      cityTax: Math.round(cityTax),
      totalTax: Math.round(totalTax)
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">재산세 계산기</h1>
      
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
                <option value="건축물">건축물</option>
                <option value="토지">토지</option>
              </select>
            </div>

            {propertyType === '토지' && (
              <div>
                <label className="block text-gray-700 mb-2">토지 과세유형</label>
                <select
                  value={landType}
                  onChange={(e) => {
                    setLandType(e.target.value as LandType);
                    setResult(null);
                  }}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="종합합산">종합합산</option>
                  <option value="별도합산">별도합산</option>
                  <option value="분리과세">분리과세</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2">부동산 공시가격 (원)</label>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(formatNumber(e.target.value));
                  setResult(null);
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 300,000,000"
              />
            </div>

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
                    <span>과세표준액:</span>
                    <span>{formatNumber(result.taxBase)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>재산세:</span>
                    <span>{formatNumber(result.estateTax)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>지역자원시설세:</span>
                    <span>{formatNumber(result.cityTax)}원</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>총 세금:</span>
                    <span className="text-blue-600">{formatNumber(result.totalTax)}원</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 사용법 및 정보 섹션 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">재산세 안내</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">과세 대상별 세율</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">주택</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>6천만원 이하: 0.1%</li>
                      <li>6천만원~1.5억원: 0.15%</li>
                      <li>1.5억원~3억원: 0.25%</li>
                      <li>3억원 초과: 0.4%</li>
                      <li>별장: 4%</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">토지</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>종합합산: 0.2~0.4%</li>
                      <li>별도합산: 0.2~0.4%</li>
                      <li>분리과세: 0.2%</li>
                      <li>나대지: 5%</li>
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
                href="https://www.wetax.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">위택스</span>
                <span className="text-gray-500 text-sm ml-2">- 지방세 통합조회/납부</span>
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
                href="https://www.seoul.go.kr/main/index.jsp"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">서울시청</span>
                <span className="text-gray-500 text-sm ml-2">- 재산세 안내</span>
              </a>
              <a
                href="https://www.easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1126&ccfNo=4&cciNo=1&cnpClsNo=1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">찾기쉬운 생활법령</span>
                <span className="text-gray-500 text-sm ml-2">- 부동산 세금 안내</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 