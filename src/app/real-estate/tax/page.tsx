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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">취득세/등록세 계산기</h1>
      
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
                <option value="아파트">아파트</option>
                <option value="주택">주택</option>
                <option value="상가">상가</option>
                <option value="토지">토지</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">취득 유형</label>
              <select
                value={acquisitionType}
                onChange={(e) => {
                  setAcquisitionType(e.target.value as AcquisitionType);
                  setResult(null);
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="매매">매매</option>
                <option value="분양권">분양권</option>
                <option value="증여">증여</option>
                <option value="상속">상속</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">취득가액 (원)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setResult(null);
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 300000000"
              />
            </div>

            {(propertyType === '아파트' || propertyType === '주택') && (
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
                  <span className="ml-2">생애최초 구입 / 1주택자</span>
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
                    <span>취득세:</span>
                    <span>{result.acquisitionTax.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>지방교육세:</span>
                    <span>{result.specialTax.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>농어촌특별세:</span>
                    <span>{result.agricultureTax.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>교육세:</span>
                    <span>{result.educationTax.toLocaleString()}원</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>총 세금:</span>
                    <span className="text-blue-600">{result.totalTax.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 사용법 및 정보 섹션 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">취득세 안내</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">취득세 기본 세율</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">주택 취득세</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>6억원 이하: 1.0%</li>
                      <li>6억원 초과 9억원 이하: 2.0%</li>
                      <li>9억원 초과: 3.0%</li>
                      <li>일반 취득: 4.0%</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">기타 취득세</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>증여: 3.5%</li>
                      <li>상속: 2.8%</li>
                      <li>원시취득: 2.8%</li>
                      <li>상가/토지: 4.0%</li>
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
                <span className="text-gray-500 text-sm ml-2">- 취득세 안내</span>
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