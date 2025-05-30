'use client';

import { useState } from 'react';
import { formatNumber } from '@/utils/format';

interface StockEntry {
  purchasePrice: number;
  quantity: number;
  date: string;
}

interface StockInputs {
  entries: StockEntry[];
  currentPrice: string;
  tradingFee: string;
}

interface StockResult {
  totalInvestment: number;
  totalQuantity: number;
  averagePurchasePrice: number;
  currentValue: number;
  totalReturn: number;
  returnRate: number;
  tradingFees: number;
  netReturn: number;
}

export default function StockCalculator() {
  const [inputs, setInputs] = useState<StockInputs>({
    entries: [{ purchasePrice: 0, quantity: 0, date: '' }],
    currentPrice: '',
    tradingFee: '0.015', // 기본 거래 수수료 0.015%
  });

  const [result, setResult] = useState<StockResult | null>(null);

  const handleEntryChange = (index: number, field: keyof StockEntry, value: string) => {
    const newEntries = [...inputs.entries];
    if (field === 'date') {
      newEntries[index] = { ...newEntries[index], [field]: value };
    } else {
      newEntries[index] = { ...newEntries[index], [field]: Number(value) };
    }
    setInputs({ ...inputs, entries: newEntries });
  };

  const addEntry = () => {
    setInputs({
      ...inputs,
      entries: [...inputs.entries, { purchasePrice: 0, quantity: 0, date: '' }],
    });
  };

  const removeEntry = (index: number) => {
    if (inputs.entries.length > 1) {
      const newEntries = inputs.entries.filter((_, i) => i !== index);
      setInputs({ ...inputs, entries: newEntries });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.]/g, '');
    setInputs((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const calculateReturns = () => {
    const currentPrice = Number(inputs.currentPrice) || 0;
    const tradingFeeRate = Number(inputs.tradingFee) / 100;

    let totalInvestment = 0;
    let totalQuantity = 0;

    // 총 투자금액과 수량 계산
    inputs.entries.forEach((entry) => {
      totalInvestment += entry.purchasePrice * entry.quantity;
      totalQuantity += entry.quantity;
    });

    // 평균 매수가 계산
    const averagePurchasePrice = totalInvestment / totalQuantity;

    // 현재 평가금액
    const currentValue = currentPrice * totalQuantity;

    // 거래 수수료 계산 (매수 + 매도 수수료)
    const tradingFees = (totalInvestment + currentValue) * tradingFeeRate;

    // 총 수익금 (수수료 제외)
    const totalReturn = currentValue - totalInvestment;

    // 순수익금 (수수료 포함)
    const netReturn = totalReturn - tradingFees;

    // 수익률 계산
    const returnRate = (netReturn / totalInvestment) * 100;

    setResult({
      totalInvestment,
      totalQuantity,
      averagePurchasePrice,
      currentValue,
      totalReturn,
      returnRate,
      tradingFees,
      netReturn,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8">주식 투자수익 계산기</h1>
        
        {/* 입력 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">매수 정보 입력</h2>
          
          {/* 매수 내역 입력 */}
          <div className="space-y-4 mb-6">
            {inputs.entries.map((entry, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      매수가 (원)
                    </label>
                    <input
                      type="text"
                      value={entry.purchasePrice || ''}
                      onChange={(e) => handleEntryChange(index, 'purchasePrice', e.target.value)}
                      placeholder="0"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      수량 (주)
                    </label>
                    <input
                      type="text"
                      value={entry.quantity || ''}
                      onChange={(e) => handleEntryChange(index, 'quantity', e.target.value)}
                      placeholder="0"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      매수일
                    </label>
                    <input
                      type="date"
                      value={entry.date}
                      onChange={(e) => handleEntryChange(index, 'date', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {inputs.entries.length > 1 && (
                  <button
                    onClick={() => removeEntry(index)}
                    className="mt-2 text-red-600 text-sm hover:text-red-700"
                  >
                    삭제
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={addEntry}
              className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
            >
              + 매수 내역 추가
            </button>
          </div>

          {/* 현재가 및 수수료 입력 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                현재가 (원)
              </label>
              <input
                type="text"
                name="currentPrice"
                value={inputs.currentPrice}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                거래 수수료율 (%)
              </label>
              <input
                type="text"
                name="tradingFee"
                value={inputs.tradingFee}
                onChange={handleInputChange}
                placeholder="0.015"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={calculateReturns}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              계산하기
            </button>
          </div>
        </div>

        {/* 결과 섹션 */}
        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">투자 수익 분석</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">총 투자금액</p>
                  <p className="text-lg font-semibold">
                    {formatNumber(result.totalInvestment)}원
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">총 보유수량</p>
                  <p className="text-lg font-semibold">
                    {formatNumber(result.totalQuantity)}주
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">평균 매수가</p>
                  <p className="text-lg font-semibold">
                    {formatNumber(result.averagePurchasePrice)}원
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">현재 평가금액</p>
                  <p className="text-lg font-semibold">
                    {formatNumber(result.currentValue)}원
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">총 수수료</p>
                  <p className="text-lg font-semibold text-red-600">
                    {formatNumber(result.tradingFees)}원
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">순수익률</p>
                  <p className={`text-lg font-semibold ${
                    result.returnRate > 0 ? 'text-red-600' : 
                    result.returnRate < 0 ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {result.returnRate.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-gray-600">순수익금 (수수료 차감 후)</p>
                <p className={`text-xl font-bold ${
                  result.netReturn > 0 ? 'text-red-600' : 
                  result.netReturn < 0 ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {formatNumber(result.netReturn)}원
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 참고 사항 */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">참고 사항</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>거래 수수료는 매수, 매도 시 각각 적용됩니다.</li>
            <li>기본 거래 수수료율은 0.015%로 설정되어 있습니다.</li>
            <li>증권사별로 실제 거래 수수료는 다를 수 있습니다.</li>
            <li>세금 관련 사항(양도소득세 등)은 포함되어 있지 않습니다.</li>
            <li>투자 손익은 실현된 것이 아닌 현재가 기준 평가금액입니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 