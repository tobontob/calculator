'use client';

import { useState } from 'react';
import { formatNumber } from '@/utils/format';

interface ProfitMarginInputs {
  revenue: string;
  costOfGoods: string;
  operatingExpenses: string;
}

interface ProfitMarginResult {
  grossProfit: number;
  operatingProfit: number;
  grossProfitMargin: number;
  operatingProfitMargin: number;
}

export default function ProfitMarginCalculator() {
  const [inputs, setInputs] = useState<ProfitMarginInputs>({
    revenue: '',
    costOfGoods: '',
    operatingExpenses: '',
  });

  const [result, setResult] = useState<ProfitMarginResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: formatNumber(value)
    }));
    setResult(null);
  };

  const calculateProfitMargin = () => {
    const revenue = parseFloat(inputs.revenue.replace(/,/g, '')) || 0;
    const costOfGoods = parseFloat(inputs.costOfGoods.replace(/,/g, '')) || 0;
    const operatingExpenses = parseFloat(inputs.operatingExpenses.replace(/,/g, '')) || 0;

    // 매출총이익 계산
    const grossProfit = revenue - costOfGoods;
    
    // 영업이익 계산
    const operatingProfit = grossProfit - operatingExpenses;
    
    // 이익률 계산
    const grossProfitMargin = (grossProfit / revenue) * 100;
    const operatingProfitMargin = (operatingProfit / revenue) * 100;

    setResult({
      grossProfit,
      operatingProfit,
      grossProfitMargin: isNaN(grossProfitMargin) ? 0 : grossProfitMargin,
      operatingProfitMargin: isNaN(operatingProfitMargin) ? 0 : operatingProfitMargin
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">수익률 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">매출액 (원)</label>
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
              <label className="block text-gray-700 mb-2">매출원가 (원)</label>
              <input
                type="text"
                name="costOfGoods"
                value={inputs.costOfGoods}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">판관비 (원)</label>
              <input
                type="text"
                name="operatingExpenses"
                value={inputs.operatingExpenses}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={calculateProfitMargin}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>매출총이익:</span>
                    <span className="text-blue-600">{result.grossProfit.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>매출총이익률:</span>
                    <span className="text-blue-600">{result.grossProfitMargin.toFixed(2)}%</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between">
                    <span>영업이익:</span>
                    <span className="text-green-600">{result.operatingProfit.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>영업이익률:</span>
                    <span className="text-green-600">{result.operatingProfitMargin.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">수익률 지표 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">매출총이익</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>매출액 - 매출원가</li>
                  <li>제품/서비스 판매의 직접적인 수익성</li>
                  <li>원가 관리의 효율성 평가</li>
                  <li>업종별 적정 마진율 비교 지표</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">영업이익</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>매출총이익 - 판매관리비</li>
                  <li>기업의 핵심 영업활동 수익성</li>
                  <li>영업활동의 효율성 평가</li>
                  <li>기업의 지속가능성 판단 지표</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">수익성 분석</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>매출총이익률: 매출총이익 ÷ 매출액 × 100</li>
                  <li>영업이익률: 영업이익 ÷ 매출액 × 100</li>
                  <li>업종별 평균 대비 수익성 비교</li>
                  <li>원가 및 비용 구조 개선 지표</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.kisrating.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국신용평가</span>
                <span className="text-gray-500 text-sm ml-2">- 기업 신용등급</span>
              </a>
              <a
                href="https://www.korcham.net"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">대한상공회의소</span>
                <span className="text-gray-500 text-sm ml-2">- 산업통계</span>
              </a>
              <a
                href="https://www.kita.net"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국무역협회</span>
                <span className="text-gray-500 text-sm ml-2">- 업종별 통계</span>
              </a>
              <a
                href="https://www.kicpa.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국공인회계사회</span>
                <span className="text-gray-500 text-sm ml-2">- 재무분석</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 