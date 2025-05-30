'use client';

import { useState } from 'react';

interface CalculationResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  monthlySchedule: {
    month: number;
    principal: number;
    interest: number;
    total: number;
    remainingBalance: number;
  }[];
}

export default function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('equal-payment');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const months = parseInt(loanTerm);
    const monthlyRate = annualRate / 12 / 100;

    if (isNaN(principal) || isNaN(annualRate) || isNaN(months)) {
      alert('모든 필드를 올바르게 입력해주세요.');
      return;
    }

    let monthlyPayment = 0;
    let totalInterest = 0;
    const monthlySchedule = [];
    let remainingBalance = principal;

    if (paymentMethod === 'equal-payment') {
      // 원리금균등상환
      monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);

      for (let i = 1; i <= months; i++) {
        const interest = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interest;
        
        totalInterest += interest;
        remainingBalance -= principalPayment;

        monthlySchedule.push({
          month: i,
          principal: principalPayment,
          interest: interest,
          total: monthlyPayment,
          remainingBalance: Math.max(0, remainingBalance)
        });
      }
    } else if (paymentMethod === 'equal-principal') {
      // 원금균등상환
      const monthlyPrincipal = principal / months;

      for (let i = 1; i <= months; i++) {
        const interest = remainingBalance * monthlyRate;
        totalInterest += interest;
        
        const payment = monthlyPrincipal + interest;
        remainingBalance -= monthlyPrincipal;

        monthlySchedule.push({
          month: i,
          principal: monthlyPrincipal,
          interest: interest,
          total: payment,
          remainingBalance: Math.max(0, remainingBalance)
        });
      }

      monthlyPayment = monthlySchedule[0].total;
    }

    setResult({
      monthlyPayment,
      totalPayment: principal + totalInterest,
      totalInterest,
      monthlySchedule
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">신용대출 이자 계산기</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              대출금액 (원)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="대출금액을 입력하세요"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              대출기간 (개월)
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="대출기간을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상환방식
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="equal-payment">원리금균등상환</option>
              <option value="equal-principal">원금균등상환</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateLoan}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">대출 상환 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">첫 회차 납부금액</p>
                <p className="text-xl font-bold text-blue-600">{formatNumber(result.monthlyPayment)}원</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">총 상환금액</p>
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
                  {result.monthlySchedule.map((item) => (
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
          <li>일반적으로 신용대출 금리는 개인의 신용도에 따라 연 4~15% 수준입니다.</li>
          <li>원리금균등상환은 매월 동일한 금액을 납부하는 방식입니다.</li>
          <li>원금균등상환은 매월 동일한 원금과 잔액에 대한 이자를 납부하는 방식입니다.</li>
          <li>중도상환수수료가 있는 경우 실제 상환금액이 더 커질 수 있습니다.</li>
          <li>연체 시 연체이자율이 적용되어 이자 부담이 크게 증가할 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
} 