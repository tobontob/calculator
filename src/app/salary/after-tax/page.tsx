'use client';

import { useState } from 'react';

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
    const grossIncome = paymentType === 'yearly' 
      ? parseFloat(salary) / 12 
      : parseFloat(salary);

    // 4대 보험 요율 (2024년 기준)
    const nationalPensionRate = 0.045; // 4.5%
    const healthInsuranceRate = 0.0709; // 7.09%
    const longTermCareRate = 0.1227; // 건강보험료의 12.27%
    const employmentInsuranceRate = 0.009; // 0.9%

    // 4대 보험 계산
    const nationalPension = Math.min(grossIncome * nationalPensionRate, 235800); // 상한액 적용
    const healthInsurance = grossIncome * healthInsuranceRate;
    const longTermCare = healthInsurance * longTermCareRate;
    const employmentInsurance = grossIncome * employmentInsuranceRate;

    // 과세표준 계산 (간소화된 버전)
    const taxableIncome = grossIncome - nationalPension - healthInsurance - 
                         longTermCare - employmentInsurance;

    // 소득세 계산 (간소화된 버전)
    let incomeTax = 0;
    if (taxableIncome <= 1200000) {
      incomeTax = taxableIncome * 0.06;
    } else if (taxableIncome <= 4600000) {
      incomeTax = 72000 + (taxableIncome - 1200000) * 0.15;
    } else if (taxableIncome <= 8800000) {
      incomeTax = 582000 + (taxableIncome - 4600000) * 0.24;
    } else if (taxableIncome <= 15000000) {
      incomeTax = 1590000 + (taxableIncome - 8800000) * 0.35;
    } else {
      incomeTax = 3760000 + (taxableIncome - 15000000) * 0.38;
    }

    // 지방소득세 (소득세의 10%)
    const localIncomeTax = incomeTax * 0.1;

    // 총 공제액
    const totalDeduction = nationalPension + healthInsurance + longTermCare + 
                          employmentInsurance + incomeTax + localIncomeTax;

    // 실수령액
    const netIncome = grossIncome - totalDeduction;

    setResult({
      grossIncome,
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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">연봉/월급 실수령액 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            급여 유형
          </label>
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

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {paymentType === 'yearly' ? '연봉' : '월급'} (원)
          </label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={paymentType === 'yearly' ? '예: 36000000' : '예: 3000000'}
          />
        </div>

        <button
          onClick={calculateAfterTax}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          계산하기
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-4">월 급여 명세</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>총 급여:</span>
                  <span className="font-semibold">{result.grossIncome.toLocaleString()}원</span>
                </p>
                <div className="border-t border-gray-200 my-2"></div>
                <p className="flex justify-between text-red-600">
                  <span>국민연금:</span>
                  <span>-{result.nationalPension.toLocaleString()}원</span>
                </p>
                <p className="flex justify-between text-red-600">
                  <span>건강보험:</span>
                  <span>-{result.healthInsurance.toLocaleString()}원</span>
                </p>
                <p className="flex justify-between text-red-600">
                  <span>장기요양보험:</span>
                  <span>-{result.longTermCare.toLocaleString()}원</span>
                </p>
                <p className="flex justify-between text-red-600">
                  <span>고용보험:</span>
                  <span>-{result.employmentInsurance.toLocaleString()}원</span>
                </p>
                <p className="flex justify-between text-red-600">
                  <span>소득세:</span>
                  <span>-{result.incomeTax.toLocaleString()}원</span>
                </p>
                <p className="flex justify-between text-red-600">
                  <span>지방소득세:</span>
                  <span>-{result.localIncomeTax.toLocaleString()}원</span>
                </p>
                <div className="border-t border-gray-200 my-2"></div>
                <p className="flex justify-between font-bold">
                  <span>총 공제액:</span>
                  <span className="text-red-600">-{result.totalDeduction.toLocaleString()}원</span>
                </p>
                <div className="border-t border-gray-200 my-2"></div>
                <p className="flex justify-between text-lg font-bold text-blue-600">
                  <span>실수령액:</span>
                  <span>{result.netIncome.toLocaleString()}원</span>
                </p>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="font-semibold mb-1">참고사항:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>4대 보험료는 2024년 기준 요율을 적용하였습니다.</li>
                <li>소득세는 간소화된 계산방식을 사용하였으며, 실제와 차이가 있을 수 있습니다.</li>
                <li>각종 공제항목(식대, 자녀수당 등)은 포함되지 않았습니다.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 