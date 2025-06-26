'use client';

import { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

interface PersonalLoanInputs {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  repaymentType: 'equal-principal' | 'equal-payment';
}

interface PersonalLoanResult {
  monthlyPayment: string;
  totalInterest: string;
  totalPayment: string;
  schedule: Array<{
    month: number;
    payment: string;
    principal: string;
    interest: string;
    balance: string;
  }>;
}

export default function PersonalLoanCalculator() {
  const [inputs, setInputs] = useState<PersonalLoanInputs>({
    loanAmount: '',
    interestRate: '',
    loanTerm: '',
    repaymentType: 'equal-payment'
  });

  const [result, setResult] = useState<PersonalLoanResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'loanAmount') {
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

  const calculateLoan = () => {
    const principal = parseFloat(parseNumber(inputs.loanAmount)) || 0;
    const annualRate = parseFloat(inputs.interestRate) || 0;
    const months = parseInt(inputs.loanTerm) || 0;
    const monthlyRate = annualRate / 12 / 100;

    let monthlyPayment = 0;
    let totalInterest = 0;
    const schedule = [];
    let remainingBalance = principal;

    if (inputs.repaymentType === 'equal-payment' && monthlyRate > 0) {
      // 원리금균등상환
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      
      let totalPaid = monthlyPayment * months;
      totalInterest = totalPaid - principal;

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
      // 원금균등상환
      const monthlyPrincipal = principal / months;

      for (let i = 1; i <= months; i++) {
        const interestPayment = remainingBalance * monthlyRate;
        monthlyPayment = monthlyPrincipal + interestPayment;
        totalInterest += interestPayment;
        remainingBalance -= monthlyPrincipal;

        schedule.push({
          month: i,
          payment: formatNumber(Math.round(monthlyPayment)),
          principal: formatNumber(Math.round(monthlyPrincipal)),
          interest: formatNumber(Math.round(interestPayment)),
          balance: formatNumber(Math.max(0, Math.round(remainingBalance)))
        });
      }
    }

    setResult({
      monthlyPayment: formatNumber(Math.round(monthlyPayment)),
      totalInterest: formatNumber(Math.round(totalInterest)),
      totalPayment: formatNumber(Math.round(principal + totalInterest)),
      schedule
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">개인대출 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">대출금액 (원)</label>
              <input
                type="text"
                name="loanAmount"
                value={inputs.loanAmount}
                onChange={handleInputChange}
                placeholder="0"
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
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">대출기간 (개월)</label>
              <input
                type="text"
                name="loanTerm"
                value={inputs.loanTerm}
                onChange={handleInputChange}
                placeholder="12"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">상환방식</label>
              <select
                name="repaymentType"
                value={inputs.repaymentType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="equal-payment">원리금균등상환</option>
                <option value="equal-principal">원금균등상환</option>
              </select>
            </div>

            <button
              onClick={calculateLoan}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">대출 상환 정보</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>월 상환금액:</span>
                    <span className="font-semibold">{result.monthlyPayment}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 이자:</span>
                    <span className="font-semibold">{result.totalInterest}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 상환금액:</span>
                    <span className="font-semibold">{result.totalPayment}원</span>
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
            <h2 className="text-xl font-bold mb-4">대출 상환 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">상환방식 비교</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>원리금균등상환: 매월 동일한 금액 상환</li>
                  <li>원금균등상환: 매월 동일한 원금 + 이자 상환</li>
                  <li>만기일시상환: 이자만 납부하고 만기에 원금 상환</li>
                  <li>중도상환수수료: 조기 상환 시 수수료 발생 가능</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">대출 금리 안내</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>신용대출: 연 4.5~15% 수준</li>
                  <li>담보대출: 연 3~7% 수준</li>
                  <li>금리 종류: 고정금리, 변동금리</li>
                  <li>신용등급에 따라 금리 차등 적용</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">대출 시 유의사항</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>대출한도: 소득과 신용도에 따라 결정</li>
                  <li>연체 시 불이익: 신용등급 하락, 연체이자 부과</li>
                  <li>중도상환: 수수료 확인 필요</li>
                  <li>금리인하요구권 활용 가능</li>
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
                <span className="text-gray-500 text-sm ml-2">- 대출 비교공시</span>
              </a>
              <a
                href="https://www.kinfa.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">서민금융진흥원</span>
                <span className="text-gray-500 text-sm ml-2">- 서민대출</span>
              </a>
              <a
                href="https://www.credit.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">신용회복위원회</span>
                <span className="text-gray-500 text-sm ml-2">- 채무조정</span>
              </a>
              <a
                href="https://www.kfb.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">은행연합회</span>
                <span className="text-gray-500 text-sm ml-2">- 대출금리 비교</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 