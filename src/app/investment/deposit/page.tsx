'use client';

import React, { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

interface CalculatorInputs {
  depositType: '정기예금' | '정기적금';
  amount: string;
  interestRate: string;
  period: string;
  interestPayment: '만기일시지급' | '매월지급';
  taxRate: string;
}

interface CalculatorResult {
  totalDeposit: string;
  totalInterest: string;
  taxAmount: string;
  netInterest: string;
  totalAmount: string;
  monthlyInterest?: string;
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
    } else if (name === 'amount') {
      setInputs(prev => ({
        ...prev,
        [name]: formatNumber(value)
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
    const amount = parseFloat(inputs.amount.replace(/,/g, '')) || 0;
    const rate = parseFloat(inputs.interestRate) || 0;
    const months = parseInt(inputs.period) || 0;
    const taxRate = parseFloat(inputs.taxRate) || 15.4;

    let totalDeposit = 0;
    let totalInterest = 0;
    let monthlyInterest;

    if (inputs.depositType === '정기예금') {
      // 정기예금 계산
      totalDeposit = amount;
      if (inputs.interestPayment === '만기일시지급') {
        // 만기일시지급
        totalInterest = amount * (rate / 100) * (months / 12);
      } else {
        // 매월지급
        const monthlyRate = rate / 12 / 100;
        monthlyInterest = amount * monthlyRate;
        totalInterest = monthlyInterest * months;
      }
    } else {
      // 정기적금 계산
      totalDeposit = amount * months;
      const monthlyRate = rate / 12 / 100;
      
      if (inputs.interestPayment === '만기일시지급') {
        // 단리 계산
        for (let i = 0; i < months; i++) {
          totalInterest += amount * monthlyRate * (months - i);
        }
      } else {
        // 매월 이자지급
        monthlyInterest = 0;
        for (let i = 1; i <= months; i++) {
          const monthInterest = amount * monthlyRate * i;
          totalInterest += monthInterest;
          if (i === months) {
            monthlyInterest = monthInterest;
          }
        }
      }
    }

    const taxAmount = totalInterest * (taxRate / 100);
    const netInterest = totalInterest - taxAmount;
    const effectiveRate = (netInterest / totalDeposit) * 100 * (12 / months);

    setResult({
      totalDeposit: formatNumber(totalDeposit),
      totalInterest: formatNumber(totalInterest),
      taxAmount: formatNumber(taxAmount),
      netInterest: formatNumber(netInterest),
      totalAmount: formatNumber(totalDeposit + netInterest),
      monthlyInterest: monthlyInterest ? formatNumber(monthlyInterest) : undefined,
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

            <div>
              <label className="block text-gray-700 mb-2">이자 과세율 (%)</label>
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
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>총 {inputs.depositType === '정기예금' ? '예금액' : '적립액'}:</span>
                    <span className="font-semibold">{result.totalDeposit}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 이자:</span>
                    <span className="font-semibold">{result.totalInterest}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>이자 과세:</span>
                    <span className="font-semibold">{result.taxAmount}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>세후 이자:</span>
                    <span className="font-semibold">{result.netInterest}원</span>
                  </div>
                  {result.monthlyInterest && (
                    <div className="flex justify-between">
                      <span>월 이자:</span>
                      <span className="font-semibold">{result.monthlyInterest}원</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>실효 금리:</span>
                    <span className="font-semibold">{result.effectiveRate.toFixed(2)}%</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>만기 수령액:</span>
                    <span>{result.totalAmount}원</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">상품 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">정기예금</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>목돈을 한번에 예치</li>
                  <li>만기일시지급: 만기에 이자 수령</li>
                  <li>매월지급: 매월 이자 수령</li>
                  <li>중도해지 시 약정금리 감소</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">정기적금</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>매월 일정액 적립</li>
                  <li>자동이체 추천</li>
                  <li>중도해지 시 약정금리 감소</li>
                  <li>목돈 마련에 유리</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">과세 정보</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>일반과세: 15.4% (소득세 14% + 지방소득세 1.4%)</li>
                  <li>비과세종합저축: 가입 대상 확인 필요</li>
                  <li>세금우대: 9.5% (소득세 8.7% + 지방소득세 0.8%)</li>
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