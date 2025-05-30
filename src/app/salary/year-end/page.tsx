'use client';

import { useState } from 'react';

interface DeductionInputs {
  // 소득 정보
  yearIncome: string;
  taxWithheld: string;
  
  // 인적공제
  dependents: string;
  
  // 소득공제
  pension: string;
  healthInsurance: string;
  employmentInsurance: string;
  
  // 세액공제
  creditCardDeduction: string;
  cashReceiptDeduction: string;
  medicalExpense: string;
  educationExpense: string;
  donationAmount: string;
}

interface TaxResult {
  totalDeduction: number;
  calculatedTax: number;
  taxDifference: number;
}

export default function YearEndTaxCalculator() {
  const [inputs, setInputs] = useState<DeductionInputs>({
    yearIncome: '',
    taxWithheld: '',
    dependents: '1',
    pension: '',
    healthInsurance: '',
    employmentInsurance: '',
    creditCardDeduction: '',
    cashReceiptDeduction: '',
    medicalExpense: '',
    educationExpense: '',
    donationAmount: ''
  });

  const [result, setResult] = useState<TaxResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
    setResult(null);
  };

  const calculateTax = () => {
    const yearIncome = parseFloat(inputs.yearIncome) || 0;
    const taxWithheld = parseFloat(inputs.taxWithheld) || 0;
    const dependents = parseInt(inputs.dependents) || 1;
    
    // 1. 소득공제 계산
    const basicDeduction = 1500000 * dependents; // 기본공제: 1인당 150만원
    const pensionDeduction = (parseFloat(inputs.pension) || 0) * 0.12; // 연금보험료 공제
    const insuranceDeduction = ((parseFloat(inputs.healthInsurance) || 0) + 
                              (parseFloat(inputs.employmentInsurance) || 0)) * 0.12; // 보험료 공제
    
    // 2. 세액공제 계산
    const creditCardTax = ((parseFloat(inputs.creditCardDeduction) || 0) + 
                          (parseFloat(inputs.cashReceiptDeduction) || 0)) * 0.15; // 신용카드 등 사용금액 공제
    const medicalTax = (parseFloat(inputs.medicalExpense) || 0) * 0.15; // 의료비 세액공제
    const educationTax = (parseFloat(inputs.educationExpense) || 0) * 0.15; // 교육비 세액공제
    const donationTax = (parseFloat(inputs.donationAmount) || 0) * 0.15; // 기부금 세액공제

    // 3. 과세표준 계산
    const totalDeduction = basicDeduction + pensionDeduction + insuranceDeduction;
    const taxableIncome = Math.max(0, yearIncome - totalDeduction);

    // 4. 산출세액 계산 (누진세율 적용)
    let calculatedTax = 0;
    if (taxableIncome <= 12000000) {
      calculatedTax = taxableIncome * 0.06;
    } else if (taxableIncome <= 46000000) {
      calculatedTax = 720000 + (taxableIncome - 12000000) * 0.15;
    } else if (taxableIncome <= 88000000) {
      calculatedTax = 5820000 + (taxableIncome - 46000000) * 0.24;
    } else if (taxableIncome <= 150000000) {
      calculatedTax = 15900000 + (taxableIncome - 88000000) * 0.35;
    } else if (taxableIncome <= 300000000) {
      calculatedTax = 37600000 + (taxableIncome - 150000000) * 0.38;
    } else if (taxableIncome <= 500000000) {
      calculatedTax = 94600000 + (taxableIncome - 300000000) * 0.40;
    } else {
      calculatedTax = 174600000 + (taxableIncome - 500000000) * 0.42;
    }

    // 5. 세액공제 적용
    calculatedTax = Math.max(0, calculatedTax - (creditCardTax + medicalTax + educationTax + donationTax));

    // 6. 차액 계산 (원천징수 세액과의 차이)
    const taxDifference = taxWithheld - calculatedTax;

    setResult({
      totalDeduction,
      calculatedTax,
      taxDifference
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">연말정산 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {/* 소득 정보 */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">소득 정보</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  연간 총급여 (원)
                </label>
                <input
                  type="number"
                  name="yearIncome"
                  value={inputs.yearIncome}
                  onChange={handleInputChange}
                  placeholder="예: 50000000"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  기납부 원천징수세액 (원)
                </label>
                <input
                  type="number"
                  name="taxWithheld"
                  value={inputs.taxWithheld}
                  onChange={handleInputChange}
                  placeholder="예: 3000000"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          {/* 인적공제 */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">인적공제</h2>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                부양가족 수 (본인 포함)
              </label>
              <input
                type="number"
                name="dependents"
                value={inputs.dependents}
                onChange={handleInputChange}
                min="1"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          {/* 소득공제 */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">소득공제</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  연금보험료 (원)
                </label>
                <input
                  type="number"
                  name="pension"
                  value={inputs.pension}
                  onChange={handleInputChange}
                  placeholder="국민연금 납입액"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  건강보험료 (원)
                </label>
                <input
                  type="number"
                  name="healthInsurance"
                  value={inputs.healthInsurance}
                  onChange={handleInputChange}
                  placeholder="건강보험 납입액"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  고용보험료 (원)
                </label>
                <input
                  type="number"
                  name="employmentInsurance"
                  value={inputs.employmentInsurance}
                  onChange={handleInputChange}
                  placeholder="고용보험 납입액"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          {/* 세액공제 */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">세액공제</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  신용카드 사용액 (원)
                </label>
                <input
                  type="number"
                  name="creditCardDeduction"
                  value={inputs.creditCardDeduction}
                  onChange={handleInputChange}
                  placeholder="신용카드 사용금액"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  현금영수증 (원)
                </label>
                <input
                  type="number"
                  name="cashReceiptDeduction"
                  value={inputs.cashReceiptDeduction}
                  onChange={handleInputChange}
                  placeholder="현금영수증 금액"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  의료비 지출액 (원)
                </label>
                <input
                  type="number"
                  name="medicalExpense"
                  value={inputs.medicalExpense}
                  onChange={handleInputChange}
                  placeholder="의료비 지출액"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  교육비 지출액 (원)
                </label>
                <input
                  type="number"
                  name="educationExpense"
                  value={inputs.educationExpense}
                  onChange={handleInputChange}
                  placeholder="교육비 지출액"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  기부금 (원)
                </label>
                <input
                  type="number"
                  name="donationAmount"
                  value={inputs.donationAmount}
                  onChange={handleInputChange}
                  placeholder="기부금"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculateTax}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            계산하기
          </button>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-lg mb-4">연말정산 계산 결과</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>총 소득공제액:</span>
                    <span className="font-semibold">{result.totalDeduction.toLocaleString()}원</span>
                  </p>
                  <p className="flex justify-between">
                    <span>산출세액:</span>
                    <span className="font-semibold">{result.calculatedTax.toLocaleString()}원</span>
                  </p>
                  <div className="border-t border-gray-300 my-2"></div>
                  <p className="flex justify-between font-bold text-lg">
                    <span>{result.taxDifference >= 0 ? '예상 환급액:' : '예상 추가납부액:'}</span>
                    <span className={result.taxDifference >= 0 ? 'text-blue-600' : 'text-red-600'}>
                      {Math.abs(result.taxDifference).toLocaleString()}원
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-1">참고사항:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>이 계산 결과는 예상치이며, 실제 금액과 다를 수 있습니다.</li>
                  <li>소득공제와 세액공제는 한도와 제한이 있을 수 있습니다.</li>
                  <li>정확한 연말정산은 국세청 홈택스나 전문가와 상담하시기 바랍니다.</li>
                  <li>근로소득 세액공제 등 추가적인 공제항목이 있을 수 있습니다.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 