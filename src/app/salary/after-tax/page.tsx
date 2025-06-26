'use client';

import { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

export default function AfterTaxCalculator() {
  const [salary, setSalary] = useState('');
  const [paymentType, setPaymentType] = useState('monthly'); // monthly or yearly
  const [result, setResult] = useState<{
    grossIncome: number;
    nationalPension: number;
    healthInsurance: number;
    longTermCare: number;
    employmentInsurance: number;
    incomeTax: number;
    localIncomeTax: number;
    totalDeduction: number;
    netIncome: number;
  } | null>(null);

  const calculateAfterTax = () => {
    if (!salary) return;
    
    const parsedSalary = Number(parseNumber(salary));
    if (isNaN(parsedSalary)) return;
    
    const grossIncome = paymentType === 'yearly' 
      ? parsedSalary / 12 
      : parsedSalary;

    // 4대 보험 요율 (2024년 기준)
    const nationalPensionRate = 0.045; // 4.5%
    const healthInsuranceRate = 0.0709; // 7.09%
    const longTermCareRate = 0.1227; // 건강보험료의 12.27%
    const employmentInsuranceRate = 0.009; // 0.9%

    // 4대 보험 계산 (반올림 적용)
    const nationalPension = Math.round(Math.min(grossIncome * nationalPensionRate, 235800)); // 상한액 적용
    const healthInsurance = Math.round(grossIncome * healthInsuranceRate);
    const longTermCare = Math.round(healthInsurance * longTermCareRate);
    const employmentInsurance = Math.round(grossIncome * employmentInsuranceRate);

    // 과세표준 계산 (간소화된 버전)
    const taxableIncome = grossIncome - nationalPension - healthInsurance - 
                         longTermCare - employmentInsurance;

    // 소득세 계산 (간소화된 버전, 반올림 적용)
    let incomeTax = 0;
    if (taxableIncome <= 1200000) {
      incomeTax = Math.round(taxableIncome * 0.06);
    } else if (taxableIncome <= 4600000) {
      incomeTax = Math.round(72000 + (taxableIncome - 1200000) * 0.15);
    } else if (taxableIncome <= 8800000) {
      incomeTax = Math.round(582000 + (taxableIncome - 4600000) * 0.24);
    } else if (taxableIncome <= 15000000) {
      incomeTax = Math.round(1590000 + (taxableIncome - 8800000) * 0.35);
    } else {
      incomeTax = Math.round(3760000 + (taxableIncome - 15000000) * 0.38);
    }

    // 지방소득세 (소득세의 10%, 반올림 적용)
    const localIncomeTax = Math.round(incomeTax * 0.1);

    // 총 공제액 (반올림 적용)
    const totalDeduction = Math.round(nationalPension + healthInsurance + longTermCare + 
                          employmentInsurance + incomeTax + localIncomeTax);

    // 실수령액 (반올림 적용)
    const netIncome = Math.round(grossIncome - totalDeduction);

    setResult({
      grossIncome: Math.round(grossIncome),
      nationalPension,
      healthInsurance,
      longTermCare,
      employmentInsurance,
      incomeTax,
      localIncomeTax,
      totalDeduction,
      netIncome,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">연봉/월급 실수령액 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">급여 유형</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="monthly"
                    checked={paymentType === 'monthly'}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">월급</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="yearly"
                    checked={paymentType === 'yearly'}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">연봉</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">{paymentType === 'yearly' ? '연봉' : '월급'} (원)</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(formatNumber(e.target.value))}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={paymentType === 'yearly' ? '예: 36,000,000' : '예: 3,000,000'}
              />
            </div>

            <button
              onClick={calculateAfterTax}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>총 급여:</span>
                    <span>{formatNumber(result.grossIncome)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>국민연금:</span>
                    <span>{formatNumber(result.nationalPension)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>건강보험:</span>
                    <span>{formatNumber(result.healthInsurance)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>장기요양보험:</span>
                    <span>{formatNumber(result.longTermCare)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>고용보험:</span>
                    <span>{formatNumber(result.employmentInsurance)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>소득세:</span>
                    <span>{formatNumber(result.incomeTax)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>지방소득세:</span>
                    <span>{formatNumber(result.localIncomeTax)}원</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between">
                    <span>총 공제액:</span>
                    <span>{formatNumber(result.totalDeduction)}원</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>실수령액:</span>
                    <span className="text-blue-600">{formatNumber(result.netIncome)}원</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">4대 보험 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">보험료율 (2024년 기준)</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>국민연금: 4.5% (상한액 235,800원)</li>
                  <li>건강보험: 7.09%</li>
                  <li>장기요양보험: 건강보험료의 12.27%</li>
                  <li>고용보험: 0.9%</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">소득세율</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>1,200만원 이하: 6%</li>
                  <li>4,600만원 이하: 15%</li>
                  <li>8,800만원 이하: 24%</li>
                  <li>1억 5천만원 이하: 35%</li>
                  <li>1억 5천만원 초과: 38%</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">주의사항</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>실제 공제액은 개인별 상황에 따라 다를 수 있음</li>
                  <li>각종 수당과 공제항목은 제외된 금액임</li>
                  <li>연봉 입력 시 성과급 등은 별도 계산 필요</li>
                  <li>지방소득세는 소득세의 10%로 계산</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.nps.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">국민연금공단</span>
                <span className="text-gray-500 text-sm ml-2">- 연금보험료 계산</span>
              </a>
              <a
                href="https://www.nhis.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">국민건강보험공단</span>
                <span className="text-gray-500 text-sm ml-2">- 건강보험료 조회</span>
              </a>
              <a
                href="https://www.nts.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">국세청</span>
                <span className="text-gray-500 text-sm ml-2">- 근로소득세 안내</span>
              </a>
              <a
                href="https://www.ei.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">고용보험</span>
                <span className="text-gray-500 text-sm ml-2">- 고용보험료 조회</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 