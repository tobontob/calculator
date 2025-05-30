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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    setResult(null);
  };

  const calculateSavings = () => {
    const monthlyDeposit = parseFloat(inputs.monthlyDeposit.replace(/,/g, '')) || 0;
    const period = parseInt(inputs.period) || 0;
    const annualRate = parseFloat(inputs.interestRate) || 0;
    const taxRate = parseFloat(inputs.taxRate) || 15.4;
    const depositDay = parseInt(inputs.depositDay) || 1;
    
    const monthlyRate = annualRate / 12 / 100;
    let totalDeposit = monthlyDeposit * period;
    let totalInterest = 0;
    const monthlyInterest: number[] = [];

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
        const monthsRemaining = period - i;
        const interest = monthlyDeposit * monthlyRate * monthsRemaining;
        totalInterest += interest;
        monthlyInterest.push(interest);
      }
    }

    // 이자소득세 계산 (일반적으로 15.4%)
    const taxAmount = totalInterest * (taxRate / 100);
    
    setResult({
      totalDeposit,
      totalInterest,
      taxAmount,
      totalAmount: totalDeposit + totalInterest - taxAmount,
      monthlyInterest,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">적금 만기 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {/* 적금 정보 입력 */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">적금 정보</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  월 납입금액 (원)
                </label>
                <input
                  type="text"
                  name="monthlyDeposit"
                  value={inputs.monthlyDeposit}
                  onChange={handleInputChange}
                  placeholder="예: 100000"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  적금 기간 (개월)
                </label>
                <input
                  type="number"
                  name="period"
                  value={inputs.period}
                  onChange={handleInputChange}
                  placeholder="예: 12"
                  min="1"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  연 이자율 (%)
                </label>
                <input
                  type="number"
                  name="interestRate"
                  value={inputs.interestRate}
                  onChange={handleInputChange}
                  placeholder="예: 3.5"
                  step="0.1"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          {/* 상세 설정 */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">상세 설정</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  이자소득세율 (%)
                </label>
                <input
                  type="number"
                  name="taxRate"
                  value={inputs.taxRate}
                  onChange={handleInputChange}
                  step="0.1"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  납입일
                </label>
                <select
                  name="depositDay"
                  value={inputs.depositDay}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {[...Array(28)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}일</option>
                  ))}
                </select>
              </div>

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
          </div>

          <button
            onClick={calculateSavings}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            계산하기
          </button>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-lg mb-4">적금 만기 계산 결과</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>총 납입금액:</span>
                    <span className="font-semibold">{result.totalDeposit.toLocaleString()}원</span>
                  </p>
                  <p className="flex justify-between">
                    <span>총 이자:</span>
                    <span className="font-semibold">{Math.round(result.totalInterest).toLocaleString()}원</span>
                  </p>
                  <p className="flex justify-between">
                    <span>이자소득세:</span>
                    <span className="font-semibold text-red-600">{Math.round(result.taxAmount).toLocaleString()}원</span>
                  </p>
                  <div className="border-t border-gray-300 my-2"></div>
                  <p className="flex justify-between font-bold text-lg">
                    <span>만기 수령액:</span>
                    <span className="text-blue-600">{Math.round(result.totalAmount).toLocaleString()}원</span>
                  </p>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-1">참고사항:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>이자소득세는 일반적으로 15.4% (소득세 14% + 지방소득세 1.4%)가 적용됩니다.</li>
                  <li>복리 이자는 매월 발생한 이자가 원금에 더해져 다음 달 이자 계산에 포함됩니다.</li>
                  <li>실제 은행 적금과는 금리 적용 방식과 세금 계산 방식이 다를 수 있습니다.</li>
                  <li>중도해지 시에는 약정금리보다 낮은 중도해지금리가 적용됩니다.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 