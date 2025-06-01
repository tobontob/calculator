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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">연말정산 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {/* 소득 정보 */}
            <div>
              <label className="block text-gray-700 mb-2">연간 총급여 (원)</label>
              <input
                type="number"
                name="yearIncome"
                value={inputs.yearIncome}
                onChange={handleInputChange}
                placeholder="예: 50000000"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">기납부 원천징수세액 (원)</label>
              <input
                type="number"
                name="taxWithheld"
                value={inputs.taxWithheld}
                onChange={handleInputChange}
                placeholder="예: 3000000"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 인적공제 */}
            <div>
              <label className="block text-gray-700 mb-2">부양가족 수 (본인 포함)</label>
              <input
                type="number"
                name="dependents"
                value={inputs.dependents}
                onChange={handleInputChange}
                min="1"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 소득공제 */}
            <div>
              <label className="block text-gray-700 mb-2">연금보험료 (원)</label>
              <input
                type="number"
                name="pension"
                value={inputs.pension}
                onChange={handleInputChange}
                placeholder="국민연금 납입액"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">건강보험료 (원)</label>
              <input
                type="number"
                name="healthInsurance"
                value={inputs.healthInsurance}
                onChange={handleInputChange}
                placeholder="건강보험 납입액"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">고용보험료 (원)</label>
              <input
                type="number"
                name="employmentInsurance"
                value={inputs.employmentInsurance}
                onChange={handleInputChange}
                placeholder="고용보험 납입액"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 세액공제 */}
            <div>
              <label className="block text-gray-700 mb-2">신용카드 사용액 (원)</label>
              <input
                type="number"
                name="creditCardDeduction"
                value={inputs.creditCardDeduction}
                onChange={handleInputChange}
                placeholder="신용카드 사용금액"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">현금영수증 (원)</label>
              <input
                type="number"
                name="cashReceiptDeduction"
                value={inputs.cashReceiptDeduction}
                onChange={handleInputChange}
                placeholder="현금영수증 금액"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">의료비 지출액 (원)</label>
              <input
                type="number"
                name="medicalExpense"
                value={inputs.medicalExpense}
                onChange={handleInputChange}
                placeholder="의료비 지출액"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">교육비 지출액 (원)</label>
              <input
                type="number"
                name="educationExpense"
                value={inputs.educationExpense}
                onChange={handleInputChange}
                placeholder="교육비 지출액"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">기부금 (원)</label>
              <input
                type="number"
                name="donationAmount"
                value={inputs.donationAmount}
                onChange={handleInputChange}
                placeholder="기부금액"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={calculateTax}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">정산 내역</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>총 소득공제액:</span>
                        <span>{result.totalDeduction.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>산출세액:</span>
                        <span>{result.calculatedTax.toLocaleString()}원</span>
                      </div>
                      <div className="border-t border-gray-300 my-2"></div>
                      <div className="flex justify-between font-semibold">
                        <span>차감납부세액:</span>
                        <span className={result.taxDifference >= 0 ? "text-blue-600" : "text-red-600"}>
                          {Math.abs(result.taxDifference).toLocaleString()}원
                          {result.taxDifference >= 0 ? " (환급)" : " (추가납부)"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">연말정산 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">소득공제</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>인적공제: 기본공제 1인당 150만원</li>
                  <li>연금보험료: 납입액의 12% 공제</li>
                  <li>건강/고용보험료: 납입액의 12% 공제</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">세액공제</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>신용카드/현금영수증: 사용액의 15% 공제</li>
                  <li>의료비: 지출액의 15% 공제</li>
                  <li>교육비: 지출액의 15% 공제</li>
                  <li>기부금: 기부액의 15% 공제</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">과세표준 및 세율</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>1,200만원 이하: 6%</li>
                  <li>4,600만원 이하: 15%</li>
                  <li>8,800만원 이하: 24%</li>
                  <li>1억 5천만원 이하: 35%</li>
                  <li>3억원 이하: 38%</li>
                  <li>5억원 이하: 40%</li>
                  <li>5억원 초과: 42%</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.hometax.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">홈택스</span>
                <span className="text-gray-500 text-sm ml-2">- 연말정산 간소화 서비스</span>
              </a>
              <a
                href="https://www.nts.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">국세청</span>
                <span className="text-gray-500 text-sm ml-2">- 연말정산 안내</span>
              </a>
              <a
                href="https://www.moel.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">고용노동부</span>
                <span className="text-gray-500 text-sm ml-2">- 근로자 지원 정보</span>
              </a>
              <a
                href="https://www.nps.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">국민연금공단</span>
                <span className="text-gray-500 text-sm ml-2">- 연금보험료 조회</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 