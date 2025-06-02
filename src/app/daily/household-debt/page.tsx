'use client';

import { useState } from 'react';
import { formatNumber } from '@/utils/format';

interface HouseholdDebtInputs {
  mortgage: string;
  creditCard: string;
  personalLoan: string;
  otherLoans: string;
  monthlyIncome: string;
}

interface HouseholdDebtResult {
  totalDebt: number;
  debtToIncomeRatio: number;
  monthlyDebtPayment: number;
  debtServiceRatio: number;
  riskLevel: string;
}

export default function HouseholdDebtCalculator() {
  const [inputs, setInputs] = useState<HouseholdDebtInputs>({
    mortgage: '',
    creditCard: '',
    personalLoan: '',
    otherLoans: '',
    monthlyIncome: '',
  });

  const [result, setResult] = useState<HouseholdDebtResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: formatNumber(value)
    }));
    setResult(null);
  };

  const calculateDebtRatio = () => {
    const mortgage = parseFloat(inputs.mortgage.replace(/,/g, '')) || 0;
    const creditCard = parseFloat(inputs.creditCard.replace(/,/g, '')) || 0;
    const personalLoan = parseFloat(inputs.personalLoan.replace(/,/g, '')) || 0;
    const otherLoans = parseFloat(inputs.otherLoans.replace(/,/g, '')) || 0;
    const monthlyIncome = parseFloat(inputs.monthlyIncome.replace(/,/g, '')) || 0;

    // 총 부채
    const totalDebt = mortgage + creditCard + personalLoan + otherLoans;
    
    // 연간 소득 대비 부채 비율 (DTI)
    const annualIncome = monthlyIncome * 12;
    const debtToIncomeRatio = (totalDebt / annualIncome) * 100;

    // 월 상환액 추정 (대출별 평균 금리와 기간 적용)
    const mortgagePayment = mortgage * 0.004; // 연 4.8% 가정
    const creditCardPayment = creditCard * 0.02; // 연 24% 가정
    const personalLoanPayment = personalLoan * 0.008; // 연 9.6% 가정
    const otherLoansPayment = otherLoans * 0.006; // 연 7.2% 가정

    const monthlyDebtPayment = mortgagePayment + creditCardPayment + personalLoanPayment + otherLoansPayment;
    
    // 월 소득 대비 월 상환액 비율 (DSR)
    const debtServiceRatio = (monthlyDebtPayment / monthlyIncome) * 100;

    // 위험도 평가
    let riskLevel = '';
    if (debtToIncomeRatio <= 200 && debtServiceRatio <= 40) {
      riskLevel = '안전';
    } else if (debtToIncomeRatio <= 300 && debtServiceRatio <= 50) {
      riskLevel = '주의';
    } else if (debtToIncomeRatio <= 400 && debtServiceRatio <= 60) {
      riskLevel = '경고';
    } else {
      riskLevel = '위험';
    }

    setResult({
      totalDebt,
      debtToIncomeRatio,
      monthlyDebtPayment,
      debtServiceRatio,
      riskLevel
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">가계부채 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">주택담보대출 (원)</label>
          <input
                type="text"
                name="mortgage"
                value={inputs.mortgage}
                onChange={handleInputChange}
                placeholder="0"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

            <div>
              <label className="block text-gray-700 mb-2">신용카드대출 (원)</label>
              <input
                type="text"
                name="creditCard"
                value={inputs.creditCard}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">개인대출 (원)</label>
              <input
                type="text"
                name="personalLoan"
                value={inputs.personalLoan}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">기타대출 (원)</label>
              <input
                type="text"
                name="otherLoans"
                value={inputs.otherLoans}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">월 소득 (원)</label>
              <input
                type="text"
                name="monthlyIncome"
                value={inputs.monthlyIncome}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          <button
              onClick={calculateDebtRatio}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
              계산하기
          </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>총 부채:</span>
                    <span className="text-blue-600">{result.totalDebt.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>연소득 대비 부채비율(DTI):</span>
                    <span className="text-purple-600">{result.debtToIncomeRatio.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>월 상환 추정액:</span>
                    <span className="text-green-600">{result.monthlyDebtPayment.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>월소득 대비 상환비율(DSR):</span>
                    <span className="text-orange-600">{result.debtServiceRatio.toFixed(1)}%</span>
        </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>위험도 평가:</span>
                    <span className={`
                      ${result.riskLevel === '안전' ? 'text-green-600' : ''}
                      ${result.riskLevel === '주의' ? 'text-yellow-600' : ''}
                      ${result.riskLevel === '경고' ? 'text-orange-600' : ''}
                      ${result.riskLevel === '위험' ? 'text-red-600' : ''}
                    `}>{result.riskLevel}</span>
                  </div>
                </div>
            </div>
            )}
          </div>
      </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">가계부채 관리 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">부채비율 지표</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>총부채원리금상환비율(DSR): 연간 원리금상환액 ÷ 연간소득</li>
                  <li>총부채상환비율(DTI): 총대출액 ÷ 연간소득</li>
                  <li>DSR 40% 이하 권장</li>
                  <li>DTI 300% 이하 권장</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">위험도 평가 기준</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>안전: DTI 200% 이하, DSR 40% 이하</li>
                  <li>주의: DTI 300% 이하, DSR 50% 이하</li>
                  <li>경고: DTI 400% 이하, DSR 60% 이하</li>
                  <li>위험: DTI 400% 초과 또는 DSR 60% 초과</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">부채관리 방법</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>고금리 부채 우선 상환</li>
                  <li>대출 통합/대환으로 이자 부담 경감</li>
                  <li>불필요한 지출 줄이기</li>
                  <li>비상금 마련하기</li>
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
                <span className="text-gray-500 text-sm ml-2">- 가계부채 관리</span>
              </a>
              <a
                href="https://www.kinfa.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">서민금융진흥원</span>
                <span className="text-gray-500 text-sm ml-2">- 채무조정</span>
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