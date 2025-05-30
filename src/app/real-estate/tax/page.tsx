'use client';

import { useState } from 'react';

type PropertyType = '아파트' | '주택' | '상가' | '토지';
type AcquisitionType = '매매' | '분양권' | '증여' | '상속';

interface TaxRates {
  acquisitionTax: number;
  specialTax: number;
  educationTax: number;
  agricultureTax: number;
}

export default function AcquisitionTaxCalculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>('아파트');
  const [acquisitionType, setAcquisitionType] = useState<AcquisitionType>('매매');
  const [price, setPrice] = useState('');
  const [isFirstHome, setIsFirstHome] = useState(false);
  const [result, setResult] = useState<{
    acquisitionTax: number;
    specialTax: number;
    educationTax: number;
    agricultureTax: number;
    totalTax: number;
  } | null>(null);

  const calculateTaxRates = (
    propertyType: PropertyType,
    acquisitionType: AcquisitionType,
    price: number,
    isFirstHome: boolean
  ): TaxRates => {
    let rates: TaxRates = {
      acquisitionTax: 0.04, // 기본 취득세율 4%
      specialTax: 0.002,    // 지방교육세 0.2%
      educationTax: 0.002,  // 농어촌특별세 0.2%
      agricultureTax: 0.002 // 교육세 0.2%
    };

    // 주택 취득세 감면 (1주택자 기준)
    if ((propertyType === '아파트' || propertyType === '주택') && isFirstHome) {
      if (price <= 600000000) {
        rates.acquisitionTax = 0.01; // 1%
      } else if (price <= 900000000) {
        rates.acquisitionTax = 0.02; // 2%
      } else {
        rates.acquisitionTax = 0.03; // 3%
      }
    }

    // 증여/상속의 경우 세율 조정
    if (acquisitionType === '증여') {
      rates.acquisitionTax = 0.035; // 3.5%
      rates.specialTax = 0;
      rates.agricultureTax = 0;
    } else if (acquisitionType === '상속') {
      rates.acquisitionTax = 0.028; // 2.8%
      rates.specialTax = 0;
      rates.agricultureTax = 0;
    }

    // 분양권의 경우 기본 세율 적용
    if (acquisitionType === '분양권') {
      rates.acquisitionTax = 0.04;
    }

    return rates;
  };

  const calculateTax = () => {
    if (!price) return;

    const priceValue = parseFloat(price);
    const rates = calculateTaxRates(propertyType, acquisitionType, priceValue, isFirstHome);

    const acquisitionTax = priceValue * rates.acquisitionTax;
    const specialTax = priceValue * rates.specialTax;
    const educationTax = priceValue * rates.educationTax;
    const agricultureTax = priceValue * rates.agricultureTax;
    const totalTax = acquisitionTax + specialTax + educationTax + agricultureTax;

    setResult({
      acquisitionTax: Math.round(acquisitionTax),
      specialTax: Math.round(specialTax),
      educationTax: Math.round(educationTax),
      agricultureTax: Math.round(agricultureTax),
      totalTax: Math.round(totalTax),
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">취득세/등록세 계산기</h1>
      
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
            <option value="아파트">아파트</option>
            <option value="주택">주택</option>
            <option value="상가">상가</option>
            <option value="토지">토지</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            취득 유형
          </label>
          <select
            value={acquisitionType}
            onChange={(e) => {
              setAcquisitionType(e.target.value as AcquisitionType);
              setResult(null);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="매매">매매</option>
            <option value="분양권">분양권</option>
            <option value="증여">증여</option>
            <option value="상속">상속</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            취득가액 (원)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setResult(null);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="예: 300000000"
          />
        </div>

        {(propertyType === '아파트' || propertyType === '주택') && (
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
              <span className="ml-2">생애최초 구입 / 1주택자</span>
            </label>
          </div>
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
                  <span>취득세:</span>
                  <span className="font-semibold">{result.acquisitionTax.toLocaleString()}원</span>
                </p>
                <p className="flex justify-between">
                  <span>지방교육세:</span>
                  <span className="font-semibold">{result.specialTax.toLocaleString()}원</span>
                </p>
                <p className="flex justify-between">
                  <span>농어촌특별세:</span>
                  <span className="font-semibold">{result.educationTax.toLocaleString()}원</span>
                </p>
                <p className="flex justify-between">
                  <span>교육세:</span>
                  <span className="font-semibold">{result.agricultureTax.toLocaleString()}원</span>
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
                <li>취득세율은 부동산 유형과 취득 원인에 따라 다르게 적용됩니다.</li>
                <li>생애최초 주택 구입자는 취득세 감면 혜택이 적용됩니다.</li>
                <li>실제 세금은 지역과 과세표준에 따라 달라질 수 있습니다.</li>
                <li>정확한 세금은 관할 세무서나 전문가와 상담하시기 바랍니다.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 