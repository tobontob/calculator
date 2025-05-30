'use client';

import { useState } from 'react';

interface CalculationResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  installments: {
    month: number;
    principal: number;
    interest: number;
    total: number;
    remainingBalance: number;
  }[];
}

export default function CardInstallmentCalculator() {
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [installmentPeriod, setInstallmentPeriod] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateInstallment = () => {
    const amount = parseFloat(purchaseAmount);
    const period = parseInt(installmentPeriod);
    const rate = parseFloat(interestRate) / 100 / 12; // 월 이자율

    if (isNaN(amount) || isNaN(period) || isNaN(rate)) {
      alert('모든 필드를 올바르게 입력해주세요.');
      return;
    }

    // 월 납부금액 계산 (원리금균등상환방식)
    const monthlyPayment = amount * rate * Math.pow(1 + rate, period) / (Math.pow(1 + rate, period) - 1);
    
    let remainingBalance = amount;
    const installments = [];
    let totalInterest = 0;

    for (let i = 1; i <= period; i++) {
      const interest = remainingBalance * rate;
      const principal = monthlyPayment - interest;
      
      totalInterest += interest;
      remainingBalance -= principal;

      installments.push({
        month: i,
        principal: principal,
        interest: interest,
        total: monthlyPayment,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }

    setResult({
      monthlyPayment,
      totalPayment: amount + totalInterest,
      totalInterest,
      installments
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">카드 할부금 계산기</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              구매금액 (원)
            </label>
            <input
              type="number"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="구매금액을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              할부 개월 수
            </label>
            <input
              type="number"
              value={installmentPeriod}
              onChange={(e) => setInstallmentPeriod(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="할부 개월 수를 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연이자율 (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="연이자율을 입력하세요"
              step="0.1"
            />
          </div>
        </div>

        <button
          onClick={calculateInstallment}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">계산 결과</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">월 납부금액</p>
                <p className="text-xl font-bold text-blue-600">{formatNumber(result.monthlyPayment)}원</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">총 납부금액</p>
                <p className="text-xl font-bold">{formatNumber(result.totalPayment)}원</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">총 이자금액</p>
                <p className="text-xl font-bold text-red-600">{formatNumber(result.totalInterest)}원</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">월별 상환 내역</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">회차</th>
                    <th className="px-4 py-2 text-right">원금</th>
                    <th className="px-4 py-2 text-right">이자</th>
                    <th className="px-4 py-2 text-right">납부금액</th>
                    <th className="px-4 py-2 text-right">잔액</th>
                  </tr>
                </thead>
                <tbody>
                  {result.installments.map((item) => (
                    <tr key={item.month} className="border-b">
                      <td className="px-4 py-2">{item.month}회차</td>
                      <td className="px-4 py-2 text-right">{formatNumber(item.principal)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(item.interest)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(item.total)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(item.remainingBalance)}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">참고사항</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>일반적으로 카드 할부 이자율은 연 6~20% 수준입니다.</li>
          <li>할부 수수료가 없는 '무이자 할부'의 경우 이자율을 0%로 입력하세요.</li>
          <li>실제 카드사의 할부 이자 계산방식과 차이가 있을 수 있습니다.</li>
          <li>할부 개월 수는 일반적으로 2~36개월 중에서 선택 가능합니다.</li>
          <li>장기 할부의 경우 총 이자 부담이 크게 증가할 수 있으니 주의하세요.</li>
        </ul>
      </div>
    </div>
  );
} 