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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">부가가치세 계산기</h1>
      
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
              <label className="block text-gray-700 mb-2">매입액 (원)</label>
              <input
                type="text"
                name="expenses"
                value={inputs.expenses}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">부가가치세율 (%)</label>
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

            <button
              onClick={calculateVAT}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>공급가액:</span>
                    <span>{result.supplyValue.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>매출 부가가치세:</span>
                    <span className="text-blue-600">{result.vatAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>매입 부가가치세:</span>
                    <span className="text-green-600">-{result.expenseVat.toLocaleString()}원</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>납부할 부가가치세:</span>
                    <span className="text-red-600">{result.netVat.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>총 매출액:</span>
                    <span>{result.totalAmount.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">부가가치세 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">부가가치세 개요</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>일반과세자: 매출액의 10% 표준세율 적용</li>
                  <li>간이과세자: 업종별 부가가치율에 따라 차등 적용</li>
                  <li>면세사업자: 부가가치세 면제 (0% 적용)</li>
                  <li>과세기간: 1기(1~6월), 2기(7~12월)</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">세액 계산 방법</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>매출세액 = 공급가액 × 세율(10%)</li>
                  <li>매입세액 = 매입액 × 세율(10%)</li>
                  <li>납부세액 = 매출세액 - 매입세액</li>
                  <li>예정고지: 직전 과세기간의 납부세액 50%</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">신고 및 납부</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>확정신고: 과세기간 종료 후 25일 이내</li>
                  <li>예정신고: 예정신고기간 종료 후 25일 이내</li>
                  <li>세금계산서 발급 및 보관 의무</li>
                  <li>전자세금계산서 의무 발급 대상 확인</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.nts.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">국세청</span>
                <span className="text-gray-500 text-sm ml-2">- 부가가치세 신고</span>
              </a>
              <a
                href="https://www.hometax.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">홈택스</span>
                <span className="text-gray-500 text-sm ml-2">- 전자신고/세금계산서</span>
              </a>
              <a
                href="https://www.kacpta.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국세무사회</span>
                <span className="text-gray-500 text-sm ml-2">- 세무상담</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 