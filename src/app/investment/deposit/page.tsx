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
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setInputs((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    }
  };

  const calculateInterest = () => {
    const principal = Number(inputs.amount) || 0;
    const rate = (Number(inputs.interestRate) || 0) / 100;
    const months = Number(inputs.period) || 0;
    const taxRate = (Number(inputs.taxRate) || 0) / 100;

    let totalDeposit = 0;
    let totalInterest = 0;
    let monthlyInterest = 0;

    if (inputs.depositType === '정기예금') {
      if (inputs.interestPayment === '만기일시지급') {
        totalInterest = principal * rate * (months / 12);
      } else {
        monthlyInterest = (principal * rate) / 12;
        totalInterest = monthlyInterest * months;
      }
      totalDeposit = principal;
    } else {
      totalDeposit = principal * months;
      const monthlyDeposit = principal;
      
      if (inputs.interestPayment === '만기일시지급') {
        for (let i = 1; i <= months; i++) {
          totalInterest += monthlyDeposit * rate * ((months - i) / 12);
        }
      } else {
        for (let i = 1; i <= months; i++) {
          const monthInterest = (monthlyDeposit * i * rate) / 12;
          totalInterest += monthInterest;
        }
        monthlyInterest = totalInterest / months;
      }
    }

    const taxAmount = totalInterest * taxRate;
    const netInterest = totalInterest - taxAmount;
    const totalAmount = totalDeposit + netInterest;
    const effectiveRate = (netInterest / totalDeposit) * 100;

    setResult({
      totalDeposit,
      totalInterest,
      taxAmount,
      netInterest,
      totalAmount,
      monthlyInterest: inputs.interestPayment === '매월지급' ? monthlyInterest : undefined,
      effectiveRate,
    });
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8">예적금 이자 계산기</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">예적금 정보 입력</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상품 유형
              </label>
              <select
                name="depositType"
                value={inputs.depositType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="정기예금">정기예금</option>
                <option value="정기적금">정기적금</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {inputs.depositType === '정기예금' ? '예치금액' : '월 납입금액'} (원)
              </label>
              <input
                type="text"
                name="amount"
                value={inputs.amount}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                금리 (연 %)
              </label>
              <input
                type="text"
                name="interestRate"
                value={inputs.interestRate}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                기간 (개월)
              </label>
              <input
                type="text"
                name="period"
                value={inputs.period}
                onChange={handleInputChange}
                placeholder="12"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이자 지급 방식
              </label>
              <select
                name="interestPayment"
                value={inputs.interestPayment}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="만기일시지급">만기일시지급</option>
                <option value="매월지급">매월지급</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이자소득세율 (%)
              </label>
              <input
                type="text"
                name="taxRate"
                value={inputs.taxRate}
                onChange={handleInputChange}
                placeholder="15.4"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                일반과세 15.4% (이자소득세 14% + 지방소득세 1.4%)
              </p>
            </div>
            <button
              onClick={calculateInterest}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              계산하기
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">이자 계산 결과</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">총 {inputs.depositType === '정기예금' ? '예치금액' : '납입금액'}</p>
                  <p className="text-lg font-semibold">
                    {formatNumber(result.totalDeposit)}원
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">세전 이자</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {formatNumber(result.totalInterest)}원
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">이자소득세</p>
                  <p className="text-lg font-semibold text-red-600">
                    {formatNumber(result.taxAmount)}원
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">세후 이자</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {formatNumber(result.netInterest)}원
                  </p>
                </div>
                {result.monthlyInterest !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600">월 수령 이자 (세후)</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {formatNumber(result.monthlyInterest * (1 - Number(inputs.taxRate) / 100))}원
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">실효 수익률 (세후)</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {result.effectiveRate.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-gray-600">만기 수령액</p>
                <p className="text-xl font-bold text-blue-600">
                  {formatNumber(result.totalAmount)}원
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">참고 사항</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>정기예금은 만기까지 한번에 예치하는 상품입니다.</li>
            <li>정기적금은 매월 일정액을 납입하는 상품입니다.</li>
            <li>이자소득세는 일반과세 기준(15.4%)으로 계산됩니다.</li>
            <li>비과세종합저축 등 세금 우대 상품은 세율을 0%로 입력하세요.</li>
            <li>중도해지 시 약정금리보다 낮은 중도해지금리가 적용됩니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 