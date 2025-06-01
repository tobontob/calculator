'use client';

import React, { useState } from 'react';

interface CalculatorInputs {
  depositType: '정기예금' | '정기적금';
  amount: string;
  interestRate: string;
  period: string;
  interestPayment: '만기일시지급' | '매월지급';
  taxRate: string;
}

interface CalculatorResult {
  totalDeposit: number;
  totalInterest: number;
  taxAmount: number;
  netInterest: number;
  totalAmount: number;
  monthlyInterest?: number;
  effectiveRate: number;
}

export default function DepositCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    depositType: '정기예금',
    amount: '',
    interestRate: '',
    period: '',
    interestPayment: '만기일시지급',
    taxRate: '15.4',
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'depositType' || name === 'interestPayment') {
      setInputs(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setInputs(prev => ({
        ...prev,
        [name]: numericValue
      }));
    }
  };

  const calculateDeposit = () => {
    const principal = parseFloat(inputs.amount) || 0;
    const rate = (parseFloat(inputs.interestRate) || 0) / 100;
    const months = parseInt(inputs.period) || 0;
    const taxRate = (parseFloat(inputs.taxRate) || 15.4) / 100;

    let totalInterest = 0;
    let monthlyInterest;

    if (inputs.depositType === '정기예금') {
      // 정기예금 이자 계산
      totalInterest = principal * rate * (months / 12);
      if (inputs.interestPayment === '매월지급') {
        monthlyInterest = totalInterest / months;
      }
    } else {
      // 정기적금 이자 계산
      const monthlyDeposit = principal;
      totalInterest = (monthlyDeposit * months * (months + 1) * rate) / (2 * 12);
    }

    const taxAmount = totalInterest * taxRate;
    const netInterest = totalInterest - taxAmount;
    const totalDeposit = inputs.depositType === '정기예금' ? principal : principal * months;
    const totalAmount = totalDeposit + netInterest;
    const effectiveRate = (netInterest / totalDeposit) * 100;

    setResult({
      totalDeposit,
      totalInterest,
      taxAmount,
      netInterest,
      totalAmount,
      monthlyInterest,
      effectiveRate
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">예금/적금 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">상품 유형</label>
              <select
                name="depositType"
                value={inputs.depositType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="정기예금">정기예금</option>
                <option value="정기적금">정기적금</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                {inputs.depositType === '정기예금' ? '예금액' : '월 적립액'} (원)
              </label>
              <input
                type="text"
                name="amount"
                value={inputs.amount}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">금리 (연 %)</label>
              <input
                type="text"
                name="interestRate"
                value={inputs.interestRate}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">기간 (개월)</label>
              <input
                type="text"
                name="period"
                value={inputs.period}
                onChange={handleInputChange}
                placeholder="12"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {inputs.depositType === '정기예금' && (
              <div>
                <label className="block text-gray-700 mb-2">이자 지급 방식</label>
                <select
                  name="interestPayment"
                  value={inputs.interestPayment}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="만기일시지급">만기일시지급</option>
                  <option value="매월지급">매월지급</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2">세율 (%)</label>
              <input
                type="text"
                name="taxRate"
                value={inputs.taxRate}
                onChange={handleInputChange}
                placeholder="15.4"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={calculateDeposit}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>총 {inputs.depositType === '정기예금' ? '예금액' : '적립액'}:</span>
                    <span>{result.totalDeposit.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 이자:</span>
                    <span>{result.totalInterest.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>세금:</span>
                    <span>-{result.taxAmount.toLocaleString()}원</span>
                  </div>
                  {result.monthlyInterest && (
                    <div className="flex justify-between">
                      <span>월 이자:</span>
                      <span>{result.monthlyInterest.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>세후 이자:</span>
                    <span className="text-blue-600">{result.netInterest.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>만기 수령액:</span>
                    <span className="text-blue-600">{result.totalAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>실효 수익률:</span>
                    <span>{result.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">예금/적금 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">상품 특징</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>정기예금: 목돈을 한번에 예치하여 이자를 받는 상품</li>
                  <li>정기적금: 매월 일정액을 적립하여 이자를 받는 상품</li>
                  <li>이자 지급방식: 만기일시지급 또는 매월지급 선택 가능</li>
                  <li>중도해지 시 약정금리보다 낮은 금리 적용</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">이자 과세</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>일반과세: 이자소득의 15.4% (소득세 14% + 지방소득세 1.4%)</li>
                  <li>비과세종합저축: 가입대상자에 한해 세금 면제</li>
                  <li>세금우대저축: 이자소득의 9.5% 분리과세</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">유의사항</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>실제 이율은 금융기관별로 차이가 있을 수 있음</li>
                  <li>만기 전 해지 시 중도해지이율 적용</li>
                  <li>금리는 변동될 수 있으며, 가입시점 금리가 적용됨</li>
                  <li>예금자보호법에 따라 5천만원까지 보호</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.fss.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">금융감독원</span>
                <span className="text-gray-500 text-sm ml-2">- 금융상품 비교공시</span>
              </a>
              <a
                href="https://www.kdic.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">예금보험공사</span>
                <span className="text-gray-500 text-sm ml-2">- 예금자보호제도</span>
              </a>
              <a
                href="https://finlife.fss.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">금융생활정보</span>
                <span className="text-gray-500 text-sm ml-2">- 금리 정보</span>
              </a>
              <a
                href="https://www.kfb.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">은행연합회</span>
                <span className="text-gray-500 text-sm ml-2">- 은행 상품 정보</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 