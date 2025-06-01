'use client';

import { useState } from 'react';

interface SavingsInputs {
  monthlyDeposit: string;
  period: string;
  interestRate: string;
  taxRate: string;
  depositDay: string;
  isCompoundInterest: boolean;
}

interface SavingsResult {
  totalDeposit: number;
  totalInterest: number;
  taxAmount: number;
  totalAmount: number;
  monthlyInterest: number[];
}

export default function SavingsCalculator() {
  const [inputs, setInputs] = useState<SavingsInputs>({
    monthlyDeposit: '',
    period: '',
    interestRate: '',
    taxRate: '15.4',
    depositDay: '1',
    isCompoundInterest: true,
  });

  const [result, setResult] = useState<SavingsResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setResult(null);
  };

  const calculateSavings = () => {
    const monthlyDeposit = parseFloat(inputs.monthlyDeposit) || 0;
    const period = parseInt(inputs.period) || 0;
    const annualRate = (parseFloat(inputs.interestRate) || 0) / 100;
    const monthlyRate = annualRate / 12;
    const taxRate = (parseFloat(inputs.taxRate) || 15.4) / 100;
    const depositDay = parseInt(inputs.depositDay) || 1;

    let totalDeposit = monthlyDeposit * period;
    let totalInterest = 0;
    let monthlyInterest: number[] = [];

    if (inputs.isCompoundInterest) {
      // 복리 계산
      let balance = 0;
      for (let i = 0; i < period; i++) {
        balance = (balance + monthlyDeposit) * (1 + monthlyRate);
        monthlyInterest.push(balance - (monthlyDeposit * (i + 1)));
      }
      totalInterest = balance - totalDeposit;
    } else {
      // 단리 계산
      for (let i = 0; i < period; i++) {
        const monthInterest = monthlyDeposit * monthlyRate * (period - i);
        totalInterest += monthInterest;
        monthlyInterest.push(monthInterest);
      }
    }

    const taxAmount = totalInterest * taxRate;
    const totalAmount = totalDeposit + totalInterest - taxAmount;

    setResult({
      totalDeposit,
      totalInterest,
      taxAmount,
      totalAmount,
      monthlyInterest
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">적금 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">월 적립액 (원)</label>
              <input
                type="text"
                name="monthlyDeposit"
                value={inputs.monthlyDeposit}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">적립 기간 (개월)</label>
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
              <label className="block text-gray-700 mb-2">연 이율 (%)</label>
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

            <div>
              <label className="block text-gray-700 mb-2">납입일</label>
              <input
                type="text"
                name="depositDay"
                value={inputs.depositDay}
                onChange={handleInputChange}
                placeholder="1"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isCompoundInterest"
                  checked={inputs.isCompoundInterest}
                  onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">복리 이자 적용</span>
              </label>
            </div>

            <button
              onClick={calculateSavings}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>총 적립액:</span>
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
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>세후 이자:</span>
                    <span className="text-blue-600">
                      {(result.totalInterest - result.taxAmount).toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>만기 수령액:</span>
                    <span className="text-blue-600">{result.totalAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>실효 수익률:</span>
                    <span>
                      {((result.totalAmount - result.totalDeposit) / result.totalDeposit * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">적금 상품 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">적금 특징</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>매월 일정액을 적립하여 목돈 마련</li>
                  <li>자동이체를 통한 정기적 저축 가능</li>
                  <li>단리/복리 이자 계산 방식 선택 가능</li>
                  <li>납입일자 선택으로 자금 운용 계획 수립</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">이자 계산 방식</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>단리: 원금에 대해서만 이자가 발생</li>
                  <li>복리: 원금과 이자에 대해 이자가 발생</li>
                  <li>일반과세: 이자소득의 15.4% 과세</li>
                  <li>비과세/세금우대: 대상자에 한해 적용</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">유의사항</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>중도해지 시 약정금리보다 낮은 금리 적용</li>
                  <li>가입기간 및 금액에 따라 금리가 다를 수 있음</li>
                  <li>자동이체 미납 시 연체이자 발생 가능</li>
                  <li>예금자보호법에 따라 5천만원까지 보호</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://finlife.fss.or.kr"
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
                href="https://www.kfb.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">은행연합회</span>
                <span className="text-gray-500 text-sm ml-2">- 적금상품 정보</span>
              </a>
              <a
                href="https://www.fss.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">금융감독원</span>
                <span className="text-gray-500 text-sm ml-2">- 금융소비자 정보</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 