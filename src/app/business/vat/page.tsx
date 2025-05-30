'use client';

import { useState } from 'react';

interface VATInputs {
  revenue: string;
  expenses: string;
  taxRate: string;
}

interface VATResult {
  supplyValue: number;
  vatAmount: number;
  totalAmount: number;
  expenseVat: number;
  netVat: number;
}

export default function VATCalculator() {
  const [inputs, setInputs] = useState<VATInputs>({
    revenue: '',
    expenses: '',
    taxRate: '10',
  });

  const [result, setResult] = useState<VATResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
    setResult(null);
  };

  const calculateVAT = () => {
    const revenue = parseFloat(inputs.revenue.replace(/,/g, '')) || 0;
    const expenses = parseFloat(inputs.expenses.replace(/,/g, '')) || 0;
    const taxRate = parseFloat(inputs.taxRate) / 100;

    // 공급가액 계산
    const supplyValue = revenue;
    
    // 매출 부가가치세
    const vatAmount = supplyValue * taxRate;
    
    // 총 매출액 (공급가액 + 부가가치세)
    const totalAmount = supplyValue + vatAmount;
    
    // 매입 부가가치세
    const expenseVat = expenses * taxRate;
    
    // 납부할 부가가치세 (매출세액 - 매입세액)
    const netVat = vatAmount - expenseVat;

    setResult({
      supplyValue,
      vatAmount,
      totalAmount,
      expenseVat,
      netVat
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">부가가치세 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
              매입액 (원)
            </label>
            <input
              type="text"
              name="expenses"
              value={inputs.expenses}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="매입액을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              부가가치세율 (%)
            </label>
            <select
              name="taxRate"
              value={inputs.taxRate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="10">10% (표준세율)</option>
              <option value="0">0% (면세)</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateVAT}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">부가가치세 계산 결과</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">공급가액</p>
              <p className="text-xl font-bold">{formatNumber(result.supplyValue)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">매출 부가가치세</p>
              <p className="text-xl font-bold text-blue-600">{formatNumber(result.vatAmount)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">매입 부가가치세</p>
              <p className="text-xl font-bold text-green-600">{formatNumber(result.expenseVat)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">납부할 부가가치세</p>
              <p className="text-xl font-bold text-red-600">{formatNumber(result.netVat)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded md:col-span-2">
              <p className="text-sm text-gray-600">총 매출액 (공급가액 + 부가가치세)</p>
              <p className="text-xl font-bold">{formatNumber(result.totalAmount)}원</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">참고사항</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>부가가치세는 일반적으로 10%의 표준세율이 적용됩니다.</li>
          <li>매출세액에서 매입세액을 공제한 금액이 납부할 부가가치세입니다.</li>
          <li>면세사업자의 경우 부가가치세율 0%를 선택하세요.</li>
          <li>간이과세자는 업종별로 다른 부가가치세율이 적용될 수 있습니다.</li>
          <li>정확한 세금은 관할 세무서나 세무사와 상담하시기 바랍니다.</li>
        </ul>
      </div>
    </div>
  );
} 