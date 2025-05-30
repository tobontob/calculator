'use client';

import { useState } from 'react';

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

    const assessedValue = parseFloat(value);
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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">재산세 계산기</h1>
      
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
            <option value="건축물">건축물</option>
            <option value="토지">토지</option>
          </select>
        </div>

        {propertyType === '토지' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              토지 과세유형
            </label>
            <select
              value={landType}
              onChange={(e) => {
                setLandType(e.target.value as LandType);
                setResult(null);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="종합합산">종합합산</option>
              <option value="별도합산">별도합산</option>
              <option value="분리과세">분리과세</option>
            </select>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            부동산 공시가격 (원)
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setResult(null);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="예: 300000000"
          />
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
              <h3 className="font-bold text-lg mb-4">세금 계산 결과</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>과세표준액:</span>
                  <span className="font-semibold">{result.taxBase.toLocaleString()}원</span>
                </p>
                <p className="flex justify-between">
                  <span>재산세:</span>
                  <span className="font-semibold">{result.estateTax.toLocaleString()}원</span>
                </p>
                <p className="flex justify-between">
                  <span>지역자원시설세:</span>
                  <span className="font-semibold">{result.cityTax.toLocaleString()}원</span>
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
                <li>공정시장가액비율 60%가 적용됩니다.</li>
                <li>주택의 경우 과세표준에 따라 0.1%~0.4%의 누진세율이 적용됩니다.</li>
                <li>건축물은 0.25%의 단일세율이 적용됩니다.</li>
                <li>토지는 과세유형에 따라 0.2%~0.4%의 세율이 적용됩니다.</li>
                <li>정확한 세금은 관할 구청이나 전문가와 상담하시기 바랍니다.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 