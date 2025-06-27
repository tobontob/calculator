'use client';

import { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

export default function AfterTaxCalculator() {
  const [inputs, setInputs] = useState({
    hourlyWage: '',
    dailyHours: '',
    weeklyDays: '',
    monthlyDays: '',
    weeklyOvertime: '',
    monthlyOvertime: '',
    includeHolidayAllowance: true,
    taxType: 'none', // none, fourMajor, tax33
    isProbation: false,
  });
  const [result, setResult] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
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
  };

  const calculateSalary = () => {
    // 입력값 파싱
    const hourlyWage = Number(parseNumber(inputs.hourlyWage));
    const dailyHours = Number(parseNumber(inputs.dailyHours));
    const weeklyDays = Number(parseNumber(inputs.weeklyDays));
    const monthlyDays = Number(parseNumber(inputs.monthlyDays));
    const weeklyOvertime = Number(parseNumber(inputs.weeklyOvertime));
    const monthlyOvertime = Number(parseNumber(inputs.monthlyOvertime));
    const includeHolidayAllowance = inputs.includeHolidayAllowance;
    const taxType = inputs.taxType;
    const isProbation = inputs.isProbation;

    // 기본 급여 계산
    const dailyPay = hourlyWage * dailyHours;
    const weeklyPay = dailyPay * weeklyDays;
    const monthlyPay = dailyPay * monthlyDays;
    const yearlyPay = monthlyPay * 12;

    // 주휴수당 계산 (주 15시간 이상 근무자만, 최대 40시간)
    let holidayAllowance = 0;
    const totalWeeklyHours = dailyHours * weeklyDays;
    if (includeHolidayAllowance && totalWeeklyHours >= 15) {
      const baseHours = Math.min(totalWeeklyHours, 40);
      holidayAllowance = (baseHours / 40) * 8 * hourlyWage;
    }
    // 주휴수당은 주급, 월급, 연봉에 포함
    const weeklyPayWithHoliday = weeklyPay + holidayAllowance;
    const monthlyPayWithHoliday = (weeklyPayWithHoliday * 4.34); // 1달 = 4.34주
    const yearlyPayWithHoliday = monthlyPayWithHoliday * 12;

    // 연장수당 계산 (1.5배, 5인 미만 사업장 1.0배는 옵션화 가능)
    const weeklyOvertimePay = weeklyOvertime * hourlyWage * 1.5;
    const monthlyOvertimePay = monthlyOvertime * hourlyWage * 1.5;

    // 수습공제 (10% 차감)
    let probationDeduction = 0;
    if (isProbation) {
      probationDeduction = monthlyPayWithHoliday * 0.1;
    }

    // 세금공제
    let taxDeduction = 0;
    if (taxType === 'fourMajor') {
      taxDeduction = monthlyPayWithHoliday * 0.094;
    } else if (taxType === 'tax33') {
      taxDeduction = monthlyPayWithHoliday * 0.033;
    }

    // 최종 실수령액
    const finalMonthly = monthlyPayWithHoliday + monthlyOvertimePay - probationDeduction - taxDeduction;
    const finalYearly = finalMonthly * 12;

    setResult({
      hourlyWage,
      dailyPay,
      weeklyPay,
      monthlyPay,
      yearlyPay,
      holidayAllowance,
      weeklyOvertimePay,
      monthlyOvertimePay,
      probationDeduction,
      taxDeduction,
      monthlyPayWithHoliday,
      yearlyPayWithHoliday,
      finalMonthly,
      finalYearly,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">연봉/월급/급여 실수령액 계산기</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">시급 (원)</label>
              <input
                type="text"
                name="hourlyWage"
                value={formatNumber(inputs.hourlyWage)}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 10,030"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">일일 근무 시간</label>
              <select
                name="dailyHours"
                value={inputs.dailyHours}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}시간</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">한주 근무 일수</label>
              <select
                name="weeklyDays"
                value={inputs.weeklyDays}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 7 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}일</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">한달 근무일수</label>
              <select
                name="monthlyDays"
                value={inputs.monthlyDays}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}일</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">주 연장 근무 시간</label>
              <input
                type="text"
                name="weeklyOvertime"
                value={inputs.weeklyOvertime}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">월 연장 근무 시간</label>
              <input
                type="text"
                name="monthlyOvertime"
                value={inputs.monthlyOvertime}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 8"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="includeHolidayAllowance"
                checked={inputs.includeHolidayAllowance}
                onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2">주휴수당 포함</span>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">세금</label>
              <select
                name="taxType"
                value={inputs.taxType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">미적용</option>
                <option value="fourMajor">4대보험(9.4%)</option>
                <option value="tax33">소득세(3.3%)</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isProbation"
                checked={inputs.isProbation}
                onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2">수습(10% 차감)</span>
            </div>
            <button
              onClick={calculateSalary}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>
            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>예상 시급:</span>
                    <span>{formatNumber(result.hourlyWage)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>예상 일급:</span>
                    <span>{formatNumber(result.dailyPay)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>예상 주급:</span>
                    <span>{formatNumber(result.weeklyPay)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>예상 월급:</span>
                    <span>{formatNumber(result.monthlyPay)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>예상 연봉:</span>
                    <span>{formatNumber(result.yearlyPay)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>주휴수당(주):</span>
                    <span>{formatNumber(result.holidayAllowance)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>월 연장수당:</span>
                    <span>{formatNumber(result.monthlyOvertimePay)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>수습공제:</span>
                    <span>{formatNumber(result.probationDeduction)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>세금공제:</span>
                    <span>{formatNumber(result.taxDeduction)}원</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>실수령 월급:</span>
                    <span className="text-blue-600">{formatNumber(result.finalMonthly)}원</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>실수령 연봉:</span>
                    <span className="text-blue-600">{formatNumber(result.finalYearly)}원</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">급여 계산 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">주휴수당</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>주 15시간 이상 근무자만 지급</li>
                  <li>1주 40시간 초과 시 최대 40시간까지만 적용</li>
                  <li>(1주 총 근무시간 / 40) × 8 × 시급</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">연장수당</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>연장근로는 시급의 1.5배 지급(5인 미만 사업장 1.0배)</li>
                  <li>주/월 연장근무시간 입력 시 자동 계산</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">세금/수습공제</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>4대보험: 9.4% 공제</li>
                  <li>소득세: 3.3% 공제</li>
                  <li>수습: 월급의 10% 차감</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 