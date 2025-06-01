'use client';

import { useState } from 'react';

type RepaymentType = '원리금균등' | '원금균등' | '만기일시';

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [repaymentType, setRepaymentType] = useState<RepaymentType>('원리금균등');
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    paymentSchedule: Array<{
      month: number;
      principal: number;
      interest: number;
      totalPayment: number;
      remainingBalance: number;
    }>;
  } | null>(null);

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const totalMonths = parseFloat(loanTerm) * 12;
    
    let monthlyPayment = 0;
    let totalInterest = 0;
    let totalPayment = 0;
    const schedule = [];
    
    if (repaymentType === '원리금균등') {
      // 원리금균등상환 (Equal Monthly Installment)
      monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                      (Math.pow(1 + monthlyRate, totalMonths) - 1);
      
      let remainingBalance = principal;
      for (let month = 1; month <= totalMonths; month++) {
        const interest = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interest;
        remainingBalance -= principalPayment;
        
        totalInterest += interest;
        schedule.push({
          month,
          principal: principalPayment,
          interest,
          totalPayment: monthlyPayment,
          remainingBalance: Math.max(0, remainingBalance)
        });
      }
    } else if (repaymentType === '원금균등') {
      // 원금균등상환 (Equal Principal Payment)
      const monthlyPrincipal = principal / totalMonths;
      let remainingBalance = principal;
      
      for (let month = 1; month <= totalMonths; month++) {
        const interest = remainingBalance * monthlyRate;
        remainingBalance -= monthlyPrincipal;
        const payment = monthlyPrincipal + interest;
        
        totalInterest += interest;
        schedule.push({
          month,
          principal: monthlyPrincipal,
          interest,
          totalPayment: payment,
          remainingBalance: Math.max(0, remainingBalance)
        });
      }
      monthlyPayment = schedule[0].totalPayment;
    } else {
      // 만기일시상환 (Bullet Payment)
      const monthlyInterest = principal * monthlyRate;
      monthlyPayment = monthlyInterest;
      totalInterest = monthlyInterest * totalMonths;
      
      for (let month = 1; month <= totalMonths; month++) {
        const isLastMonth = month === totalMonths;
        schedule.push({
          month,
          principal: isLastMonth ? principal : 0,
          interest: monthlyInterest,
          totalPayment: isLastMonth ? principal + monthlyInterest : monthlyInterest,
          remainingBalance: isLastMonth ? 0 : principal
        });
      }
    }
    
    totalPayment = totalInterest + principal;
    
    setResult({
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      paymentSchedule: schedule
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">주택담보대출 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">대출 정보 입력</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">대출금액 (원)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => {
                  setLoanAmount(e.target.value);
                  setResult(null);
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 300000000"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">연이자율 (%)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => {
                  setInterestRate(e.target.value);
                  setResult(null);
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 3.5"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">대출기간 (년)</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => {
                  setLoanTerm(e.target.value);
                  setResult(null);
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 30"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">상환방식</label>
              <select
                value={repaymentType}
                onChange={(e) => {
                  setRepaymentType(e.target.value as RepaymentType);
                  setResult(null);
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="원리금균등">원리금균등상환</option>
                <option value="원금균등">원금균등상환</option>
                <option value="만기일시">만기일시상환</option>
              </select>
            </div>

            <button
              onClick={calculateMortgage}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">계산 결과</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>월 납입금:</span>
                    <span>{result.monthlyPayment.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 이자:</span>
                    <span>{result.totalInterest.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 상환금액:</span>
                    <span>{result.totalPayment.toLocaleString()}원</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold mb-2">상환 스케줄</h4>
                  <div className="max-h-60 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 text-left">회차</th>
                          <th className="p-2 text-right">원금</th>
                          <th className="p-2 text-right">이자</th>
                          <th className="p-2 text-right">잔액</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.paymentSchedule.map((payment, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{payment.month}회차</td>
                            <td className="p-2 text-right">{Math.round(payment.principal).toLocaleString()}원</td>
                            <td className="p-2 text-right">{Math.round(payment.interest).toLocaleString()}원</td>
                            <td className="p-2 text-right">{Math.round(payment.remainingBalance).toLocaleString()}원</td>
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

        {/* 사용법 및 정보 섹션 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">대출 상환방식 안내</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">상환방식 비교</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">원리금균등상환</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>매월 동일한 금액 납부</li>
                      <li>초기에는 이자 비중이 높음</li>
                      <li>시간이 지날수록 원금 비중 증가</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">원금균등상환</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>매월 동일한 원금 상환</li>
                      <li>이자는 잔액에 따라 감소</li>
                      <li>초기 납입금이 가장 많음</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">만기일시상환</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>매월 이자만 납부</li>
                      <li>만기에 원금 전액 상환</li>
                      <li>총 이자 부담이 가장 큼</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 정보</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.fss.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">금융감독원</span>
                <span className="text-gray-500 text-sm ml-2">- 대출금리 비교공시</span>
              </a>
              <a
                href="https://www.hf.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">주택금융공사</span>
                <span className="text-gray-500 text-sm ml-2">- 주택담보대출 안내</span>
              </a>
              <a
                href="https://www.kfb.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">은행연합회</span>
                <span className="text-gray-500 text-sm ml-2">- 대출 정보</span>
              </a>
              <a
                href="https://www.banksalad.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">뱅크샐러드</span>
                <span className="text-gray-500 text-sm ml-2">- 대출 상품 비교</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 