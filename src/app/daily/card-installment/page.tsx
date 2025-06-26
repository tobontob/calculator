'use client';

import { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

interface CardInstallmentInputs {
  purchaseAmount: string;
  installmentPeriod: string;
  interestRate: string;
  hasInitialPayment: boolean;
}

interface CardInstallmentResult {
  monthlyPayment: string;
  totalInterest: string;
  totalAmount: string;
  schedule: Array<{
    month: number;
    payment: string;
    principal: string;
    interest: string;
    balance: string;
  }>;
}

export default function CardInstallmentCalculator() {
  const [inputs, setInputs] = useState<CardInstallmentInputs>({
    purchaseAmount: '',
    installmentPeriod: '',
    interestRate: '',
    hasInitialPayment: false
  });

  const [result, setResult] = useState<CardInstallmentResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setInputs(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'purchaseAmount') {
      setInputs(prev => ({
        ...prev,
        [name]: formatNumber(value)
      }));
    } else {
      setInputs(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setResult(null);
  };

  const calculateInstallment = () => {
    const amount = parseFloat(parseNumber(inputs.purchaseAmount)) || 0;
    const months = parseInt(inputs.installmentPeriod) || 0;
    const annualRate = parseFloat(inputs.interestRate) || 0;
    const monthlyRate = annualRate / 12 / 100;

    let monthlyPayment = 0;
    let totalInterest = 0;
    const schedule = [];
    let remainingBalance = amount;

    if (monthlyRate > 0) {
      monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      let totalPaid = monthlyPayment * months;
      totalInterest = totalPaid - amount;

      for (let i = 1; i <= months; i++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;

        schedule.push({
          month: i,
          payment: formatNumber(Math.round(monthlyPayment)),
          principal: formatNumber(Math.round(principalPayment)),
          interest: formatNumber(Math.round(interestPayment)),
          balance: formatNumber(Math.max(0, Math.round(remainingBalance)))
        });
      }
    } else {
      monthlyPayment = amount / months;
      for (let i = 1; i <= months; i++) {
        remainingBalance -= monthlyPayment;
        schedule.push({
          month: i,
          payment: formatNumber(Math.round(monthlyPayment)),
          principal: formatNumber(Math.round(monthlyPayment)),
          interest: '0',
          balance: formatNumber(Math.max(0, Math.round(remainingBalance)))
        });
      }
    }

    setResult({
      monthlyPayment: formatNumber(Math.round(monthlyPayment)),
      totalInterest: formatNumber(Math.round(totalInterest)),
      totalAmount: formatNumber(Math.round(amount + totalInterest)),
      schedule
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">카드할부 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">구매금액 (원)</label>
              <input
                type="text"
                name="purchaseAmount"
                value={inputs.purchaseAmount}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">할부기간 (개월)</label>
              <input
                type="text"
                name="installmentPeriod"
                value={inputs.installmentPeriod}
                onChange={handleInputChange}
                placeholder="12"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">연이자율 (%)</label>
              <input
                type="text"
                name="interestRate"
                value={inputs.interestRate}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={calculateInstallment}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">할부 상환 정보</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>월 할부금:</span>
                    <span className="font-semibold">{result.monthlyPayment}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 이자:</span>
                    <span className="font-semibold">{result.totalInterest}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 결제금액:</span>
                    <span className="font-semibold">{result.totalAmount}원</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">상환 스케줄</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-1 text-left">회차</th>
                          <th className="p-1 text-right">원금</th>
                          <th className="p-1 text-right">이자</th>
                          <th className="p-1 text-right">잔액</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.schedule.map((item) => (
                          <tr key={item.month} className="border-b">
                            <td className="p-1">{item.month}회차</td>
                            <td className="p-1 text-right">{item.principal}원</td>
                            <td className="p-1 text-right">{item.interest}원</td>
                            <td className="p-1 text-right">{item.balance}원</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">할부 이용 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">무이자 할부</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>2~3개월: 대부분의 가맹점</li>
                  <li>4~6개월: 특별 행사 및 제휴 가맹점</li>
                  <li>10~12개월: 대형 가전, 특별 프로모션</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">일반 할부</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>2~36개월 할부 가능</li>
                  <li>할부 금리: 연 6~21%</li>
                  <li>최소 할부 금액: 5만원 이상</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">유의사항</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>할부 금리는 카드사별로 상이</li>
                  <li>중도상환 수수료 확인 필요</li>
                  <li>연체 시 높은 연체이자율 적용</li>
                  <li>장기할부 시 총 부담 증가</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 