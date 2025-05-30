'use client';

import { useState } from 'react';

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
      [name]: value
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
    
    // 매출총이익률 계산
    const grossProfitMargin = (grossProfit / revenue) * 100;
    
    // 영업이익률 계산
    const operatingProfitMargin = (operatingProfit / revenue) * 100;

    setResult({
      grossProfit,
      operatingProfit,
      grossProfitMargin: isNaN(grossProfitMargin) ? 0 : grossProfitMargin,
      operatingProfitMargin: isNaN(operatingProfitMargin) ? 0 : operatingProfitMargin
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">매출이익률 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              매출액 (원)
            </label>
            <input
              type="text"
              name="revenue"
              value={inputs.revenue}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="매출액을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              매출원가 (원)
            </label>
            <input
              type="text"
              name="costOfGoods"
              value={inputs.costOfGoods}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="매출원가를 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              판매관리비 (원)
            </label>
            <input
              type="text"
              name="operatingExpenses"
              value={inputs.operatingExpenses}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="판매관리비를 입력하세요"
            />
          </div>
        </div>

        <button
          onClick={calculateProfitMargin}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">매출이익률 계산 결과</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">매출총이익</p>
              <p className="text-xl font-bold text-blue-600">{formatNumber(result.grossProfit)}원</p>
              <p className="text-sm font-medium mt-1">
                (이익률: {result.grossProfitMargin.toFixed(2)}%)
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">영업이익</p>
              <p className="text-xl font-bold text-green-600">{formatNumber(result.operatingProfit)}원</p>
              <p className="text-sm font-medium mt-1">
                (이익률: {result.operatingProfitMargin.toFixed(2)}%)
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">참고사항</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>매출총이익 = 매출액 - 매출원가</li>
          <li>영업이익 = 매출총이익 - 판매관리비</li>
          <li>매출총이익률 = (매출총이익 ÷ 매출액) × 100</li>
          <li>영업이익률 = (영업이익 ÷ 매출액) × 100</li>
          <li>이익률이 높을수록 수익성이 좋다는 것을 의미합니다.</li>
          <li>업종별로 적정 이익률은 다를 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
} 