'use client';

import { useState } from 'react';

interface CardInstallmentInputs {
  purchaseAmount: string;
  installmentPeriod: string;
  interestRate: string;
  hasInitialPayment: boolean;
}

interface CardInstallmentResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  initialPayment: number;
  schedule: {
    month: number;
    principal: number;
    interest: number;
    payment: number;
    remainingBalance: number;
  }[];
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
    } else {
      setInputs(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setResult(null);
  };

  const calculateInstallment = () => {
    const amount = parseFloat(inputs.purchaseAmount.replace(/,/g, '')) || 0;
    const months = parseInt(inputs.installmentPeriod) || 0;
    const annualRate = parseFloat(inputs.interestRate) || 0;
    const monthlyRate = annualRate / 12 / 100;

    // 초기납입금 계산 (구매금액의 10%)
    const initialPayment = inputs.hasInitialPayment ? amount * 0.1 : 0;
    const installmentAmount = amount - initialPayment;

    // 월 할부금 계산 (원리금균등상환방식)
    const monthlyPayment = installmentAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

    let remainingBalance = installmentAmount;
    let totalInterest = 0;
    const schedule = [];

    for (let i = 1; i <= months; i++) {
      const interest = remainingBalance * monthlyRate;
      const principal = monthlyPayment - interest;
      
      totalInterest += interest;
      remainingBalance -= principal;

      schedule.push({
        month: i,
        principal,
        interest,
        payment: monthlyPayment,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }

    setResult({
      monthlyPayment,
      totalInterest,
      totalPayment: initialPayment + (monthlyPayment * months),
      initialPayment,
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
              <select
                name="installmentPeriod"
                value={inputs.installmentPeriod}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="2">2개월</option>
                <option value="3">3개월</option>
                <option value="4">4개월</option>
                <option value="5">5개월</option>
                <option value="6">6개월</option>
                <option value="9">9개월</option>
                <option value="12">12개월</option>
                <option value="18">18개월</option>
                <option value="24">24개월</option>
                <option value="36">36개월</option>
              </select>
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
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="hasInitialPayment"
                  checked={inputs.hasInitialPayment}
                  onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">초기납입금 적용 (10%)</span>
              </label>
            </div>

            <button
              onClick={calculateInstallment}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-1 text-sm">
                  {result.initialPayment > 0 && (
                    <div className="flex justify-between">
                      <span>초기납입금:</span>
                      <span className="text-purple-600">{result.initialPayment.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>월 할부금:</span>
                    <span className="text-blue-600">{result.monthlyPayment.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 이자:</span>
                    <span className="text-red-600">{result.totalInterest.toLocaleString()}원</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>총 결제금액:</span>
                    <span>{result.totalPayment.toLocaleString()}원</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">할부 상환 스케줄</h3>
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
                        {result.schedule.map((item) => (
                          <tr key={item.month} className="border-b">
                            <td className="p-2">{item.month}회차</td>
                            <td className="p-2 text-right">{item.principal.toLocaleString()}원</td>
                            <td className="p-2 text-right">{item.interest.toLocaleString()}원</td>
                            <td className="p-2 text-right">{item.remainingBalance.toLocaleString()}원</td>
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
            <h2 className="text-xl font-bold mb-4">카드할부 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">할부 수수료율</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>일반할부: 연 11~21% 수준</li>
                  <li>무이자할부: 가맹점 부담</li>
                  <li>부분무이자: 일부기간 무이자</li>
                  <li>카드사별로 상이할 수 있음</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">할부 기간</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>일반할부: 2~36개월</li>
                  <li>무이자할부: 2~12개월</li>
                  <li>최소할부금액: 5만원 이상</li>
                  <li>장기할부: 18개월 이상</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">유의사항</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>할부금 연체 시 연체이자 발생</li>
                  <li>중도상환 시 수수료 확인</li>
                  <li>카드한도 및 할부한도 확인</li>
                  <li>무이자할부 조건 확인</li>
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
                <span className="text-gray-500 text-sm ml-2">- 카드수수료 비교</span>
              </a>
              <a
                href="https://www.crefia.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">여신금융협회</span>
                <span className="text-gray-500 text-sm ml-2">- 카드정보</span>
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
                <span className="text-gray-500 text-sm ml-2">- 금융정보</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 