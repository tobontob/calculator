'use client';

import React, { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

interface Payment {
  month: number;
  principal: number;
  interest: number;
  total: number;
  remainingPrincipal: number;
}

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [paymentType, setPaymentType] = useState('bullet'); // bullet, equal-principal, equal-payment
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState({
    totalPayment: 0,
    totalInterest: 0,
    monthlyPayment: 0,
  });

  const calculateLoan = () => {
    if (!principal || !interestRate || !loanTerm) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const P = parseFloat(principal.replace(/,/g, '')); // 원금
    const r = parseFloat(interestRate) / 100 / 12; // 월 이자율
    const n = parseInt(loanTerm) * 12; // 총 납부 개월 수
    let payments: Payment[] = [];
    let totalInterest = 0;
    let monthlyPayment = 0;

    switch (paymentType) {
      case 'bullet': // 만기일시상환
        {
          const monthlyInterest = P * r; // 매월 이자
          for (let i = 1; i <= n; i++) {
            const payment: Payment = {
              month: i,
              principal: i === n ? Math.round(P) : 0,
              interest: Math.round(monthlyInterest),
              total: i === n ? Math.round(P + monthlyInterest) : Math.round(monthlyInterest),
              remainingPrincipal: i === n ? 0 : Math.round(P)
            };
            payments.push(payment);
            totalInterest += monthlyInterest;
          }
          monthlyPayment = monthlyInterest;
        }
        break;

      case 'equal-principal': // 원금균등분할상환
        {
          const monthlyPrincipal = P / n; // 매월 상환 원금
          let remainingPrincipal = P;
          
          for (let i = 1; i <= n; i++) {
            const monthlyInterest = remainingPrincipal * r;
            const payment: Payment = {
              month: i,
              principal: Math.round(monthlyPrincipal),
              interest: Math.round(monthlyInterest),
              total: Math.round(monthlyPrincipal + monthlyInterest),
              remainingPrincipal: Math.round(remainingPrincipal - monthlyPrincipal)
            };
            payments.push(payment);
            totalInterest += monthlyInterest;
            remainingPrincipal -= monthlyPrincipal;
          }
          monthlyPayment = payments[0].total; // 첫 달 납부액
        }
        break;

      case 'equal-payment': // 원리금균등분할상환
        {
          // 월 납부금 = 원금 × 월이자율 × (1 + 월이자율)^기간 ÷ ((1 + 월이자율)^기간 - 1)
          monthlyPayment = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
          let remainingPrincipal = P;

          for (let i = 1; i <= n; i++) {
            const monthlyInterest = remainingPrincipal * r;
            const monthlyPrincipal = monthlyPayment - monthlyInterest;
            const payment: Payment = {
              month: i,
              principal: Math.round(monthlyPrincipal),
              interest: Math.round(monthlyInterest),
              total: Math.round(monthlyPayment),
              remainingPrincipal: Math.round(remainingPrincipal - monthlyPrincipal)
            };
            payments.push(payment);
            totalInterest += monthlyInterest;
            remainingPrincipal -= monthlyPrincipal;
          }
        }
        break;
    }

    setPayments(payments);
    setSummary({
      totalPayment: Math.round(P + totalInterest),
      totalInterest: Math.round(totalInterest),
      monthlyPayment: Math.round(monthlyPayment),
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-4">대출 계산기</h1>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <p className="text-gray-700 mb-2">
          대출금 상환 방식(원리금 균등상환, 원금 균등상환, 만기일시상환)에 따른 월별 상환금액과 이자를 계산할 수 있습니다.
        </p>
        <p className="text-gray-700">
          대출 기간과 금리에 따른 정확한 상환 계획을 수립하여 본인에게 맞는 최적의 대출 상환 방식을 선택해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">대출금액 (원)</label>
              <input
                type="text"
                value={principal}
                onChange={(e) => setPrincipal(formatNumber(e.target.value))}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="대출금액을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">연이자율 (%)</label>
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
              <label className="block text-gray-700 mb-2">대출기간 (년)</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="대출기간을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">상환방식</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="bullet">만기일시상환</option>
                <option value="equal-principal">원금균등분할상환</option>
                <option value="equal-payment">원리금균등분할상환</option>
              </select>
            </div>

            <button
              onClick={calculateLoan}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {payments.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">상환 요약</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>총 상환금액:</span>
                        <span>{formatNumber(summary.totalPayment)}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>총 이자금액:</span>
                        <span>{formatNumber(summary.totalInterest)}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>월 평균 상환금액:</span>
                        <span>{formatNumber(summary.monthlyPayment)}원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 결과 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">대출 상환 방식 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">만기일시상환</h3>
                <p className="text-gray-600">
                  원금은 만기일에 일시상환하고 이자는 매월 후 이자로 납부하며, 원금은 만기일 이전이라도 전액 또는 일부 원금상환이 가능합니다.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">원금균등분할상환</h3>
                <p className="text-gray-600">
                  대출원금을 대출기간으로 균등하게 나누어 매월 일정한 금액을 상환하고 이자는 매월 상환으로 줄어든 대출 잔액에 대해서만 지급하는 방식입니다.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">원리금균등분할상환</h3>
                <p className="text-gray-600">
                  대출 총 기간 중에 매월 원금을 분할상환하면서 만기까지의 총 이자 금액을 미리 산출하여 원금총액에 이자 총액을 더하여 대출기간으로 나눔으로서 원금과 이자의 합계금액이 매월 일정하게 납부되도록 만든 방식입니다.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">유용한 대출 관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.fss.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">금융감독원</span>
                <span className="text-gray-500 text-sm ml-2">- 대출 금리 비교 정보</span>
              </a>
              <a
                href="https://www.kinfa.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">서민금융진흥원</span>
                <span className="text-gray-500 text-sm ml-2">- 서민대출 지원 정보</span>
              </a>
              <a
                href="https://www.kfb.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">은행연합회</span>
                <span className="text-gray-500 text-sm ml-2">- 대출 상품 비교</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {payments.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-bold mb-4">상환 스케줄</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-2 py-2 text-left text-xs md:text-base md:px-4">회차</th>
                  <th className="px-2 py-2 text-right text-xs md:text-base md:px-4">원금</th>
                  <th className="px-2 py-2 text-right text-xs md:text-base md:px-4">이자</th>
                  <th className="px-2 py-2 text-right text-xs md:text-base md:px-4">납입액</th>
                  <th className="px-2 py-2 text-right text-xs md:text-base md:px-4">잔금</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.month} className="border-b">
                    <td className="px-2 py-2 text-left text-xs md:text-base md:px-4">{payment.month}회차</td>
                    <td className="px-2 py-2 text-right text-xs md:text-base md:px-4">{formatNumber(payment.principal)}원</td>
                    <td className="px-2 py-2 text-right text-xs md:text-base md:px-4">{formatNumber(payment.interest)}원</td>
                    <td className="px-2 py-2 text-right text-xs md:text-base md:px-4">{formatNumber(payment.total)}원</td>
                    <td className="px-2 py-2 text-right text-xs md:text-base md:px-4">{formatNumber(payment.remainingPrincipal)}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 