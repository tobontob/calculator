'use client';

import { useState } from 'react';

export default function MortgageLoanCalculator() {
  const [propertyValue, setPropertyValue] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [ltv, setLtv] = useState<number | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateLoan = () => {
    // LTV 계산
    const propertyValueNum = parseFloat(propertyValue);
    const loanAmountNum = parseFloat(loanAmount);
    const calculatedLtv = (loanAmountNum / propertyValueNum) * 100;

    // 월 상환금 계산
    const monthlyInterestRate = parseFloat(interestRate) / 12 / 100;
    const numberOfPayments = parseFloat(loanTerm) * 12;
    
    const monthlyPaymentCalc = loanAmountNum * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalPaymentCalc = monthlyPaymentCalc * numberOfPayments;
    const totalInterestCalc = totalPaymentCalc - loanAmountNum;

    setLtv(parseFloat(calculatedLtv.toFixed(2)));
    setMonthlyPayment(parseFloat(monthlyPaymentCalc.toFixed(0)));
    setTotalPayment(parseFloat(totalPaymentCalc.toFixed(0)));
    setTotalInterest(parseFloat(totalInterestCalc.toFixed(0)));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">주택담보대출 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            부동산 가치 (원)
          </label>
          <input
            type="number"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="예: 300000000"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            대출 금액 (원)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="예: 200000000"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            연이자율 (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="예: 3.5"
            step="0.1"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            대출 기간 (년)
          </label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="예: 30"
          />
        </div>

        <button
          onClick={calculateLoan}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          계산하기
        </button>

        {ltv !== null && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-2">계산 결과</h3>
              <div className="space-y-2">
                <p>
                  LTV (담보인정비율): <span className="font-semibold">{ltv}%</span>
                </p>
                <p>
                  월 상환금: <span className="font-semibold">{monthlyPayment?.toLocaleString()}원</span>
                </p>
                <p>
                  총 상환금액: <span className="font-semibold">{totalPayment?.toLocaleString()}원</span>
                </p>
                <p>
                  총 이자금액: <span className="font-semibold">{totalInterest?.toLocaleString()}원</span>
                </p>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="font-semibold mb-1">참고사항:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>LTV 한도는 지역과 규제에 따라 40~70% 범위에서 적용됩니다.</li>
                <li>실제 대출 가능 금액은 소득과 신용도에 따라 달라질 수 있습니다.</li>
                <li>중도상환수수료 등 부대비용은 포함되지 않은 금액입니다.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 