'use client';

import { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

interface SavingsInputs {
  monthlyDeposit: string;
  period: string;
  interestRate: string;
  taxRate: string;
  depositDay: string;
  isCompoundInterest: boolean;
}

interface SavingsResult {
  totalDeposit: string;
  totalInterest: string;
  taxAmount: string;
  netInterest: string;
  totalAmount: string;
  monthlyBreakdown: Array<{
    month: number;
    deposit: string;
    interest: string;
    balance: string;
  }>;
}

export default function SavingsCalculator() {
  const [inputs, setInputs] = useState<SavingsInputs>({
    monthlyDeposit: '',
    period: '',
    interestRate: '',
    taxRate: '15.4',
    depositDay: '1',
    isCompoundInterest: false,
  });

  const [result, setResult] = useState<SavingsResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setInputs(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'monthlyDeposit') {
      setInputs(prev => ({
        ...prev,
        [name]: formatNumber(value)
      }));
    } else {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setInputs(prev => ({
        ...prev,
        [name]: numericValue
      }));
    }
  };

  const calculateSavings = () => {
    const monthlyAmount = parseFloat(inputs.monthlyDeposit.replace(/,/g, '')) || 0;
    const months = parseInt(inputs.period) || 0;
    const annualRate = parseFloat(inputs.interestRate) || 0;
    const taxRate = parseFloat(inputs.taxRate) || 15.4;
    const depositDay = parseInt(inputs.depositDay) || 1;

    const monthlyRate = annualRate / 12 / 100;
    const monthlyBreakdown = [];
    let totalDeposit = 0;
    let totalInterest = 0;
    let balance = 0;

    for (let month = 1; month <= months; month++) {
      totalDeposit += monthlyAmount;
      balance += monthlyAmount;

      let monthlyInterest = 0;
      if (inputs.isCompoundInterest) {
        // 복리 계산
        monthlyInterest = balance * monthlyRate;
      } else {
        // 단리 계산
        monthlyInterest = monthlyAmount * monthlyRate * (months - month + 1);
      }

      totalInterest += monthlyInterest;
      balance += monthlyInterest;

      monthlyBreakdown.push({
        month,
        deposit: formatNumber(monthlyAmount),
        interest: formatNumber(monthlyInterest),
        balance: formatNumber(balance)
      });
    }

    const taxAmount = totalInterest * (taxRate / 100);
    const netInterest = totalInterest - taxAmount;

    setResult({
      totalDeposit: formatNumber(totalDeposit),
      totalInterest: formatNumber(totalInterest),
      taxAmount: formatNumber(taxAmount),
      netInterest: formatNumber(netInterest),
      totalAmount: formatNumber(totalDeposit + netInterest),
      monthlyBreakdown
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
              <label className="block text-gray-700 mb-2">연이율 (%)</label>
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
                <h2 className="text-xl font-semibold mb-4">적금 수익 분석</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>총 납입금액:</span>
                    <span className="font-semibold">{result.totalDeposit}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 이자:</span>
                    <span className="font-semibold">{result.totalInterest}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>이자 과세:</span>
                    <span className="font-semibold">{result.taxAmount}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>세후 이자:</span>
                    <span className="font-semibold">{result.netInterest}원</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>만기 수령액:</span>
                    <span>{result.totalAmount}원</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">월별 상세내역</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-left">회차</th>
                          <th className="p-2 text-right">납입금</th>
                          <th className="p-2 text-right">이자</th>
                          <th className="p-2 text-right">잔액</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.monthlyBreakdown.map((item) => (
                          <tr key={item.month} className="border-b">
                            <td className="p-2">{item.month}회차</td>
                            <td className="p-2 text-right">{item.deposit}원</td>
                            <td className="p-2 text-right">{item.interest}원</td>
                            <td className="p-2 text-right">{item.balance}원</td>
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
            <h2 className="text-xl font-bold mb-4">적금 상품 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">이자 계산 방식</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>단리: 원금에 대해서만 이자 계산</li>
                  <li>복리: 원금과 이자에 대해 이자 계산</li>
                  <li>월복리: 매월 발생한 이자에 대해 재투자</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">과세 정보</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>일반과세: 15.4% (소득세 14% + 지방소득세 1.4%)</li>
                  <li>비과세종합저축: 가입 대상 확인 필요</li>
                  <li>세금우대: 9.5% (소득세 8.7% + 지방소득세 0.8%)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">유의사항</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>자동이체 설정으로 편리한 납입</li>
                  <li>중도해지 시 약정금리보다 낮은 금리 적용</li>
                  <li>특판 상품은 한정 기간/금액만 적용</li>
                  <li>가입 전 약관 확인 필수</li>
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