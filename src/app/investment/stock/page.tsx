'use client';

import { useState } from 'react';
import { formatNumber } from '@/utils/format';

interface StockEntry {
  purchasePrice: number;
  quantity: number;
  date: string;
}

interface StockInputs {
  quantity: string;
  buyPrice: string;
  currentPrice: string;
  tradingFee: string;
}

interface StockResult {
  totalBuyAmount: number;
  totalCurrentAmount: number;
  totalReturn: number;
  returnRate: number;
  totalFee: number;
}

export default function StockCalculator() {
  const [inputs, setInputs] = useState<StockInputs>({
    quantity: '',
    buyPrice: '',
    currentPrice: '',
    tradingFee: '0.015',
  });

  const [result, setResult] = useState<StockResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'buyPrice' || name === 'currentPrice' || name === 'quantity') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setInputs(prev => ({
        ...prev,
        [name]: formatNumber(numericValue)
      }));
    } else {
      setInputs(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateReturns = () => {
    const quantity = parseFloat(inputs.quantity.replace(/,/g, '')) || 0;
    const buyPrice = parseFloat(inputs.buyPrice.replace(/,/g, '')) || 0;
    const currentPrice = parseFloat(inputs.currentPrice.replace(/,/g, '')) || 0;
    const tradingFee = parseFloat(inputs.tradingFee) || 0.015;

    const totalBuyAmount = quantity * buyPrice;
    const totalCurrentAmount = quantity * currentPrice;
    const totalReturn = totalCurrentAmount - totalBuyAmount;
    const returnRate = (totalReturn / totalBuyAmount) * 100;
    const totalFee = (totalBuyAmount + totalCurrentAmount) * (tradingFee / 100);

    setResult({
      totalBuyAmount,
      totalCurrentAmount,
      totalReturn,
      returnRate,
      totalFee,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">주식 투자수익 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">투자 정보 입력</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">매수 수량 (주)</label>
              <input
                type="text"
                name="quantity"
                value={inputs.quantity}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">매수 단가 (원)</label>
              <input
                type="text"
                name="buyPrice"
                value={inputs.buyPrice}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">현재가 (원)</label>
              <input
                type="text"
                name="currentPrice"
                value={inputs.currentPrice}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">거래 수수료율 (%)</label>
              <input
                type="text"
                name="tradingFee"
                value={inputs.tradingFee}
                onChange={handleInputChange}
                placeholder="0.015"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={calculateReturns}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">계산 결과</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>총 매수금액:</span>
                    <span>{formatNumber(result.totalBuyAmount)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 평가금액:</span>
                    <span>{formatNumber(result.totalCurrentAmount)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 수익금:</span>
                    <span className={`${result.totalReturn >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                      {formatNumber(result.totalReturn)}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>수익률:</span>
                    <span className={`${result.returnRate >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                      {result.returnRate.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>거래 수수료:</span>
                    <span className="text-red-600">{formatNumber(result.totalFee)}원</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 사용법 및 정보 섹션 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">주식 투자 안내</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">투자 비용</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>매매 수수료: 거래 금액의 0.015~0.35%</li>
                  <li>증권거래세: 매도 시 0.23%</li>
                  <li>농어촌특별세: 매도 시 0.15%</li>
                  <li>양도소득세: 대주주는 별도 과세</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">투자 유의사항</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>투자는 원금 손실의 위험이 있음</li>
                  <li>분산 투자로 리스크 관리 필요</li>
                  <li>기업의 재무상태 확인 중요</li>
                  <li>시장 상황에 따른 변동성 고려</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 정보</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.krx.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국거래소</span>
                <span className="text-gray-500 text-sm ml-2">- 주식시장 정보</span>
              </a>
              <a
                href="https://www.ksd.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">예탁결제원</span>
                <span className="text-gray-500 text-sm ml-2">- 증권정보 포털</span>
              </a>
              <a
                href="https://www.fss.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">금융감독원</span>
                <span className="text-gray-500 text-sm ml-2">- 전자공시</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 